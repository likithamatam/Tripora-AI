import { CompleteTripPlan, SavedTripSummary } from '../types';

const STORAGE_KEY = 'tripora_saved_trips_v1';

export function getSavedTrips(): CompleteTripPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTrip(plan: CompleteTripPlan): void {
  try {
    const current = getSavedTrips();
    // Check if trip with same ID exists
    const filtered = current.filter(t => t.id !== plan.id);
    filtered.unshift(plan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 20))); // Keep last 20
  } catch (err) {
    console.error('Error saving trip to localStorage', err);
  }
}

export function deleteTrip(tripId: string): void {
  try {
    const current = getSavedTrips();
    const updated = current.filter(t => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting trip', err);
  }
}

export function getSavedTripSummaries(): SavedTripSummary[] {
  return getSavedTrips().map(plan => ({
    id: plan.id,
    destination: plan.requirements.destination,
    from: plan.requirements.from,
    dates: `${plan.requirements.startDate || 'Upcoming'} (${plan.requirements.durationDays} Days)`,
    durationDays: plan.requirements.durationDays,
    travelers: plan.requirements.travelers,
    budget: plan.requirements.budget,
    estimatedCost: plan.budget.totalEstimatedCost,
    createdDate: new Date(plan.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    travelStyle: plan.requirements.travelStyle
  }));
}
