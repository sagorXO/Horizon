# Project Constitution & PRD — Horizon Luxury Skyscraper

## 1. Product Requirements Document (PRD)
- **Product Name**: Horizon Skyscraper Landing Page
- **Core Value Proposition**: An ultra-luxury, high-performance scrollytelling web experience showcasing the Horizon Skyscraper tower construction assembly in real-time synced directly to user scroll position.
- **Target Audience**: Ultra-high-net-worth buyers, real estate investors, architectural enthusiasts, and luxury property buyers.
- **Key Visual Invariant**: Match the exact visual layout, smooth scroll-driven tower assembly, lighting transitions, crisp typography, and high-contrast dark aesthetic shown in `Video.mp4`.

## 2. Visual & Brand Tokens
- **Color Palette**:
  - Pure Dark / Black: `#000000` / `#050505`
  - Deep Slate / Charcoal: `#0B0F19` / `#111827`
  - High Voltage Accent / Cyan-Sky: `#38BDF8` / `#0284C7`
  - Pure Crisp White: `#FFFFFF`
  - Subtle Muted Silver: `#9CA3AF` / `#E5E7EB`
- **Typography**: Inter / Sans-Serif clean geometric display fonts with wide letter-spacing (`tracking-widest`).
- **Borders & Shapes**: No rounded corners (`rounded-none`), sharp rectangular architectural containers, borderless high-contrast visual depth.

## 3. JSON Data Schemas
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TowerConstructionStage",
  "type": "object",
  "properties": {
    "stage": { "type": "integer", "minimum": 1, "maximum": 5 },
    "title": { "type": "string" },
    "subtitle": { "type": "string" },
    "progressStart": { "type": "number" },
    "progressEnd": { "type": "number" },
    "cameraPosition": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 3,
      "maxItems": 3
    },
    "cameraTarget": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 3,
      "maxItems": 3
    }
  },
  "required": ["stage", "title", "subtitle", "progressStart", "progressEnd"]
}
```

## 4. Operational Runbook & Maintenance
- Development server: `npm run dev` (running on Turbopack / Next.js)
- Build verification: `npm run build`
- Typechecking: `npx tsc --noEmit`
