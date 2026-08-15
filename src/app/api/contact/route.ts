import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

// In-memory rate limiting with automated cleanup
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimit = new Map<string, RateLimitEntry>();

// Cleanup stale rate limit records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimit.entries()) {
      if (now > entry.resetTime) {
        rateLimit.delete(key);
      }
    }
  }, 300000);
}

export async function POST(req: Request) {
  try {
    // 1. IP extraction for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    
    // 2. Strict Rate Limiting (5 requests per minute)
    const now = Date.now();
    const rateData = rateLimit.get(ip);
    
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= 5) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Too many requests. Please try again after 60 seconds.',
            retryAfter: Math.ceil((rateData.resetTime - now) / 1000)
          },
          { 
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((rateData.resetTime - now) / 1000)),
              'Content-Type': 'application/json'
            }
          }
        );
      }
      rateData.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + 60000 });
    }

    // 3. Payload parsing & sanitization
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }
    
    // 4. Runtime schema validation with Zod
    const validatedData = contactFormSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed.',
          errors: validatedData.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    // 5. Secure audit logging
    const safeLogPayload = {
      timestamp: new Date().toISOString(),
      clientIp: ip.replace(/(\d+\.\d+\.)\d+\.\d+/, '$1*.*'), // Mask IP for privacy
      inquiryType: validatedData.data.inquiryType,
      name: `${validatedData.data.firstName} ${validatedData.data.lastName[0]}.`,
      emailDomain: validatedData.data.email.split('@')[1] || 'hidden',
    };

    console.log('[HORIZON AUDIT LOG: NEW INQUIRY]', JSON.stringify(safeLogPayload));

    // 6. Return standard success envelope
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry successfully processed by HORIZON concierge desk.',
        data: {
          referenceId: `HRZ-${Date.now().toString(36).toUpperCase()}`,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('[HORIZON ERROR: CONTACT ROUTE]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server processing error.' },
      { status: 500 }
    );
  }
}

// Method guards for non-POST requests
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method Not Allowed. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
