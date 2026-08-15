# HORIZON Deployment Guide

This guide outlines the deployment workflow for **HORIZON** on **Vercel** connected to **GitHub**.

---

## 1. Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (linked to GitHub)
- Node.js 18+ & npm installed locally

---

## 2. Pushing Code to GitHub

1. Initialize git and commit the changes (if not already done):
   ```bash
   git add .
   git commit -m "feat: organize repository for Vercel and GitHub deployment"
   ```

2. Create a new repository on GitHub (e.g., `horizon-luxury-tower`).

3. Link and push to your GitHub remote:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. One-Click Vercel Deployment

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** → **"Project"**.
3. Select your **GitHub** repository from the list.
4. Vercel automatically detects **Next.js**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. (Optional) Configure environment variables if needed (reference `.env.example`).
6. Click **"Deploy"**.

---

## 4. Continuous Integration (CI)

This repository includes a GitHub Actions workflow at [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) that automatically runs:
- TypeScript type checking (`npx tsc --noEmit`)
- Next.js production build (`npm run build`)

Every pull request or push to `main` is validated before deployment.

---

## 5. Performance & Caching

- `public/Video.mp4` and `public/hero/*` are configured in [`vercel.json`](../vercel.json) with `Cache-Control: public, max-age=31536000, immutable` and `Accept-Ranges: bytes` for fast HTTP 206 partial streaming.
- Hardware-accelerated HTML5 Canvas scrubbing delivers 60 FPS frame playback across desktop and mobile devices.
