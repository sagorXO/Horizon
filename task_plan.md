# Task Plan & RFC — Horizon Skyscraper Reconstruction

## Milestones & Execution Checklist

- [x] Phase 0: Project Memory Initialization & Video Frame Analysis
- [x] Phase 1: Blueprint & Architecture Specification
- [ ] Phase 2: Dual-Engine 3D & Procedural Canvas Assembly System
- [ ] Phase 3: Visual Polish, Typography & Zero-Rounding Styling Pass
- [ ] Phase 4: Verification, Automated Testing & Build Validation

## Architecture & Module Breakdown

1. **`src/components/hero/TowerCanvas.tsx`**: Dual-Engine Renderer (Three.js WebGL + Canvas2D Procedural Fallback Engine). Guaranteed non-failing rendering.
2. **`src/components/hero/ProceduralTowerCanvas.tsx`**: High-performance Canvas2D building renderer with real-time steel, glass, foundation, lighting, and camera pan math.
3. **`src/components/hero/TowerModel.tsx`**: Multi-layer procedural Three.js mesh generator (foundation pilings, steel framework grid, glass facade panels, crown spire).
4. **`src/components/hero/StageCaptions.tsx`**: High-contrast text overlays matching the exact video captions and timing.
5. **`src/components/Navigation.tsx`**: Sharp, borderless, pill-less top navigation bar with luxury branding.
6. **`src/components/sections/`**: Vision, Residences, Amenities, Location Map, and Inquiry Form sections with sharp dark styling.
