# HORIZON — Next-Generation Architectural & Real Estate Showcase

[![Live Demo](https://img.shields.io/badge/Live_Demo-horizon--sigma--ten.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://horizon-sigma-ten.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **HORIZON** is a state-of-the-art digital flagship and architectural showcase engineered for the modern web. Built with **Next.js App Router**, **React 19**, and **Tailwind CSS v4**, HORIZON sets a new standard for luxury real estate experiences by combining cinematic 4K scroll-scrub video storytelling, strict modernist geometry (zero border-radius aesthetic), glassmorphic HUD overlays, and enterprise-grade security hardening.

---

## 🌐 Live Experience & Repository

| Target | URL | Description |
| :--- | :--- | :--- |
| 🚀 **Live Production** | [https://horizon-sigma-ten.vercel.app/](https://horizon-sigma-ten.vercel.app/) | Official deployed showcase on Vercel Edge Network |
| 🐙 **Source Code** | [https://github.com/sagorxo/horizon](https://github.com/sagorxo/horizon) | GitHub repository with full CI/CD workflows |
| 📖 **Technical Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | In-depth engineering specifications & design systems |
| 🔒 **Security Whitepaper** | [docs/SECURITY.md](docs/SECURITY.md) | Content Security Policy, rate-limiting, & audit logs |

---

## 💡 Project Genesis: Why HORIZON Was Built

Traditional luxury real estate and architectural development websites frequently suffer from fundamental flaws:
1. **Static, Disconnected Renders**: Most property sites rely on flat image carousels or heavy, unoptimized PDF brochures that fail to convey spatial scale or architectural mastery.
2. **Fragile 3D / WebGL Performance**: Complex 3D procedural engines often demand massive asset downloads (50MB+), suffer long initial load times, overheat mobile GPUs, and drop frames below acceptable luxury standards.
3. **Generic Templates**: Off-the-shelf templates frequently rely on rounded cards, distracting gradients, and clunky UI fluff that clash with high-end modernist architecture.

### The Vision
**HORIZON was built to solve these challenges** by engineering a seamless hybrid between **high-end cinema and interactive web software**:
- **Tactile Spatial Storytelling**: Allow prospective buyers, investors, and architecture enthusiasts to dynamically control time and structural assembly as they scroll down the page.
- **Flawless 60 FPS Performance**: Deliver 4K visual fidelity without requiring heavyweight WebGL rendering by utilizing a GPU-accelerated video scrubbing canvas engine.
- **Architectural Purity**: Honor modernist architectural principles through clean, monolithic silhouettes, zero border-radius elements, high-contrast monochrome tones, and refined luxury serif typography.

---

## 🎯 What HORIZON Is For

HORIZON serves as the **digital centerpiece** for an ultra-luxury residential skyscraper:
- **Investor & Buyer Pre-Visualization**: Allows ultra-high-net-worth individuals (UHNWIs) to inspect the 5 distinct structural stages of the tower—from deep subterranean bedrock anchors to the penthouse crown spire.
- **Curated Residence Explorer**: Features interactive residence previews, floor plans, and panoramic vantages.
- **Private Acquisition Portal**: Includes a streamlined, fortified consultation request funnel (`/inquire`) with instant client-side validation and secure serverless dispatch.
- **Industry Benchmark**: Demonstrates how modern web technologies (Next.js 16, React 19, Tailwind v4) can deliver boutique-agency visual excellence with enterprise-grade stability and sub-second load times.

---

## 🏗️ How It Was Built: Engineering & Architecture

### 1. 🎬 GPU-Accelerated 4K Video Scrubbing Engine
- **Custom `useVideoScrub` Hook**: Decouples scroll listeners from rendering loops via `requestAnimationFrame` (rAF) and linear interpolation (`lerp`), achieving fluid 60 FPS transitions regardless of scroll velocity.
- **HTML5 Canvas Scaling Pipeline**: Automatically detects device pixel ratios (DPR), viewport dimensions, and orientation to render pixel-crisp frames without letterboxing or distortion.
- **FastStart Zero-Flicker Preload**: Utilizes an instant Frame 0 poster projection combined with pre-cached media metadata to eliminate blank frames and seek latency.

### 2. 🏛️ 5 Construction Stages with Glassmorphic HUD
- Synchronized viewport triggers reveal real-time architectural telemetry across 5 engineering phases:
  - **Stage 01**: *Subterranean Foundation & Deep Bedrock Anchors* (80m deep concrete pilings).
  - **Stage 02**: *High-Strength Composite Core & Superstructure* (Ultra-high performance concrete core).
  - **Stage 03**: *Floor Plate Cantilevers & Structural Grid* (Post-tensioned slabs with column-free spans).
  - **Stage 04**: *Unitized Double-Glazed Curtain Wall System* (Acoustic and thermal low-E facade).
  - **Stage 05**: *Crown Architectural Feature & Penthouse Spire* (Signature aerodynamic crown).
- Dynamic progress rail and telemetry indicators adapt in real time to scroll progress.

### 3. 💎 Monolithic Modernist Design System
- **Zero Border-Radius**: All buttons, cards, containers, dialogs, and inputs utilize `rounded-none` geometry, evoking structural monoliths.
- **Curated Palette**: Obsidian `#050505`, Charcoal `#121212`, Pearl `#FAFAFA`, and Muted Slate `#A3A3A3`.
- **Typographic Hierarchy**: Google Fonts `Cinzel` (sculptural luxury serif for headlines) paired with `Geist Sans` (ultra-legible modern sans-serif for UI telemetry).

### 4. 🛡️ Enterprise Security Hardening
- **Strict Content Security Policy (CSP)**: Nonce-based script execution with zero unsafe-inline allowance.
- **Comprehensive HTTP Security Headers**: Configured via `next.config.ts` with `HSTS` (2-year preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and restrictive `Permissions-Policy`.
- **Fortified Serverless Inquiries**: `/api/contact` route protected by Zod schema validation, input sanitization, and in-memory rate limiting.

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server Components, fast routing, and edge-ready API routes |
| **Frontend UI** | [React 19](https://react.dev/) | React Server Components & stateful interactive client modules |
| **Styling & Tokens** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS-first utility architecture without legacy config overhead |
| **Motion Engine** | [GSAP](https://greensock.com/gsap/) & Canvas 2D | High-precision scroll interpolation and frame rendering |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) | Type-safe schema validation and accessible error states |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), `Cinzel`, `Geist` | Vector icon assets and bespoke luxury typography |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety and predictable data structures |
| **Hosting & CDN** | [Vercel](https://vercel.com/) | Edge caching, instant deployments, and immutable asset delivery |

---

## 📂 Project Structure

```
HORIZON
├── .github/workflows/ci.yml     # Automated CI pipeline (lint, typecheck, build)
├── docs/                        # Agency-grade documentation & runbooks
│   ├── ARCHITECTURE.md          # Full architectural blueprint & design tokens
│   ├── DEPLOYMENT.md            # Step-by-step Vercel production runbook
│   ├── PRD.md                   # Product Requirements Document
│   ├── SECURITY.md              # Security hardening & CSP specifications
│   └── gemini.md                # System constitution & memory schemas
├── public/                      # Production-optimized static assets
│   ├── Video.mp4                # 4K FastStart scrub stream (17MB)
│   ├── logo.png                 # Official brand mark
│   └── hero/poster.jpg          # Frame 0 instant poster
├── src/
│   ├── app/
│   │   ├── api/contact/         # Rate-limited inquiry submission API
│   │   ├── inquire/             # Luxury consultation request page
│   │   ├── layout.tsx           # Root layout with metadata & fonts
│   │   └── page.tsx             # Main showcase assembly page
│   ├── components/
│   │   ├── hero/                # Video scrub canvas, progress rail & HUD
│   │   ├── sections/            # Vision, Residences, Amenities, Gallery, Location
│   │   ├── InquireForm.tsx      # Type-safe inquiry component
│   │   └── Navigation.tsx       # Glassmorphic header & slide-over menu
│   ├── hooks/
│   │   └── useVideoScrub.ts     # 60 FPS lerp scroll-to-frame interpolator
│   └── lib/
│       ├── utils.ts             # Class merging & formatters
│       └── validation.ts        # Zod validation schemas
├── next.config.ts               # Strict CSP & HTTP headers configuration
├── vercel.json                  # Immutable cache policies & media optimization
└── package.json                 # Project dependencies & scripts
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
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the showcase.

---

## 📦 Production Build & Testing

```bash
# Run linting
npm run lint

# Compile production bundle
npm run build

# Start local production server
npm start
```

---

## 🚢 Deployment to Vercel

1. Push your changes to GitHub (`main` branch).
2. Import the repository in [Vercel](https://vercel.com/).
3. Vercel will automatically build and deploy the Next.js project using settings in `vercel.json`.

---

## 📄 License & Credits

- **Author**: **Md. Saied Sagar** ([@sagorxo](https://github.com/sagorxo))
- **Live Deployment**: [https://horizon-sigma-ten.vercel.app/](https://horizon-sigma-ten.vercel.app/)
- **License**: Released under the [MIT License](LICENSE).
- **Copyright**: © 2026 HORIZON Luxury Showcase. All rights reserved.
