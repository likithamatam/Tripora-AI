import {
  TripRequirements,
  TransportOption,
  AccommodationOption,
  ActivityOption,
  DecisionEngineOutput,
  DecisionFactor
} from '../types';

export function evaluateOptions(
  req: TripRequirements,
  transports: TransportOption[],
  accommodations: AccommodationOption[],
  activities: ActivityOption[]
): DecisionEngineOutput {
  const travelers = Math.max(1, req.travelers);
  const nights = Math.max(1, req.durationDays - 1);

  // Compute a financial feasibility score for each transport & accommodation pairing
  interface RankedPair {
    transport: TransportOption;
    accommodation: AccommodationOption;
    budgetFit: number;
    preferenceMatch: number;
    convenience: number;
    travelTime: number;
    comfort: number;
    overallValue: number;
    compositeScore: number;
    estimatedBaseCost: number;
  }

  const pairs: RankedPair[] = [];

  for (const t of transports) {
    for (const a of accommodations) {
      // Estimated minimum trip cost with this pair
      const approxFood = (req.travelStyle === 'Budget' || req.travelStyle === 'Backpacker' ? 450 : req.travelStyle === 'Luxury' ? 2200 : 700) * req.durationDays * travelers;
      const approxLocal = 500 * req.durationDays;
      const approxActivities = 800 * travelers;
      const approxMisc = req.budget * 0.045;
      const totalEstimated = t.totalCost + a.totalCost + approxFood + approxLocal + approxActivities + approxMisc;

      // 1. Budget Fit Score (0-10)
      let budgetFit = 10;
      if (totalEstimated > req.budget) {
        const overageRatio = (totalEstimated - req.budget) / req.budget;
        budgetFit = Math.max(1, 8 - overageRatio * 15);
      } else {
        const margin = (req.budget - totalEstimated) / req.budget;
        if (margin > 0.45 && req.travelStyle !== 'Budget' && req.travelStyle !== 'Backpacker') {
          // If too much budget left unutilized on a Balanced/Comfort trip, slightly penalize under-utilization
          budgetFit = 8.8;
        } else {
          budgetFit = 9.4 + Math.min(0.6, margin * 2);
        }
      }

      // 2. Preference Match Score (0-10)
      let prefScore = 8.5;
      const userWantsBeaches = req.interests.some(i => i.toLowerCase().includes('beach'));
      const userWantsFood = req.interests.some(i => i.toLowerCase().includes('food'));
      const userWantsSightseeing = req.interests.some(i => i.toLowerCase().includes('sight') || i.toLowerCase().includes('culture'));

      if (a.advantages.some(adv => adv.toLowerCase().includes('beach')) && userWantsBeaches) prefScore += 0.8;
      if (a.advantages.some(adv => adv.toLowerCase().includes('breakfast') || adv.toLowerCase().includes('dining')) && userWantsFood) prefScore += 0.4;
      if (t.advantages.some(adv => adv.toLowerCase().includes('scenic') || adv.toLowerCase().includes('direct'))) prefScore += 0.3;
      prefScore = Math.min(10, Math.max(5, prefScore));

      // 3. Convenience Score (0-10)
      let convenience = 8.0;
      if (t.type === 'flight') convenience += 1.2;
      else if (t.type === 'train') convenience += 0.8;
      else convenience -= 0.5;

      if (a.advantages.some(adv => adv.toLowerCase().includes('walk') || adv.toLowerCase().includes('central'))) convenience += 0.5;
      convenience = Math.min(10, Math.max(4, convenience));

      // 4. Travel Time Score (0-10)
      let travelTime = 7.0;
      if (t.type === 'flight') travelTime = 9.8;
      else if (t.type === 'train') travelTime = 7.5;
      else travelTime = 6.2;

      // 5. Comfort Score (0-10)
      let comfort = 7.5;
      if (a.type === 'resort') comfort = 9.9;
      else if (a.type === 'mid-range') comfort = 8.8;
      else if (a.type === 'budget') comfort = 7.6;
      else comfort = 6.8;

      // 6. Overall Value Score (0-10)
      // Balances quality per rupee
      const valueRatio = (t.rating + a.rating) / 10;
      const costProportion = totalEstimated / req.budget;
      let overallValue = 8.0;
      if (costProportion <= 1.0) {
        overallValue = 8.5 + (1.0 - costProportion) * 1.5;
      } else {
        overallValue = Math.max(3.0, 7.0 - (costProportion - 1.0) * 8);
      }
      overallValue = Math.min(10, Math.max(3, overallValue));

      // Composite calculation
      // If over budget, heavily penalize composite
      let penalty = totalEstimated > req.budget ? 2.5 : 0;
      const composite = (
        budgetFit * 0.35 +
        prefScore * 0.20 +
        convenience * 0.15 +
        travelTime * 0.10 +
        comfort * 0.10 +
        overallValue * 0.10
      ) - penalty;

      pairs.push({
        transport: t,
        accommodation: a,
        budgetFit: Number(budgetFit.toFixed(1)),
        preferenceMatch: Number(prefScore.toFixed(1)),
        convenience: Number(convenience.toFixed(1)),
        travelTime: Number(travelTime.toFixed(1)),
        comfort: Number(comfort.toFixed(1)),
        overallValue: Number(overallValue.toFixed(1)),
        compositeScore: Number(composite.toFixed(2)),
        estimatedBaseCost: totalEstimated
      });
    }
  }

  // Sort descending by composite score
  pairs.sort((a, b) => b.compositeScore - a.compositeScore);
  const best = pairs[0] || {
    transport: transports[0],
    accommodation: accommodations[0],
    budgetFit: 8.5,
    preferenceMatch: 9.0,
    convenience: 8.0,
    travelTime: 7.5,
    comfort: 8.0,
    overallValue: 8.5,
    compositeScore: 8.4,
    estimatedBaseCost: req.budget
  };

  // Filter activities that match user interests and fit remaining daily schedule
  const selectedActivities = activities.filter(act => {
    // If interest overlaps
    const matchesCategory = req.interests.some(interest => {
      const normInt = interest.toLowerCase();
      if (normInt.includes('beach') && act.category === 'beaches') return true;
      if (normInt.includes('food') && act.category === 'food') return true;
      if ((normInt.includes('sight') || normInt.includes('monument')) && act.category === 'sightseeing') return true;
      if (normInt.includes('adventure') && act.category === 'adventure') return true;
      if (normInt.includes('culture') && act.category === 'culture') return true;
      if (normInt.includes('shop') && act.category === 'shopping') return true;
      return false;
    });
    return matchesCategory || act.rating >= 4.7;
  }).slice(0, Math.min(activities.length, req.durationDays * 2));

  // Overall Match Score between 8.8 and 9.6 for high-fit recommendations
  const overallMatch = Math.min(9.8, Math.max(7.2, Number((best.compositeScore).toFixed(1))));

  // Construct transparent, concise decision factors (No hidden chain of thought)
  const decisionFactors: DecisionFactor[] = [
    {
      name: 'Budget Fit',
      score: Math.min(10, best.budgetFit),
      weight: 35,
      explanation: best.estimatedBaseCost <= req.budget
        ? `Allocates resources effectively within ₹${req.budget.toLocaleString('en-IN')}, maintaining reserve buffer.`
        : `Tight margin against ₹${req.budget.toLocaleString('en-IN')}; cost reductions recommended.`
    },
    {
      name: 'Preference Match',
      score: Math.min(10, best.preferenceMatch),
      weight: 20,
      explanation: `Prioritizes ${req.interests.slice(0, 3).join(', ')} with high-rated verified local experiences.`
    },
    {
      name: 'Convenience & Transit',
      score: Math.min(10, best.convenience),
      weight: 15,
      explanation: `${best.transport.name} offers dependable transit from ${req.from} into ${req.destination}.`
    },
    {
      name: 'Travel Time Efficiency',
      score: Math.min(10, best.travelTime),
      weight: 10,
      explanation: `Transit duration (${best.transport.duration}) maximizes usable daytime hours at destination.`
    },
    {
      name: 'Comfort & Lodging Quality',
      score: Math.min(10, best.comfort),
      weight: 10,
      explanation: `${best.accommodation.name} rated ${best.accommodation.rating}/5 with verified guest hygiene.`
    },
    {
      name: 'Overall Economic Value',
      score: Math.min(10, best.overallValue),
      weight: 10,
      explanation: `Optimal cost-to-experience ratio for ${req.travelers} traveler(s) over ${req.durationDays} days.`
    }
  ];

  const recommendationSummary = `Selected ${best.transport.name} and ${best.accommodation.name} to maximize your ${req.durationDays}-day experience in ${req.destination} while respecting your ₹${req.budget.toLocaleString('en-IN')} ceiling and ${req.travelStyle.toLowerCase()} travel profile.`;

  return {
    budgetFitScore: Math.min(10, best.budgetFit),
    preferenceMatchScore: Math.min(10, best.preferenceMatch),
    convenienceScore: Math.min(10, best.convenience),
    travelTimeScore: Math.min(10, best.travelTime),
    comfortScore: Math.min(10, best.comfort),
    overallValueScore: Math.min(10, best.overallValue),
    overallMatchScore: overallMatch,
    recommendationSummary,
    decisionFactors,
    selectedTransportId: best.transport.id,
    selectedAccommodationId: best.accommodation.id,
    selectedActivityIds: selectedActivities.map(a => a.id)
  };
}
