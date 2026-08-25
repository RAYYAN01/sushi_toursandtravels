import { connectDB, prisma } from '@/lib/db';
import { toClientVehicle } from '@/lib/dbMappers';
import { sortVehiclesForDisplay, Vehicle } from '@/lib/vehicles';
import FleetClient from './FleetClient';

// Vehicle data is admin-editable via the dashboard, so this page stays
// dynamic (fetched fresh per request) rather than statically cached at build
// time — matches the `force-dynamic` pattern already used by `/api/fleet`,
// which this page used to fetch from client-side.
export const dynamic = 'force-dynamic';

// Server Component: fetches the fleet directly from Postgres via Prisma
// (same query `/api/fleet` runs, same `toClientVehicle` shape-mapping) so
// the initial server-rendered HTML already contains every vehicle card and
// the ItemList JSON-LD reports the real vehicle count instead of 0 — a
// crawler that never executes JavaScript now sees the actual fleet listing.
// All interactivity (filter chips, "You May Also Like") lives in the client
// child, seeded with this data as props.
export default async function FleetPage() {
  let initialVehicles: Vehicle[] = [];
  let hasDataError = false;

  try {
    await connectDB();
    const vehicles = await prisma.vehicle.findMany({ orderBy: { sortOrder: 'asc' } });
    initialVehicles = sortVehiclesForDisplay(vehicles.map(toClientVehicle) as unknown as Vehicle[]);
  } catch (err) {
    console.error('Error fetching fleet data (server):', err);
    hasDataError = true;
  }

  return <FleetClient initialVehicles={initialVehicles} hasDataError={hasDataError} />;
}
