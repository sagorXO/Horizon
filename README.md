# HORIZON — Next-Generation Architectural & Real Estate Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **HORIZON** is an ultra-luxury architectural showcase web application engineered for the modern web. Built with Next.js App Router, React 19, and Tailwind CSS v4, it features a custom GPU-accelerated 4K scroll-scrub video engine, high-contrast modernist geometry (zero border-radius aesthetic), glassmorphic HUD overlays, and enterprise-grade security hardening.

---

## 🔗 Live Deployments & Links

- 🌐 **Live Showcase**: [https://horizon-architecture.vercel.app](https://horizon-architecture.vercel.app)
- 🐙 **GitHub Repository**: [https://github.com/sagorxo/horizon](https://github.com/sagorxo/horizon)
- 📖 **Technical Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- 🔒 **Security Policy & Headers**: [docs/SECURITY.md](docs/SECURITY.md)

---

## ✨ Key Features

### 🎬 GPU-Accelerated 4K Video Scrubbing Engine
- **Frame-by-Frame Scroll Sync**: Smooth scrubbing tied to viewport scroll with `requestAnimationFrame` lerp interpolation running at a fluid 60 FPS.
- **Zero-Flicker FastStart Preload**: Instant Frame 0 poster projection with pre-cached media metadata to prevent seek stutter and blank flashes.
- **Responsive HTML5 Canvas Pipeline**: Auto-detects device pixel ratios, viewport aspect ratios, and orientations for sharp, artifact-free rendering.

### 🏗️ 5 Construction Stages & Glassmorphic HUD
- Interactive assembly timeline visualizing structural evolution:
  1. **Stage 01: Subterranean Foundation & Deep Bedrock Anchors**
  2. **Stage 02: High-Strength Composite Core & Superstructure**
  3. **Stage 03: Floor Plate Cantilevers & Structural Grid**
  4. **Stage 04: Unitized Double-Glazed Curtain Wall System**
  5. **Stage 05: Crown Architectural Feature & Penthouse Spire**
- Dynamic progress rail indicators with real-time stage caption synchronization.

### 💎 Modernist Aesthetic & Multi-Page Real Estate Suite
- **Signature Design System**: Strict modernist architectural design language with zero border-radius (`rounded-none`), high-contrast obsidian & pearl palettes, and luxury serif typography (`Cinzel`).
- **Comprehensive Flow**:
  - `/` — Immersive 4K Hero Scrub, Architectural Vision, Residences, Amenities, Gallery, and Location Suite.
  - `/inquire` — Dedicated luxury buyer inquiry and private appointment portal with real-time client-side validation.
  - Interactive modal dialogs, slide-over floor plans, and amenity showcases.

### 🛡️ Enterprise Security Hardening & Performance
- **Content Security Policy (CSP)**: Strict nonces and whitelisted domains blocking unauthorized scripts, injections, and object embeddings.
- **HTTP Security Headers**: Enforces `HSTS` (max-age 2 years, includeSubDomains, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`.
- **Defensive API Layer**: Next.js App Router serverless endpoint (`/api/contact`) fortified with Zod schema validation and sliding-window in-memory rate limiting.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling & Tokens** | [Tailwind CSS v4](https://tailwindcss.com/), CSS Custom Properties |
| **Motion & Animation** | [GSAP (GreenSock)](https://greensock.com/gsap/), Canvas 2D API |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Google Fonts (`Cinzel`, `Geist`) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Deployment** | [Vercel Edge Network](https://vercel.com/) |

---

## 🏛️ System Architecture

```
HORIZON Architecture
├── Client Viewport (Scroll Event / Touch)
│    └── useVideoScrub Hook (Lerp Interpolator, rAF Loop)
│         └── HeroVideoScrub Component
│              ├── Hidden <video> Element (FastStart Stream)
│              ├── Target <canvas> (2D Scaled Context)
│              └── Glassmorphic HUD Overlays (Stage Captions & ProgressRail)
│
├── App Router (Pages & Views)
│    ├── / (Main Showcase Experience)
│    ├── /inquire (Private Consultation Form)
│    └── /api/contact (Serverless Route with Zod & Rate Limiting)
│
└── Infrastructure & Security
     ├── next.config.ts (Strict CSP, HSTS, Security Headers)
     ├── vercel.json (Long-Lived Immutable Media Caching)
     └── .github/workflows/ci.yml (Automated Lint, Typecheck, Build)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/sagorxo/horizon.git
cd horizon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file from the provided template:
```bash
cp .env.example .env.local
```

### 4. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the interactive showcase.

---

## 📦 Production Build & Verification

To execute a local production build and verify type safety and asset bundling:

```bash
# Lint code and style rules
npm run lint

# Compile Next.js production build
npm run build

# Start production server
npm start
```

---

## 🚢 Deployment

The project is configured for automated CI/CD and deployment on Vercel:

1. Push code to the `main` branch.
2. Connect your GitHub repository to [Vercel](https://vercel.com/).
3. Vercel will automatically detect Next.js and apply settings configured in [`vercel.json`](vercel.json) and [`next.config.ts`](next.config.ts).

For manual deployment using Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

---

## 📄 License & Credits

- **Author**: Md. Saied Sagar ([@sagorxo](https://github.com/sagorxo))
- **License**: Released under the [MIT License](LICENSE).
- **Design & Architecture**: Crafted exclusively for the **HORIZON** Luxury Architectural Experience.
