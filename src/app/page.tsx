import { connectDB, prisma } from '@/lib/db';
import { toClientVehicle, toClient } from '@/lib/dbMappers';
import HomeClient, { HomeVehicle } from './HomeClient';
import type { RouteInfo } from '@/components/RouteCard';
import type { Testimonial } from '@/components/TestimonialCard';

// Vehicle/route/review data is admin-editable via the dashboard, so this page
// stays dynamic (fetched fresh per request) rather than statically cached at
// build time — matches the `force-dynamic` pattern already used by the
// `/api/fleet` and `/api/home-data` routes this page used to fetch from.
export const dynamic = 'force-dynamic';

// Server Component: fetches vehicle/route/review data directly from Postgres
// via Prisma (same queries `/api/home-data` runs, same `toClientVehicle`/
// `toClient` shape-mapping) so the initial server-rendered HTML already
// contains the real fleet/routes/testimonials — a crawler that never
// executes JavaScript now sees the actual content instead of an empty grid.
// All interactivity (search form, FAQ accordion, custom-route modal, etc.)
// lives in the client child, seeded with this data as props.
export default async function Home() {
  let initialVehicles: HomeVehicle[] = [];
  let initialRoutes: RouteInfo[] = [];
  let initialReviews: Testimonial[] = [];
  let hasDataError = false;

  try {
    await connectDB();
    const [vehicles, routes, reviews] = await Promise.all([
      prisma.vehicle.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.popularRoute.findMany(),
      prisma.review.findMany(),
    ]);
    initialVehicles = vehicles.map(toClientVehicle) as unknown as HomeVehicle[];
    initialRoutes = routes.map(toClient) as unknown as RouteInfo[];
    initialReviews = reviews.map(toClient) as unknown as Testimonial[];
  } catch (err) {
    console.error('Error fetching home data (server):', err);
    hasDataError = true;
  }

  return (
    <HomeClient
      initialVehicles={initialVehicles}
      initialRoutes={initialRoutes}
      initialReviews={initialReviews}
      hasDataError={hasDataError}
    />
  );
}
