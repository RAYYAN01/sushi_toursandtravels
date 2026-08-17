import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('__Host-admin_session');

    if (!tokenCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = verifyToken(tokenCookie.value);
    if (!payload || !payload.authenticated) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email: payload.email });
  } catch (err) {
    console.error('Auth check error:', err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
