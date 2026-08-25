export interface Vehicle {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Minivan' | 'Tempo Traveller' | 'Luxury' | 'Bus' | string;
  seats: number;
  ac: boolean;
  luggage: number;
  ratePerKm: number;
  features: string[];
  image: string;
  images?: string[];
  imageFit?: 'cover' | 'contain';
  imageFits?: ('cover' | 'contain')[];
  imagePositions?: string[];
  imageScales?: number[];
  description: string;
  sortOrder?: number;

  // Custom properties for group & luxury vehicles
  driverBata?: number;
  minKmPerDay?: number;
  ratePerKmAc?: number;
  ratePerKmNonAc?: number;
  acOnly?: boolean;
  hasNonAcOption?: boolean;
  drivingHours?: string;
  priceDisplay?: string;
  seatsDisplay?: string;
}

// ---------------------------------------------------------------------------
// Confirmed pricing sheet (owner-confirmed, 2026-08-16 pass — see NOTES.md
// section "Fleet pricing reconciliation" for the full per-vehicle mapping).
//
// Shared terms across every priced tier below:
//   - Minimum running: 300 km/day
//   - Standard duty timing: 6:00 AM - 10:00 PM (extra driver bata applies for
//     driving after 10:00 PM)
//   - Toll, parking, permit and state taxes are additional (not included in
//     the rate)
// ---------------------------------------------------------------------------
export const MIN_KM_PER_DAY = 300;
export const STANDARD_DUTY_HOURS = '6:00 AM – 10:00 PM';

// Per-tier rate/km and driver bata, exactly as confirmed by the owner.
// Nothing here is invented — a tier not in this sheet (Innova Hycross, the
// two bus entries) stays "Price on Request" with no ratePerKm.
//
// tempoTravellerAc / luxuryTempoTraveller9Plus1 / tempoTraveller17Seater bata
// & rates updated 2026-08-25 on the owner's explicit instruction to match
// published market rates from a reference competitor site (Yogi Tours &
// Travels) for the 9/12/17-seater Tempo Traveller tiers — a deliberate
// pricing-strategy decision, not a guess.
const PRICING = {
  sedan: { ratePerKm: 13, driverBata: 400 },
  innova: { ratePerKm: 17, driverBata: 400 },
  innovaCrysta: { ratePerKm: 19, driverBata: 400 },
  tempoTravellerAc: { ratePerKm: 22, driverBata: 700 },
  tempoTravellerNonAc: { ratePerKm: 20, driverBata: 700 },
  luxuryTempoTraveller9Plus1: { ratePerKm: 28, driverBata: 500 },
  tempoTraveller17Seater: { ratePerKm: 30, driverBata: 700 },
  forceUrbaniaMaharaja12: { ratePerKm: 45, driverBata: 700 },
  forceUrbaniaLuxury16: { ratePerKm: 38, driverBata: 700 },
} as const;

/**
 * Computes the minimum estimated daily charge for a vehicle:
 *   ratePerKm * (minKmPerDay ?? 300) + (driverBata ?? 0)
 * Returns null when there is no confirmed rate to compute from (vehicle is
 * priced "Price on Request" or has ratePerKm of 0) — never invents a number.
 * This is the single source of truth for the computed total; nowhere in the
 * app should this total be hardcoded as a literal.
 */
export function getMinimumDailyTotal(vehicle: Vehicle): number | null {
  if (vehicle.priceDisplay || !vehicle.ratePerKm) return null;
  const km = vehicle.minKmPerDay ?? MIN_KM_PER_DAY;
  const bata = vehicle.driverBata ?? 0;
  return vehicle.ratePerKm * km + bata;
}

/**
 * Sorts vehicles alphabetically by their displayed `name`, case-insensitive
 * and locale-aware.
 */
export function sortVehiclesByName<T extends { name: string }>(list: T[]): T[] {
  return [...list].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );
}

// Category display order: cars first, then group vehicles by rising capacity.
const CATEGORY_RANK: Record<string, number> = { Sedan: 0, SUV: 0, 'Tempo Traveller': 1, Bus: 2 };

/**
 * Fleet display order: cars (Sedan/SUV) first sorted A–Z, then Tempo
 * Travellers and Buses sorted by ascending seat count (ties broken A–Z).
 * Use this for the public Fleet grid; use sortVehiclesByName elsewhere.
 */
export function sortVehiclesForDisplay<T extends { name: string; type: string; seats: number }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => {
    const rankA = CATEGORY_RANK[a.type] ?? 3;
    const rankB = CATEGORY_RANK[b.type] ?? 3;
    if (rankA !== rankB) return rankA - rankB;
    if (rankA === 0) return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    if (a.seats !== b.seats) return a.seats - b.seats;
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });
}

export const vehicles: Vehicle[] = [
  // ---------------------------------------------------------------------
  // Tempo Traveller — merged AC/Non-AC into a single card (was two nearly
  // identical listings sharing the same photos; hasNonAcOption + separate
  // ratePerKmAc/ratePerKmNonAc already exists on the Vehicle type and
  // VehicleCard for exactly this case, so both confirmed rates still show).
  // ---------------------------------------------------------------------
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    type: 'Tempo Traveller',
    seats: 12,
    seatsDisplay: '12 Seater',
    ac: true,
    hasNonAcOption: true,
    luggage: 8,
    ratePerKm: PRICING.tempoTravellerAc.ratePerKm,
    ratePerKmAc: PRICING.tempoTravellerAc.ratePerKm,
    ratePerKmNonAc: PRICING.tempoTravellerNonAc.ratePerKm,
    driverBata: PRICING.tempoTravellerAc.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    features: [
      'Pushback reclining seats with extra legroom',
      'Available in AC or Non-AC configuration',
      'USB charging points at every seat row',
      'Dedicated rear luggage boot for group baggage',
      'Reading lights, curtains & music system',
      'Best for small families and close friend groups',
    ],
    image: '/fleet/force-traveller-c-front-01.webp',
    images: [
      '/fleet/force-traveller-c-front-01.webp',
      '/fleet/force-traveller-c-front-02.webp',
      '/fleet/force-traveller-c-side-01.webp',
      '/fleet/force-traveller-c-interior-01.webp',
      '/fleet/force-traveller-c-interior-02.webp',
      '/fleet/force-traveller-c-interior-03.webp',
      '/fleet/force-traveller-c-rear-02.webp',
    ],
    description:
      'Our Tempo Traveller is the ideal pick for small family holidays, weekend getaways, and close-friend group trips out of Bangalore — available in AC or Non-AC, with comfortable pushback seating and a dedicated luggage boot on both.',
    sortOrder: 1,
  },

  // ---------------------------------------------------------------------
  // 17-Seater Force Tempo Traveller — owner confirmed real (2026-08-20).
  // Real front photo (owner-provided, 2026-08-25) replaces the earlier
  // Yaksha placeholder. Rate/bata set 2026-08-25 per owner instruction to
  // match the reference competitor rate for this tier (see PRICING comment
  // above) — not an invented figure.
  // ---------------------------------------------------------------------
  {
    id: 'force-tempo-traveller-17-seater',
    name: '17-Seater Force Tempo Traveller',
    type: 'Tempo Traveller',
    seats: 17,
    seatsDisplay: '17 Seater',
    ac: true,
    luggage: 14,
    ratePerKm: PRICING.tempoTraveller17Seater.ratePerKm,
    driverBata: PRICING.tempoTraveller17Seater.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Pushback reclining seats with extra legroom',
      'Roof-mounted AC for all rows',
      'USB charging points at every seat row',
      'Dedicated rear luggage boot for group baggage',
      'Best for large family groups, corporate offsites & pilgrimages',
    ],
    image: '/fleet/force-tempo-traveller-17-seater-front-01.webp',
    images: [
      '/fleet/force-tempo-traveller-17-seater-front-01.webp',
    ],
    description:
      'Our 17-seater Force Tempo Traveller is built for large groups who need extra capacity for outstation trips, corporate offsites and pilgrimages out of Bangalore. Pushback seating, roof AC and a dedicated luggage boot make it a strong pick for bigger group travel.',
    sortOrder: 2,
  },

  // ---------------------------------------------------------------------
  // Luxury Tempo Traveller 9+1 Seater
  // Repurposed from the former "12-Seater Force Traveller Yaksha" entry —
  // premium-badged trim, fits the "Luxury" naming; 9+1 = 10 total seats.
  // ---------------------------------------------------------------------
  {
    id: 'luxury-tempo-traveller-9-plus-1',
    name: 'Luxury Tempo Traveller 9+1 Seater',
    type: 'Tempo Traveller',
    seats: 10,
    seatsDisplay: '9+1 Seater',
    ac: true,
    luggage: 10,
    ratePerKm: PRICING.luxuryTempoTraveller9Plus1.ratePerKm,
    driverBata: PRICING.luxuryTempoTraveller9Plus1.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      '9+1 premium pushback executive seats',
      'Individual AC vents with ambient cabin lighting',
      'Charging points and mobile holders at each seat',
      'Extra-wide rear boot for group luggage',
      'Large tinted windows for scenic ghat-road views',
      'Best for mid-size family groups, corporate teams & pilgrimage trips',
    ],
    image: '/fleet/force-traveller-yaksha-front-01.webp',
    images: [
      '/fleet/force-traveller-yaksha-front-01.webp',
      '/fleet/force-traveller-yaksha-front-02.webp',
      '/fleet/force-traveller-yaksha-front-03.webp',
      '/fleet/force-traveller-yaksha-front-04.webp',
      '/fleet/force-traveller-yaksha-front-05.webp',
      '/fleet/force-traveller-yaksha-interior-01.webp',
      '/fleet/force-traveller-yaksha-interior-02.webp',
      '/fleet/force-traveller-yaksha-interior-03.webp',
      '/fleet/force-traveller-yaksha-rear-01.webp',
    ],
    description:
      'The Force Traveller Yaksha is our premium-badged Luxury Tempo Traveller (9+1 seater), built for mid-size groups that want extra comfort on long outstation drives. Executive pushback seats, individual AC vents, and a spacious luggage boot make it a favourite for corporate offsites, pilgrimages, and multi-family trips to Coorg, Mysore, and Ooty.',
    sortOrder: 3,
  },

  // ---------------------------------------------------------------------
  // Force Urbania Maharaja 12-Seater / Luxury 16-Seater
  // Both repurposed from the former "17-Seater Force Urbania" entry — same
  // real photo set (force-urbania-*, only one Force Urbania set exists),
  // split into two card entries differentiated by trim/seat count/price.
  // ---------------------------------------------------------------------
  {
    id: 'force-urbania-maharaja-12-seater',
    name: 'Force Urbania Maharaja 12-Seater',
    type: 'Tempo Traveller',
    seats: 12,
    seatsDisplay: '12 Seater',
    ac: true,
    luggage: 12,
    ratePerKm: PRICING.forceUrbaniaMaharaja12.ratePerKm,
    driverBata: PRICING.forceUrbaniaMaharaja12.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      '12 luxury captain-style pushback seats',
      'High-roof cabin with stand-up walking space',
      'Powerful roof AC with individual passenger vents',
      'Large rear cargo hold for group luggage',
      'Premium interior lighting & entertainment system',
      'Best for mid-size family groups, corporate offsites & pilgrimages',
    ],
    image: '/fleet/force-urbania-front-01.webp',
    images: [
      '/fleet/force-urbania-front-01.webp',
      '/fleet/force-urbania-front-02.webp',
      '/fleet/force-urbania-interior-01.webp',
      '/fleet/force-urbania-interior-02.webp',
      '/fleet/force-urbania-interior-03.webp',
      '/fleet/force-urbania-interior-04.webp',
      '/fleet/force-urbania-interior-05.webp',
      '/fleet/force-urbania-interior-06.webp',
      '/fleet/force-urbania-rear-01.webp',
      '/fleet/force-urbania-rear-02.webp',
    ],
    description:
      'The Force Urbania Maharaja is the 12-seater trim of our flagship Force Urbania: a high-roof, premium van built for mid-size groups who want extra comfort. Captain seats, strong AC, and a spacious cabin make it a great choice for family holidays and corporate group travel across South India.',
    sortOrder: 4,
  },
  {
    id: 'force-urbania-luxury-16-seater',
    name: 'Force Urbania Luxury 16-Seater',
    type: 'Tempo Traveller',
    seats: 16,
    seatsDisplay: '16 Seater',
    ac: true,
    luggage: 14,
    ratePerKm: PRICING.forceUrbaniaLuxury16.ratePerKm,
    driverBata: PRICING.forceUrbaniaLuxury16.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      '16 luxury captain-style pushback seats',
      'High-roof cabin with stand-up walking space',
      'Powerful roof AC with individual passenger vents',
      'Large rear cargo hold for big group luggage',
      'Premium interior lighting & entertainment system',
      'Best for large families, wedding groups, corporate offsites & big pilgrimages',
    ],
    image: '/fleet/force-urbania-front-01.webp',
    images: [
      '/fleet/force-urbania-front-01.webp',
      '/fleet/force-urbania-front-02.webp',
      '/fleet/force-urbania-interior-01.webp',
      '/fleet/force-urbania-interior-02.webp',
      '/fleet/force-urbania-interior-03.webp',
      '/fleet/force-urbania-interior-04.webp',
      '/fleet/force-urbania-interior-05.webp',
      '/fleet/force-urbania-interior-06.webp',
      '/fleet/force-urbania-rear-01.webp',
      '/fleet/force-urbania-rear-02.webp',
    ],
    description:
      'Our flagship Force Urbania Luxury is the largest and most premium van in the fleet: a full 16-seater built for big groups who refuse to compromise on comfort. High-roof cabin space, captain seats, and strong AC make it the top choice for large family holidays, wedding transportation, and corporate group travel across South India.',
    sortOrder: 5,
  },

  // ---------------------------------------------------------------------
  // Sedans — both priced under the confirmed Sedan tier (₹13/km, ₹400 bata)
  // ---------------------------------------------------------------------
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    type: 'Sedan',
    seats: 4,
    seatsDisplay: '4 Seater',
    ac: true,
    luggage: 3,
    ratePerKm: PRICING.sedan.ratePerKm,
    driverBata: PRICING.sedan.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Compact AC sedan for city & local drops',
      'Comfortable seating for up to 4 passengers',
      'Boot space for 2-3 medium suitcases',
      'Fuel-efficient for short outstation runs',
      'Ideal for airport transfers & solo/couple travel',
    ],
    image: '/fleet/etios-front-01.webp',
    images: [
      '/fleet/etios-front-01.webp',
      '/fleet/etios-side-01.webp',
      '/fleet/etios-interior-01.webp',
      '/fleet/etios-interior-02.webp',
      '/fleet/etios-rear-01.webp',
    ],
    description:
      'The Toyota Etios is a reliable, air-conditioned sedan best suited for local city drops, airport pickups, and quick point-to-point trips around Bangalore. A practical, comfortable choice when you need a smaller car rather than a group vehicle.',
    sortOrder: 6,
  },
  {
    id: 'maruti-dzire',
    name: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    seats: 4,
    seatsDisplay: '4 Seater',
    ac: true,
    luggage: 3,
    ratePerKm: PRICING.sedan.ratePerKm,
    driverBata: PRICING.sedan.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Comfortable AC sedan with a smooth ride',
      'Spacious boot for luggage on short trips',
      'Great for solo travellers, couples & small families',
      'Well-maintained dashboard and interiors',
      'Ideal for local sightseeing & airport transfers',
    ],
    image: '/fleet/dzire-front-01.webp',
    images: [
      '/fleet/dzire-front-01.webp',
      '/fleet/dzire-dashboard-01.webp',
      '/fleet/dzire-interior-01.webp',
      '/fleet/dzire-interior-02.webp',
    ],
    description:
      'The Maruti Suzuki Dzire is a comfortable, fuel-efficient sedan ideal for local Bangalore drops, airport transfers, and short point-to-point journeys where a full group vehicle is not required.',
    sortOrder: 7,
  },

  // ---------------------------------------------------------------------
  // SUVs — Toyota Innova tier (₹17/km) and Toyota Innova Crysta tier
  // (₹19/km) now priced per the confirmed sheet. Innova Hycross has no
  // confirmed rate and stays "Price on Request".
  // ---------------------------------------------------------------------
  {
    id: 'toyota-innova-2011',
    name: 'Toyota Innova (2011)',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: PRICING.innova.ratePerKm,
    driverBata: PRICING.innova.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Spacious 7-seater cabin with 3 rows',
      'Trusted, rugged SUV build for highway trips',
      'AC cooling across all rows',
      'Good luggage capacity for family trips',
      'Well suited for outstation road trips & pilgrimages',
    ],
    image: '/fleet/innova-2011-front-01.webp',
    images: [
      '/fleet/innova-2011-front-01.webp',
      '/fleet/innova-2011-front-02.webp',
      '/fleet/innova-2011-dashboard-01.webp',
      '/fleet/innova-2011-interior-01.webp',
      '/fleet/innova-2011-interior-02.webp',
      '/fleet/innova-2011-interior-03.webp',
      '/fleet/innova-2011-interior-08.webp',
    ],
    description:
      'A dependable, well-maintained Toyota Innova offering spacious 7-seater comfort for family outstation trips, pilgrimages, and highway journeys, at our standard Toyota Innova tier rate.',
    sortOrder: 8,
  },
  {
    id: 'toyota-innova-crysta',
    name: 'Toyota Innova Crysta',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: PRICING.innovaCrysta.ratePerKm,
    driverBata: PRICING.innovaCrysta.driverBata,
    minKmPerDay: MIN_KM_PER_DAY,
    drivingHours: STANDARD_DUTY_HOURS,
    acOnly: true,
    features: [
      'Premium 7-seater SUV with plush captain seats',
      'Superior ride quality on highways & ghat roads',
      'Individual AC vents for rear passengers',
      'Spacious boot for full family luggage',
      'Popular choice for family holidays & corporate travel',
    ],
    image: '/fleet/innova-crysta-front-01.webp',
    images: [
      '/fleet/innova-crysta-front-01.webp',
      '/fleet/innova-crysta-dashboard-01.webp',
      '/fleet/innova-crysta-rear-01.webp',
    ],
    description:
      'The Toyota Innova Crysta delivers a premium SUV experience with plush captain seating and a smooth ride, making it a favourite for family holidays, corporate travel, and comfortable outstation road trips to Coorg, Ooty, and beyond.',
    sortOrder: 9,
  },
  {
    id: 'toyota-innova-hycross',
    name: 'Toyota Innova Hycross',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Latest-generation Innova with modern interiors',
      'Comfortable captain seats with premium upholstery',
      'Strong AC performance for long summer drives',
      'Generous boot space for family luggage',
      'Top pick for premium family & corporate outstation trips',
    ],
    image: '/fleet/innova-hycross-front-01.webp',
    images: [
      '/fleet/innova-hycross-front-01.webp',
      '/fleet/innova-hycross-front-02.webp',
      '/fleet/innova-hycross-interior-01.webp',
      '/fleet/innova-hycross-interior-02.webp',
      '/fleet/innova-hycross-interior-03.webp',
    ],
    description:
      'Our newest SUV addition, the Toyota Innova Hycross combines modern styling with premium interior comfort, ideal for families and corporate clients who want the latest generation Innova experience on their outstation trip.',
    sortOrder: 10,
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    type: 'SUV',
    seats: 7,
    seatsDisplay: '7 Seater',
    ac: true,
    luggage: 5,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Premium full-size SUV with commanding road presence',
      'Plush captain-style seating across 3 rows',
      'Strong AC performance for long highway drives',
      'Generous ground clearance for hill & ghat routes',
      'Top pick for premium family, corporate & VIP outstation trips',
    ],
    image: '/toyota-fortuner.webp',
    images: ['/toyota-fortuner.webp'],
    description:
      'The Toyota Fortuner is our premium full-size SUV option, offering a commanding ride and plush 7-seater comfort for clients who want an extra step up for family holidays, corporate travel, or VIP outstation trips.',
    sortOrder: 11,
  },

  // ---------------------------------------------------------------------
  // Buses / Coaches
  // ---------------------------------------------------------------------
  {
    id: 'sgr-mini-coach',
    name: 'SGR Mini Coach',
    type: 'Bus',
    seats: 20,
    seatsDisplay: '20 Seater',
    ac: true,
    luggage: 18,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Spacious mini coach for larger groups',
      'Rows of AC pushback seating',
      'Overhead luggage racks plus rear cargo hold',
      'PA/music system for group announcements',
      'Suited for large corporate offsites, school/college trips & big pilgrimage groups',
    ],
    image: '/fleet/coach-sgr-front-01.webp',
    images: [
      '/fleet/coach-sgr-front-01.webp',
      '/fleet/coach-sgr-front-02.webp',
      '/fleet/coach-sgr-front-03.webp',
      '/fleet/coach-sgr-interior-01.webp',
      '/fleet/coach-sgr-interior-02.webp',
      '/fleet/coach-sgr-interior-03.webp',
      '/fleet/coach-sgr-rear-01.webp',
      '/fleet/coach-sgr-rear-02.webp',
    ],
    description:
      'The SGR Mini Coach is a 20-seater AC coach built for big groups such as corporate offsites, school and college outings, and large pilgrimage or wedding parties that need everyone travelling together in one vehicle.',
    sortOrder: 11,
  },
  {
    id: 'bus-21-seater',
    name: '21-Seater Bus',
    type: 'Bus',
    seats: 21,
    seatsDisplay: '21 Seater',
    ac: true,
    luggage: 20,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'AC pushback seating for 21 passengers',
      'Overhead luggage racks plus rear cargo hold',
      'PA/music system for group announcements',
      'Suited for corporate offsites, school/college trips & pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/coach-sgr-front-01.webp',
    images: [
      '/fleet/coach-sgr-front-01.webp',
      '/fleet/coach-sgr-front-02.webp',
      '/fleet/coach-sgr-front-03.webp',
      '/fleet/coach-sgr-interior-01.webp',
      '/fleet/coach-sgr-interior-02.webp',
      '/fleet/coach-sgr-interior-03.webp',
      '/fleet/coach-sgr-rear-01.webp',
      '/fleet/coach-sgr-rear-02.webp',
    ],
    description:
      'Our 21-seater bus is built for mid-size groups that have outgrown a Tempo Traveller — corporate offsites, school and college trips, and pilgrimage groups travelling together in one AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 12,
  },
  {
    id: 'bus-50-seater',
    name: '50-Seater Bus',
    type: 'Bus',
    seats: 50,
    seatsDisplay: '50 Seater',
    ac: true,
    luggage: 40,
    ratePerKm: 0,
    priceDisplay: 'Price on Request',
    acOnly: true,
    features: [
      'Full-size AC pushback seating for 50 passengers',
      'Large overhead luggage racks plus rear cargo hold',
      'PA/music system for group announcements',
      'Suited for large corporate events, weddings & big pilgrimage groups',
      'Custom quote based on route, duration & group size',
    ],
    image: '/fleet/coach-sgr-front-01.webp',
    images: [
      '/fleet/coach-sgr-front-01.webp',
      '/fleet/coach-sgr-front-02.webp',
      '/fleet/coach-sgr-front-03.webp',
      '/fleet/coach-sgr-interior-01.webp',
      '/fleet/coach-sgr-interior-02.webp',
      '/fleet/coach-sgr-interior-03.webp',
      '/fleet/coach-sgr-rear-01.webp',
      '/fleet/coach-sgr-rear-02.webp',
    ],
    description:
      'Our largest-capacity vehicle, the 50-seater bus is built for large corporate events, weddings, and big pilgrimage or group tours that need everyone travelling together in one AC vehicle. Pricing is quoted per trip based on route, duration and group size.',
    sortOrder: 13,
  },
];
