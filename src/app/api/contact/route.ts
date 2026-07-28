import { NextResponse } from 'next/server';

// In-memory sliding window rate limiter (max 5 requests per 15 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    // Extract IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many inquiries submitted. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, residence, message } = body;

    // Strict input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json(
        { error: 'Valid full name (1-100 characters) is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    if (phone && (typeof phone !== 'string' || phone.length > 30)) {
      return NextResponse.json(
        { error: 'Phone number must be under 30 characters.' },
        { status: 400 }
      );
    }

    if (residence && (typeof residence !== 'string' || residence.length > 100)) {
      return NextResponse.json(
        { error: 'Residence selection must be under 100 characters.' },
        { status: 400 }
      );
    }

    if (message && (typeof message !== 'string' || message.length > 2000)) {
      return NextResponse.json(
        { error: 'Message must be under 2000 characters.' },
        { status: 400 }
      );
    }

    // Sanitize strings
    const sanitizedName = name.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
    const sanitizedResidence = residence ? residence.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'General Inquiry';
    const sanitizedMessage = message ? message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

    // Log inquiry server-side
    console.log('--- HORIZON PRIVATE RESIDENCE INQUIRY ---');
    console.log(`Name: ${sanitizedName}`);
    console.log(`Email: ${sanitizedEmail}`);
    console.log(`Phone: ${sanitizedPhone || 'N/A'}`);
    console.log(`Residence Interest: ${sanitizedResidence}`);
    console.log(`Message: ${sanitizedMessage || 'N/A'}`);
    console.log('------------------------------------------');

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. A Senior Portfolio Director will contact you shortly.',
        data: { name: sanitizedName, email: sanitizedEmail, residence: sanitizedResidence, timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
