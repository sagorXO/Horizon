'use client';

import React from 'react';

interface StageCaptionsProps {
  progress: number;
}

export interface StageInfo {
  phase: string;
  title: string;
  description: string;
  step?: string;
  eyebrow?: string;
}

export const STAGES: StageInfo[] = [
  {
    phase: 'Phase 01',
    title: 'EXCAVATION & FOUNDATION',
    description: 'Subterranean Footings & Grid',
    step: '01 / 05',
    eyebrow: 'EXCAVATION & FOUNDATION',
  },
  {
    phase: 'Phase 02',
    title: 'STEEL SKELETON',
    description: '45-Story Load-Bearing Frame',
    step: '02 / 05',
    eyebrow: 'STEEL SKELETON',
  },
  {
    phase: 'Phase 03',
    title: 'CONCRETE FLOOR SLABS',
    description: 'Interlocking Decking & Core Slabs',
    step: '03 / 05',
    eyebrow: 'CONCRETE FLOOR SLABS',
  },
  {
    phase: 'Phase 04',
    title: 'GLASS CURTAIN CLADDING',
    description: 'Triple-Glazed Solar Refractive Panels',
    step: '04 / 05',
    eyebrow: 'GLASS CURTAIN CLADDING',
  },
  {
    phase: 'Phase 05',
    title: 'COMPLETED TOWER',
    description: 'Skyline Silhouette & Interior Glow',
    step: '05 / 05',
    eyebrow: 'COMPLETED TOWER',
  },
];

export function StageCaptions({ progress }: StageCaptionsProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  // 5 assembly stages mapping
  let activeIndex = 0;
  if (clampedProgress < 0.20) {
    activeIndex = 0;
  } else if (clampedProgress < 0.45) {
    activeIndex = 1;
  } else if (clampedProgress < 0.65) {
    activeIndex = 2;
  } else if (clampedProgress < 0.85) {
    activeIndex = 3;
  } else {
    activeIndex = 4;
  }

  const activeStage = STAGES[activeIndex];

  return (
    <div className="fixed bottom-12 left-12 z-40 max-w-md w-[calc(100vw-3rem)] sm:w-full pointer-events-none">
      <div className="p-6 rounded-2xl backdrop-blur-lg bg-black/40 border border-white/15 text-white shadow-2xl pointer-events-auto relative overflow-hidden transition-all duration-500">
        <div key={activeStage.phase} className="transition-all duration-500 transform opacity-100 translate-y-0">
          {/* Monospace Phase Indicator */}
          <div className="font-mono text-xs font-semibold tracking-[0.2em] text-[#38BDF8] uppercase mb-1.5 flex items-center gap-2">
            <span>{activeStage.phase}</span>
          </div>

          {/* Large Sleek Cinzel Title */}
          <h2
            className="text-xl md:text-2xl font-bold font-cinzel tracking-tight text-white mb-2 leading-tight"
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, Georgia, serif' }}
          >
            {activeStage.title}
          </h2>

          {/* Light Helvetica Body Text */}
          <p
            className="text-sm text-gray-300 font-light leading-relaxed font-sans"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {activeStage.description}
          </p>
        </div>
      </div>
    </div>
  );
}
