# HORIZON — Architectural Residences

[![CI Build & Typecheck](https://github.com/saiedsagar/horizon/actions/workflows/ci.yml/badge.svg)](https://github.com/saiedsagar/horizon/actions)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

An ultra-luxury architectural showcase web application for the **HORIZON Skyscraper**. Featuring hardware-accelerated 4K video scrubbing synced to user scroll, sharp modernist geometry (zero border-radius), and serverless inquiry handling.

---

## 🌟 Key Features

- **Smooth 4K Video Scrub Engine**: Scroll-driven skyscraper assembly rendered via HTML5 Canvas with instant frame 0 preload and zero seek flicker.
- **Modernist Architectural Design**: Zero border-radius, pure black/white high-contrast sections, and Cinzel display typography.
- **Full-Stack Next.js 16 (App Router)**: Serverless API route (`/api/contact`) with Zod schema validation and rate limiting.
- **Vercel-Ready**: Pre-configured caching headers in `vercel.json` for streaming media and high Lighthouse scores.
- **Continuous Integration**: GitHub Actions automated typecheck and build workflow.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build & Test
```bash
npm run build
npm start
```

---

## 📁 Repository Structure

```
├── .github/workflows/ci.yml     # GitHub Actions CI workflow
├── docs/                        # Project documentation & runbooks
│   ├── ARCHITECTURE.md          # Technical architecture & specs
│   ├── DEPLOYMENT.md            # Step-by-step Vercel deployment guide
│   ├── PRD.md                   # Product requirements document
│   ├── SECURITY.md              # Security policies & CSP configuration
│   └── gemini.md                # Project constitution & schemas
├── public/                      # Web-optimized production assets
│   ├── Video.mp4                # 4K FastStart video stream (18MB)
│   ├── logo.png                 # Official brand logo
│   ├── logo-white.svg
│   ├── logo-black.svg
│   └── hero/poster.jpg          # Instant frame 0 poster
├── src/                         # Application source code
│   ├── app/                     # Next.js App Router (pages & API)
│   ├── components/              # UI sections & interactive components
│   ├── hooks/                   # Custom hooks (useVideoScrub)
│   └── lib/                     # Utilities & validation schemas
├── vercel.json                  # Vercel deployment & media caching headers
├── next.config.ts               # Next.js configuration + CSP headers
└── package.json                 # Project dependencies & scripts
```

---

## 🚢 Deployment

Detailed deployment instructions are available in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Deploy instantly with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📄 License

Private & Confidential © 2025 HORIZON. All rights reserved.
