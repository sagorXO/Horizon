'use client';

import React from 'react';

interface ProgressRailProps {
  progress: number;
}

export const STAGE_MARKERS = [
  { percent: 0, label: 'Foundation', stageIndex: 0 },
  { percent: 20, label: 'Steel Skeleton', stageIndex: 1 },
  { percent: 45, label: 'Floor Slabs', stageIndex: 2 },
  { percent: 65, label: 'Glass Cladding', stageIndex: 3 },
  { percent: 85, label: 'Completed', stageIndex: 4 },
  { percent: 100, label: 'Complete', stageIndex: 4 },
];

export function ProgressRail({ progress }: ProgressRailProps) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const isComplete = progress >= 0.99 || percentage >= 99;

  return (
    <aside
      aria-label="Tower Construction Progress Rail"
      className={`fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6 select-none transition-all duration-700 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Assembly Percentage Display Header */}
      <div className="flex flex-col items-center text-center">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#9CA3AF] font-mono font-medium mb-1">
          ASSEMBLY
        </span>
        <span className="text-sm md:text-base font-mono font-extrabold text-[#38BDF8] tracking-widest min-w-[3.5rem]">
          {percentage}%
        </span>
      </div>

      {/* Main Vertical Track & Stage Markers Container */}
      <div className="relative h-64 md:h-80 w-12 flex justify-center items-center">
        {/* Background Rail Line */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-[#1E293B]" />

        {/* Dynamic Progress Fill Line */}
        <div
          className="absolute top-0 w-[2px] bg-[#38BDF8] transition-all duration-150 ease-out shadow-[0_0_10px_#38BDF8]"
          style={{ height: `${percentage}%` }}
        />

        {/* 5 Stage Markers reflecting assembly stages (0%, 20%, 45%, 65%, 85%, 100%) */}
        <div className="absolute inset-0">
          {STAGE_MARKERS.map((marker) => {
            const isReached = percentage >= marker.percent;
            const topPos = marker.percent === 100 ? '98%' : `${marker.percent}%`;

            return (
              <div
                key={marker.percent}
                className="absolute left-0 right-0 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                style={{ top: topPos }}
              >
                {/* Horizontal Indicator Notch */}
                <div
                  className={`h-[2px] transition-all duration-300 ${
                    isReached
                      ? 'w-4 bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]'
                      : 'w-2 bg-[#475569]'
                  }`}
                />

                {/* Tooltip / Label Flyout on Left */}
                <div className="absolute right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-[#0B0F19]/90 border border-[#1E293B] px-3 py-1.5 backdrop-blur-md flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#38BDF8]">
                    {marker.percent}%
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#F3F4F6]">
                    {marker.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
