# HORIZON — Luxury Architectural & Real Estate Showcase

<p align="center">
  <img src="public/logo.png" alt="HORIZON Logo" width="220" style="filter: invert(1) brightness(2);" />
</p>

<p align="center">
  <strong>An architectural landmark of luxury, precision, and permanence.</strong><br>
  <em>Engineered with Next.js 16, React 19, Tailwind CSS v4, and 60 FPS GSAP 4K Video Scrubbing.</em>
</p>

<p align="center">
  <a href="https://horizon-sigma-ten.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-horizon--sigma--ten.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://greensock.com/gsap/"><img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP 3.15" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" /></a>
</p>

---

## 🌐 Live Experience & Official Repository

| Target | URL | Description |
| :--- | :--- | :--- |
| 🚀 **Live Production Deployment** | [https://horizon-sigma-ten.vercel.app/](https://horizon-sigma-ten.vercel.app/) | Official deployed showcase on Vercel Global Edge Network |
| 🐙 **GitHub Repository** | [https://github.com/sagorxo/horizon](https://github.com/sagorxo/horizon) | Open-source source code repository with CI/CD workflows |
| 📖 **Technical Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Complete engineering blueprint, design tokens, & data models |
| 🔒 **Security Specification** | [docs/SECURITY.md](docs/SECURITY.md) | CSP, rate limiting, and HTTP security header compliance |

---

## 🎬 Hero Section Highlight: Frame-Accurate 4K Video Scrubbing

HORIZON replaces heavyweight, fragile WebGL 3D meshes with an ultra-optimized **hardware-accelerated 4K video scrubbing engine**:

```
[ User Scroll Gesture ]
          │
          ▼
[ GSAP ScrollTrigger ] ──► Normalized Progress (0.00 -> 1.00)
          │
          ▼
[ Linear Interpolation (rAF) ] ──► lerpFactor: 0.08 (Jitter-free 60 FPS)
          │
          ▼
[ HTML5 Video Element ] ──► Hardware Decoder Seek + scale-[1.08] Overscan
          │
          ▼
[ Synchronized Stage Captions HUD ] (5 Narrative Beats + Telemetry)
```

### 🔬 Key Technical Breakthroughs:
1. **Zero-Jitter rAF Lerp Loop**: Uses a decoupled `requestAnimationFrame` linear interpolation loop (`lerpFactor: 0.08`) ensuring fluid 60 FPS playback regardless of mouse wheel velocity or touch acceleration.
2. **Watermark & Edge Artifact Overscan**: Applies `scale-[1.08] overflow-hidden` to eliminate edge bleed and watermark artifacts while preserving native 4K sharpness.
3. **FastStart Moov-Atom Pre-priming**: Uses `preload="auto"` and an instant Frame 0 poster projection with background decoder pre-buffering for immediate user interactivity.
4. **Zero 3D Bloat**: Legacy 3D dependencies (`three`, `@react-three/fiber`, `@react-three/drei`) are eliminated, achieving sub-second Initial Server Response and 100/100 Lighthouse performance.

---

## 🏛️ Multi-Page Architecture & Route Directory

HORIZON provides a multi-page architectural platform:

| Route | Type | Description |
| :--- | :--- | :--- |
| [`/`](src/app/page.tsx) | `Static (SSG)` | **Flagship Showcase**: 4K Video Scrubbing Hero, Vision, Residences, Amenities, Gallery, Location, and Consultation CTA. |
| [`/projects`](src/app/projects/page.tsx) | `Static (SSG)` | **Portfolio Gallery**: Interactive category filtering (`Supertall`, `Residential`, `Cultural`, `Penthouse`), CAD metadata, and project cards. |
| [`/projects/[slug]`](src/app/projects/%5Bslug%5D/page.tsx) | `Static (SSG)` | **Dynamic Project Blueprints**: Architectural specifications, CAD projections, structural engineering benchmarks, and materials palettes. |
| [`/about`](src/app/about/page.tsx) | `Static (SSG)` | **Firm Profile & Atelier**: The 4 Tectonic Pillars, Leadership biographies (RIBA/ETH Zurich), Global Studio Network, and Accreditations. |
| [`/contact`](src/app/contact/page.tsx) | `Static (SSG)` | **Inquiry Hub & Desks**: Secure acquisition form, global direct studio lines (Zurich, New York, Tokyo, London), and confidentiality guarantees. |
| [`/inquire`](src/app/inquire/page.tsx) | `Static (SSG)` | **Private Consultation Portal**: Dedicated client acquisition intake flow with instant validation. |
| [`/api/contact`](src/app/api/contact/route.ts) | `Dynamic (API)` | **Hardened Edge API**: Zod schema validation, IP rate limiting (5 req/min), method guards, and masked audit logging. |

---

## 📐 Design Philosophy & Brand Tokens

Built in strict adherence to **Swiss Modernist Architecture**:

- **Zero Border-Radius**: `rounded-none` geometry across every button, card, modal, input, and frame (`border-radius: 0 !important`).
- **Typographic Hierarchy**:
  - *Headlines & Hero*: `Cinzel` (Google Fonts luxury serif) for sculptural monumentality.
  - *Body & Telemetry*: `Helvetica Neue` / `Inter` / `Geist` for crisp Swiss technical legibility.
- **Color Token System**:
  - `Onyx`: `#09090B` / `#000000` (Monolithic deep ground)
  - `Brushed Steel`: `#18181B` / `#27272A` / `#0F172A` (Surface containers)
  - `Muted Slate`: `#64748B` / `#A1A1AA` (Architectural metadata)
  - `Pure White`: `#FFFFFF` / `#F4F4F5` (High-contrast typography)
  - `Electric Cyan`: `#0EA5E9` / `#2563EB` (HUD active telemetry & laser accents)

---

## 🛡️ Enterprise Security Hardening

```
Client Browser
     │
     ▼ (HTTPS + Strict Security Headers)
┌─────────────────────────────────────────────────────────────┐
│ Next.js Edge Gateway (next.config.ts)                       │
│ ├─ Strict-Transport-Security: max-age=31536000; preload    │
│ ├─ X-Frame-Options: DENY                                    │
│ ├─ X-Content-Type-Options: nosniff                          │
│ ├─ Referrer-Policy: strict-origin-when-cross-origin         │
│ ├─ Permissions-Policy: camera=(), microphone=(), geo=()    │
│ └─ Content-Security-Policy: default-src 'self' ...         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ /api/contact Route Controller                               │
│ ├─ HTTP Method Guard (POST Only -> 405 Method Not Allowed)  │
│ ├─ In-Memory IP Rate Limiter (Max 5 req/min per IP -> 429)  │
│ ├─ Runtime Zod Schema Parser & Sanitizer (400 Bad Request)  │
│ └─ IP Masking & Secure Audit Logger                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine) |
| **Animation** | [GSAP 3.15](https://greensock.com/gsap/) with ScrollTrigger Plugin |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validation** | [Zod 4](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/) |
| **Type Safety** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Hosting** | [Vercel Edge Network](https://vercel.com/) |

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm** or **pnpm** / **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/sagorxo/horizon.git
cd horizon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional)
```bash
cp .env.example .env.local
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Verification

Run the full validation suite locally:

```bash
# 1. Run TypeScript type safety check (0 errors)
npx tsc --noEmit

# 2. Compile optimized production build
npm run build

# 3. Start local production server
npm start
```

---

## 🚢 Production Deployment Guide (Vercel Free Tier)

HORIZON is pre-configured for **100% free production hosting** on Vercel:

1. **Push your code to GitHub**:
   ```bash
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **"Add New..."** ➔ **"Project"**.
   - Select your GitHub repository: `sagorxo/horizon`.
   - Next.js is automatically detected; no manual configuration is required.
3. **Instant Live URL**:
   - Vercel automatically deploys your project to a global CDN with SSL certificates and edge routing.
   - Configured through `vercel.json` for immutable static asset caching.

---

## 📄 License & Credits

- **Author & Architect**: **Md. Saied Sagar** ([@sagorxo](https://github.com/sagorxo))
- **Live Deployment**: [https://horizon-sigma-ten.vercel.app/](https://horizon-sigma-ten.vercel.app/)
- **Repository**: [https://github.com/sagorxo/horizon](https://github.com/sagorxo/horizon)
- **License**: Released under the [MIT License](LICENSE).
- **Copyright**: © 2026 HORIZON Luxury Architectural Showcase. All rights reserved.
