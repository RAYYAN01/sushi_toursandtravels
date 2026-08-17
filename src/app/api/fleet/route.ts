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

// Maps Prisma's primary key back to Mongo-style `_id`, and the business
// slug field (`vehicleId` in Postgres, was Mongo's `id` field) back to `id`
// — the shape the frontend already reads/writes.
function toClientVehicle(vehicle: any) {
  const { id, vehicleId, ...rest } = vehicle;
  return { ...rest, id: vehicleId, _id: id };
}

function parseNumberArrayOrDefault(value: any, length: number, fallback: number): number[] {
  if (Array.isArray(value)) return value.map((v) => Number(v));
  return new Array(length).fill(fallback);
}

function parseStringArrayOrDefault(value: any, length: number, fallback: string): string[] {
  if (Array.isArray(value)) return value;
  return new Array(length).fill(fallback);
}

// GET: Public fetch of all vehicles
export async function GET() {
  try {
    await connectDB();
    const vehicles = await prisma.vehicle.findMany({ orderBy: { sortOrder: 'asc' } });
    return NextResponse.json({ success: true, vehicles: vehicles.map(toClientVehicle) });
  } catch (err: any) {
    console.error('Fetch fleet API error:', err);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

// POST: Create new vehicle
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();

    // Validate unique ID
    const existing = await prisma.vehicle.findUnique({ where: { vehicleId: data.id.trim() } });
    if (existing) {
      return NextResponse.json({ error: 'A vehicle with this unique ID already exists' }, { status: 400 });
    }

    const imagesLength = (Array.isArray(data.images) && data.images.length > 0) ? data.images.length : (data.image ? 1 : 0);

    const newVehicle = await prisma.vehicle.create({
      data: {
        vehicleId: data.id.trim(),
        name: data.name.trim(),
        type: data.type.trim(),
        seats: Number(data.seats),
        ac: Boolean(data.ac),
        luggage: Number(data.luggage),
        ratePerKm: Number(data.ratePerKm),
        features: Array.isArray(data.features) ? data.features : data.features.split(',').map((f: string) => f.trim()).filter(Boolean),
        image: data.image || (data.images && data.images[0]) || '',
        images: (Array.isArray(data.images) && data.images.length > 0) ? data.images : (data.image ? [data.image] : []),
        imageFit: data.imageFit || 'cover',
        imageFits: parseStringArrayOrDefault(data.imageFits, imagesLength, data.imageFit || 'cover'),
        imagePositions: parseStringArrayOrDefault(data.imagePositions, imagesLength, '50% 50%'),
        imageScales: parseNumberArrayOrDefault(data.imageScales, imagesLength, 1),
        description: data.description.trim(),
        driverBata: data.driverBata ? Number(data.driverBata) : undefined,
        minKmPerDay: data.minKmPerDay ? Number(data.minKmPerDay) : undefined,
        ratePerKmAc: data.ratePerKmAc ? Number(data.ratePerKmAc) : undefined,
        ratePerKmNonAc: data.ratePerKmNonAc ? Number(data.ratePerKmNonAc) : undefined,
        acOnly: data.acOnly !== undefined ? Boolean(data.acOnly) : undefined,
        hasNonAcOption: data.hasNonAcOption !== undefined ? Boolean(data.hasNonAcOption) : undefined,
        drivingHours: data.drivingHours ? data.drivingHours.trim() : undefined,
        priceDisplay: data.priceDisplay ? data.priceDisplay.trim() : undefined,
        seatsDisplay: data.seatsDisplay ? data.seatsDisplay.trim() : undefined,
        sortOrder: data.sortOrder ? Number(data.sortOrder) : 0,
        showOnHome: data.showOnHome !== undefined ? Boolean(data.showOnHome) : true,
        homeCategory: data.homeCategory ? data.homeCategory.trim() : '',
        categoryOrder: data.categoryOrder !== undefined ? Number(data.categoryOrder) : 0,
      },
    });

    return NextResponse.json({ success: true, vehicle: toClientVehicle(newVehicle) });
  } catch (err: any) {
    console.error('Create vehicle API error:', err);
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}

// PUT: Update existing vehicle(s)
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();

    if (Array.isArray(data)) {
      // Bulk update for rearranging
      await prisma.$transaction(
        data.map((item: any) => {
          if (!item._id) {
            throw new Error('Vehicle DB _id is required for updating');
          }

          const updateData: any = {};
          if (item.id !== undefined) updateData.vehicleId = item.id.trim();
          if (item.name !== undefined) updateData.name = item.name.trim();
          if (item.type !== undefined) updateData.type = item.type.trim();
          if (item.seats !== undefined) updateData.seats = Number(item.seats);
          if (item.ac !== undefined) updateData.ac = Boolean(item.ac);
          if (item.luggage !== undefined) updateData.luggage = Number(item.luggage);
          if (item.ratePerKm !== undefined) updateData.ratePerKm = Number(item.ratePerKm);
          if (item.features !== undefined) {
            updateData.features = Array.isArray(item.features)
              ? item.features
              : item.features.split(',').map((f: string) => f.trim()).filter(Boolean);
          }
          if (item.image !== undefined) updateData.image = item.image;
          if (item.images !== undefined) updateData.images = item.images;
          if (item.imageFit !== undefined) updateData.imageFit = item.imageFit;
          if (item.imageFits !== undefined) updateData.imageFits = item.imageFits;
          if (item.imagePositions !== undefined) updateData.imagePositions = item.imagePositions;
          if (item.imageScales !== undefined) updateData.imageScales = item.imageScales;
          if (item.description !== undefined) updateData.description = item.description.trim();

          if (item.driverBata !== undefined) updateData.driverBata = item.driverBata !== null ? Number(item.driverBata) : null;
          if (item.minKmPerDay !== undefined) updateData.minKmPerDay = item.minKmPerDay !== null ? Number(item.minKmPerDay) : null;
          if (item.ratePerKmAc !== undefined) updateData.ratePerKmAc = item.ratePerKmAc !== null ? Number(item.ratePerKmAc) : null;
          if (item.ratePerKmNonAc !== undefined) updateData.ratePerKmNonAc = item.ratePerKmNonAc !== null ? Number(item.ratePerKmNonAc) : null;
          if (item.acOnly !== undefined) updateData.acOnly = item.acOnly !== null ? Boolean(item.acOnly) : null;
          if (item.hasNonAcOption !== undefined) updateData.hasNonAcOption = item.hasNonAcOption !== null ? Boolean(item.hasNonAcOption) : null;
          if (item.drivingHours !== undefined) updateData.drivingHours = item.drivingHours !== null ? item.drivingHours.trim() : null;
          if (item.priceDisplay !== undefined) updateData.priceDisplay = item.priceDisplay !== null ? item.priceDisplay.trim() : null;
          if (item.seatsDisplay !== undefined) updateData.seatsDisplay = item.seatsDisplay !== null ? item.seatsDisplay.trim() : null;

          if (item.sortOrder !== undefined) updateData.sortOrder = Number(item.sortOrder);
          if (item.showOnHome !== undefined) updateData.showOnHome = Boolean(item.showOnHome);
          if (item.homeCategory !== undefined) updateData.homeCategory = item.homeCategory !== null ? item.homeCategory.trim() : '';
          if (item.categoryOrder !== undefined) updateData.categoryOrder = Number(item.categoryOrder);

          return prisma.vehicle.update({ where: { id: item._id }, data: updateData });
        })
      );

      return NextResponse.json({ success: true, message: 'Bulk update successful' });
    }

    // Single update
    const { _id } = data;
    if (!_id) {
      return NextResponse.json({ error: 'Vehicle DB _id is required for updating' }, { status: 400 });
    }

    // Verify ID uniqueness if vehicle ID string is changing
    const existingId = await prisma.vehicle.findFirst({
      where: { vehicleId: data.id.trim(), NOT: { id: _id } },
    });
    if (existingId) {
      return NextResponse.json({ error: 'Another vehicle is already using this unique ID' }, { status: 400 });
    }

    const imagesLength = (Array.isArray(data.images) && data.images.length > 0) ? data.images.length : (data.image ? 1 : 0);

    try {
      const updatedVehicle = await prisma.vehicle.update({
        where: { id: _id },
        data: {
          vehicleId: data.id.trim(),
          name: data.name.trim(),
          type: data.type.trim(),
          seats: Number(data.seats),
          ac: Boolean(data.ac),
          luggage: Number(data.luggage),
          ratePerKm: Number(data.ratePerKm),
          features: Array.isArray(data.features) ? data.features : data.features.split(',').map((f: string) => f.trim()).filter(Boolean),
          image: data.image || (data.images && data.images[0]) || '',
          images: (Array.isArray(data.images) && data.images.length > 0) ? data.images : (data.image ? [data.image] : []),
          imageFit: data.imageFit || 'cover',
          imageFits: parseStringArrayOrDefault(data.imageFits, imagesLength, data.imageFit || 'cover'),
          imagePositions: parseStringArrayOrDefault(data.imagePositions, imagesLength, '50% 50%'),
          imageScales: parseNumberArrayOrDefault(data.imageScales, imagesLength, 1),
          description: data.description.trim(),
          driverBata: data.driverBata ? Number(data.driverBata) : null,
          minKmPerDay: data.minKmPerDay ? Number(data.minKmPerDay) : null,
          ratePerKmAc: data.ratePerKmAc ? Number(data.ratePerKmAc) : null,
          ratePerKmNonAc: data.ratePerKmNonAc ? Number(data.ratePerKmNonAc) : null,
          acOnly: data.acOnly !== undefined ? Boolean(data.acOnly) : null,
          hasNonAcOption: data.hasNonAcOption !== undefined ? Boolean(data.hasNonAcOption) : null,
          drivingHours: data.drivingHours ? data.drivingHours.trim() : null,
          priceDisplay: data.priceDisplay ? data.priceDisplay.trim() : null,
          seatsDisplay: data.seatsDisplay ? data.seatsDisplay.trim() : null,
          sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : undefined,
          showOnHome: data.showOnHome !== undefined ? Boolean(data.showOnHome) : true,
          homeCategory: data.homeCategory !== undefined ? data.homeCategory.trim() : '',
          categoryOrder: data.categoryOrder !== undefined ? Number(data.categoryOrder) : 0,
        },
      });

      return NextResponse.json({ success: true, vehicle: toClientVehicle(updatedVehicle) });
    } catch (updateErr: any) {
      if (updateErr.code === 'P2025') {
        return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
      }
      throw updateErr;
    }
  } catch (err: any) {
    console.error('Update vehicle API error:', err);
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

// DELETE: Remove vehicle
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    try {
      await prisma.vehicle.delete({ where: { id } });
    } catch (deleteErr: any) {
      if (deleteErr.code === 'P2025') {
        return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
      }
      throw deleteErr;
    }

    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (err: any) {
    console.error('Delete vehicle API error:', err);
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
