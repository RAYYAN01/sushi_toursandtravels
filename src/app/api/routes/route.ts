import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB, prisma } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// Helper to authenticate admin
async function isAuthenticated() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('__Host-admin_session');
  if (!tokenCookie) return false;
  const payload = verifyToken(tokenCookie.value);
  return !!(payload && payload.authenticated);
}

function toClient(route: any) {
  const { id, ...rest } = route;
  return { ...rest, _id: id, id };
}

// GET: Public fetch of all popular routes
export async function GET() {
  try {
    await connectDB();
    const routes = await prisma.popularRoute.findMany();
    return NextResponse.json({ success: true, routes: routes.map(toClient) });
  } catch (err: any) {
    console.error('Fetch routes API error:', err);
    return NextResponse.json({ error: 'Failed to fetch holiday routes' }, { status: 500 });
  }
}

// POST: Create new route
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();

    const newRoute = await prisma.popularRoute.create({
      data: {
        from: data.from.trim(),
        to: data.to.trim(),
        distance: data.distance.trim(),
        duration: data.duration.trim(),
        estimatedPrice: data.estimatedPrice.trim(),
        imageUrl: data.imageUrl,
        tripType: data.tripType ? data.tripType.trim() : 'Round Trip',
      },
    });

    return NextResponse.json({ success: true, route: toClient(newRoute) });
  } catch (err: any) {
    console.error('Create route API error:', err);
    return NextResponse.json({ error: 'Failed to create route' }, { status: 500 });
  }
}

// PUT: Update existing route
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    const { _id } = data;

    if (!_id) {
      return NextResponse.json({ error: 'Route ID is required for updating' }, { status: 400 });
    }

    try {
      const updatedRoute = await prisma.popularRoute.update({
        where: { id: _id },
        data: {
          from: data.from.trim(),
          to: data.to.trim(),
          distance: data.distance.trim(),
          duration: data.duration.trim(),
          estimatedPrice: data.estimatedPrice.trim(),
          imageUrl: data.imageUrl,
          tripType: data.tripType ? data.tripType.trim() : 'Round Trip',
        },
      });

      return NextResponse.json({ success: true, route: toClient(updatedRoute) });
    } catch (updateErr: any) {
      if (updateErr.code === 'P2025') {
        return NextResponse.json({ error: 'Route not found' }, { status: 404 });
      }
      throw updateErr;
    }
  } catch (err: any) {
    console.error('Update route API error:', err);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}

// DELETE: Remove route
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Route ID is required' }, { status: 400 });
    }

    try {
      await prisma.popularRoute.delete({ where: { id } });
    } catch (deleteErr: any) {
      if (deleteErr.code === 'P2025') {
        return NextResponse.json({ error: 'Route not found' }, { status: 404 });
      }
      throw deleteErr;
    }

    return NextResponse.json({ success: true, message: 'Route deleted successfully' });
  } catch (err: any) {
    console.error('Delete route API error:', err);
    return NextResponse.json({ error: 'Failed to delete route' }, { status: 500 });
  }
}
