# Research Book & Video Frame Analysis (`findings.md`)

## 1. Frame-by-Frame Video Analysis (`Video.mp4`)
- **00:00 - Ground Plot & City Skyline**:
  - Full-screen city backdrop with realistic high-rise buildings and sky.
  - Vacant central foundation plot with grid markers.
  - Header: Left logo ("HORIZON"), right pill navigation ("Vision", "Residences", "Amenities", "Inquire").
- **00:01 - Stage 1: The Foundation & Structure**:
  - Caption text overlay on left: `"The Foundation & Structure"` + `"Groundwork laid for high-rise excellence"`.
  - Concrete foundation pilings, underground footings, and ground level grid structure assembling.
- **00:02 - Stage 2: Engineered for Resilience**:
  - Caption text overlay: `"Engineered for Resilience"` + `"Steel structural framework assembling floor by floor"`.
  - Steel exoskeleton columns and girders flying into position tier by tier.
- **00:03 - Stage 3: Sustainable & Modern Architecture**:
  - Caption text overlay: `"Sustainable & Modern Architecture"` + `"Floor slabs and high-performance glass curtain walls"`.
  - Reflective double-glazed curtain wall panels attaching to steel framing with metallic reflections.
- **00:04 - 00:06 - Stage 4 & 5: Crown Assembly & High-Rise Elevation**:
  - Camera pans up and tilts gracefully as upper penthouse levels and roof spire assemble into place.
  - Dynamic lighting shifts as building reaches peak height.
- **00:07 - Completed Horizon Skyscraper**:
  - Caption text overlay: `"Welcome to The Future"` + `"A landmark skyline icon engineered for eternity"`.
  - Completed luxury glass and steel skyscraper standing proudly in center skyline with interactive controls.

## 2. Competitor & Sector Benchmarking (15 High-End Reference Sites)
1. **Apple Mac Studio / Mac Pro Product Pages**: Scroll-scrubbed component exploded views & assembly.
2. **Foster + Partners Architectural Portfolios**: Minimalist typography, dark mode, high contrast.
3. **Zaha Hadid Architects Interactive Previews**: Smooth camera orbits and structural wireframes.
4. **Bjarke Ingels Group (BIG) Project Showcases**: Step-by-step structural progression views.
5. **111 West 57th Street (New York)**: Ultra-luxury skyscraper marketing with scroll-pinned hero.
6. **Central Park Tower Luxury Landing**: High-contrast dark aesthetic, sharp geometric lines.
7. **Burj Khalifa Official Visual Showcase**: Elevation indicators and floor tier highlights.
8. **The Shard London Interactive Experience**: Time-of-day sky lighting and panoramic views.
9. **Hudson Yards Manhattan Digital Gallery**: Architectural glass reflections & steel grid overlays.
10. **432 Park Avenue Virtual Experience**: Floor-by-floor residency specs and floorplan selector.
11. **Steinway Tower Digital Brochure**: High-performance WebGL & 2D fallback rendering.
12. **Marina Bay Sands SkyPark Digital Tour**: Dynamic camera transitions and smooth pan controls.
13. **One Vanderbilt Architectural Specs**: Interactive engineering layer toggles (Foundation/Steel/Glass).
14. **Taipei 101 Structural Resilience Showcase**: Tuned mass damper and structural grid animations.
15. **Torre Glòries Barcelona Visual Experience**: Illuminated night sky mode and glass facade shaders.

## 3. Key Technical Decisions & Diagnostics
- **WebGL Fallback Architecture**: WebGL context creation may fail in virtualized/sandboxed browser environments. We must provide a 100% deterministic, high-performance HTML5 Canvas2D / Procedural Vector renderer that renders the identical 3D perspective and assembly sequence if WebGL is unavailable!
- **Scroll Pinning**: Hero section must pin smoothly while scroll progress (0.0 -> 1.0) drives frame assembly, text captions, and camera angles.
- **Zero Rounding & Border Hygiene**: Strict user constraint: sharp rectangular borders, no rounded corners (`rounded-none`), remove side dots/bullets, black background integration (`#000000`).
