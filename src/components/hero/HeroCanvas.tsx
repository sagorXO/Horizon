'use client';

import React, { useMemo } from 'react';

interface HeroCanvasProps {
  progress: number;
  currentTheme?: 'day' | 'night';
}

/**
 * High-definition v2 Stage images — generated with consistent camera perspective,
 * brownstones, background skyline, and full building framing from ground to spire.
 */
const V2_STAGE_IMAGES = [
  '/hero/v2-stage-0.jpg', // Stage 0: Foundation excavation & footings
  '/hero/v2-stage-1.jpg', // Stage 1: Steel skeleton rise (20 stories)
  '/hero/v2-stage-2.jpg', // Stage 2: Concrete floor slabs & deck installation
  '/hero/v2-stage-3.jpg', // Stage 3: Glass curtain wall panel installation
  '/hero/v2-stage-4.jpg', // Stage 4: Finished 45-story tower with crown & spire
];

const STAGE_BREAKS = [0.0, 0.20, 0.45, 0.65, 0.85, 1.0];

interface FlyItem {
  id: string;
  type: 'beam' | 'glass' | 'crown' | 'spire';
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fromX: number;
  fromY: number;
  enterAt: number;
  settleAt: number;
}

function generateFlyItems(): FlyItem[] {
  const items: FlyItem[] = [];

  // Stage 1 fly-in items: Steel structural girders
  items.push({
    id: 'steel-beam-left',
    type: 'beam',
    label: 'STEEL GIRDER 250x300',
    x: 42, y: 35, w: 16, h: 2,
    fromX: -500, fromY: -200,
    enterAt: 0.12, settleAt: 0.22,
  });
  items.push({
    id: 'steel-beam-right',
    type: 'beam',
    label: 'TRUSS BRACING T-40',
    x: 42, y: 25, w: 16, h: 2,
    fromX: 500, fromY: -150,
    enterAt: 0.18, settleAt: 0.28,
  });

  // Stage 2 fly-in items: Floor slabs
  items.push({
    id: 'floor-deck-mid',
    type: 'beam',
    label: 'COMPOSITE DECK SLAB',
    x: 44, y: 48, w: 12, h: 1.5,
    fromX: -400, fromY: 300,
    enterAt: 0.35, settleAt: 0.46,
  });

  // Stage 3 fly-in items: Solar glass panels
  items.push({
    id: 'glass-panel-left',
    type: 'glass',
    label: 'TRIPLE-GLAZED GLASS PANEL',
    x: 41, y: 42, w: 8, h: 14,
    fromX: -600, fromY: -50,
    enterAt: 0.52, settleAt: 0.64,
  });
  items.push({
    id: 'glass-panel-right',
    type: 'glass',
    label: 'SOLAR REFRACTIVE PANEL',
    x: 51, y: 42, w: 8, h: 14,
    fromX: 600, fromY: -50,
    enterAt: 0.58, settleAt: 0.70,
  });

  // Stage 4 fly-in items: Crown & Spire assembly
  items.push({
    id: 'crown-cap',
    type: 'crown',
    label: 'ARCHITECTURAL CROWN',
    x: 44, y: 10, w: 12, h: 5,
    fromX: 0, fromY: -400,
    enterAt: 0.78, settleAt: 0.88,
  });
  items.push({
    id: 'spire-tip',
    type: 'spire',
    label: 'AVIATION BEACON SPIRE',
    x: 49, y: 4, w: 2, h: 7,
    fromX: 0, fromY: -600,
    enterAt: 0.86, settleAt: 0.96,
  });

  return items;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function HeroCanvas({ progress }: HeroCanvasProps) {
  const flyItems = useMemo(() => generateFlyItems(), []);

  // Compute active image crossfade indexes and blend factor
  const { activeIndex, nextIndex, blendFactor } = useMemo(() => {
    const p = Math.max(0, Math.min(1, progress));
    let idx = 0;
    while (idx < STAGE_BREAKS.length - 2 && p >= STAGE_BREAKS[idx + 1]) {
      idx++;
    }
    const active = Math.min(idx, V2_STAGE_IMAGES.length - 1);
    const next = Math.min(idx + 1, V2_STAGE_IMAGES.length - 1);
    const segStart = STAGE_BREAKS[idx];
    const segEnd = STAGE_BREAKS[idx + 1] ?? 1;
    const segLen = segEnd - segStart;
    const localT = segLen > 0 ? (p - segStart) / segLen : 0;
    const eased = localT * localT * (3 - 2 * localT);
    return { activeIndex: active, nextIndex: next, blendFactor: eased };
  }, [progress]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#111827]">
      {/* Preload v2 stage images */}
      {V2_STAGE_IMAGES.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}

      {/* Layer 1: Base active stage image */}
      <img
        src={V2_STAGE_IMAGES[activeIndex]}
        alt={`Construction Stage ${activeIndex + 1}`}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-300"
        style={{ objectPosition: 'center 50%' }}
        draggable={false}
      />

      {/* Layer 2: Next stage image crossfade */}
      {activeIndex !== nextIndex && (
        <img
          src={V2_STAGE_IMAGES[nextIndex]}
          alt={`Construction Stage ${nextIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            objectPosition: 'center 50%',
            opacity: blendFactor,
            transition: 'opacity 0.15s ease-out',
          }}
          draggable={false}
        />
      )}

      {/* Layer 3: Interactive Structural Items flowing into position on scroll */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {flyItems.map((item) => {
          const p = Math.max(0, Math.min(1, progress));
          let t = 0;
          if (p >= item.settleAt) {
            t = 1;
          } else if (p > item.enterAt) {
            t = (p - item.enterAt) / (item.settleAt - item.enterAt);
            t = easeOutCubic(t);
          }

          if (t <= 0) return null;

          const tx = item.fromX * (1 - t);
          const ty = item.fromY * (1 - t);
          const opacity = Math.min(1, t * 2.5) * (t === 1 ? 0.35 : 0.95); // Fade out slightly once locked into building

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.w}%`,
                height: `${item.h}%`,
                transform: `translate(${tx}px, ${ty}px)`,
                opacity,
                willChange: 'transform, opacity',
              }}
              className="flex flex-col items-center justify-center"
            >
              {/* Item visual representation */}
              {item.type === 'glass' ? (
                <div className="w-full h-full border border-sky-400/80 bg-sky-400/20 backdrop-blur-sm rounded shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
              ) : item.type === 'crown' || item.type === 'spire' ? (
                <div className="w-full h-full border border-amber-400/80 bg-amber-400/30 rounded shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
              ) : (
                <div className="w-full h-full border border-cyan-300/80 bg-slate-800/80 rounded shadow-[0_0_12px_rgba(56,189,248,0.4)]" />
              )}

              {/* Item HUD label (visible while flying in) */}
              {t > 0.05 && t < 0.98 && (
                <div className="absolute -bottom-6 text-[9px] font-mono tracking-widest text-cyan-300 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40 whitespace-nowrap shadow-lg">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(5,5,5,0.85) 100%)',
        }}
      />
    </div>
  );
}
