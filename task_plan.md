# Task Plan & RFC — Horizon Skyscraper Reconstruction

## Milestones & Execution Summary

- [x] **Phase 0: Memory Initialization & Architecture Blueprint**
  - PRD and constitution defined in `gemini.md`.
  - UI design tokens, typography rules (`Cinzel` serif display + `Helvetica` sans body) established.

- [x] **Phase 1: Typography & Branding Standardization**
  - Configured `Cinzel` font via `next/font/google` in `layout.tsx`.
  - Applied CSS variable `--font-cinzel` to all `h1-h6` display elements in `globals.css`.
  - Added dynamic dark/light logo switching (`HORIZON` logo) in `Navigation.tsx`.

- [x] **Phase 2: High-Definition Sequential Visual Assembly**
  - Created high-definition v2 architectural stage renderings (`v2-stage-0.jpg` through `v2-stage-4.jpg`).
  - Adjusted camera perspective so the **full 45-story tower from foundation base to crown spire tip is completely visible inside the frame**.
  - Implemented smooth crossfade interpolation across scroll progress in `HeroCanvas.tsx`.

- [x] **Phase 3: Smooth Item Flow & HUD Callout System**
  - Built interactive structural fly-in items (`steel girders`, `deck slabs`, `solar glass panels`, `crown/spire`).
  - Added smooth cubic ease-out lerping as elements fly from off-screen into their precise grid positions on scroll.
  - Added HUD technical callout tags (`STEEL GIRDER 250x300`, `COMPOSITE DECK SLAB`, `TRIPLE-GLAZED GLASS PANEL`, `ARCHITECTURAL CROWN`, `AVIATION BEACON SPIRE`).

- [x] **Phase 4: Full Production Verification & Build Validation**
  - TypeScript check: 0 errors (`npx tsc --noEmit`).
  - Next.js Turbopack build: 100% clean static page compilation (`npm run build`).
  - Playwright visual E2E verification across all scroll stages.

---

## Technical File Architecture

1. **`src/components/hero/HeroCanvas.tsx`**: High-def v2 sequence crossfade renderer + floating HUD fly-in items.
2. **`src/components/hero/StageCaptions.tsx`**: Dynamic stage captions (Phase 01 - Phase 05) synced to scroll progress.
3. **`src/components/hero/ProgressRail.tsx`**: Vertical progress indicator (0% to 100%) with active phase checkpoints.
4. **`src/components/Navigation.tsx`**: Scroll-aware luxury glassmorphic navbar with adaptive HORIZON logo.
5. **`public/hero/`**: `v2-stage-0.jpg` through `v2-stage-4.jpg` high-definition stage series.
