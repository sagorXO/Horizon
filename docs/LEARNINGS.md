# HORIZON — Architectural Playbook & Project Learnings

This document records the engineering decisions, performance optimizations, and solutions developed during the HORIZON project.

---

## 1. Video Scrub Engine (Canvas Buffer Architecture)

- **Problem**: Native `<video>` elements in Chromium/WebKit freeze or display a black surface when `.currentTime` is scrubbed rapidly without continuous playback.
- **Solution**: Decouple decoding from rendering. Keep `<video>` hidden as the hardware decoder, and render frames onto an HTML5 `<canvas>` using `ctx.drawImage()`. The canvas buffer holds the last rendered frame in GPU memory, preventing black flashes.
- **FastStart Optimization**: Placing the MP4 `moov` atom at the start of the file enables instant HTTP 206 Partial Content range requests and eliminates buffering delays.
- **Tuned Lerp Formula**: `lerpFactor = 0.25` with GSAP `scrub: 0.15` and `+=300%` scroll height gives immediate responsiveness with smooth deceleration.

---

## 2. Design System & Typography

- **Font Strategy**: Next.js Google font (`Cinzel`) loaded via CSS variable for monumental headings; system `Helvetica Neue` enforced globally on `body` for clean editorial readability.
- **Zero Border-Radius**: Enforced with `* { border-radius: 0 !important; }` across all UI primitives.
- **Logo Treatment**: CSS `filter: invert(1) brightness(2)` for dark surfaces, default for light surfaces.

---

## 3. Security & API Standards

- **CSP Configuration**: Explicitly include `media-src 'self' blob: data:;` to prevent browser media policy blocks on video streams.
- **Serverless Form Handling**: Zod schema validation + in-memory rate limiting on `/api/contact`.

---

## 4. Deployment & Git Hygiene

- **GitHub 100MB Rule**: Large raw video masters (284MB) isolated in `assets/sources/` and `.gitignore`d; web-optimized 18MB video served from `public/`.
- **Vercel Edge Caching**: Immutable cache headers configured in `vercel.json` for 4K video assets.
- **GitHub Actions CI**: Automated `tsc --noEmit` and `npm run build` validation on push.
