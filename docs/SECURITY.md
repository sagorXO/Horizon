# Security Specification — Project HORIZON

> **Version**: 2.0.0  
> **Date**: 2026-08-12  
> **Owner**: DevOps & Security Agent

---

## 1. Security Headers

### 1.1 Next.js Security Headers Configuration

All routes (`/:path*`) must serve the following headers via `next.config.ts`:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unused browser APIs |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforce HTTPS |

### 1.2 Content Security Policy (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  media-src 'self' blob:;
  connect-src 'self' https:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
```

**Notes:**
- `unsafe-eval` required for GSAP in development (can be removed in production with nonce-based CSP)
- `unsafe-inline` required for Tailwind CSS v4 `@theme inline` directive
- `media-src 'self' blob:` allows video playback and blob URLs for canvas operations
- `frame-ancestors 'none'` reinforces X-Frame-Options

### 1.3 Implementation in `next.config.ts`

```typescript
import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  media-src 'self' blob:;
  connect-src 'self' https:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
`.replace(/\n/g, '');

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: cspHeader },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 2. Input Validation (Zod Schemas)

### 2.1 Contact Form Schema

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be under 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be under 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be under 254 characters'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{6,14}$/.test(val.replace(/[\s()-]/g, '')),
      'Please enter a valid phone number'
    ),

  interestType: z.enum(
    ['purchase', 'investment', 'rental', 'general'],
    { errorMap: () => ({ message: 'Please select an interest type' }) }
  ),

  budget: z.enum(
    ['under-5m', '5m-10m', '10m-25m', '25m-50m', 'above-50m', 'undisclosed'],
    { errorMap: () => ({ message: 'Please select a budget range' }) }
  ).optional(),

  message: z
    .string()
    .max(2000, 'Message must be under 2000 characters')
    .optional(),

  preferredContact: z.enum(['email', 'phone', 'either']).default('email'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 2.2 API Route Validation

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // Process validated data (email service, CRM, etc.)
    // ... implementation ...

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 3. Rate Limiting

### 3.1 API Route Rate Limiting

Implement in-memory rate limiting for the contact form API endpoint:

```typescript
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,            // 5 submissions per window
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return true;
  }

  record.count++;
  return false;
}
```

### 3.2 Client-Side Throttling

- Debounce form submission button (300ms minimum between clicks)
- Disable submit button while request is in-flight
- Display success state for 3 seconds before re-enabling

---

## 4. XSS Prevention

### 4.1 React Default Protection

React 19 automatically escapes all rendered strings via `textContent`, preventing stored/reflected XSS. No additional sanitization is needed for JSX string interpolation.

### 4.2 Dangerous Patterns to Avoid

```typescript
// ❌ NEVER: Raw HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ NEVER: Unvalidated URL schemes
<a href={userProvidedUrl}>Link</a>

// ✅ SAFE: React automatic escaping
<p>{userInput}</p>

// ✅ SAFE: Validated URLs only
<a href={validatedUrl.startsWith('https://') ? validatedUrl : '#'}>Link</a>
```

### 4.3 Content Injection Prevention

- All user-submitted content (contact form) is validated via Zod before processing
- No user-generated content is rendered on any page (this is a marketing site)
- No `eval()`, `Function()`, or `innerHTML` usage anywhere in the codebase

---

## 5. CSRF Protection

### 5.1 SameSite Cookie Policy

Next.js API routes should set:
```typescript
// Response cookies (if session management is added later)
response.cookies.set('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
});
```

### 5.2 Origin Validation

API routes must validate the `Origin` header:
```typescript
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'https://horizon-luxury.com',
];

const origin = request.headers.get('origin');
if (origin && !allowedOrigins.includes(origin)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

---

## 6. Secret Management

### 6.1 Environment Variables

```env
# .env.local (NEVER committed to git)
CONTACT_EMAIL_TO=inquiries@horizon-luxury.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://horizon-luxury.com
```

### 6.2 Rules

- `.env.local` is listed in `.gitignore` (verified)
- No secrets in `next.config.ts`, source code, or client bundles
- `NEXT_PUBLIC_*` prefix only for non-sensitive client-exposed values
- Server-only secrets accessed via `process.env` in API routes only

---

## 7. Dependency Security

### 7.1 Audit Schedule

```bash
# Run before every deployment
npm audit

# Fix automatically where possible
npm audit fix

# Check for outdated packages
npm outdated
```

### 7.2 Supply Chain Protection

- Lock file (`package-lock.json`) committed to version control
- Use exact versions for critical dependencies (Next.js, React)
- Review `npm audit` output for any HIGH or CRITICAL vulnerabilities before deploy

---

## 8. Asset Security

### 8.1 Video & Image Assets

- Serve all assets from the same origin (`/public/` directory)
- No external CDN dependencies for critical assets (Video.mp4, stage images)
- Set proper `Cache-Control` headers for static assets

### 8.2 Font Loading

- Google Fonts loaded via `next/font/google` (self-hosted by Next.js at build time)
- No external font CDN requests at runtime
- Font files served from same origin with proper CORS headers

---

## 9. Security Checklist (Pre-Deploy)

- [ ] No hardcoded API keys, passwords, or tokens in source code
- [ ] `.env.local` listed in `.gitignore`
- [ ] All security headers configured in `next.config.ts`
- [ ] CSP policy configured and tested
- [ ] Contact form input validated with Zod (client + server)
- [ ] API route rate limiting implemented
- [ ] No `dangerouslySetInnerHTML` usage
- [ ] No `eval()` or `Function()` usage
- [ ] `npm audit` shows no HIGH/CRITICAL vulnerabilities
- [ ] HTTPS enforced via HSTS header
- [ ] Cookies set with `httpOnly`, `secure`, `sameSite: 'strict'`
