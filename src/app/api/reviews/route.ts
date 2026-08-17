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

function toClient(review: any) {
  const { id, ...rest } = review;
  return { ...rest, _id: id, id };
}

// GET: Public fetch of all reviews
export async function GET() {
  try {
    await connectDB();
    const reviews = await prisma.review.findMany();
    return NextResponse.json({ success: true, reviews: reviews.map(toClient) });
  } catch (err: any) {
    console.error('Fetch reviews API error:', err);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST: Create new review
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();

    const newReview = await prisma.review.create({
      data: {
        name: data.name.trim(),
        location: data.location.trim(),
        rating: Number(data.rating),
        text: data.text.trim(),
      },
    });

    return NextResponse.json({ success: true, review: toClient(newReview) });
  } catch (err: any) {
    console.error('Create review API error:', err);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}

// PUT: Update existing review
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    const { _id } = data;

    if (!_id) {
      return NextResponse.json({ error: 'Review ID is required for updating' }, { status: 400 });
    }

    try {
      const updatedReview = await prisma.review.update({
        where: { id: _id },
        data: {
          name: data.name.trim(),
          location: data.location.trim(),
          rating: Number(data.rating),
          text: data.text.trim(),
        },
      });

      return NextResponse.json({ success: true, review: toClient(updatedReview) });
    } catch (updateErr: any) {
      if (updateErr.code === 'P2025') {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }
      throw updateErr;
    }
  } catch (err: any) {
    console.error('Update review API error:', err);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE: Remove review
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    try {
      await prisma.review.delete({ where: { id } });
    } catch (deleteErr: any) {
      if (deleteErr.code === 'P2025') {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 });
      }
      throw deleteErr;
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (err: any) {
    console.error('Delete review API error:', err);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
