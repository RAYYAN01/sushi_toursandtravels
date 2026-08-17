export interface TourPackage {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  distance: string;
  priceDisplay: string;
  image: string;
  tripType: string;
  suitedFor: string;
  highlights: string[];
  description: string;
}

// Built from the site's existing confirmed South India route network
// (see popularRoutesSeed in src/lib/seed.ts) — original itinerary copy,
// not scraped from anywhere.
export const packages: TourPackage[] = [
  {
    slug: 'bangalore-to-mysore',
    title: 'Mysore Heritage Day Trip',
    destination: 'Mysore',
    duration: '1 Day',
    distance: '143 km',
    priceDisplay: 'Starting ₹1,850',
    image: '/mysuru.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families & small groups (Sedan / SUV / 9-Seater Tempo Traveller)',
    highlights: [
      'Mysore Palace guided walk-through',
      'Chamundi Hills viewpoint stop',
      'Local sweet shop & silk market browsing',
      'Comfortable same-day round trip from Bangalore',
    ],
    description:
      'A relaxed single-day heritage run to Mysore — palace architecture, hill views, and local markets, with a verified driver handling the Bangalore–Mysore highway both ways.',
  },
  {
    slug: 'bangalore-to-coorg',
    title: 'Coorg Coffee Hills Getaway',
    destination: 'Coorg',
    duration: '2 Days / 1 Night',
    distance: '250 km',
    priceDisplay: 'Starting ₹3,250',
    image: '/coorg.webp',
    tripType: 'Round Trip',
    suitedFor: 'Couples & friend groups (SUV / 9 or 12-Seater Tempo Traveller)',
    highlights: [
      'Ghat-road drive through coffee estates',
      'Abbey Falls & Raja\'s Seat stops',
      'Homestay/resort drop-off & pickup',
      'Flexible sightseeing stops on request',
    ],
    description:
      'A two-day escape into Coorg\'s coffee country — waterfalls, viewpoints, and estate roads, driven by someone who knows the Western Ghats route well.',
  },
  {
    slug: 'bangalore-to-ooty',
    title: 'Ooty Tea Garden Trail',
    destination: 'Ooty',
    duration: '2 Days / 1 Night',
    distance: '270 km',
    priceDisplay: 'Starting ₹3,510',
    image: '/ooty.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families & groups (12 or 17-Seater Tempo Traveller)',
    highlights: [
      'Bandipur forest corridor drive',
      'Tea garden & Botanical Garden stops',
      'Ooty Lake boating stop on request',
      'Hairpin-bend hill roads handled by experienced drivers',
    ],
    description:
      'The classic Nilgiri hill-station run — forest roads, tea estates, and cool Ooty air, in a Tempo Traveller sized to your group.',
  },
  {
    slug: 'bangalore-to-goa',
    title: 'Goa Beach Holiday',
    destination: 'Goa',
    duration: '3 Days / 2 Nights',
    distance: '560 km',
    priceDisplay: 'Starting ₹7,280',
    image: '/goa.webp',
    tripType: 'Round Trip',
    suitedFor: 'Large groups & families (17-Seater Tempo Traveller / Mini Coach)',
    highlights: [
      'Long-distance highway drive with driver rotation on request',
      'Beach & resort drop-off coordination',
      'Flexible North/South Goa routing',
      'Ideal for group holidays and college trips',
    ],
    description:
      'A longer outstation run to Goa\'s beaches — best booked with our larger vehicles for groups who want to travel together comfortably over the full distance.',
  },
  {
    slug: 'bangalore-to-tirupati',
    title: 'Tirupati Pilgrimage Trip',
    destination: 'Tirupati',
    duration: '1–2 Days',
    distance: '250 km',
    priceDisplay: 'Price on Request',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    tripType: 'Round Trip',
    suitedFor: 'Families & pilgrimage groups (Sedan / SUV / Tempo Traveller)',
    highlights: [
      'Early-morning departure for darshan queue timing',
      'Waiting driver for same-day return trips',
      'Group vehicle options for extended family pilgrimages',
      'Flexible overnight-stay itineraries on request',
    ],
    description:
      'A dependable pilgrimage run to Tirupati, timed for darshan queues, with vehicle options from a sedan for a small family up to a Tempo Traveller for the full extended family.',
  },
  {
    slug: 'bangalore-to-pondicherry',
    title: 'Pondicherry Heritage & Beach Trip',
    destination: 'Pondicherry',
    duration: '2 Days / 1 Night',
    distance: '310 km',
    priceDisplay: 'Price on Request',
    image: 'https://images.unsplash.com/photo-1569157087866-f4a8e9250605?auto=format&fit=crop&q=80&w=800',
    tripType: 'Round Trip',
    suitedFor: 'Couples, friend groups & families (Sedan / SUV / Tempo Traveller)',
    highlights: [
      'French Quarter walking-distance drop-off',
      'Auroville & Promenade Beach stops on request',
      'Comfortable highway drive from Bangalore',
      'Group vehicle options for larger friend circles',
    ],
    description:
      'A relaxed coastal getaway to Pondicherry\'s French Quarter and beaches, with pickup and drop timed around your itinerary.',
  },
  {
    slug: 'bangalore-to-hampi',
    title: 'Hampi Heritage Trail',
    destination: 'Hampi',
    duration: '2 Days / 1 Night',
    distance: '340 km',
    priceDisplay: 'Price on Request',
    image: '/hampi.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families, friend groups & history enthusiasts (SUV / Tempo Traveller)',
    highlights: [
      'Vijayanagara Empire ruins & stone chariot at Vittala Temple',
      'Virupaksha Temple and Hemakuta Hill viewpoint stops',
      'Coracle ride on the Tungabhadra River on request',
      'Overnight stay coordination near the ruins',
    ],
    description:
      'A heritage-focused overnight trip to Hampi\'s UNESCO World Heritage ruins, with stops built around the boulder-strewn temple complexes and river views.',
  },
  {
    slug: 'bangalore-to-kodaikanal',
    title: 'Kodaikanal Lake & Hills Escape',
    destination: 'Kodaikanal',
    duration: '2 Days / 1 Night',
    distance: '460 km',
    priceDisplay: 'Price on Request',
    image: '/kodaikanal.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families & friend groups (SUV / Tempo Traveller)',
    highlights: [
      'Kodaikanal Lake boating & lakeside walk',
      'Pillar Rocks and Coaker\'s Walk viewpoint stops',
      'Cool hill-station climate year-round',
      'Flexible overnight-stay itineraries on request',
    ],
    description:
      'A longer hill-station getaway to Kodaikanal\'s lake and viewpoints, best suited to a group vehicle given the distance from Bangalore.',
  },
  {
    slug: 'bangalore-to-munnar',
    title: 'Munnar Tea Garden Trail',
    destination: 'Munnar',
    duration: '3 Days / 2 Nights',
    distance: '480 km',
    priceDisplay: 'Price on Request',
    image: '/munnar.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families & groups (SUV / Tempo Traveller)',
    highlights: [
      'Rolling tea estate roads through the Western Ghats',
      'Eravikulam National Park & viewpoint stops on request',
      'Cool climate hill-station stay',
      'Flexible multi-day itinerary with driver support throughout',
    ],
    description:
      'A multi-day run into Kerala\'s tea country, with ghat roads and estate viewpoints along the way — best booked with extra travel days given the distance.',
  },
  {
    slug: 'bangalore-to-wayanad',
    title: 'Wayanad Nature Escape',
    destination: 'Wayanad',
    duration: '2 Days / 1 Night',
    distance: '290 km',
    priceDisplay: 'Price on Request',
    image: '/wayand.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families & nature enthusiasts (SUV / Tempo Traveller)',
    highlights: [
      'Wildlife sanctuary & forest drive stops on request',
      'Waterfall and viewpoint sightseeing',
      'Cool, green Western Ghats scenery',
      'Comfortable overnight-stay coordination',
    ],
    description:
      'A nature-focused getaway to Wayanad\'s forests and waterfalls, driven through the Western Ghats with stops timed to your itinerary.',
  },
  {
    slug: 'bangalore-to-isha-yoga-center',
    title: 'Isha Yoga Center & Adiyogi Trip',
    destination: 'Coimbatore',
    duration: '2 Days / 1 Night',
    distance: '365 km',
    priceDisplay: 'Price on Request',
    image: '/Isha-Temple.webp',
    tripType: 'Round Trip',
    suitedFor: 'Families, friend groups & spiritual travellers (SUV / Tempo Traveller)',
    highlights: [
      'Adiyogi Shiva statue & Isha Yoga Center grounds',
      'Dhyanalinga meditation space visit on request',
      'Foothills-of-the-Nilgiris scenery along the drive',
      'Flexible overnight-stay coordination near Coimbatore',
    ],
    description:
      'A spiritually focused trip to the Isha Yoga Center near Coimbatore, home to the towering Adiyogi Shiva statue, with the drive routed through scenic Western Ghats foothills.',
  },
];
