import { Faq } from '@/components/FaqAccordion';

export interface LocationPage {
  slug: string;
  name: string;
  h1: string;
  title: string;
  metaDescription: string;
  heroSubtitle: string;
  geoSummary: string;
  areaDescription: string;
  bodyParagraphs: string[];
  commonVehicles: string[];
  faqs: Faq[];
  relatedVehicleSlugs: string[];
  nearbyLocationSlugs: string[];
}

export const locationPages: LocationPage[] = [
  {
    slug: 'car-rental-whitefield',
    name: 'Whitefield',
    h1: 'Car Rental in Whitefield, Bangalore',
    title: 'Car Rental Whitefield Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Whitefield, Bangalore. Airport transfers, IT park commutes, outstation trips. Call or WhatsApp for a quote.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Whitefield, Bangalore\'s IT park and tech corridor.',
    geoSummary:
      'Sushi Travels serves Whitefield, Bangalore for local pickup/drop, corporate travel and outstation trips. Whitefield is one of Bangalore\'s established IT park corridors, and a large share of our bookings here are corporate airport transfers and office-to-office travel.',
    areaDescription:
      'Whitefield grew into one of Bangalore\'s major IT and tech park corridors, home to a dense cluster of corporate campuses and office parks along with residential neighbourhoods that developed around them. Traffic patterns here are shaped heavily by office commute hours, and many of our Whitefield bookings are corporate: airport transfers for visiting employees, office-to-office travel, and team transport to offsites.',
    bodyParagraphs: [
      'Because Whitefield sits toward the eastern side of the city, trips to Kempegowda International Airport and outstation routes generally start with a run through the eastern corridor before joining the main highways — our drivers are familiar with the timing this adds, especially during peak office hours.',
      'For residents and corporate clients alike, we handle everything from a single sedan pickup to arranging a Tempo Traveller for a team offsite departing from a Whitefield office campus.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for individual and corporate point-to-point travel', 'Toyota Innova/Innova Crysta for airport transfers with luggage', 'Tempo Traveller for office team offsites and group travel'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Whitefield?',
        answer: 'Yes, Sushi Travels serves Whitefield for local pickup/drop, corporate travel, airport transfers and outstation bookings.',
      },
      {
        question: 'Can I book airport transfer from Whitefield?',
        answer: 'Yes — airport pickup and drop from Whitefield is one of our regular bookings, with flight-time coordination available on request.',
      },
      {
        question: 'Is outstation booking available from Whitefield?',
        answer: 'Yes, outstation round trips to destinations like Mysore, Coorg and Ooty can be booked with pickup from Whitefield.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-crysta-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-marathahalli', 'car-rental-koramangala', 'car-rental-indiranagar'],
  },
  {
    slug: 'car-rental-electronic-city',
    name: 'Electronic City',
    h1: 'Car Rental in Electronic City, Bangalore',
    title: 'Car Rental Electronic City Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Electronic City, Bangalore. Corporate travel, airport transfers, outstation trips with verified drivers.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Electronic City, Bangalore\'s established IT hub in the south.',
    geoSummary:
      'Sushi Travels serves Electronic City, Bangalore for corporate travel, local pickup/drop and outstation trips. Electronic City is a long-established IT hub in the city\'s south, and its distance from the airport and central Bangalore makes advance booking especially useful for time-sensitive corporate transfers.',
    areaDescription:
      'Electronic City is one of Bangalore\'s oldest and largest IT hubs, developed in phases along the southern edge of the city with a concentration of technology company campuses. Its location, further from the city centre and airport than most other IT corridors, means travel times to Kempegowda Airport or outstation routes typically run longer, which our dispatch team factors into pickup scheduling.',
    bodyParagraphs: [
      'Most of our Electronic City bookings are corporate — employee airport transfers, executive point-to-point travel between campuses, and occasional team transport for offsites. Because the area is well south of the city, trips toward Mysore and other southern outstation routes can actually start with a time advantage compared to bookings from the northern side of Bangalore.',
      'For residents and families in the surrounding neighbourhoods, we also handle standard local and outstation bookings the same way as anywhere else in the city.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for individual corporate travel', 'Toyota Innova for airport transfers with extra luggage', 'Tempo Traveller for larger team or family group travel'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Electronic City?',
        answer: 'Yes, we serve Electronic City for local pickup/drop, corporate travel, airport transfers and outstation bookings.',
      },
      {
        question: 'How far is the airport from Electronic City?',
        answer: 'Electronic City is on the southern side of Bangalore, generally further from Kempegowda Airport than central or northern areas — we recommend booking with extra buffer time for airport pickups from here.',
      },
      {
        question: 'Can I book an outstation trip toward Mysore from Electronic City?',
        answer: 'Yes — and being on the southern side of the city, Electronic City pickups can have a slight head start on southern outstation routes like Mysore compared to northern parts of Bangalore.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-jp-nagar', 'car-rental-jayanagar', 'car-rental-koramangala'],
  },
  {
    slug: 'car-rental-koramangala',
    name: 'Koramangala',
    h1: 'Car Rental in Koramangala, Bangalore',
    title: 'Car Rental Koramangala Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Koramangala, Bangalore. Local travel, airport transfers, outstation trips with verified drivers.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Koramangala, a busy commercial and startup hub in central Bangalore.',
    geoSummary:
      'Sushi Travels serves Koramangala, Bangalore for local pickup/drop, airport transfers and outstation trips. Koramangala is a well-known commercial and startup hub with a dense mix of offices, restaurants and residential blocks, and demand here spans everyday local trips as well as group outstation bookings from its many young working professionals.',
    areaDescription:
      'Koramangala is widely known as one of Bangalore\'s busiest commercial and startup neighbourhoods, with a dense concentration of offices, cafes and residential blocks packed into its numbered layout of blocks. It sits centrally enough that it connects reasonably well toward most parts of the city, which keeps both local and outstation bookings frequent from this area.',
    bodyParagraphs: [
      'A large share of our Koramangala bookings come from young professionals and small groups of friends planning weekend outstation trips — Coorg and Ooty are particularly popular from this crowd, often booked as a Tempo Traveller for a group travelling together.',
      'We also see steady local and airport transfer demand given the density of offices and residences in the area, and our sedans and SUVs handle the bulk of these point-to-point bookings.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for local and airport travel', 'Tempo Traveller for weekend group getaways with friends', 'Toyota Innova Crysta for comfortable family outstation trips'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Koramangala?',
        answer: 'Yes, Sushi Travels serves Koramangala for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'Can I book a weekend group trip from Koramangala?',
        answer: 'Yes — Koramangala is one of our most active pickup points for weekend outstation trips to Coorg, Ooty and similar destinations, usually booked as a Tempo Traveller for groups of friends.',
      },
      {
        question: 'Is airport pickup available from Koramangala?',
        answer: 'Yes, airport pickup and drop is available from Koramangala with flight-time coordination on request.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'tempo-traveller-rental-bangalore', 'innova-crysta-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-indiranagar', 'car-rental-jayanagar', 'car-rental-whitefield'],
  },
  {
    slug: 'car-rental-indiranagar',
    name: 'Indiranagar',
    h1: 'Car Rental in Indiranagar, Bangalore',
    title: 'Car Rental Indiranagar Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Indiranagar, Bangalore. Local travel, airport transfers, outstation trips with verified drivers.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Indiranagar, one of Bangalore\'s well-known residential and commercial neighbourhoods.',
    geoSummary:
      'Sushi Travels serves Indiranagar, Bangalore for local pickup/drop, airport transfers and outstation trips. Indiranagar is a well-established, centrally located residential and commercial neighbourhood known for its mix of homes, offices and a busy retail/dining stretch, generating steady demand for both everyday local travel and weekend outstation bookings.',
    areaDescription:
      'Indiranagar is one of Bangalore\'s older, well-established neighbourhoods — a mix of residential streets and a busy commercial stretch known for shopping and dining, which keeps foot traffic and local travel demand high through most of the day and evening. Its fairly central location within Bangalore makes it a convenient pickup point for both city travel and longer outstation trips.',
    bodyParagraphs: [
      'Local bookings from Indiranagar range from everyday point-to-point drops to evening pickups tied to the neighbourhood\'s dining and retail activity. We also handle a steady flow of airport transfers given the area\'s central location.',
      'Outstation demand here mirrors nearby Koramangala — weekend trips to Coorg, Ooty and Mysore booked by friend groups and families, generally in a sedan, Innova, or Tempo Traveller depending on group size.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for local drops and airport transfers', 'Toyota Innova for family outstation trips', 'Tempo Traveller for larger weekend group getaways'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Indiranagar?',
        answer: 'Yes, we serve Indiranagar for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'Is late-evening pickup available in Indiranagar?',
        answer: 'Yes — within our standard duty hours (6:00 AM–10:00 PM), late-evening pickups are available; driving past 10:00 PM attracts extra driver bata.',
      },
      {
        question: 'Can I book an outstation trip from Indiranagar?',
        answer: 'Yes, outstation round trips to destinations like Coorg, Ooty and Mysore can be booked with pickup from Indiranagar.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-koramangala', 'car-rental-marathahalli', 'car-rental-jayanagar'],
  },
  {
    slug: 'car-rental-jayanagar',
    name: 'Jayanagar',
    h1: 'Car Rental in Jayanagar, Bangalore',
    title: 'Car Rental Jayanagar Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Jayanagar, Bangalore. Local travel, airport transfers, outstation and pilgrimage trips.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Jayanagar, one of Bangalore\'s established south-side residential areas.',
    geoSummary:
      'Sushi Travels serves Jayanagar, Bangalore for local pickup/drop, airport transfers and outstation trips. Jayanagar is one of Bangalore\'s older, well-planned residential neighbourhoods on the south side of the city, and bookings from here often include family outstation and pilgrimage trips alongside everyday local travel.',
    areaDescription:
      'Jayanagar is one of Bangalore\'s older planned residential layouts on the south side of the city, known for its settled neighbourhoods, markets and a generally family-oriented character compared to some of the newer commercial corridors. Its position toward the south makes it a practical starting point for trips heading toward Mysore and other southern routes.',
    bodyParagraphs: [
      'Given the neighbourhood\'s family-residential character, a good share of our Jayanagar bookings are outstation family trips and pilgrimage travel — Tirupati and Mysore are common destinations, typically booked in a sedan or SUV depending on family size.',
      'We also handle regular local and airport transfer bookings from Jayanagar, with the area\'s southern position often shaving a little time off routes heading further south compared to pickups from the northern half of the city.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for family local travel', 'Toyota Innova for pilgrimage and family outstation trips', 'Tempo Traveller for larger extended-family group travel'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Jayanagar?',
        answer: 'Yes, we serve Jayanagar for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'Can I book a pilgrimage trip to Tirupati from Jayanagar?',
        answer: 'Yes — pilgrimage trips to Tirupati and other South Indian temple towns are among our regular bookings from Jayanagar, typically in a sedan or SUV.',
      },
      {
        question: 'Is airport pickup available from Jayanagar?',
        answer: 'Yes, airport pickup and drop is available from Jayanagar with flight-time coordination on request.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-jp-nagar', 'car-rental-koramangala', 'car-rental-electronic-city'],
  },
  {
    slug: 'car-rental-jp-nagar',
    name: 'JP Nagar',
    h1: 'Car Rental in JP Nagar, Bangalore',
    title: 'Car Rental JP Nagar Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in JP Nagar, Bangalore. Local travel, airport transfers, outstation trips with verified drivers.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across JP Nagar, a residential neighbourhood on Bangalore\'s south side.',
    geoSummary:
      'Sushi Travels serves JP Nagar, Bangalore for local pickup/drop, airport transfers and outstation trips. JP Nagar is a large, primarily residential neighbourhood on the city\'s south side, close to Jayanagar and Banashankari, generating steady demand for family local travel and outstation bookings.',
    areaDescription:
      'JP Nagar is a spread-out, primarily residential part of south Bangalore, developed across multiple numbered phases, with a mix of family homes, schools and neighbourhood commercial stretches. It shares much of its character and southern positioning with neighbouring Jayanagar.',
    bodyParagraphs: [
      'Most of our JP Nagar bookings are family-oriented — local errands, school-related travel, and outstation family trips or pilgrimages, with the same southern-city advantage as Jayanagar for routes heading toward Mysore.',
      'We handle both individual sedan bookings for everyday travel and larger vehicle bookings when an extended family or group from the neighbourhood is travelling together.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for everyday family travel', 'Toyota Innova for family outstation and pilgrimage trips', 'Tempo Traveller for extended-family group travel'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within JP Nagar?',
        answer: 'Yes, we serve JP Nagar for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'Can I book a family outstation trip from JP Nagar?',
        answer: 'Yes, family outstation and pilgrimage trips are commonly booked from JP Nagar, usually in a sedan or Innova depending on family size.',
      },
      {
        question: 'Is airport pickup available from JP Nagar?',
        answer: 'Yes, airport pickup and drop is available from JP Nagar with flight-time coordination on request.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-jayanagar', 'car-rental-electronic-city', 'car-rental-koramangala'],
  },
  {
    slug: 'car-rental-marathahalli',
    name: 'Marathahalli',
    h1: 'Car Rental in Marathahalli, Bangalore',
    title: 'Car Rental Marathahalli Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Marathahalli, Bangalore. Corporate travel, airport transfers, outstation trips.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Marathahalli, a busy junction connecting Bangalore\'s eastern IT corridor.',
    geoSummary:
      'Sushi Travels serves Marathahalli, Bangalore for local pickup/drop, corporate travel and outstation trips. Marathahalli sits at a busy junction connecting the Outer Ring Road with the road toward Whitefield, making it a practical pickup point for both IT corridor commutes and city-wide travel.',
    areaDescription:
      'Marathahalli functions as a key connecting junction between Bangalore\'s Outer Ring Road IT corridor and the Whitefield tech park belt, with a mix of residential apartments, offices and retail development that has grown up around this traffic hub. Its position makes it a natural stop for anyone commuting between the ORR companies and Whitefield.',
    bodyParagraphs: [
      'Given its junction location, many of our Marathahalli bookings are corporate — commutes between ORR offices and Whitefield campuses, plus the usual mix of airport transfers and outstation weekend trips common across the city\'s IT belt.',
      'We handle everything from single sedan bookings for daily commutes to Tempo Traveller bookings for office teams heading out on a group offsite.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for daily corporate commutes', 'Toyota Innova for airport transfers with luggage', 'Tempo Traveller for office team travel'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Marathahalli?',
        answer: 'Yes, we serve Marathahalli for local pickup/drop, corporate travel, airport transfers and outstation bookings.',
      },
      {
        question: 'Can I book a corporate commute between ORR and Whitefield?',
        answer: 'Yes — Marathahalli\'s junction location makes it a common pickup point for commutes between Outer Ring Road offices and Whitefield, which we book regularly.',
      },
      {
        question: 'Is airport pickup available from Marathahalli?',
        answer: 'Yes, airport pickup and drop is available from Marathahalli with flight-time coordination on request.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-whitefield', 'car-rental-indiranagar', 'car-rental-koramangala'],
  },
  {
    slug: 'car-rental-hebbal',
    name: 'Hebbal',
    h1: 'Car Rental in Hebbal, Bangalore',
    title: 'Car Rental Hebbal Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Hebbal, Bangalore. Airport transfers, local travel, outstation trips toward North Karnataka.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Hebbal, a key north Bangalore junction on the way to the airport.',
    geoSummary:
      'Sushi Travels serves Hebbal, Bangalore for local pickup/drop, airport transfers and outstation trips. Hebbal is a major junction in north Bangalore that sits along the main route toward Kempegowda International Airport, making it a natural pickup point for airport-bound and northbound travel.',
    areaDescription:
      'Hebbal is a well-known flyover junction in north Bangalore, positioned along the primary road corridor that connects the city centre to Kempegowda International Airport. It has grown into a mixed residential and commercial area, and its location makes it a practical reference point for both airport transfers and travel further north.',
    bodyParagraphs: [
      'Given its position on the airport road, a significant share of our Hebbal bookings are airport pickups and drops, along with outstation trips heading north toward destinations that route through this corridor.',
      'We handle sedan and SUV bookings for individual and family airport travel, plus larger vehicle bookings for groups travelling together from the north side of the city.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for airport transfers', 'Toyota Innova for family airport travel with luggage', 'Tempo Traveller for group travel from north Bangalore'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Hebbal?',
        answer: 'Yes, we serve Hebbal for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'Is Hebbal close to the airport?',
        answer: 'Hebbal sits along the main road corridor toward Kempegowda International Airport, making it a convenient pickup point for airport-bound travel from north Bangalore.',
      },
      {
        question: 'Can I book outstation travel from Hebbal?',
        answer: 'Yes, outstation round trips can be booked with pickup from Hebbal, including routes heading north out of the city.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-yelahanka', 'car-rental-yeshwanthpur', 'car-rental-indiranagar'],
  },
  {
    slug: 'car-rental-yelahanka',
    name: 'Yelahanka',
    h1: 'Car Rental in Yelahanka, Bangalore',
    title: 'Car Rental Yelahanka Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Yelahanka, Bangalore. Airport transfers, local travel, outstation trips with verified drivers.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Yelahanka, a residential area in north Bangalore near the airport.',
    geoSummary:
      'Sushi Travels serves Yelahanka, Bangalore for local pickup/drop, airport transfers and outstation trips. Yelahanka is a residential area in the far north of the city, closer to Kempegowda International Airport than most other Bangalore neighbourhoods, making airport bookings especially quick from here.',
    areaDescription:
      'Yelahanka is one of the northernmost residential areas of Bangalore, historically a satellite town that has grown into the city\'s expanding footprint. Its proximity to Kempegowda International Airport, compared to the rest of the city, is one of its more practical characteristics for travel bookings.',
    bodyParagraphs: [
      'Being close to the airport, Yelahanka sees fast turnaround airport transfer bookings — often shorter pickup and drop times than areas closer to the city centre or on the southern side.',
      'We also handle standard local and outstation bookings from Yelahanka, with the northern location being a natural starting point for routes heading further north out of Karnataka.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for quick airport transfers', 'Toyota Innova for family airport travel', 'Tempo Traveller for group outstation trips'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Yelahanka?',
        answer: 'Yes, we serve Yelahanka for local pickup/drop, airport transfers and outstation bookings.',
      },
      {
        question: 'How close is Yelahanka to the airport?',
        answer: 'Yelahanka is one of the closer residential areas to Kempegowda International Airport compared to most of Bangalore, which usually means a shorter airport transfer time.',
      },
      {
        question: 'Can I book outstation travel from Yelahanka?',
        answer: 'Yes, outstation round trips can be booked with pickup from Yelahanka.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-hebbal', 'car-rental-yeshwanthpur'],
  },
  {
    slug: 'car-rental-yeshwanthpur',
    name: 'Yeshwanthpur',
    h1: 'Car Rental in Yeshwanthpur, Bangalore',
    title: 'Car Rental Yeshwanthpur Bangalore | Sushi Travels',
    metaDescription:
      'Chauffeur-driven car rental for pickup and drop in Yeshwanthpur, Bangalore. Railway station transfers, local travel, outstation trips.',
    heroSubtitle: 'Chauffeur-driven pickup and drop across Yeshwanthpur, a well-connected transit and residential hub in northwest Bangalore.',
    geoSummary:
      'Sushi Travels serves Yeshwanthpur, Bangalore for local pickup/drop, railway station transfers and outstation trips. Yeshwanthpur is a well-connected transit point in northwest Bangalore, known for its railway station and market area, and a mix of residential and industrial development around it.',
    areaDescription:
      'Yeshwanthpur is known primarily as a transit hub in northwest Bangalore, home to one of the city\'s major railway stations along with a busy wholesale market area and a mix of residential and light-industrial development. Its transit-hub character means a good share of local demand relates to onward connections rather than a single destination.',
    bodyParagraphs: [
      'A notable portion of our Yeshwanthpur bookings are railway station pickups and drops, connecting travellers arriving by train with onward local or outstation travel — a sedan is usually sufficient here, though families with more luggage often prefer an Innova.',
      'We also handle standard local and outstation bookings from the surrounding residential neighbourhoods, with routes toward the north and northwest of the city passing through this area.',
    ],
    commonVehicles: ['Sedan (Etios/Dzire) for railway station transfers', 'Toyota Innova for family travel with luggage', 'Tempo Traveller for group outstation trips'],
    faqs: [
      {
        question: 'Do you provide pickup and drop within Yeshwanthpur?',
        answer: 'Yes, we serve Yeshwanthpur for local pickup/drop, railway station transfers and outstation bookings.',
      },
      {
        question: 'Can I book a railway station pickup at Yeshwanthpur?',
        answer: 'Yes — railway station pickup and drop at Yeshwanthpur is one of our regular bookings, with a sedan usually sufficient for standard luggage.',
      },
      {
        question: 'Can I book outstation travel from Yeshwanthpur?',
        answer: 'Yes, outstation round trips can be booked with pickup from Yeshwanthpur.',
      },
    ],
    relatedVehicleSlugs: ['sedan-rental-bangalore', 'innova-rental-bangalore', 'tempo-traveller-rental-bangalore'],
    nearbyLocationSlugs: ['car-rental-hebbal', 'car-rental-yelahanka', 'car-rental-jayanagar'],
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return locationPages.find((p) => p.slug === slug);
}
