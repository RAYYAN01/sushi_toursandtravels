import crypto from 'crypto';
import { prisma } from './db';
import { vehicles } from './vehicles';

// Popular routes data copied from home page
const popularRoutesSeed = [
  {
    from: 'Bangalore',
    to: 'Mysore',
    distance: '143 km',
    duration: '2.5 hrs',
    estimatedPrice: '1,850',
    imageUrl: '/mysuru.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Coorg',
    distance: '250 km',
    duration: '5.5 hrs',
    estimatedPrice: '3,250',
    imageUrl: '/coorg.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Ooty',
    distance: '270 km',
    duration: '6 hrs',
    estimatedPrice: '3,510',
    imageUrl: '/ooty.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Goa',
    distance: '560 km',
    duration: '11 hrs',
    estimatedPrice: '7,280',
    imageUrl: '/goa.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Tirupati',
    distance: '250 km',
    duration: '5.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Pondicherry',
    distance: '310 km',
    duration: '6.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: 'https://images.unsplash.com/photo-1569157087866-f4a8e9250605?auto=format&fit=crop&q=80&w=600',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Hampi',
    distance: '340 km',
    duration: '6 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/hampi.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Kodaikanal',
    distance: '460 km',
    duration: '8.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/kodaikanal.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Munnar',
    distance: '480 km',
    duration: '9 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/munnar.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Wayanad',
    distance: '290 km',
    duration: '6.5 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/wayand.webp',
    tripType: 'Round Trip',
  },
  {
    from: 'Bangalore',
    to: 'Coimbatore (Isha Yoga Center)',
    distance: '365 km',
    duration: '7 hrs',
    estimatedPrice: 'Negotiable',
    imageUrl: '/Isha-Temple.webp',
    tripType: 'Round Trip',
  },
];

const popularReviewsSeed = [
  {
    name: 'Priya Deshmukh',
    location: 'Pune',
    rating: 5,
    text: 'We rented an Innova Crysta for our family road trip from Bangalore to Ooty. The driver was extremely professional, navigating the 36 hairpin bends with ease. The car was spotless and spacious!',
  },
  {
    name: 'Aditya Sen',
    location: 'Kolkata',
    rating: 5,
    text: 'Superb corporate rental service. I booked a Honda City for local transfers in Bangalore. Prompt pickup, courteous driver, and seamless payment. Highly recommend Sushi Travels.',
  },
  {
    name: 'Karthik Rao',
    location: 'Bangalore',
    rating: 5,
    text: 'Excellent outstation service. Booked a 12-seater Tempo Traveller for a pilgrimage to Tirupati. The pushback seats were comfortable for our elders, and the driver knew the route perfectly.',
  },
];

export async function seedDatabase() {
  if ((global as any).dbSeeded || (global as any).dbSeedingInProgress) {
    return;
  }
  (global as any).dbSeedingInProgress = true;
  console.log('Sushi Travels - Checking database seeding status...');

  try {
    // 1. Seed Admin User
    const defaultEmail = process.env.ADMIN_EMAIL;
    const defaultPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET_KEY;
    if (!defaultEmail || !defaultPassword || !secret) {
      throw new Error('[Seed] Missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_SECRET_KEY in environment variables');
    }
    const passwordHash = crypto.createHmac('sha256', secret).update(defaultPassword).digest('hex');
    // The old Mongoose schema had `lowercase: true` on Admin.email, applied
    // automatically on save; replicate that normalization explicitly here.
    const normalizedEmail = defaultEmail.toLowerCase().trim();

    const existingAdmin = await prisma.admin.findFirst();
    if (!existingAdmin) {
      await prisma.admin.create({
        data: { email: normalizedEmail, passwordHash },
      });
      console.log('[Seed] Seeded default Admin user.');
    } else if (existingAdmin.email !== normalizedEmail || existingAdmin.passwordHash !== passwordHash) {
      // If the admin credentials in the DB differ from current env values, update them automatically
      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { email: normalizedEmail, passwordHash },
      });
      console.log('[Seed] Updated Admin credentials from environment variables.');
    }

    // 2. Seed Vehicles
    const vehicleCount = await prisma.vehicle.count();
    if (vehicleCount === 0 && vehicles.length > 0) {
      await prisma.vehicle.createMany({
        data: vehicles.map((v) => ({
          vehicleId: v.id,
          name: v.name,
          type: v.type,
          seats: v.seats,
          ac: v.ac,
          luggage: v.luggage,
          ratePerKm: v.ratePerKm,
          features: v.features,
          image: v.image,
          images: v.images ?? (v.image ? [v.image] : []),
          imageFit: v.imageFit ?? 'cover',
          imageFits: v.imageFits ?? [],
          imagePositions: v.imagePositions ?? [],
          imageScales: v.imageScales ?? [],
          description: v.description,
          driverBata: v.driverBata,
          minKmPerDay: v.minKmPerDay,
          ratePerKmAc: v.ratePerKmAc,
          ratePerKmNonAc: v.ratePerKmNonAc,
          acOnly: v.acOnly,
          hasNonAcOption: v.hasNonAcOption,
          drivingHours: v.drivingHours,
          priceDisplay: v.priceDisplay,
          seatsDisplay: v.seatsDisplay,
          sortOrder: v.sortOrder ?? 0,
        })),
      });
      console.log(`[Seed] Seeded ${vehicles.length} vehicles.`);
    }

    // 3. Seed Popular Routes
    const routeCount = await prisma.popularRoute.count();
    if (routeCount === 0) {
      await prisma.popularRoute.createMany({ data: popularRoutesSeed });
      console.log(`[Seed] Seeded ${popularRoutesSeed.length} holiday routes.`);
    } else {
      // Migrate/Fix the broken Tirupati route image url (Postgres equivalent of the
      // old Mongo updateMany migration step; tripType always has a DB default now
      // so no separate "missing tripType" backfill is needed).
      const tirupatiResult = await prisma.popularRoute.updateMany({
        where: {
          to: 'Tirupati',
          imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010e4056a2f?auto=format&fit=crop&q=80&w=600',
        },
        data: {
          imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        },
      });
      if (tirupatiResult.count > 0) {
        console.log(`[Seed] Updated ${tirupatiResult.count} existing Tirupati routes with working image URL.`);
      }
    }

    // 4. Seed Testimonials/Reviews
    const reviewCount = await prisma.review.count();
    if (reviewCount === 0) {
      await prisma.review.createMany({ data: popularReviewsSeed });
      console.log(`[Seed] Seeded ${popularReviewsSeed.length} testimonials.`);
    }

    (global as any).dbSeeded = true;
  } finally {
    (global as any).dbSeedingInProgress = false;
  }
}
