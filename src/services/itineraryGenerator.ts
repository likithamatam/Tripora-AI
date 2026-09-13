import {
  TripRequirements,
  TransportOption,
  AccommodationOption,
  ActivityOption,
  DayItinerary,
  ItineraryItem
} from '../types';

export function generateItinerary(
  req: TripRequirements,
  transport: TransportOption,
  accommodation: AccommodationOption,
  selectedActivities: ActivityOption[]
): DayItinerary[] {
  const days: DayItinerary[] = [];
  const duration = Math.max(1, req.durationDays);
  const destination = req.destination;

  // Distribute activities across days
  let actIndex = 0;

  for (let d = 1; d <= duration; d++) {
    const items: ItineraryItem[] = [];

    if (d === 1) {
      // Day 1: Arrival, Check-in, Leisure
      items.push({
        id: `d1-item-1`,
        time: '09:30 AM',
        activity: `Arrival via ${transport.name}`,
        location: `${destination} Transit Hub`,
        estimatedCost: 0,
        category: 'transit',
        reason: `Seamless arrival from ${req.from} via chosen ${transport.type}.`
      });

      items.push({
        id: `d1-item-2`,
        time: '11:45 AM',
        activity: `Check-in & Unwind at ${accommodation.name}`,
        location: accommodation.location,
        estimatedCost: 0,
        category: 'stay',
        reason: `Drop luggage, freshen up and relax in ${accommodation.type} quarters.`
      });

      const firstActivity = selectedActivities[actIndex % selectedActivities.length];
      if (firstActivity) {
        items.push({
          id: `d1-item-3`,
          time: '03:30 PM',
          activity: firstActivity.name,
          location: firstActivity.location,
          estimatedCost: firstActivity.estimatedCostPerPerson,
          category: firstActivity.category,
          reason: `Prime afternoon exploration matching your interest in ${firstActivity.category}.`
        });
        actIndex++;
      } else {
        items.push({
          id: `d1-item-3`,
          time: '04:00 PM',
          activity: `Orientation & Neighborhood Discovery`,
          location: `${accommodation.location} surrounds`,
          estimatedCost: 200,
          category: 'sightseeing',
          reason: `Gentle orientation around local cafes and scenic viewpoints.`
        });
      }

      items.push({
        id: `d1-item-4`,
        time: '07:30 PM',
        activity: `Welcome Dinner & Regional Coastal Delicacies`,
        location: `Promenade / Old Town Market`,
        estimatedCost: 500,
        category: 'food',
        reason: `Authentic local culinary introduction based on your food preference.`
      });

      days.push({
        day: 1,
        title: `Arrival & Gentle Immersion`,
        summary: `Arrive in ${destination}, settle into ${accommodation.name}, and start experiencing the local charm.`,
        items
      });
    } else if (d === duration) {
      // Last Day: Breakfast, Souvenirs, Check-out, Departure
      items.push({
        id: `d${d}-item-1`,
        time: '08:30 AM',
        activity: `Leisurely Breakfast & Morning Stroll`,
        location: accommodation.name,
        estimatedCost: 250,
        category: 'food',
        reason: `Enjoy morning ambiance and prepare for smooth checkout.`
      });

      const lastActivity = selectedActivities[actIndex % selectedActivities.length];
      if (lastActivity) {
        items.push({
          id: `d${d}-item-2`,
          time: '10:30 AM',
          activity: lastActivity.name,
          location: lastActivity.location,
          estimatedCost: lastActivity.estimatedCostPerPerson,
          category: lastActivity.category,
          reason: `Final memorable experience matching ${lastActivity.category} preferences.`
        });
        actIndex++;
      } else {
        items.push({
          id: `d${d}-item-2`,
          time: '10:30 AM',
          activity: `Local Craft & Artisan Souvenir Hunting`,
          location: `${destination} Central Bazaar`,
          estimatedCost: 350,
          category: 'shopping',
          reason: `Pick up authentic handmade local tokens and spices before departure.`
        });
      }

      items.push({
        id: `d${d}-item-3`,
        time: '01:30 PM',
        activity: `Hotel Check-out & Farewell Lunch`,
        location: accommodation.location,
        estimatedCost: 400,
        category: 'food',
        reason: `Complete express check-out and savor closing meal.`
      });

      items.push({
        id: `d${d}-item-4`,
        time: '05:00 PM',
        activity: `Return Journey Departure`,
        location: `${destination} Terminus / Station`,
        estimatedCost: 0,
        category: 'transit',
        reason: `Board return scheduled service back to ${req.from}.`
      });

      days.push({
        day: d,
        title: `Farewell & Return Journey`,
        summary: `Wrap up your ${duration}-day trip with morning memories, checkout, and comfortable departure.`,
        items
      });
    } else {
      // Intermediate Days: Full immersion, cultural, adventure, dining
      const morningActivity = selectedActivities[actIndex % selectedActivities.length];
      actIndex++;
      const afternoonActivity = selectedActivities[actIndex % selectedActivities.length];
      actIndex++;

      items.push({
        id: `d${d}-item-1`,
        time: '08:00 AM',
        activity: `Traditional Breakfast & Specialty Tea/Coffee`,
        location: `Local Cafe near ${accommodation.location}`,
        estimatedCost: 250,
        category: 'food',
        reason: `Energizing start with regional specialties.`
      });

      if (morningActivity) {
        items.push({
          id: `d${d}-item-2`,
          time: '10:00 AM',
          activity: morningActivity.name,
          location: morningActivity.location,
          estimatedCost: morningActivity.estimatedCostPerPerson,
          category: morningActivity.category,
          reason: `Dedicated immersion into ${morningActivity.name} during peak morning illumination.`
        });
      }

      items.push({
        id: `d${d}-item-3`,
        time: '01:30 PM',
        activity: `Authentic Regional Lunch & Refreshing Coolers`,
        location: `Scenic Dining Spot`,
        estimatedCost: 450,
        category: 'food',
        reason: `Relish curated chef recommendations and mid-day rest.`
      });

      if (afternoonActivity) {
        items.push({
          id: `d${d}-item-4`,
          time: '04:00 PM',
          activity: afternoonActivity.name,
          location: afternoonActivity.location,
          estimatedCost: afternoonActivity.estimatedCostPerPerson,
          category: afternoonActivity.category,
          reason: `Vibrant afternoon session celebrating ${afternoonActivity.category}.`
        });
      }

      items.push({
        id: `d${d}-item-5`,
        time: '07:45 PM',
        activity: `Golden Hour Sunset Walk & Evening Atmosphere`,
        location: `${destination} Promenade / Hilltop Point`,
        estimatedCost: 150,
        category: 'relaxation',
        reason: `Unwind with stunning evening views and coastal or hill breezes.`
      });

      days.push({
        day: d,
        title: `Deep Exploration & Sensory Discoveries`,
        summary: `Full day maximizing curated attractions, local cuisine, and verified highlights.`,
        items
      });
    }
  }

  return days;
}
