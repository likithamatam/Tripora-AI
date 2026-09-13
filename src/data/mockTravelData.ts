import {
  TransportOption,
  AccommodationOption,
  ActivityOption,
  ResearchSource,
  TripRequirements
} from '../types';

interface DestinationSeed {
  destination: string;
  tagline: string;
  currency: string;
  defaultFrom: string;
  transports: {
    flight: { name: string; operator: string; duration: string; price: number; rating: number; pros: string[]; cons: string[] };
    train: { name: string; operator: string; duration: string; price: number; rating: number; pros: string[]; cons: string[] };
    bus: { name: string; operator: string; duration: string; price: number; rating: number; pros: string[]; cons: string[] };
  };
  stays: {
    hostel: { name: string; location: string; pricePerNight: number; rating: number; pros: string[]; cons: string[] };
    budget: { name: string; location: string; pricePerNight: number; rating: number; pros: string[]; cons: string[] };
    midRange: { name: string; location: string; pricePerNight: number; rating: number; pros: string[]; cons: string[] };
    resort: { name: string; location: string; pricePerNight: number; rating: number; pros: string[]; cons: string[] };
  };
  activities: {
    name: string;
    category: 'beaches' | 'sightseeing' | 'food' | 'adventure' | 'culture' | 'shopping' | 'relaxation';
    location: string;
    durationHours: number;
    cost: number;
    rating: number;
    pros: string[];
    cons: string[];
  }[];
  sources: { name: string; domain: string; summary: string }[];
}

export const DESTINATIONS_DATA: Record<string, DestinationSeed> = {
  goa: {
    destination: 'Goa',
    tagline: 'Sun-kissed coastline, Portuguese heritage & coastal seafood',
    currency: '₹',
    defaultFrom: 'Hyderabad',
    transports: {
      flight: {
        name: 'Indigo Direct 6E-432',
        operator: 'IndiGo Airlines',
        duration: '1h 25m',
        price: 4800,
        rating: 4.4,
        pros: ['Fastest transit time', 'Direct non-stop flight into MOPA (GOX)', 'Convenient morning departure'],
        cons: ['Higher ticket cost eating into overall stay budget', 'Strict 15kg baggage limits']
      },
      train: {
        name: 'Kacheguda - Vasco Da Gama Express (17603)',
        operator: 'Indian Railways (South Central)',
        duration: '14h 30m',
        price: 1350,
        rating: 4.1,
        pros: ['Excellent budget efficiency', 'Overnight journey saves 1 night accommodation', 'Scenic Western Ghats stretch through Castle Rock & Dudhsagar'],
        cons: ['Long travel duration', 'Occasional seasonal timetable delays']
      },
      bus: {
        name: 'Orange Travels Sleeper Multi-Axle',
        operator: 'Orange Travels AC Sleeper',
        duration: '15h 00m',
        price: 1650,
        rating: 4.0,
        pros: ['Point-to-point city pickup/drop in Panaji & Mapusa', 'Reclining sleeper berths with charging ports'],
        cons: ['Curvy ghat roads can cause motion sickness', 'Highway stops limited to designated dhabas']
      }
    },
    stays: {
      hostel: {
        name: 'Zostel Goa (Anjuna Coastal)',
        location: 'Anjuna Beach Road, North Goa',
        pricePerNight: 950,
        rating: 4.6,
        pros: ['Vibrant traveler community', 'Short walk to beach and cafes', 'High-speed Wi-Fi and social common room'],
        cons: ['Dorm shared bathrooms', 'Can be lively and social past midnight']
      },
      budget: {
        name: 'Seashell Palms Heritage Guest House',
        location: 'Calangute - Candolim Strip, North Goa',
        pricePerNight: 2100,
        rating: 4.3,
        pros: ['Private AC room with balcony', 'Clean attached bathroom', 'Quiet neighborhood within 800m of beach'],
        cons: ['Basic room amenities', 'No dedicated swimming pool or room service']
      },
      midRange: {
        name: 'Casa De Goa Boutique Resort & Spa',
        location: 'Candolim Main Road, North Goa',
        pricePerNight: 3900,
        rating: 4.7,
        pros: ['Portuguese architecture with 2 outdoor pools', 'Complimentary buffet breakfast included', 'Walk to beach shacks'],
        cons: ['Peak weekend rates can surge slightly', 'On-site restaurant is on the pricier side']
      },
      resort: {
        name: 'Taj Fort Aguada Resort & Spa',
        location: 'Sinquerim, Candolim, Goa',
        pricePerNight: 12500,
        rating: 4.9,
        pros: ['Historic clifftop luxury overlooking Arabian Sea', 'World-class dining and spa therapies', 'Direct private access'],
        cons: ['Premium price point for luxury tier', 'Demands luxury travel allocation']
      }
    },
    activities: [
      {
        name: 'Anjuna & Vagator Beach Shack Hopping',
        category: 'beaches',
        location: 'North Goa',
        durationHours: 3.5,
        cost: 600,
        rating: 4.7,
        pros: ['Iconic sunset views from clifftops', 'Fresh coconut water & authentic coastal snacks'],
        cons: ['Crowded on weekend evenings']
      },
      {
        name: 'Old Goa UNESCO Heritage & Basilica of Bom Jesus',
        category: 'sightseeing',
        location: 'Old Goa (Velha Goa)',
        durationHours: 3.0,
        cost: 150,
        rating: 4.8,
        pros: ['16th-century Manueline architecture', 'Deep historical context', 'Very budget-friendly entry'],
        cons: ['Modest dress code strictly enforced']
      },
      {
        name: 'Authentic Goan Thali Lunch Experience (Kokni Kanteen)',
        category: 'food',
        location: 'Panaji',
        durationHours: 2.0,
        cost: 550,
        rating: 4.8,
        pros: ['Kingfish rawa fry, sol kadhi & crab xacuti', 'Authentic regional spices & family recipes'],
        cons: ['Popular venue with 15-20 min peak lunch wait']
      },
      {
        name: 'Dudhsagar Waterfalls & Jeep Safari Venture',
        category: 'adventure',
        location: 'Bhagwan Mahavir Sanctuary',
        durationHours: 5.5,
        cost: 1800,
        rating: 4.6,
        pros: ['Thrilling forest jeep trek', 'Magnificent multi-tiered 310m milky falls'],
        cons: ['Early 6:30 AM start required', 'Demanding rocky terrain']
      },
      {
        name: 'Fontainhas Latin Quarter Walking & Photography Tour',
        category: 'culture',
        location: 'Panaji Heritage Zone',
        durationHours: 2.5,
        cost: 300,
        rating: 4.7,
        pros: ['Pastel colonial cottages and tiled azulejos', 'Cozy bakeries serving warm bebinca & pasteis de nata'],
        cons: ['Residential lanes require respectful photography']
      },
      {
        name: 'Saturday Night Market & Flea Craft Exploration',
        category: 'shopping',
        location: 'Arpora',
        durationHours: 3.0,
        cost: 400,
        rating: 4.5,
        pros: ['Handmade artisan jewelry, spices, and live acoustic music', 'Great nightlife vibe'],
        cons: ['Requires sharp bargaining skill', 'High crowds in peak season']
      }
    ],
    sources: [
      { name: 'Directorate of Tourism Goa Travel Bulletin 2026', domain: 'goatourism.gov.in', summary: 'Official benchmark state rates, seasonal ferry schedules & heritage site entry guidelines.' },
      { name: 'Indian Railways (South Central Railway) Timetable Matrix', domain: 'indianrail.gov.in', summary: 'Live transit duration and Sleeper/3AC fare benchmarks from HYB to MAO/VSG.' },
      { name: 'North & South Goa Hospitality Association Rates', domain: 'goahotels.org', summary: 'Verified median tariff brackets across hostels, boutique guest houses, and resorts.' }
    ]
  },

  jaipur: {
    destination: 'Jaipur',
    tagline: 'The Pink City of palatial forts, royal havelis & block prints',
    currency: '₹',
    defaultFrom: 'Delhi',
    transports: {
      flight: {
        name: 'Air India Express IX-114',
        operator: 'Air India Express',
        duration: '1h 05m',
        price: 3400,
        rating: 4.3,
        pros: ['Short flight time', 'Direct to Jaipur Sanganer Airport'],
        cons: ['Airport check-in time overhead']
      },
      train: {
        name: 'Vande Bharat Express (20978)',
        operator: 'Indian Railways',
        duration: '3h 45m',
        price: 1150,
        rating: 4.7,
        pros: ['Executive comfort with complimentary meals', 'Fast high-speed rail corridor into Jaipur Junction'],
        cons: ['Morning departure slot fills up quickly']
      },
      bus: {
        name: 'RSRTC Goldline Volvo AC',
        operator: 'Rajasthan State Road Transport',
        duration: '5h 15m',
        price: 750,
        rating: 4.1,
        pros: ['Direct highway connectivity on NH48', 'Frequent departures from ISBT Kashmere Gate / Dhaula Kuan'],
        cons: ['Subject to highway toll lane congestion']
      }
    },
    stays: {
      hostel: {
        name: 'Moustache Hostel Jaipur',
        location: 'Near MI Road',
        pricePerNight: 850,
        rating: 4.5,
        pros: ['Rooftop cafe with fort views', 'Cultural heritage workshops'],
        cons: ['Bunk bed configurations in high demand']
      },
      budget: {
        name: 'Heritage Haveli Guest Stay',
        location: 'Bani Park',
        pricePerNight: 1900,
        rating: 4.4,
        pros: ['Traditional Rajasthani decor with courtyard', 'Walking distance to Metro'],
        cons: ['No elevator in heritage building']
      },
      midRange: {
        name: 'Shahpura House Heritage Hotel',
        location: 'Devi Marg, Bani Park',
        pricePerNight: 4200,
        rating: 4.7,
        pros: ['Frescoes, pool, traditional puppet performances', 'Breakfast spread with local sweets'],
        cons: ['Older plumbing fixtures due to heritage conservation']
      },
      resort: {
        name: 'Rambagh Palace Heritage',
        location: 'Bhawani Singh Road',
        pricePerNight: 16000,
        rating: 4.9,
        pros: ['Living former royal residence of Maharaja', 'Peacock gardens and royal butler service'],
        cons: ['Ultra-luxury bracket']
      }
    },
    activities: [
      {
        name: 'Amber Fort & Sheesh Mahal Guided Exploration',
        category: 'sightseeing',
        location: 'Amer',
        durationHours: 3.5,
        cost: 450,
        rating: 4.8,
        pros: ['Spectacular mirror mosaic palace and panoramic hill fort ramparts'],
        cons: ['Uphill walk or shuttle queue']
      },
      {
        name: 'Hawa Mahal & City Palace Royal Quarters',
        category: 'culture',
        location: 'Old Walled City',
        durationHours: 3.0,
        cost: 500,
        rating: 4.7,
        pros: ['953 honeycomb jharokhas and royal armory museum'],
        cons: ['Crowded midday photo spots']
      },
      {
        name: 'Chokhi Dhani Ethnic Cultural Village Dinner',
        category: 'food',
        location: 'Tonk Road',
        durationHours: 4.0,
        cost: 1100,
        rating: 4.6,
        pros: ['All-you-can-eat authentic Dal Baati Churma with folk Kalbelia dances'],
        cons: ['Located 20km outside central city core']
      },
      {
        name: 'Johari & Bapu Bazaar Craft & Blue Pottery Shopping',
        category: 'shopping',
        location: 'Pink City Bazaars',
        durationHours: 2.5,
        cost: 300,
        rating: 4.5,
        pros: ['Handcrafted juttis, bandhani textiles and blue ceramics direct from artisans'],
        cons: ['Busy pedestrian alleys']
      },
      {
        name: 'Nahargarh Fort Sunset Viewpoint over Jaipur',
        category: 'adventure',
        location: 'Aravalli Hills',
        durationHours: 2.5,
        cost: 200,
        rating: 4.8,
        pros: ['Unmatched panoramic golden hour view of the entire illuminated city'],
        cons: ['Winding hill drive after dusk']
      }
    ],
    sources: [
      { name: 'Rajasthan Tourism Development Corporation (RTDC)', domain: 'tourism.rajasthan.gov.in', summary: 'Composite tourist tickets, monument open hours and seasonal festivals.' },
      { name: 'Northern Railway Vande Bharat Schedule', domain: 'indianrail.gov.in', summary: 'Delhi-Jaipur corridor pricing, stops, and seating classes.' },
      { name: 'Jaipur Crafts Council Artisan Index', domain: 'jaipurheritage.org', summary: 'Fair price guide for blue pottery, block printing, and local markets.' }
    ]
  },

  kerala: {
    destination: 'Kerala',
    tagline: 'God’s Own Country: tranquil backwaters, tea hills & spice aromas',
    currency: '₹',
    defaultFrom: 'Bangalore',
    transports: {
      flight: {
        name: 'Air India Direct AI-512 to Kochi',
        operator: 'Air India',
        duration: '1h 15m',
        price: 3900,
        rating: 4.5,
        pros: ['Quick flight into Cochin International (COK) — 100% solar powered airport'],
        cons: ['Airport is 35km from Fort Kochi center']
      },
      train: {
        name: 'KSR Bengaluru - Ernakulam Intercity Express (12677)',
        operator: 'Southern Railway',
        duration: '10h 40m',
        price: 980,
        rating: 4.4,
        pros: ['Daytime scenic travel through Palakkad Gap', 'Very economical fare'],
        cons: ['Requires booking AC Chair Car well in advance']
      },
      bus: {
        name: 'KSRTC Swift Multi-Axle Scania',
        operator: 'Kerala State RTC',
        duration: '11h 30m',
        price: 1250,
        rating: 4.2,
        pros: ['Smooth ride with air-suspension', 'Direct drops in Aluva & Kochi'],
        cons: ['Overnight highway route']
      }
    },
    stays: {
      hostel: {
        name: 'Zostel Kochi (Fort Kochi)',
        location: 'Fort Kochi Heritage Area',
        pricePerNight: 800,
        rating: 4.6,
        pros: ['Artistic bohemian courtyard', 'Walking distance to Chinese fishing nets'],
        cons: ['Shared dorms with compact locker spaces']
      },
      budget: {
        name: 'Greenwoods Homestay Alleppey',
        location: 'Punnamada, Alappuzha',
        pricePerNight: 1800,
        rating: 4.5,
        pros: ['Warm host family offering home-cooked appam and stew', 'Backwater canal view'],
        cons: ['Basic amenities without hotel room service']
      },
      midRange: {
        name: 'Fragrant Nature Ayurvedic Resort Fort Kochi',
        location: 'Bazaar Road, Mattancherry',
        pricePerNight: 4100,
        rating: 4.7,
        pros: ['Harbor view pool, authentic panchakarma spa', 'Walking distance to Jew Town'],
        cons: ['Limited parking on historic street']
      },
      resort: {
        name: 'Kumarakom Lake Resort & Heritage Villa',
        location: 'Vembanad Lake, Kumarakom',
        pricePerNight: 14500,
        rating: 4.9,
        pros: ['Meandering pool villas, traditional Tharavadu architecture', 'Private sunset cruise included'],
        cons: ['High-end luxury budget']
      }
    },
    activities: [
      {
        name: 'Alleppey Traditional Shikhara Canal Backwater Cruise',
        category: 'relaxation',
        location: 'Alappuzha',
        durationHours: 3.5,
        cost: 850,
        rating: 4.9,
        pros: ['Quiet electric or paddle boats navigating narrow village canals, paddy fields, and coir makers'],
        cons: ['Sun exposure in midday; early morning or late afternoon recommended']
      },
      {
        name: 'Fort Kochi Heritage & Chinese Fishing Nets Walk',
        category: 'culture',
        location: 'Fort Kochi',
        durationHours: 2.5,
        cost: 150,
        rating: 4.7,
        pros: ['Colonial churches, spice warehouses, street art and cantilevered fishing nets'],
        cons: ['Fishermen may request small tip to demonstrate lifting nets']
      },
      {
        name: 'Traditional Kathakali & Kalaripayattu Martial Arts Show',
        category: 'culture',
        location: 'Kerala Kathakali Centre, Kochi',
        durationHours: 2.0,
        cost: 450,
        rating: 4.8,
        pros: ['Watch live makeup application followed by expressive dramatic mudras and weapon combat'],
        cons: ['Arrive 30 mins early for best front-row seats']
      },
      {
        name: 'Kerala Sadya Feast on Banana Leaf (Paragon / Grand)',
        category: 'food',
        location: 'Ernakulam',
        durationHours: 1.5,
        cost: 400,
        rating: 4.8,
        pros: ['24+ distinct regional dishes including avial, payasam, sambar and crispy banana chips'],
        cons: ['Filling traditional heavy lunch']
      },
      {
        name: 'Munnar Tea Estate Walk & Cardamom Plantation Trek',
        category: 'adventure',
        location: 'Idukki Hills',
        durationHours: 4.0,
        cost: 700,
        rating: 4.7,
        pros: ['Crisp mountain air, misty emerald slopes, fresh estate-plucked orthodox tea tasting'],
        cons: ['Requires local cab transfer from plains']
      }
    ],
    sources: [
      { name: 'Kerala Tourism Department Official Guidelines', domain: 'keralatourism.org', summary: 'Government certified houseboat rates, eco-tourism regulations and canal fees.' },
      { name: 'Southern Railway Transit Index', domain: 'sr.indianrailways.gov.in', summary: 'Intercity and express train fare matrices across Bangalore-Kerala routes.' },
      { name: 'Ayurveda & Responsible Tourism Mission Kerala', domain: 'keralatourism.org/rt', summary: 'Responsible travel homestay pricing and cultural artisan cooperatives.' }
    ]
  },

  manali: {
    destination: 'Manali',
    tagline: 'Himalayan pine valleys, glacial passes & cedar sanctuaries',
    currency: '₹',
    defaultFrom: 'Delhi',
    transports: {
      flight: {
        name: 'Alliance Air (Delhi to Bhuntar Kullu Airport)',
        operator: 'Alliance Air',
        duration: '1h 20m',
        price: 5800,
        rating: 4.1,
        pros: ['Breathtaking aerial views of snow-clad Himalayan peaks', 'Bypasses the 12-hour mountain road journey'],
        cons: ['Bhuntar is 50km from Manali town', 'Flights weather-dependent']
      },
      train: {
        name: 'Shatabdi to Chandigarh + Cab / HPTDC Luxury Bus',
        operator: 'Northern Railways & HPTDC',
        duration: '9h 30m',
        price: 1900,
        rating: 4.4,
        pros: ['Combines fast comfortable train to Chandigarh with scenic mountain highway stretch', 'Well balanced pace'],
        cons: ['Requires modal interchange in Chandigarh']
      },
      bus: {
        name: 'HPTDC Luxury Volvo Semi-Sleeper AC',
        operator: 'Himachal Pradesh Tourism (HPTDC)',
        duration: '13h 00m',
        price: 1450,
        rating: 4.3,
        pros: ['Direct overnight journey from Kashmere Gate Delhi to Mall Road Manali', 'Official reliable drivers experienced on mountain roads'],
        cons: ['Long mountain drive with multiple hairpin curves']
      }
    },
    stays: {
      hostel: {
        name: 'The Hosteller Manali (Old Manali)',
        location: 'Club House Road, Old Manali',
        pricePerNight: 900,
        rating: 4.6,
        pros: ['Charming wooden attic architecture', 'River view cafe, bonfire nights with fellow trekkers'],
        cons: ['Narrow uphill approach lane for large vehicles']
      },
      budget: {
        name: 'Apple Orchard Cottage Stay',
        location: 'Vashisht Village',
        pricePerNight: 1950,
        rating: 4.4,
        pros: ['Surrounded by apple trees and snow views', 'Proximity to natural hot water sulphur springs'],
        cons: ['Steep village steps walking from main road']
      },
      midRange: {
        name: 'Johnson Lodge & Spa',
        location: 'Circuit House Road, Manali',
        pricePerNight: 4300,
        rating: 4.8,
        pros: ['Legendary wood-fired pizza garden cafe', 'Heated rooms with deodar pine woodwork'],
        cons: ['Popular venue attracts evening restaurant crowds']
      },
      resort: {
        name: 'The Himalayan Luxury Castle & Resort',
        location: 'Hadimba Road',
        pricePerNight: 13500,
        rating: 4.9,
        pros: ['Victorian gothic stone castle design, thermal heated pool, antique fireplaces'],
        cons: ['High-end luxury budget category']
      }
    },
    activities: [
      {
        name: 'Solang Valley Adventure & Cable Car Ropeway',
        category: 'adventure',
        location: 'Solang',
        durationHours: 4.5,
        cost: 1200,
        rating: 4.7,
        pros: ['Paragliding, zorbing, and ropeway ride with 360-degree snow peak vistas'],
        cons: ['High queues during peak vacation months']
      },
      {
        name: 'Old Manali Cafe Hopping & Live Acoustic Folk',
        category: 'food',
        location: 'Old Manali',
        durationHours: 3.0,
        cost: 650,
        rating: 4.8,
        pros: ['Trout fish delicacies, Himalayan siddu with ghee, Israeli shakshuka and cozy wooden woodstoves'],
        cons: ['Cobblestone lanes can get muddy in light showers']
      },
      {
        name: 'Hadimba Wooden Temple & Sacred Cedar Forest Sanctuary',
        category: 'culture',
        location: 'Dhungri Van Vihar',
        durationHours: 2.0,
        cost: 100,
        rating: 4.7,
        pros: ['1553 AD pagoda-style wooden temple nestled amidst towering 500-year-old deodar trees'],
        cons: ['Photography restricted inside inner sanctum']
      },
      {
        name: 'Atal Tunnel (Rohtang Gateway) & Sissu Waterfall Daytrip',
        category: 'sightseeing',
        location: 'Lahaul Valley',
        durationHours: 5.0,
        cost: 1500,
        rating: 4.9,
        pros: ['Transit through world’s longest highway tunnel above 10,000 ft into barren Trans-Himalayan Lahaul landscape'],
        cons: ['Cold mountain winds require warm winter windbreakers']
      },
      {
        name: 'Vashisht Natural Hot Springs & Jogini Waterfall Trek',
        category: 'relaxation',
        location: 'Vashisht',
        durationHours: 3.5,
        cost: 250,
        rating: 4.8,
        pros: ['Mineral-rich rejuvenating hot springs followed by a picturesque pine forest hike to multi-cascade falls'],
        cons: ['Moderate physical walking fitness required']
      }
    ],
    sources: [
      { name: 'Himachal Pradesh Tourism Development Corporation (HPTDC)', domain: 'hptdc.in', summary: 'Official mountain highway coach schedules, permit guidelines & hotel rates.' },
      { name: 'Border Roads Organisation (BRO) Atal Tunnel Traffic Advisory', domain: 'bro.gov.in', summary: 'Weather advisories, tunnel clearance timings and mountain pass status.' },
      { name: 'Kullu Manali Travel Operators Association Benchmarks', domain: 'kullumanali.org', summary: 'Regulated seasonal rates for adventure sports, ropeways and local 4x4 cabs.' }
    ]
  },

  bangalore: {
    destination: 'Bangalore',
    tagline: 'Silicon capital, craft microbreweries, leafy gardens & tech culture',
    currency: '₹',
    defaultFrom: 'Hyderabad',
    transports: {
      flight: {
        name: 'Air India Direct AI-582',
        operator: 'Air India',
        duration: '1h 10m',
        price: 3600,
        rating: 4.5,
        pros: ['Fast inter-city flight', 'Multiple daily frequencies'],
        cons: ['Kempegowda Airport is 35km from central city (KIAL airport bus takes ~1h 15m)']
      },
      train: {
        name: 'Vande Bharat Express (20703)',
        operator: 'South Central Railways',
        duration: '8h 30m',
        price: 1540,
        rating: 4.6,
        pros: ['Punctual high-speed corridor with meals included', 'Arrives centrally at KSR Bengaluru City Station'],
        cons: ['Requires reservations 2-3 weeks in advance']
      },
      bus: {
        name: 'KSRTC Airavat Club Class Multi-Axle',
        operator: 'Karnataka State Road Transport (KSRTC)',
        duration: '9h 00m',
        price: 1300,
        rating: 4.3,
        pros: ['Comfortable leather reclining seats', 'Overnight schedule saves daytime hours'],
        cons: ['Hebbal junction entry traffic during morning peak']
      }
    },
    stays: {
      hostel: {
        name: 'Habitate Hostel Indiranagar',
        location: 'Indiranagar 100ft Road',
        pricePerNight: 950,
        rating: 4.6,
        pros: ['Heart of Bangalore dining & tech hub', 'Co-working setup with ultra-fast fiber internet'],
        cons: ['Busy neighborhood with energetic weekend street life']
      },
      budget: {
        name: 'Bloomrooms @ City Centre',
        location: 'Near MG Road / Richmond Town',
        pricePerNight: 2400,
        rating: 4.5,
        pros: ['Crisp modern design, cloud beds, walk to Metro station', 'Very dependable hygiene'],
        cons: ['Compact urban room sizing']
      },
      midRange: {
        name: 'The Paul Bangalore All-Suite Hotel',
        location: 'Domlur / Indiranagar',
        pricePerNight: 4600,
        rating: 4.7,
        pros: ['Spacious two-room suites with private balcony', 'Award-winning Irish brewpub and Kerala dining on-site'],
        cons: ['Domlur flyover traffic during rush hour']
      },
      resort: {
        name: 'The Leela Palace Bengaluru',
        location: 'Old Airport Road',
        pricePerNight: 15000,
        rating: 4.9,
        pros: ['Opulent Vijayanagara royal palace architectural majesty', 'Six acres of manicured gardens and Michelin-tier dining'],
        cons: ['Luxury price bracket']
      }
    },
    activities: [
      {
        name: 'Cubbon Park Botanical Stroll & State Central Library',
        category: 'relaxation',
        location: 'Central Bengaluru',
        durationHours: 2.5,
        cost: 50,
        rating: 4.8,
        pros: ['300 acres of bamboo groves, historical red neoclassical architecture, completely vehicle-free on mornings'],
        cons: ['Early morning visiting hours recommended for tranquility']
      },
      {
        name: 'Iconic South Indian Tiffin Trail (Vidyarthi Bhavan & CTR)',
        category: 'food',
        location: 'Malleswaram & Gandhi Bazaar',
        durationHours: 2.0,
        cost: 250,
        rating: 4.9,
        pros: ['Crispy ghee roast masala dosa, filter kaapi, steamed button idlis and chow chow bath'],
        cons: ['Crowded heritage stalls with standing queues']
      },
      {
        name: 'Bangalore Craft Microbrewery Experience (Toit / Arbor)',
        category: 'food',
        location: 'Indiranagar / Brigade Road',
        durationHours: 3.0,
        cost: 950,
        rating: 4.7,
        pros: ['Fresh artisanal IPAs, stouts, sourdough pizzas and energetic cosmopolite crowd'],
        cons: ['Table reservations essential for dinner']
      },
      {
        name: 'Lalbagh Botanical Garden & 1889 Glass House',
        category: 'sightseeing',
        location: 'South Bengaluru',
        durationHours: 3.0,
        cost: 100,
        rating: 4.7,
        pros: ['Historic Mughal-influenced gardens commissioned by Hyder Ali, 3 billion year old Peninsular Gneiss rock'],
        cons: ['Extensive walking area across 240 acres']
      },
      {
        name: 'Church Street Bookstores & Arts Trail (Blossom & Higginbothams)',
        category: 'culture',
        location: 'Church Street',
        durationHours: 2.5,
        cost: 300,
        rating: 4.8,
        pros: ['Iconic multi-story second-hand book troves, indie coffee shops and street buskers'],
        cons: ['Parking scarce; best reached via MG Road Metro']
      }
    ],
    sources: [
      { name: 'Karnataka Tourism Board Information Bureau', domain: 'karnatakatourism.org', summary: 'Heritage city maps, metro passes & public garden guidelines.' },
      { name: 'South Western Railway Intercity Portal', domain: 'swr.indianrailways.gov.in', summary: 'Timetables, coach configurations and live seat availability.' },
      { name: 'Bengaluru Urban Transit BMTC / Namma Metro Guidelines', domain: 'mybmtc.karnataka.gov.in', summary: 'Vayu Vajra airport bus schedules and Smart Card fares.' }
    ]
  },

  delhi: {
    destination: 'Delhi',
    tagline: 'Imperial dynasties, Mughal monuments, chaat lanes & political heart',
    currency: '₹',
    defaultFrom: 'Mumbai',
    transports: {
      flight: {
        name: 'Vistara / Air India UK-992',
        operator: 'Vistara',
        duration: '2h 10m',
        price: 4200,
        rating: 4.6,
        pros: ['Full service flight with meal', 'Arrives at world-class Terminal 3 (IGI) with direct Airport Express Metro'],
        cons: ['Airfares vary depending on booking window']
      },
      train: {
        name: 'Mumbai Rajdhani Express (12951)',
        operator: 'Western Railway',
        duration: '15h 30m',
        price: 2400,
        rating: 4.7,
        pros: ['Legendary premier train service', 'All hot meals served at seat, overnight travel efficiency'],
        cons: ['Requires early reservation']
      },
      bus: {
        name: 'Interstate AC Sleeper Coach',
        operator: 'Private Multi-Axle Operator',
        duration: '24h 00m',
        price: 1800,
        rating: 3.6,
        pros: ['Last-minute backup option'],
        cons: ['Extremely long highway drive not recommended over train/flight']
      }
    },
    stays: {
      hostel: {
        name: 'Madpackers Delhi',
        location: 'Hauz Khas Village Enclave',
        pricePerNight: 900,
        rating: 4.7,
        pros: ['Rooftop overlooking green deer park', 'Community walking tours and chai circles'],
        cons: ['Hauz Khas lanes busy on Saturday nights']
      },
      budget: {
        name: 'Bloom Boutique @ Connaught Place',
        location: 'Central Delhi',
        pricePerNight: 2600,
        rating: 4.5,
        pros: ['Clean minimalist aesthetic', 'Steps away from Rajiv Chowk Metro central hub'],
        cons: ['Standard room size without lavish lounge']
      },
      midRange: {
        name: 'The Claridges New Delhi',
        location: 'Aurangzeb Road / Motilal Nehru Marg',
        pricePerNight: 5800,
        rating: 4.8,
        pros: ['Historic Lutyens-era colonial garden hotel', 'Home to legendary Dhaba and Sevillana dining'],
        cons: ['Higher tier pricing for mid-range']
      },
      resort: {
        name: 'The Imperial New Delhi',
        location: 'Janpath, Connaught Place',
        pricePerNight: 16500,
        rating: 4.9,
        pros: ['Museum-grade British colonial art collection, royal palm drive, award-winning spa'],
        cons: ['Luxury tariff']
      }
    },
    activities: [
      {
        name: 'Qutub Minar & Mehrauli Archaeological Park',
        category: 'sightseeing',
        location: 'South Delhi',
        durationHours: 3.0,
        cost: 250,
        rating: 4.8,
        pros: ['73m 12th-century fluted minaret, iron pillar that does not rust, magnificent Calligraphy'],
        cons: ['Large complex with open sunshine']
      },
      {
        name: 'Old Delhi Chandni Chowk Food Trail & Rickshaw Ride',
        category: 'food',
        location: 'Old Delhi',
        durationHours: 3.5,
        cost: 600,
        rating: 4.9,
        pros: ['Paranthe Wali Gali, Natraj Dahi Bhalla, Karim’s seekh kebabs and Jalebi Wala'],
        cons: ['Crowded bustling alleys; e-rickshaw or walking required']
      },
      {
        name: 'Humayun’s Tomb & Sunder Nursery World Heritage Gardens',
        category: 'culture',
        location: 'Nizamuddin East',
        durationHours: 3.0,
        cost: 200,
        rating: 4.8,
        pros: ['Precursor red sandstone garden tomb to Taj Mahal, 90-acre heritage ecological park'],
        cons: ['Modest walking shoes required']
      },
      {
        name: 'India Gate & Kartavya Path Evening Stroll',
        category: 'sightseeing',
        location: 'Central Vista',
        durationHours: 2.0,
        cost: 50,
        rating: 4.6,
        pros: ['Illuminated war memorial arch, fountains, cool evening breeze and street ice cream'],
        cons: ['High security zones with designated crossing zones']
      },
      {
        name: 'Dilli Haat Crafts & Regional Cuisines Bazaar',
        category: 'shopping',
        location: 'INA, South Delhi',
        durationHours: 2.5,
        cost: 350,
        rating: 4.7,
        pros: ['Rotational stalls of certified state artisans from across all 28 states, momos and pakhala bhata'],
        cons: ['Small nominal entry ticket fee']
      }
    ],
    sources: [
      { name: 'Delhi Tourism and Transportation Development Corporation (DTTDC)', domain: 'delhitourism.gov.in', summary: 'Heritage walks, Hop-on-Hop-off bus circuits & ticket bookings.' },
      { name: 'Delhi Metro Rail Corporation (DMRC) Airport Line Portal', domain: 'delhimetrorail.com', summary: 'Express transit timings from T3 into Central Delhi in 19 mins.' },
      { name: 'Archaeological Survey of India (ASI) Monument Matrix', domain: 'asi.nic.in', summary: 'Standard entry tickets, museum timings & audio guide rates.' }
    ]
  },

  mumbai: {
    destination: 'Mumbai',
    tagline: 'City of Dreams, Victorian Gothic architecture, Arabian Sea & Bollywood',
    currency: '₹',
    defaultFrom: 'Goa',
    transports: {
      flight: {
        name: 'IndiGo 6E-284',
        operator: 'IndiGo',
        duration: '1h 15m',
        price: 3800,
        rating: 4.4,
        pros: ['Direct flight arriving at Chhatrapati Shivaji Maharaj International (BOM) Terminal 2'],
        cons: ['Western Express Highway airport traffic during rush hours']
      },
      train: {
        name: 'Tejas Express / Vande Bharat (22230)',
        operator: 'Central Railway',
        duration: '8h 20m',
        price: 1650,
        rating: 4.7,
        pros: ['Scenic Konkan Railway tunnel route across waterfalls, rivers, and Western Ghats', 'Meals served on-board'],
        cons: ['Early departure timetable']
      },
      bus: {
        name: 'VRL Multi-Axle Volvo I-Shift AC',
        operator: 'VRL Travels',
        duration: '12h 30m',
        price: 1350,
        rating: 4.2,
        pros: ['Overnight sleeper coach with direct drop at Dadar / Borivali'],
        cons: ['Mountain ghat road during rainy periods']
      }
    },
    stays: {
      hostel: {
        name: 'Bunkers Adda / Backpacker Panda Colaba',
        location: 'Colaba Causeway',
        pricePerNight: 1050,
        rating: 4.5,
        pros: ['Walking distance to Gateway of India and art galleries', 'Rooftop social hangout'],
        cons: ['Compact heritage room quarters']
      },
      budget: {
        name: 'Residency Hotel Fort',
        location: 'Fort Heritage Precinct',
        pricePerNight: 2800,
        rating: 4.4,
        pros: ['Central South Mumbai location, walk to CST Terminus and marine drive', 'Clean private rooms'],
        cons: ['Historic street without dedicated private vehicle parking']
      },
      midRange: {
        name: 'Fariyas Hotel Colaba',
        location: 'Colaba, South Mumbai',
        pricePerNight: 5200,
        rating: 4.6,
        pros: ['Swimming pool, harbor proximity, classic Mumbai hospitality', 'Buffet breakfast included'],
        cons: ['Older elevator systems in south district']
      },
      resort: {
        name: 'The Taj Mahal Palace & Tower',
        location: 'Apollo Bunder, Colaba',
        pricePerNight: 18000,
        rating: 4.9,
        pros: ['Legendary 1903 harbor landmark facing Gateway of India, sea view suites, Butler service'],
        cons: ['Exclusive luxury bracket']
      }
    },
    activities: [
      {
        name: 'Gateway of India & Colaba Art Heritage Walk',
        category: 'sightseeing',
        location: 'Apollo Bunder, Colaba',
        durationHours: 2.5,
        cost: 100,
        rating: 4.8,
        pros: ['1924 basalt ceremonial arch, Kala Ghoda art district, Jehangir Art Gallery'],
        cons: ['Weekend crowds along promenade']
      },
      {
        name: 'Marine Drive & Girgaon Chowpatty Sunset Stroll',
        category: 'relaxation',
        location: 'Queen’s Necklace',
        durationHours: 2.5,
        cost: 200,
        rating: 4.9,
        pros: ['3.6km C-shaped boulevard along Arabian Sea, refreshing breeze, spicy bhel puri and kulfi'],
        cons: ['Crowded evening promenades']
      },
      {
        name: 'South Mumbai Heritage Irani Cafe Trail (Britannia & Kyani)',
        category: 'food',
        location: 'Ballard Estate & Marine Lines',
        durationHours: 2.0,
        cost: 450,
        rating: 4.8,
        pros: ['Bun maska, Iranian chai, chicken berry pulao, caramel custard in antique bentwood decor'],
        cons: ['Cash/UPI only at select heritage counters']
      },
      {
        name: 'Elephanta Caves UNESCO Rock-Cut Ferry Excursion',
        category: 'culture',
        location: 'Elephanta Island (Gharapuri)',
        durationHours: 4.5,
        cost: 550,
        rating: 4.7,
        pros: ['Scenic 50-minute harbor ferry ride to 6th-century rock-cut Shiva Trimurti sculpture'],
        cons: ['Uphill stone steps from island jetty']
      },
      {
        name: 'Bandra Bandstand, Carter Road & Bollywood Landmarks',
        category: 'sightseeing',
        location: 'Bandra West',
        durationHours: 2.5,
        cost: 300,
        rating: 4.6,
        pros: ['Sea-facing promenade, Portuguese Castella de Aguada fort, celebrity residences and hip cafes'],
        cons: ['Traffic movement in Bandra during evening peak']
      }
    ],
    sources: [
      { name: 'Maharashtra Tourism Development Corporation (MTDC)', domain: 'maharashtratourism.gov.in', summary: 'Elephanta ferry schedules, city tours & verified guest house standards.' },
      { name: 'Central Railway Konkan & Suburban Transit', domain: 'cr.indianrailways.gov.in', summary: 'Vande Bharat and Tejas Express fares, halts & reservation quotas.' },
      { name: 'Mumbai Heritage Conservation Society Guidelines', domain: 'mumbaiheritage.org', summary: 'Victorian Gothic and Art Deco walking circuits in Fort & Marine Drive.' }
    ]
  }
};

// Generic dynamic fallback generator for ANY destination entered by the user
export function generateDynamicDestinationSeed(destinationName: string, fromCity: string = 'Hyderabad'): DestinationSeed {
  const norm = destinationName.toLowerCase().trim();
  if (DESTINATIONS_DATA[norm]) {
    return DESTINATIONS_DATA[norm];
  }

  // Generate a realistic structured demo dataset tailored to whatever destination the user typed
  const cap = destinationName.charAt(0).toUpperCase() + destinationName.slice(1);
  return {
    destination: cap,
    tagline: `Curated exploration of ${cap} with local highlights, transport & stays`,
    currency: '₹',
    defaultFrom: fromCity || 'Hyderabad',
    transports: {
      flight: {
        name: `Domestic Direct / Connector to ${cap}`,
        operator: 'IndiGo / Air India',
        duration: '2h 15m',
        price: 4200,
        rating: 4.4,
        pros: [`Fastest route to ${cap}`, 'Saves valuable travel time', 'Standard baggage included'],
        cons: ['Consumes a larger portion of total budget', 'Airport transfers needed']
      },
      train: {
        name: `Express Superfast to ${cap}`,
        operator: 'Indian Railways (IRCTC)',
        duration: '11h 45m',
        price: 1100,
        rating: 4.2,
        pros: ['High cost efficiency', 'Overnight transit saves 1 night hotel accommodation', 'Comfortable reserved berths'],
        cons: ['Longer transit duration', 'Advance seat confirmation recommended']
      },
      bus: {
        name: `Intercity Multi-Axle AC Sleeper to ${cap}`,
        operator: 'State Express / National Bus Line',
        duration: '13h 30m',
        price: 1350,
        rating: 4.0,
        pros: ['Direct city-center drop point', 'Frequent evening departures'],
        cons: ['Highway driving conditions vary with weather']
      }
    },
    stays: {
      hostel: {
        name: `${cap} Backpacker Pods & Social Stays`,
        location: `Central ${cap}`,
        pricePerNight: 850,
        rating: 4.5,
        pros: ['Extremely budget-friendly', 'Meet fellow travelers and local guides'],
        cons: ['Shared facilities and dormitory setups']
      },
      budget: {
        name: `The ${cap} Comfort Inn & Suites`,
        location: `Transit Ring, ${cap}`,
        pricePerNight: 1950,
        rating: 4.3,
        pros: ['Private ensuite bathroom with AC', 'Good value for couples and small groups'],
        cons: ['Modest breakfast and basic amenities']
      },
      midRange: {
        name: `Grand ${cap} Heritage & Garden Hotel`,
        location: `Downtown ${cap}`,
        pricePerNight: 3800,
        rating: 4.6,
        pros: ['Comfortable spacious rooms, on-site restaurant, complimentary breakfast', 'Prime location'],
        cons: ['Weekend rates may experience mild surge']
      },
      resort: {
        name: `${cap} Royal Palace Resort & Spa`,
        location: `Scenic Viewpoint, ${cap}`,
        pricePerNight: 11500,
        rating: 4.8,
        pros: ['Full luxury service, infinity pool, wellness treatments'],
        cons: ['Designed for luxury budgets']
      }
    },
    activities: [
      {
        name: `${cap} Historic Old Town & Landmark Circuit`,
        category: 'sightseeing',
        location: `Central ${cap}`,
        durationHours: 3.0,
        cost: 250,
        rating: 4.7,
        pros: [`Explore core architectural and historical landmarks of ${cap}`],
        cons: ['Walking required']
      },
      {
        name: `Authentic ${cap} Local Cuisine & Street Food Walk`,
        category: 'food',
        location: `Old Market, ${cap}`,
        durationHours: 2.5,
        cost: 450,
        rating: 4.8,
        pros: [`Taste iconic specialties unique to the ${cap} region`],
        cons: ['Busy food stalls']
      },
      {
        name: `${cap} Scenic Hilltop / Waterfront Golden Hour Point`,
        category: 'relaxation',
        location: `Viewpoint, ${cap}`,
        durationHours: 2.0,
        cost: 150,
        rating: 4.6,
        pros: ['Panoramic sunset vistas and open evening breeze'],
        cons: ['Best experienced in late afternoon']
      },
      {
        name: `${cap} Regional Handicraft & Artisan Bazaars`,
        category: 'shopping',
        location: `Market Square, ${cap}`,
        durationHours: 2.5,
        cost: 300,
        rating: 4.5,
        pros: ['Direct souvenir purchasing from local weavers and craftsmen'],
        cons: ['Bargaining required']
      },
      {
        name: `${cap} Nature Sanctuary & Outdoor Adventure Path`,
        category: 'adventure',
        location: `Valley Ridge, ${cap}`,
        durationHours: 4.0,
        cost: 650,
        rating: 4.6,
        pros: ['Scenic hiking trails and rich local biodiversity'],
        cons: ['Requires outdoor footwear']
      }
    ],
    sources: [
      { name: `State Tourism Board Directory for ${cap}`, domain: 'tourism.gov.in', summary: `Official benchmark admission rates and verified attraction schedules for ${cap}.` },
      { name: 'National Rail & Intercity Transit Fare Benchmark', domain: 'indianrail.gov.in', summary: 'Route fare tables, travel duration and class pricing.' },
      { name: `${cap} Regional Hospitality Association`, domain: 'hotelassociation.in', summary: 'Median seasonal room rates across budget, mid-range and boutique properties.' }
    ]
  };
}

export function getDestinationData(destinationName: string, fromCity: string = 'Hyderabad'): DestinationSeed {
  const norm = destinationName.toLowerCase().trim();
  if (DESTINATIONS_DATA[norm]) {
    return DESTINATIONS_DATA[norm];
  }
  return generateDynamicDestinationSeed(destinationName, fromCity);
}
