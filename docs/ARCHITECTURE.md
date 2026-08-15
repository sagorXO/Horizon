# Technical Architecture — Project HORIZON

> **Version**: 2.0.0  
> **Date**: 2026-08-12  
> **Architect**: Multi-Agent Squad (Lead Architect + WebGL/Motion + UI/UX + DevOps)

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HORIZON APPLICATION                        │
│                                                                    │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  Next.js 16   │  │  Tailwind v4 │  │     GSAP 3.15            │ │
│  │  App Router   │  │  PostCSS     │  │  ScrollTrigger + Lerp    │ │
│  │  Turbopack    │  │  @theme      │  │  requestAnimationFrame   │ │
│  └───────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘ │
│          │                 │                       │               │
│  ┌───────▼─────────────────▼───────────────────────▼─────────────┐ │
│  │                    React 19 Component Tree                    │ │
│  │                                                               │ │
│  │  RootLayout ──► page.tsx ──► Hero (Video Scrub)               │ │
│  │                          ├── Navigation (Glassmorphic)        │ │
│  │                          ├── StageCaptions (Progress-synced)  │ │
│  │                          ├── ProgressRail (Vertical indicator)│ │
│  │                          ├── VisionSection                    │ │
│  │                          ├── ResidencesSection                │ │
│  │                          ├── AmenitiesSection                 │ │
│  │                          ├── LocationSection                  │ │
│  │                          ├── ContactSection (Zod validated)   │ │
│  │                          └── Footer                           │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure (Target)

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, global providers)
│   ├── page.tsx                # Home page (Hero + content sections)
│   ├── globals.css             # Tailwind v4 imports + design tokens + utilities
│   ├── favicon.ico
│   ├── projects/
│   │   ├── page.tsx            # [NEW] Projects gallery listing
│   │   └── [slug]/
│   │       └── page.tsx        # [NEW] Dynamic project detail
│   ├── about/
│   │   └── page.tsx            # [NEW] About page
│   ├── contact/
│   │   └── page.tsx            # [NEW] Contact/Inquire page
│   └── api/
│       └── contact/
│           └── route.ts        # [NEW] Contact form API endpoint
├── components/
│   ├── hero/
│   │   ├── HeroVideoScrub.tsx  # [NEW] Primary video-scrub hero engine
│   │   ├── HeroCanvas.tsx      # [DELETE]
│   │   ├── ProceduralTowerCanvas.tsx # [DELETE]
│   │   ├── ProgressIndicator.tsx # [DELETE]
│   │   ├── StageCaptions.tsx   # [EXISTING] Stage caption overlays
│   │   ├── ProgressRail.tsx    # [EXISTING] Vertical progress indicator
│   │   └── FlyInItems.tsx      # [NEW] Extracted HUD fly-in structural items
│   ├── sections/
│   │   ├── VisionSection.tsx   # [EXISTING]
│   │   ├── ResidencesSection.tsx # [EXISTING]
│   │   ├── AmenitiesSection.tsx # [EXISTING]
│   │   ├── LocationSection.tsx # [EXISTING]
│   │   ├── ContactSection.tsx  # [EXISTING]
│   │   └── Footer.tsx          # [EXISTING]
│   ├── ui/
│   │   ├── Button.tsx          # [NEW] Reusable button component
│   │   ├── Card.tsx            # [NEW] Glassmorphic card component
│   │   ├── Input.tsx           # [NEW] Form input with validation
│   │   └── Badge.tsx           # [NEW] Status/label badge
│   ├── Navigation.tsx          # [EXISTING] Glassmorphic navbar
│   └── ClickToComponent.tsx    # [EXISTING] Dev tool
├── config/
│   ├── stages.ts               # [NEW] Construction stage data definitions
│   ├── navigation.ts           # [NEW] Nav links configuration
│   └── seo.ts                  # [NEW] Per-route metadata definitions
├── hooks/
│   ├── useVideoScrub.ts        # [NEW] Video scrub engine hook
│   ├── useSectionAnimations.ts # [EXISTING]
│   └── useMicroInteractions.ts # [EXISTING]
└── lib/
    ├── tokens.ts               # [EXISTING] Design token exports
    ├── utils.ts                # [NEW] cn() helper + shared utilities
    └── validation.ts           # [NEW] Zod schemas for form validation

# Deleted: src/gl/ (entire WebGL directory), HeroCanvas.tsx, ProceduralTowerCanvas.tsx, ProgressIndicator.tsx

public/
├── Video.mp4                   # Hero scrub source video
├── hero/
│   ├── v2-stage-4.jpg          # Static poster image
│   └── city-backdrop.png       # Background image
├── logo-white.svg
├── logo-black.svg
└── og-image.jpg                # [NEW] Open Graph social preview image
```

---

## 3. Video Scrub Architecture (Core Engine)

### 3.1 Data Flow Diagram

```
┌───────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  User Scroll  │────►│  GSAP            │────►│  ScrollTrigger   │
│  (wheel/touch)│     │  ScrollTrigger   │     │  onUpdate()      │
│               │     │  {               │     │  progress: 0→1   │
└───────────────┘     │    pin: true     │     └────────┬──────────┘
                      │    scrub: true   │              │
                      │    end: +=500%   │              ▼
                      │  }              │     ┌─────────────────┐
                      └──────────────────┘     │  targetTime =    │
                                               │  progress ×      │
                                               │  video.duration  │
                                               └────────┬─────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  rAF Lerp Loop   │
                                               │                 │
                                               │  currentTime +=  │
                                               │  (target -       │
                                               │   current)       │
                                               │  × 0.08          │
                                               └────────┬─────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  video.current   │
                                               │  Time = lerped   │
                                               │  value           │
                                               └─────────────────┘
```

### 3.2 `useVideoScrub` Hook Specification

```typescript
interface UseVideoScrubOptions {
  videoRef: RefObject<HTMLVideoElement>;
  triggerRef: RefObject<HTMLElement>;
  scrollEnd?: string;       // Default: "+=500%"
  lerpFactor?: number;      // Default: 0.08
  scrubSmoothing?: number;  // Default: 1.2 (GSAP scrub value)
}

interface UseVideoScrubReturn {
  progress: number;        // 0.0 → 1.0
  isVideoReady: boolean;   // metadata loaded
  isPlaying: boolean;      // rAF loop active
  duration: number;        // video.duration in seconds
  currentTime: number;     // current seek position
}
```

### 3.3 Lerp Smoothing Algorithm

The lerp (linear interpolation) factor controls how quickly the video's `currentTime` catches up to the scroll-derived target time. Lower values = smoother/laggier, higher values = more responsive/jittery.

```
LERP_FACTOR = 0.08 (tuned for 60Hz displays)

Per frame (via requestAnimationFrame):
  delta = targetTime - currentFrameTime
  if |delta| < 0.001:
    stop seeking (close enough)
  else:
    currentFrameTime += delta * LERP_FACTOR
    video.currentTime = currentFrameTime
```

**Why not direct assignment?** Setting `video.currentTime` directly on every scroll event causes:
1. Frame drops due to I/O-bound video seek operations
2. Visual stuttering as the browser decodes non-sequential keyframes
3. Audio pops (if audio were enabled)

The lerp smooths this into a continuous interpolation that the browser can handle at 60 FPS.

### 3.4 Video Element Requirements

```html
<video
  ref={videoRef}
  src="/Video.mp4"
  poster="/hero/v2-stage-4.jpg"
  preload="auto"
  muted
  playsInline
  className="scale-[1.08]"    <!-- Crop watermark edges -->
  style={{ objectFit: 'cover', objectPosition: 'center' }}
/>
```

Key attributes:
- `preload="auto"` — Pre-buffer entire video for instant seeking
- `muted` — Required for autoplay policies (even though we don't autoplay)
- `playsInline` — Prevent fullscreen hijack on iOS
- `scale(1.08)` — 8% overscan to crop edge watermarks
- **No `autoplay`** — Video is controlled exclusively via `currentTime`

---

## 4. State Management

### 4.1 State Architecture

HORIZON uses **React local state + refs** — no global state library is needed. All state is co-located:

| State | Type | Owner | Consumers |
|-------|------|-------|-----------|
| `scrollProgress` | `number` (0→1) | `page.tsx` | HeroVideoScrub, StageCaptions, ProgressRail, FlyInItems |
| `currentTheme` | `'day' \| 'night'` | `page.tsx` | Navigation, HeroVideoScrub |
| `isVideoReady` | `boolean` | `useVideoScrub` | HeroVideoScrub (fallback logic) |
| `isReducedMotion` | `boolean` | `page.tsx` | All animation consumers |
| `formState` | `object` | `ContactSection` | Form fields, validation display |

### 4.2 Prop Drilling Pattern

```
page.tsx
 ├── scrollProgress ──► HeroVideoScrub
 ├── scrollProgress ──► StageCaptions
 ├── scrollProgress ──► ProgressRail
 ├── scrollProgress ──► FlyInItems
 ├── currentTheme   ──► Navigation
 └── currentTheme   ──► HeroVideoScrub
```

No context providers are required at this scale. If the app grows beyond 3 levels of prop drilling, introduce a `ScrollContext` provider.

---

## 5. GSAP ScrollTrigger Configuration

### 5.1 Hero Pin Configuration

```typescript
ScrollTrigger.create({
  trigger: heroRef.current,
  start: 'top top',
  end: '+=500%',           // 5× viewport heights of scroll travel
  pin: true,               // Pin hero to viewport
  pinSpacing: true,         // Add spacer below for natural document flow
  scrub: 1.2,              // Smooth scrub (higher = more lag)
  anticipatePin: 1,         // Pre-calculate pin position
  onUpdate: (self) => {
    targetTimeRef.current = self.progress * durationRef.current;
    setScrollProgress(self.progress);
  },
});
```

### 5.2 Content Section Animations

Below-the-fold sections use separate ScrollTrigger instances with `start: "top 85%"` for staggered reveal animations (fade-in + translateY).

---

## 6. Rendering Pipeline

### 6.1 Component Rendering Strategy

| Component | Rendering | Reason |
|-----------|-----------|--------|
| `layout.tsx` | Server (RSC) | Static shell, fonts, metadata |
| `page.tsx` | Client (`'use client'`) | GSAP, refs, scroll state |
| `Navigation.tsx` | Client | Scroll-aware theme switching |
| `HeroVideoScrub.tsx` | Client | Video element, rAF loop |
| `StageCaptions.tsx` | Client | Progress-driven display |
| `ProgressRail.tsx` | Client | Progress-driven indicator |
| `VisionSection.tsx` | Client | GSAP reveal animations |
| `ContactSection.tsx` | Client | Form state + validation |
| `projects/page.tsx` | Server (RSC) | Static gallery listing |
| `about/page.tsx` | Server (RSC) | Static content |

### 6.2 Asset Loading Strategy

```
1. Critical Path (blocking):
   ├── layout.tsx shell + fonts (Cinzel, Inter)
   ├── globals.css (inlined by Turbopack)
   └── Navigation component

2. High Priority (preload):
   ├── Video.mp4 (<link rel="preload" as="video">)
   └── v2-stage-4.jpg (poster image)

3. Lazy (on-scroll):
   └── Below-fold section content
```

---

## 7. Fallback Architecture

- **Primary**: Video scrub via `<video>` element + GSAP ScrollTrigger + rAF lerp
- **Fallback**: Static poster image (`v2-stage-4.jpg`) if video cannot load
- **Reduced motion**: Skip to poster image, no animation
- No Canvas2D fallback, no image crossfade, no WebGL

---

## 8. Build & Deploy Architecture

### 8.1 Build Pipeline

```
Source Code
    │
    ▼
Turbopack (Next.js 16 bundler)
    │
    ├── Server Components → Static HTML
    ├── Client Components → JS Bundles (code-split)
    ├── CSS → Tailwind v4 compiled
    └── Assets → Optimized copies in .next/static
    │
    ▼
Output: .next/ directory
    │
    ▼
Deploy Target: Vercel Edge Network (recommended)
  OR: Self-hosted Node.js server
  OR: Static export (limited — no API routes)
```

### 8.2 Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (Turbopack HMR) |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npx tsc --noEmit` | TypeScript type checking |

---

## 9. Performance Optimization Strategy

### 9.1 Video Optimization

1. **Encode for seeking**: Ensure `Video.mp4` has frequent keyframes (every 1-2 seconds) for fast random access
2. **HTTP Range Requests**: Verify server supports `Accept-Ranges: bytes` for partial video loading
3. **Video dimensions**: Match viewport common sizes (1920×1080 or 2560×1440) to avoid scaling artifacts

### 9.2 Image Optimization

1. Use Next.js `<Image>` component for below-fold content images (automatic WebP/AVIF)
2. Hero poster image (`v2-stage-4.jpg`) used for video poster / fallback

### 9.3 JavaScript Optimization

1. GSAP tree-shaking: Import only `gsap` and `ScrollTrigger` (not full GSAP suite)
2. Dynamic imports for below-fold sections: `React.lazy()` or Next.js dynamic imports
3. WebGL modules (`src/gl/`) have been removed

---

## 10. Error Handling

| Scenario | Handling |
|----------|---------|
| Video fails to load | Fall back to static poster image (`v2-stage-4.jpg`), log error |
| GSAP fails to initialize | Render static poster image (`v2-stage-4.jpg`) |
| Contact form submission fails | Display user-friendly error, retry logic |
| Font fails to load | CSS fallback stack: Inter → Helvetica → Arial → sans-serif |
| ScrollTrigger not supported | Render content without pinning |
