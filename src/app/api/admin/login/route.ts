import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import { connectDB, prisma } from '@/lib/db';
import { signToken, verifyToken } from '@/lib/jwt';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// Helper to get SMTP transporter
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: process.env.MAIL_PORT === '465', // true for 465, false for 587 or other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const limitResult = rateLimit(ip, 5, 10 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    await connectDB();
    const body = await req.json();
    const { step } = body;

    const secret = process.env.ADMIN_SECRET_KEY;
    if (!secret) {
      throw new Error('ADMIN_SECRET_KEY env variable is not set');
    }

    // STEP 1: Email and Password verification
    if (step === 1) {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      // Find admin
      const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
      if (!admin) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      // Verify password
      const passwordHash = crypto.createHmac('sha256', secret).update(password).digest('hex');
      if (admin.passwordHash !== passwordHash) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      // Generate temporary token for Step 1 completion
      const tempToken = signToken({ email: admin.email, step: 1 }, 300); // 5 mins
      return NextResponse.json({ success: true, step: 1, tempToken });
    }

    // STEP 2: Secret Key verification & OTP generation
    if (step === 2) {
      const { tempToken, secretKey } = body;
      if (!tempToken || !secretKey) {
        return NextResponse.json({ error: 'Token and secret key are required' }, { status: 400 });
      }

      // Verify temp token
      const payload = verifyToken(tempToken);
      if (!payload || payload.step !== 1) {
        return NextResponse.json({ error: 'Session expired or invalid. Please restart login.' }, { status: 401 });
      }

      // Check Admin Secret Key
      const envSecretKey = process.env.ADMIN_SECRET_KEY;
      if (!envSecretKey || secretKey !== envSecretKey) {
        return NextResponse.json({ error: 'Invalid admin secret key' }, { status: 401 });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpHash = crypto.createHmac('sha256', secret).update(otp).digest('hex');
      const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes validity

      // Send OTP to admin email
      const email = payload.email;
      let emailSent = false;
      let emailError = '';

      try {
        const transporter = getTransporter();
        const mailOptions = {
          from: `"Sushi Travels Admin" <${process.env.MAIL_USER}>`,
          to: email,
          subject: 'Sushi Travels Admin Panel OTP Verification',
          text: `Your OTP for admin panel verification is: ${otp}. It is valid for 5 minutes.`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <h2 style="color: #0c1a30; font-family: serif; margin-bottom: 20px; font-weight: bold; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">Sushi Travels Admin</h2>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">Hello Admin,</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">You are attempting to access the Sushi Travels Admin Dashboard. Please use the following One-Time Password (OTP) to complete step 3 of verification:</p>
              <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #cc8b35; margin: 25px auto; max-width: 250px; border-radius: 12px; font-family: monospace;">
                ${otp}
              </div>
              <p style="font-size: 13px; color: #ef4444; line-height: 1.6; font-weight: 500;">This OTP is valid for 5 minutes. If you did not make this request, please change your credentials immediately.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 15px;" />
              <p style="font-size: 11px; color: #64748b;">This is an automated security email from Sushi Travels. Please do not reply.</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`[Mail] OTP email sent successfully to ${email}`);
      } catch (err: any) {
        console.error('[Mail] Failed to send OTP email via SMTP:', err);
        emailError = err.message || 'SMTP Configuration Error';
      }

      // ALWAYS log the OTP in server console for easy fallback/debugging
      console.log('\n======================================');
      console.log(`[Admin Login OTP] Code: ${otp} (for ${email})`);
      console.log('======================================\n');

      // Generate new tempToken for Step 2 containing OTP hash and expires
      const nextTempToken = signToken({
        email,
        step: 2,
        otpHash,
        otpExpires
      }, 300);

      return NextResponse.json({
        success: true,
        step: 2,
        tempToken: nextTempToken,
        emailSent,
        // If email failed, we notify the user so they can check their terminal console logs for the OTP
        emailNote: emailSent ? null : `Could not send email directly (${emailError}). But we have printed the OTP to your local terminal server log for testing.`
      });
    }

    // STEP 3: OTP Verification & Final Login Cookie
    if (step === 3) {
      const { tempToken, otp } = body;
      if (!tempToken || !otp) {
        return NextResponse.json({ error: 'Token and OTP are required' }, { status: 400 });
      }

      // Verify temp token
      const payload = verifyToken(tempToken);
      if (!payload || payload.step !== 2) {
        return NextResponse.json({ error: 'Session expired or invalid. Please restart login.' }, { status: 401 });
      }

      // Check expiration
      if (Date.now() > payload.otpExpires) {
        return NextResponse.json({ error: 'OTP has expired. Please request a new OTP.' }, { status: 401 });
      }

      // Check OTP value
      const inputOtpHash = crypto.createHmac('sha256', secret).update(otp.trim()).digest('hex');
      if (payload.otpHash !== inputOtpHash) {
        return NextResponse.json({ error: 'Invalid OTP code. Please try again.' }, { status: 401 });
      }

      // Successful login! Generate session token
      const sessionToken = signToken({
        email: payload.email,
        authenticated: true
      }, 86400); // 24 hours

      // Set cookie using next/headers
      const cookieStore = await cookies();
      cookieStore.set('__Host-admin_session', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Logged in successfully' });
    }

    return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
