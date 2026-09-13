import {
  TripRequirements,
  AgentWorkflowStep,
  CompleteTripPlan,
  TransportOption,
  AccommodationOption,
  ActivityOption,
  ResearchSource,
  ReplanDiff
} from '../types';
import { getDestinationData } from '../data/mockTravelData';
import { evaluateOptions } from './decisionEngine';
import { calculateTripBudget } from './budgetOptimizer';
import { generateItinerary } from './itineraryGenerator';

export const INITIAL_AGENT_STEPS: AgentWorkflowStep[] = [
  { id: 1, title: 'Understanding trip requirements', description: 'Parsing destinations, group size, budget limits, and personal preferences', status: 'pending' },
  { id: 2, title: 'Creating research plan', description: 'Formulating search strategies across transit, accommodation, and curated spots', status: 'pending' },
  { id: 3, title: 'Researching transport', description: 'Querying flights, express rail corridors, and sleeper bus timetables', status: 'pending' },
  { id: 4, title: 'Researching stays', description: 'Evaluating boutique hotels, heritage guest stays, hostels, and resorts', status: 'pending' },
  { id: 5, title: 'Researching activities', description: 'Scoring local sights, regional food experiences, and adventure routes', status: 'pending' },
  { id: 6, title: 'Comparing options', description: 'Evaluating trade-offs between travel duration, comfort, and financial cost', status: 'pending' },
  { id: 7, title: 'Calculating budget', description: 'Allocating expenses across transit, stay, food, activities, local cabs, and buffer', status: 'pending' },
  { id: 8, title: 'Checking constraints', description: 'Verifying budget limits, travel schedule feasibility, and safety benchmarks', status: 'pending' },
  { id: 9, title: 'Optimizing trip', description: 'Balancing comfort score, itinerary pace, and economic value for maximum enjoyment', status: 'pending' },
  { id: 10, title: 'Building itinerary', description: 'Drafting logical day-by-day chronological itinerary with estimated timings', status: 'pending' },
  { id: 11, title: 'Preparing actions', description: 'Synthesizing booking links, interactive route maps, and printable report', status: 'pending' }
];

export const REPLAN_AGENT_STEPS: AgentWorkflowStep[] = [
  { id: 1, title: '⚠ Constraint change detected', description: 'Analyzing modified budget, traveler count, or trip duration', status: 'pending' },
  { id: 2, title: 'Re-evaluating transport options', description: 'Filtering options matching new budgetary constraints', status: 'pending' },
  { id: 3, title: 'Re-evaluating accommodation', description: 'Re-ranking stays to fit updated target ceiling', status: 'pending' },
  { id: 4, title: 'Re-evaluating activities', description: 'Balancing free sights vs ticketed experiences to safeguard budget', status: 'pending' },
  { id: 5, title: 'Recalculating total budget', description: 'Synthesizing all expense lines against new budget limit', status: 'pending' },
  { id: 6, title: 'Selecting new optimal options', description: 'Locking revised transport and lodging combination', status: 'pending' },
  { id: 7, title: 'Generating revised itinerary', description: 'Re-calibrating day-by-day timeline to match new plan', status: 'pending' }
];

export function buildCompletePlan(
  req: TripRequirements,
  isReplan: boolean = false,
  previousPlan?: CompleteTripPlan
): CompleteTripPlan {
  const seed = getDestinationData(req.destination, req.from);
  const travelers = Math.max(1, req.travelers);
  const nights = Math.max(1, req.durationDays - 1);

  // Build full transport options
  const availableTransports: TransportOption[] = [
    {
      id: `t-flight-${req.destination.toLowerCase()}`,
      type: 'flight',
      name: seed.transports.flight.name,
      operator: seed.transports.flight.operator,
      departureTime: '07:45 AM',
      arrivalTime: '09:10 AM',
      duration: seed.transports.flight.duration,
      pricePerPerson: seed.transports.flight.price,
      totalCost: seed.transports.flight.price * travelers,
      rating: seed.transports.flight.rating,
      advantages: seed.transports.flight.pros,
      disadvantages: seed.transports.flight.cons,
      preferenceMatchScore: 9.2,
      budgetImpact: seed.transports.flight.price * travelers > req.budget * 0.4 ? 'high' : 'moderate',
      isRecommended: false,
      verificationStatus: 'Demo data',
      bookingRef: `FLY-${Math.floor(1000 + Math.random() * 9000)}`
    },
    {
      id: `t-train-${req.destination.toLowerCase()}`,
      type: 'train',
      name: seed.transports.train.name,
      operator: seed.transports.train.operator,
      departureTime: '06:15 PM (Day 0 / Overnight)',
      arrivalTime: '08:45 AM',
      duration: seed.transports.train.duration,
      pricePerPerson: seed.transports.train.price,
      totalCost: seed.transports.train.price * travelers,
      rating: seed.transports.train.rating,
      advantages: seed.transports.train.pros,
      disadvantages: seed.transports.train.cons,
      preferenceMatchScore: 8.8,
      budgetImpact: 'low',
      isRecommended: false,
      verificationStatus: 'Demo data',
      bookingRef: `IRCTC-${Math.floor(10000 + Math.random() * 90000)}`
    },
    {
      id: `t-bus-${req.destination.toLowerCase()}`,
      type: 'bus',
      name: seed.transports.bus.name,
      operator: seed.transports.bus.operator,
      departureTime: '07:30 PM (Overnight)',
      arrivalTime: '10:30 AM',
      duration: seed.transports.bus.duration,
      pricePerPerson: seed.transports.bus.price,
      totalCost: seed.transports.bus.price * travelers,
      rating: seed.transports.bus.rating,
      advantages: seed.transports.bus.pros,
      disadvantages: seed.transports.bus.cons,
      preferenceMatchScore: 8.0,
      budgetImpact: 'low',
      isRecommended: false,
      verificationStatus: 'Demo data',
      bookingRef: `BUS-${Math.floor(1000 + Math.random() * 9000)}`
    }
  ];

  // Build accommodation options
  // For hostel, rate is per traveler; for hotels, assume 1 room per 2 travelers
  const roomsNeeded = Math.ceil(travelers / 2);

  const availableAccommodations: AccommodationOption[] = [
    {
      id: `a-hostel-${req.destination.toLowerCase()}`,
      type: 'hostel',
      name: seed.stays.hostel.name,
      location: seed.stays.hostel.location,
      pricePerNight: seed.stays.hostel.pricePerNight * travelers,
      totalCost: seed.stays.hostel.pricePerNight * travelers * nights,
      rating: seed.stays.hostel.rating,
      advantages: seed.stays.hostel.pros,
      disadvantages: seed.stays.hostel.cons,
      preferenceMatchScore: 8.3,
      budgetImpact: 'low',
      isRecommended: false,
      verificationStatus: 'Demo data',
      roomType: 'Deluxe AC Dorm Bed (Community Enclave)'
    },
    {
      id: `a-budget-${req.destination.toLowerCase()}`,
      type: 'budget',
      name: seed.stays.budget.name,
      location: seed.stays.budget.location,
      pricePerNight: seed.stays.budget.pricePerNight * roomsNeeded,
      totalCost: seed.stays.budget.pricePerNight * roomsNeeded * nights,
      rating: seed.stays.budget.rating,
      advantages: seed.stays.budget.pros,
      disadvantages: seed.stays.budget.cons,
      preferenceMatchScore: 8.9,
      budgetImpact: 'low',
      isRecommended: false,
      verificationStatus: 'Demo data',
      roomType: 'Standard Heritage Double AC Room'
    },
    {
      id: `a-midrange-${req.destination.toLowerCase()}`,
      type: 'mid-range',
      name: seed.stays.midRange.name,
      location: seed.stays.midRange.location,
      pricePerNight: seed.stays.midRange.pricePerNight * roomsNeeded,
      totalCost: seed.stays.midRange.pricePerNight * roomsNeeded * nights,
      rating: seed.stays.midRange.rating,
      advantages: seed.stays.midRange.pros,
      disadvantages: seed.stays.midRange.cons,
      preferenceMatchScore: 9.3,
      budgetImpact: 'moderate',
      isRecommended: false,
      verificationStatus: 'Demo data',
      roomType: 'Executive Pool View Deluxe Suite'
    },
    {
      id: `a-resort-${req.destination.toLowerCase()}`,
      type: 'resort',
      name: seed.stays.resort.name,
      location: seed.stays.resort.location,
      pricePerNight: seed.stays.resort.pricePerNight * roomsNeeded,
      totalCost: seed.stays.resort.pricePerNight * roomsNeeded * nights,
      rating: seed.stays.resort.rating,
      advantages: seed.stays.resort.pros,
      disadvantages: seed.stays.resort.cons,
      preferenceMatchScore: 9.6,
      budgetImpact: 'high',
      isRecommended: false,
      verificationStatus: 'Demo data',
      roomType: 'Royal Heritage Sea / Valley Villa'
    }
  ];

  // Build activities options
  const availableActivities: ActivityOption[] = seed.activities.map((act, index) => ({
    id: `act-${index}-${req.destination.toLowerCase()}`,
    name: act.name,
    category: act.category,
    location: act.location,
    durationHours: act.durationHours,
    estimatedCostPerPerson: act.cost,
    totalCost: act.cost * travelers,
    rating: act.rating,
    advantages: act.pros,
    disadvantages: act.cons,
    preferenceMatch: 9.0,
    budgetImpact: act.cost === 0 ? 'free' : act.cost < 400 ? 'low' : 'moderate',
    isIncludedInPlan: true,
    verificationStatus: 'Demo data'
  }));

  // Research Sources
  const sources: ResearchSource[] = seed.sources.map((src, i) => ({
    id: `src-${i}`,
    name: src.name,
    domain: src.domain,
    summary: src.summary,
    type: 'demo',
    category: i === 0 ? 'stay' : i === 1 ? 'transport' : 'activity'
  }));

  // Evaluate via Decision Engine
  const decision = evaluateOptions(req, availableTransports, availableAccommodations, availableActivities);

  // Mark selected items
  const selectedTransport = availableTransports.find(t => t.id === decision.selectedTransportId) || availableTransports[0];
  selectedTransport.isRecommended = true;

  const selectedAccommodation = availableAccommodations.find(a => a.id === decision.selectedAccommodationId) || availableAccommodations[1];
  selectedAccommodation.isRecommended = true;

  const selectedActivities = availableActivities.filter(a => decision.selectedActivityIds.includes(a.id));

  // Compute finalized budget
  const budget = calculateTripBudget(
    req,
    selectedTransport,
    selectedAccommodation,
    selectedActivities,
    availableAccommodations,
    availableTransports
  );

  // Generate itinerary
  const itinerary = generateItinerary(req, selectedTransport, selectedAccommodation, selectedActivities);

  // Understanding statement
  const understandingNote = `I'll optimize this trip for your budget, duration and preferences.`;

  // Replan diff if applicable
  let replanDiff: ReplanDiff | undefined;
  if (isReplan && previousPlan) {
    const costDelta = budget.totalEstimatedCost - previousPlan.budget.totalEstimatedCost;
    replanDiff = {
      originalBudget: previousPlan.requirements.budget,
      newBudget: req.budget,
      originalStyle: previousPlan.requirements.travelStyle,
      newStyle: req.travelStyle,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reasonSummary: `Budget adjusted from ₹${previousPlan.requirements.budget.toLocaleString('en-IN')} to ₹${req.budget.toLocaleString('en-IN')}. Switched to ${selectedTransport.name} (${selectedTransport.type.toUpperCase()}) and ${selectedAccommodation.name} (${selectedAccommodation.type}) to preserve quality within your ceiling.`,
      costDelta
    };
  }

  return {
    id: `trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    requirements: req,
    understandingNote,
    decision,
    budget,
    selectedTransport,
    availableTransports,
    selectedAccommodation,
    availableAccommodations,
    selectedActivities,
    availableActivities,
    itinerary,
    sources,
    verificationNote: 'Demo data — sample data used for hackathon demonstration. Verify prices and availability before booking.',
    isReplanned: isReplan,
    replanDiff,
    researchMode: 'Demo Research Mode'
  };
}
