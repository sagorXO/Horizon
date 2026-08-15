import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number, resetTime: number }>();

export async function POST(req: Request) {
  try {
    // Basic IP tracking for rate limiting (fallback for demonstration)
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const rateData = rateLimit.get(ip);
    
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= 5) {
        return NextResponse.json(
          { success: false, message: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
      rateData.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    }

    // Parse body
    const body = await req.json();
    
    // Validate
    const validatedData = contactFormSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, errors: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Log the submission to console (as requested)
    console.log('--- NEW INQUIRY RECEIVED ---');
    console.log(validatedData.data);
    console.log('---------------------------');

    // Return success
    return NextResponse.json(
      { success: true, message: 'Inquiry received' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
