import { BudgetBreakdown, TripRequirements, TransportOption, AccommodationOption, ActivityOption } from '../types';

export function calculateTripBudget(
  req: TripRequirements,
  transport: TransportOption,
  accommodation: AccommodationOption,
  activities: ActivityOption[],
  alternativeStays: AccommodationOption[] = [],
  alternativeTransports: TransportOption[] = []
): BudgetBreakdown {
  // Transport total is price per person * travelers
  const transportCost = transport.totalCost;

  // Accommodation total is price per night * (nights)
  // For small groups, assume 1 room per 2 travelers (or hostel beds per traveler)
  const accommodationCost = accommodation.totalCost;

  // Realistic daily food budget per traveler based on travel style
  let dailyFoodPerPerson = 700;
  if (req.travelStyle === 'Budget' || req.travelStyle === 'Backpacker') dailyFoodPerPerson = 450;
  else if (req.travelStyle === 'Luxury') dailyFoodPerPerson = 2200;
  else if (req.travelStyle === 'Comfort') dailyFoodPerPerson = 1200;

  // If total budget is tight (e.g. under ₹22,000 for 2 people), adapt food expectations slightly
  const budgetPerPerson = req.budget / Math.max(1, req.travelers);
  if (budgetPerPerson <= 11000) {
    dailyFoodPerPerson = Math.min(dailyFoodPerPerson, 450);
  }

  const foodCost = dailyFoodPerPerson * req.durationDays * req.travelers;

  // Activities cost: sum of selected activities for all travelers
  const activitiesCost = activities.reduce((sum, act) => sum + (act.estimatedCostPerPerson * req.travelers), 0);

  // Local transport (scooter rental / auto / metro / cabs)
  let localTransportDailyPerGroup = 500;
  if (req.travelStyle === 'Budget' || req.travelStyle === 'Backpacker') localTransportDailyPerGroup = 350;
  else if (req.travelStyle === 'Luxury') localTransportDailyPerGroup = 1400;
  const localTransportCost = localTransportDailyPerGroup * req.durationDays;

  // Miscellaneous / buffer (entry fees, water, emergency contingency ~ 4-5% of budget)
  const miscellaneousCost = Math.round(req.budget * 0.045);

  const totalEstimatedCost = transportCost + accommodationCost + foodCost + activitiesCost + localTransportCost + miscellaneousCost;
  const remainingDifference = req.budget - totalEstimatedCost;
  const isWithinBudget = totalEstimatedCost <= req.budget;

  // Cost saving opportunities
  const savingOpportunities: string[] = [];

  // Check stay saving opportunity
  const cheaperStay = alternativeStays.find(s => s.id !== accommodation.id && s.totalCost < accommodation.totalCost);
  if (cheaperStay) {
    const savings = accommodation.totalCost - cheaperStay.totalCost;
    savingOpportunities.push(`Switching to ${cheaperStay.name} (${cheaperStay.type} tier) saves approximately ₹${savings.toLocaleString('en-IN')}.`);
  }

  // Check transport saving opportunity
  const cheaperTransport = alternativeTransports.find(t => t.id !== transport.id && t.totalCost < transport.totalCost);
  if (cheaperTransport) {
    const savings = transport.totalCost - cheaperTransport.totalCost;
    savingOpportunities.push(`Selecting ${cheaperTransport.name} (${cheaperTransport.type.toUpperCase()}) reduces transport expense by ₹${savings.toLocaleString('en-IN')}.`);
  }

  if (!isWithinBudget) {
    savingOpportunities.push(`Current allocation is ₹${Math.abs(remainingDifference).toLocaleString('en-IN')} over budget. Prioritize budget accommodation or rail transit to optimize.`);
  } else {
    savingOpportunities.push(`Plan preserves a healthy contingency reserve of ₹${remainingDifference.toLocaleString('en-IN')} for on-ground flexibility.`);
  }

  return {
    transport: transportCost,
    accommodation: accommodationCost,
    food: foodCost,
    activities: activitiesCost,
    localTransport: localTransportCost,
    miscellaneous: miscellaneousCost,
    totalEstimatedCost,
    userBudget: req.budget,
    remainingDifference,
    isWithinBudget,
    savingOpportunities
  };
}
