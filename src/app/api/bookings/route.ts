import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';
import { connectDB, prisma } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';
import { bookingSchema } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

function toClientBooking(booking: any) {
  const { id, ...rest } = booking;
  return { ...rest, _id: id, id };
}

const escapeHtml = (str: string) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Helper to get SMTP transporter
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: process.env.MAIL_PORT === '465',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}


// Helper to authenticate admin
async function isAuthenticated() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('__Host-admin_session');
  if (!tokenCookie) return false;
  const payload = verifyToken(tokenCookie.value);
  return !!(payload && payload.authenticated);
}

// GET: Fetch all bookings (Admin only)
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }); // newest first
    return NextResponse.json({ success: true, bookings: bookings.map(toClientBooking) });
  } catch (err: any) {
    console.error('Fetch bookings API error:', err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST: Public endpoint to submit a booking
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limitResult = rateLimit(ip, 5, 10 * 60 * 1000); // 5 bookings per 10 minutes
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    await connectDB();
    const data = await req.json();

    // Server-side Zod validation
    const parsed = bookingSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 });
    }
    const validatedData = parsed.data;

    // Basic server-side verification/defaults
    const bookingId = data.bookingId || `ST-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = await prisma.booking.create({
      data: {
        bookingId,
        pickupLocation: validatedData.pickupLocation,
        dropLocation: validatedData.dropLocation,
        tripType: validatedData.tripType,
        date: validatedData.date,
        time: validatedData.time,
        returnDate: validatedData.returnDate || null,
        vehicleType: validatedData.vehicleType,
        fullName: validatedData.fullName,
        mobile: validatedData.mobile,
        email: validatedData.email,
        passengers: Number(validatedData.passengers || 1),
        specialRequests: validatedData.specialRequests || '',
        status: 'New',
      },
    });

    // Send WhatsApp details message (Simulated via server console logs)
    console.log('\n======================================================================');
    console.log('📱 [AUTOMATED WHATSAPP MESSAGE SIMULATION]');
    console.log(`To: +91-${newBooking.mobile}`);
    console.log('Message:');
    console.log(`Hello ${newBooking.fullName},`);
    console.log(`Your booking with Sushi Travels has been successfully requested!`);
    console.log(`----------------------------------------------------------------------`);
    console.log(`Booking ID : ${newBooking.bookingId}`);
    console.log(`Trip Type  : ${newBooking.tripType}`);
    console.log(`Pickup     : ${newBooking.pickupLocation}`);
    console.log(`Drop       : ${newBooking.dropLocation}`);
    console.log(`Date & Time: ${newBooking.date} at ${newBooking.time}`);
    console.log(`Vehicle    : ${newBooking.vehicleType}`);
    console.log(`Passengers : ${newBooking.passengers}`);
    if (newBooking.specialRequests) {
      console.log(`Requests   : ${newBooking.specialRequests}`);
    }
    console.log(`----------------------------------------------------------------------`);
    console.log(`Our hospitality executive will contact you shortly to confirm the ride.`);
    console.log('======================================================================\n');

    // Send email notification to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const origin = new URL(req.url).origin;
        const adminUrl = `${origin}/admin`;
        const transporter = getTransporter();
        
        const adminMailOptions = {
          from: `"Sushi Travels Notifications" <${process.env.MAIL_USER}>`,
          to: adminEmail,
          subject: `🚨 New Booking Received - ${newBooking.bookingId}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <h2 style="color: #0c1a30; font-family: serif; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">Sushi Travels - Admin Notification</h2>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">Hello Admin,</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                A new booking has come in. Please check the admin panel to review and manage this request.
              </p>
              
              <div style="margin: 20px 0; text-align: center;">
                <a href="${adminUrl}" style="background-color: #0c1a30; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">
                  Go to Admin Panel
                </a>
              </div>
              
              <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <h3 style="margin-top: 0; font-size: 14px; color: #0c1a30; border-bottom: 1px solid #e7e5e4; padding-bottom: 8px;">Booking Summary</h3>
                <table style="width: 100%; font-size: 13px; color: #4b5563; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; width: 120px;">Booking ID:</td>
                    <td style="padding: 6px 0; color: #0c1a30; font-weight: bold;">${escapeHtml(newBooking.bookingId)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Customer Name:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.fullName)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Mobile:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">+91-${escapeHtml(newBooking.mobile)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Email:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.email)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Trip Type:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.tripType)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Pickup:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.pickupLocation)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Drop:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.dropLocation)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Schedule:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.date)} at ${escapeHtml(newBooking.time)}</td>
                  </tr>
                  ${newBooking.returnDate ? `
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Return Date:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.returnDate)}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Vehicle:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(newBooking.vehicleType)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Passengers:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${newBooking.passengers}</td>
                  </tr>
                  ${newBooking.specialRequests ? `
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Special Requests:</td>
                    <td style="padding: 6px 0; color: #0c1a30; font-style: italic;">"${escapeHtml(newBooking.specialRequests)}"</td>
                  </tr>` : ''}
                </table>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 15px;" />
              <p style="font-size: 11px; color: #64748b;">This is an automated administrative notification from Sushi Travels.</p>
            </div>
          `
        };

        await transporter.sendMail(adminMailOptions);
        console.log(`[Mail] New booking notification email sent successfully to ADMIN (${adminEmail}) for Booking ${newBooking.bookingId}`);
      } else {
        console.warn(`[Mail] ADMIN_EMAIL is not defined. Notification email skipped.`);
      }
    } catch (mailErr) {
      console.error(`[Mail] Failed to send new booking notification email to admin:`, mailErr);
    }

    return NextResponse.json({ success: true, booking: toClientBooking(newBooking) });
  } catch (err: any) {
    console.error('Create booking API error:', err);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

// PUT: Update booking status (Admin only)
export async function PUT(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    const { _id, status } = data;

    if (!_id || !status) {
      return NextResponse.json({ error: 'Booking ID and status are required' }, { status: 400 });
    }

    let updatedBooking;
    try {
      updatedBooking = await prisma.booking.update({
        where: { id: _id },
        data: { status },
      });
    } catch (updateErr: any) {
      if (updateErr.code === 'P2025') {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }
      throw updateErr;
    }

    // Send email notification to customer
    if (status === 'Confirmed' || status === 'Cancelled') {
      try {
        const transporter = getTransporter();
        const mailOptions = {
          from: `"Sushi Travels" <${process.env.MAIL_USER}>`,
          to: updatedBooking.email,
          subject: `Sushi Travels Booking Update - ${updatedBooking.bookingId} [${status}]`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <h2 style="color: #0c1a30; font-family: serif; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">Sushi Travels</h2>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">Hello ${escapeHtml(updatedBooking.fullName)},</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                Your trip booking request <strong>${escapeHtml(updatedBooking.bookingId)}</strong> has been updated to: 
                <span style="font-weight: bold; color: ${status === 'Confirmed' ? '#0d9488' : '#e11d48'}; text-transform: uppercase;">${escapeHtml(status)}</span>.
              </p>
              
              <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; padding: 20px; border-radius: 12px; margin: 25px 0;">
                <h3 style="margin-top: 0; font-size: 14px; color: #0c1a30; border-bottom: 1px solid #e7e5e4; padding-bottom: 8px;">Trip Summary</h3>
                <table style="width: 100%; font-size: 13px; color: #4b5563; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; width: 120px;">Booking ID:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.bookingId)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Trip Type:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.tripType)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Pickup:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.pickupLocation)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Drop:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.dropLocation)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Schedule:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.date)} at ${escapeHtml(updatedBooking.time)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Vehicle:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${escapeHtml(updatedBooking.vehicleType)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Passengers:</td>
                    <td style="padding: 6px 0; color: #0c1a30;">${updatedBooking.passengers}</td>
                  </tr>
                  ${updatedBooking.specialRequests ? `
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600;">Requests:</td>
                    <td style="padding: 6px 0; color: #0c1a30; font-style: italic;">"${escapeHtml(updatedBooking.specialRequests)}"</td>
                  </tr>` : ''}
                </table>
              </div>
              
              <p style="font-size: 13px; color: #334155; line-height: 1.6;">
                ${status === 'Confirmed' 
                  ? 'Chauffeur and vehicle details will be shared with you 2 hours before the scheduled pickup time. Thank you for choosing Sushi Travels!' 
                  : 'This booking request has been cancelled. If you believe this was an error or wish to reschedule, please contact our support team immediately.'}
              </p>
              
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 15px;" />
              <p style="font-size: 11px; color: #64748b;">This is an automated notification from Sushi Travels. Please do not reply directly to this email.</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Mail] Status update email sent successfully to ${updatedBooking.email} for Booking ${updatedBooking.bookingId}`);
      } catch (mailErr) {
        console.error(`[Mail] Failed to send status update email to ${updatedBooking.email}:`, mailErr);
      }
    }

    return NextResponse.json({ success: true, booking: toClientBooking(updatedBooking) });
  } catch (err: any) {
    console.error('Update booking API error:', err);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

// DELETE: Delete booking (Admin only)
export async function DELETE(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    try {
      await prisma.booking.delete({ where: { id } });
    } catch (deleteErr: any) {
      if (deleteErr.code === 'P2025') {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }
      throw deleteErr;
    }

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err: any) {
    console.error('Delete booking API error:', err);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
