export type TravelStyle = 'Budget' | 'Balanced' | 'Comfort' | 'Luxury' | 'Adventure' | 'Backpacker';

export type TransportType = 'flight' | 'train' | 'bus';
export type AccommodationType = 'budget' | 'mid-range' | 'hostel' | 'resort';
export type ActivityCategory = 'beaches' | 'sightseeing' | 'food' | 'adventure' | 'culture' | 'shopping' | 'relaxation';
export type VerificationStatus = 'Verified' | 'Partially verified' | 'Demo data' | 'Needs confirmation';

export interface TripRequirements {
  from: string;
  destination: string;
  startDate: string;
  durationDays: number;
  travelers: number;
  budget: number;
  travelStyle: TravelStyle;
  interests: string[];
  naturalLanguageQuery?: string;
}

export type StepStatus = 'pending' | 'working' | 'completed';

export interface AgentWorkflowStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  log?: string;
}

export interface TransportOption {
  id: string;
  type: TransportType;
  name: string;
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricePerPerson: number;
  totalCost: number;
  rating: number;
  advantages: string[];
  disadvantages: string[];
  preferenceMatchScore: number; // 0-10
  budgetImpact: 'low' | 'moderate' | 'high';
  isRecommended: boolean;
  verificationStatus: VerificationStatus;
  bookingRef: string;
}

export interface AccommodationOption {
  id: string;
  type: AccommodationType;
  name: string;
  location: string;
  pricePerNight: number;
  totalCost: number; // pricePerNight * (durationDays - 1)
  rating: number;
  advantages: string[];
  disadvantages: string[];
  preferenceMatchScore: number; // 0-10
  budgetImpact: 'low' | 'moderate' | 'high';
  isRecommended: boolean;
  verificationStatus: VerificationStatus;
  roomType: string;
}

export interface ActivityOption {
  id: string;
  name: string;
  category: ActivityCategory;
  location: string;
  durationHours: number;
  estimatedCostPerPerson: number;
  totalCost: number;
  rating: number;
  advantages: string[];
  disadvantages: string[];
  preferenceMatch: number; // 0-10
  budgetImpact: 'free' | 'low' | 'moderate';
  isIncludedInPlan: boolean;
  verificationStatus: VerificationStatus;
}

export interface DecisionFactor {
  name: string;
  score: number; // 0-10
  weight: number;
  explanation: string;
}

export interface DecisionEngineOutput {
  budgetFitScore: number;
  preferenceMatchScore: number;
  convenienceScore: number;
  travelTimeScore: number;
  comfortScore: number;
  overallValueScore: number;
  overallMatchScore: number; // e.g. 9.1/10
  recommendationSummary: string;
  decisionFactors: DecisionFactor[];
  selectedTransportId: string;
  selectedAccommodationId: string;
  selectedActivityIds: string[];
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  localTransport: number;
  miscellaneous: number;
  totalEstimatedCost: number;
  userBudget: number;
  remainingDifference: number; // userBudget - totalEstimatedCost
  isWithinBudget: boolean;
  savingOpportunities: string[];
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  estimatedCost: number;
  reason: string;
  category: string;
}

export interface DayItinerary {
  day: number;
  dateStr?: string;
  title: string;
  summary: string;
  items: ItineraryItem[];
}

export interface ResearchSource {
  id: string;
  name: string;
  domain: string;
  summary: string;
  type: 'demo' | 'live';
  category: 'transport' | 'stay' | 'activity' | 'general';
}

export interface ReplanDiff {
  originalBudget: number;
  newBudget: number;
  originalStyle: TravelStyle;
  newStyle: TravelStyle;
  timestamp: string;
  reasonSummary: string;
  costDelta: number;
}

export interface CompleteTripPlan {
  id: string;
  createdAt: string;
  requirements: TripRequirements;
  understandingNote: string;
  decision: DecisionEngineOutput;
  budget: BudgetBreakdown;
  selectedTransport: TransportOption;
  availableTransports: TransportOption[];
  selectedAccommodation: AccommodationOption;
  availableAccommodations: AccommodationOption[];
  selectedActivities: ActivityOption[];
  availableActivities: ActivityOption[];
  itinerary: DayItinerary[];
  sources: ResearchSource[];
  verificationNote: string;
  isReplanned?: boolean;
  replanDiff?: ReplanDiff;
  researchMode: 'Demo Research Mode' | 'Live Research Mode';
}

export interface SavedTripSummary {
  id: string;
  destination: string;
  from: string;
  dates: string;
  durationDays: number;
  travelers: number;
  budget: number;
  estimatedCost: number;
  createdDate: string;
  travelStyle: TravelStyle;
}
