import { NextResponse } from 'next/server';
import { connectDB, prisma } from '@/lib/db';
import { toClientVehicle, toClient } from '@/lib/dbMappers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // Query all tables concurrently on the database server
    const [vehicles, routes, reviews] = await Promise.all([
      prisma.vehicle.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.popularRoute.findMany(),
      prisma.review.findMany(),
    ]);

    return NextResponse.json({
      success: true,
      vehicles: vehicles.map(toClientVehicle),
      routes: routes.map(toClient),
      reviews: reviews.map(toClient),
    });
  } catch (err: any) {
    console.error('Fetch home data API error:', err);
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 });
  }
}
