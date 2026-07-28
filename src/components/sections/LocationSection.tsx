'use client';

import React from 'react';

export function LocationSection() {
  const landmarks = [
    { name: 'Horizon Private Heliport', time: 'Direct On-Site' },
    { name: 'Alpine Golf & Country Club', time: '5 Mins' },
    { name: 'Highland Marina & Yacht Dock', time: '8 Mins' },
    { name: 'Metropolitan Art & Opera Hall', time: '12 Mins' },
    { name: 'International Executive Airport', time: '20 Mins' },
  ];

  return (
    <section id="location" className="py-36 md:py-48 bg-[#000000] relative">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] text-[#38BDF8] mb-8">
                <span className="w-12 h-[1px] bg-[#38BDF8]" />
                Connectivity
              </div>
              <h2 className="parallax-text text-5xl md:text-7xl font-serif italic text-white leading-[0.9] font-light mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
                Secluded <br/> Yet Connected
              </h2>
            </div>
            
            <div className="flex flex-col gap-6">
              {landmarks.map((mark, i) => (
                <div key={i} className="flex items-center justify-between pb-4 group">
                  <span className="text-sm font-sans tracking-wide text-white group-hover:text-[#38BDF8] transition-colors">
                    {mark.name}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D1D5DB]">
                    {mark.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="glow-card w-full aspect-square md:aspect-[4/3] bg-[#000000] relative flex items-center justify-center overflow-hidden">
              <div className="glow-bg absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] opacity-0 pointer-events-none w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-none mix-blend-screen" />
              {/* Minimalist Radar/Map Graphic */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />
              
              <svg className="absolute inset-0 w-full h-full stroke-white/20 fill-none" strokeWidth="1">
                <circle cx="50%" cy="50%" r="20%" />
                <circle cx="50%" cy="50%" r="40%" />
                <circle cx="50%" cy="50%" r="60%" />
                <path d="M 0 50% L 100% 50%" />
                <path d="M 50% 0 L 50% 100%" />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-2 h-2 bg-white rounded-none shadow-[0_0_15px_#FFFFFF]" />
                <div className="w-32 h-32 absolute rounded-none animate-ping opacity-50" />
                <div className="mt-8 text-center flex flex-col gap-2">
                  <div className="text-xs font-serif italic text-white" style={{ fontFamily: 'Fraunces, serif' }}>Horizon Estates</div>
                  <div className="text-[9px] font-sans tracking-[0.3em] text-[#D1D5DB]">44° 18&apos; N, 73° 58&apos; W</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
