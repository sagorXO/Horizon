'use client';

import React from 'react';

interface StageCaptionsProps {
  progress: number;
}

export interface StageInfo {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
}

export const STAGES: StageInfo[] = [
  {
    step: '01 / 04',
    eyebrow: 'FOUNDATION',
    title: 'The Foundation & Structure',
    description:
      'Groundwork laid for high-rise excellence. Deep subterranean footings and reinforced steel ground grids establish an enduring foundation for vertical scale.',
  },
  {
    step: '02 / 04',
    eyebrow: 'STEEL FRAME',
    title: 'Engineered for Resilience',
    description:
      'Steel structural framework assembling floor by floor. Heavy structural steel framing and diagonal load-bearing trusses erect an unyielding architectural skeleton.',
  },
  {
    step: '03 / 04',
    eyebrow: 'GLASS FACADE',
    title: 'Sustainable & Modern Architecture',
    description:
      'Floor slabs and high-performance glass curtain walls. Installation of reflective double-glazed glass panels blending indoor luxury with panoramic altitudes.',
  },
  {
    step: '04 / 04',
    eyebrow: 'COMPLETED TOWER',
    title: 'Welcome to The Future',
    description:
      'A landmark skyline icon engineered for eternity. The crown spire illuminates the skyline silhouette, completing the luxury architectural marvel.',
  },
];

export function StageCaptions({ progress }: StageCaptionsProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // Determine active stage based on normalized scroll progress (0.0 to 1.0)
  // Stage 1: 0.00 - 0.25 | Stage 2: 0.25 - 0.50 | Stage 3: 0.50 - 0.75 | Stage 4: 0.75 - 1.00
  const activeIndex = clampedProgress >= 1
    ? STAGES.length - 1
    : Math.floor(clampedProgress * STAGES.length);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center max-w-[90rem] mx-auto px-8 md:px-16 z-20">
      <div className="max-w-xl text-left relative min-h-[18rem] md:min-h-[22rem] flex items-center">
        {STAGES.map((stage, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={stage.step}
              className={`transition-all duration-700 transform absolute top-0 left-0 w-full ${
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                  : 'opacity-0 translate-y-8 pointer-events-none scale-95'
              }`}
            >
              {/* Cyan Eyebrow & Step Badge Header (#38BDF8) */}
              <div className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#38BDF8] mb-4 flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#38BDF8]/10 border border-[#38BDF8]/40 text-[#38BDF8] font-mono text-[10px] tracking-wider">
                  {stage.step}
                </span>
                <span className="block w-8 h-[1px] bg-[#38BDF8]/60" />
                <span>{stage.eyebrow}</span>
              </div>

              {/* Bold Display Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white drop-shadow-2xl tracking-tight leading-[1.1] mb-6">
                {stage.title}
              </h1>

              {/* Glassmorphic Text Container */}
              <p className="text-xs sm:text-sm md:text-base text-[#E5E7EB] leading-relaxed font-sans max-w-lg backdrop-blur-xl bg-[#0B0F19]/80 p-5 md:p-6 rounded-none border-l-2 border-[#38BDF8] shadow-2xl">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

