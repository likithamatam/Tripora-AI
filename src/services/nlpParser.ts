import { TripRequirements, TravelStyle } from '../types';

export function parseTripQueryLocally(query: string): Partial<TripRequirements> {
  const result: Partial<TripRequirements> = {};
  const lower = query.toLowerCase();

  // 1. Duration (e.g., "4-day", "4 days", "3 nights", "5d")
  const dayMatch = lower.match(/(\d+)\s*[- ]*(?:day|days|d\b)/i);
  if (dayMatch) {
    result.durationDays = parseInt(dayMatch[1], 10);
  }

  // 2. Budget (e.g., "under ₹30,000", "under 30000", "30k", "budget 25,000", "rs 30000")
  const budgetKMatch = lower.match(/(?:under|budget|below|within|around)?\s*(?:₹|rs\.?|inr)?\s*(\d+)\s*k\b/i);
  if (budgetKMatch) {
    result.budget = parseInt(budgetKMatch[1], 10) * 1000;
  } else {
    const budgetMatch = lower.match(/(?:under|budget|below|within|around)?\s*(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{3})+|\d{4,7})/i);
    if (budgetMatch) {
      const cleanNum = budgetMatch[1].replace(/,/g, '');
      const parsed = parseInt(cleanNum, 10);
      if (parsed >= 1000) {
        result.budget = parsed;
      }
    }
  }

  // 3. Travelers (e.g. "for 2 people", "2 travelers", "solo", "couple", "family of 4", "3 friends")
  if (lower.includes('solo') || lower.includes('for myself')) {
    result.travelers = 1;
  } else if (lower.includes('couple') || lower.includes('2 of us') || lower.includes('two of us')) {
    result.travelers = 2;
  } else {
    const travelerMatch = lower.match(/(?:for\s+)?(\d+)\s*(?:people|persons?|travelers?|pax|friends|adults?)/i);
    if (travelerMatch) {
      result.travelers = parseInt(travelerMatch[1], 10);
    }
  }

  // 4. Starting Location ("from Hyderabad", "departing Delhi")
  const fromMatch = lower.match(/from\s+([a-zA-Z\s]+?)(?:\s+(?:to|for|under|with|in\b)|$|,|\.)/i);
  if (fromMatch) {
    const fromVal = fromMatch[1].trim();
    if (fromVal.length > 2 && !['a', 'the', 'my'].includes(fromVal)) {
      result.from = fromVal.charAt(0).toUpperCase() + fromVal.slice(1);
    }
  }

  // 5. Destination ("Goa trip", "to Manali", "visit Kerala", "in Jaipur")
  const destKeywords = ['goa', 'bangalore', 'delhi', 'mumbai', 'jaipur', 'kerala', 'manali', 'hyderabad', 'chennai', 'kolkata', 'udaipur', 'ooty', 'pondicherry', 'rishikesh', 'shimla', 'varanasi', 'coorg'];
  for (const city of destKeywords) {
    if (lower.includes(city)) {
      // If city was already tagged as 'from', avoid duplicate
      if (result.from && result.from.toLowerCase() === city) continue;
      result.destination = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }
  if (!result.destination) {
    const toMatch = lower.match(/(?:to|visit|explore|trip to)\s+([a-zA-Z]+)/i);
    if (toMatch) {
      result.destination = toMatch[1].charAt(0).toUpperCase() + toMatch[1].slice(1);
    }
  }

  // 6. Travel Style
  if (lower.includes('luxury') || lower.includes('5 star') || lower.includes('premium')) {
    result.travelStyle = 'Luxury';
  } else if (lower.includes('budget') || lower.includes('backpacker') || lower.includes('cheap')) {
    result.travelStyle = 'Budget';
  } else if (lower.includes('adventure') || lower.includes('trekking')) {
    result.travelStyle = 'Adventure';
  } else if (lower.includes('comfort')) {
    result.travelStyle = 'Comfort';
  } else {
    result.travelStyle = 'Balanced';
  }

  // 7. Interests
  const detectedInterests: string[] = [];
  if (lower.includes('beach') || lower.includes('coastal') || lower.includes('sea')) detectedInterests.push('Beaches');
  if (lower.includes('food') || lower.includes('cuisine') || lower.includes('dining') || lower.includes('eat')) detectedInterests.push('Food');
  if (lower.includes('sight') || lower.includes('monument') || lower.includes('landmark')) detectedInterests.push('Sightseeing');
  if (lower.includes('culture') || lower.includes('heritage') || lower.includes('history')) detectedInterests.push('Culture');
  if (lower.includes('adventure') || lower.includes('trek') || lower.includes('sports')) detectedInterests.push('Adventure');
  if (lower.includes('shop') || lower.includes('market') || lower.includes('bazaar')) detectedInterests.push('Shopping');
  if (lower.includes('relax') || lower.includes('chill') || lower.includes('peace') || lower.includes('spa')) detectedInterests.push('Relaxation');

  if (detectedInterests.length > 0) {
    result.interests = detectedInterests;
  }

  return result;
}

export async function parseTripQueryWithAI(query: string): Promise<Partial<TripRequirements>> {
  // First get local parsed defaults
  const localResult = parseTripQueryLocally(query);

  try {
    const response = await fetch('/api/parse-nlp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.parsed) {
        return {
          ...localResult,
          ...data.parsed
        };
      }
    }
  } catch {
    // If backend or Gemini offline, seamlessly use localResult without any error!
  }

  return localResult;
}
