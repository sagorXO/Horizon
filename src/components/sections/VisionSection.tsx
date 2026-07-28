'use client';

import React from 'react';
import { Compass, ShieldCheck, Sun, Layers } from 'lucide-react';

export function VisionSection() {
  const pillars = [
    {
      icon: Compass,
      title: 'Architectural Scale',
      description: 'A monument engineered with ultra-high-strength concrete and structural steel, redefining vertical potential and urban scale.',
    },
    {
      icon: ShieldCheck,
      title: 'Ecological Symbiosis',
      description: 'Integrating bio-facades, natural thermal regulation, and rainwater harvesting to exist in harmony with the environment.',
    },
    {
      icon: Sun,
      title: 'Kinetic Facade',
      description: 'Adaptive double-skin structural glass that responds to solar paths, minimizing glare while maximizing panoramic exposure.',
    },
    {
      icon: Layers,
      title: 'Sanctuary Isolation',
      description: 'Acoustically decoupled floor slabs and triple-paned acoustic glass ensure absolute silence within the urban expanse.',
    },
  ];

  return (
    <section id="vision" className="py-32 md:py-44 bg-white text-[#0F172A] relative border-t border-slate-200">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-28">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#0284C7] mb-8 flex items-center gap-4 font-bold">
              <span className="w-12 h-[2px] bg-[#0284C7]"></span>
              The Vision
            </div>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#0F172A] leading-[0.95] font-normal tracking-tight"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              Redefining <br />
              <span className="italic font-light text-[#0284C7]">The Skyline</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <div className="lg:col-span-4">
              <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed bg-slate-50 p-8 border-l-2 border-[#0284C7]">
                Horizon is not merely constructed; it is crafted as a living monument to sanctuary, privacy, and architectural permanence.
              </p>
            </div>
          </div>
        </div>

        {/* Four Pillar Grid in Clean White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 bg-slate-50 border border-slate-200 transition-all duration-500 hover:border-[#0284C7] hover:shadow-xl relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] mb-8 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-4">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Oversized Stats */}
        <div className="pt-28 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-200 mt-28">
          <div className="flex flex-col">
            <div
              className="text-5xl md:text-7xl font-serif text-[#0F172A] font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              100%
            </div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 font-bold">
              Carbon Neutral
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="text-5xl md:text-7xl font-serif text-[#0F172A] font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              4.2
            </div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 font-bold">
              Acres of Reserve
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="text-5xl md:text-7xl font-serif text-[#0F172A] font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              360°
            </div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 font-bold">
              Panoramic Vistas
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="text-5xl md:text-7xl font-serif text-[#0F172A] font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              PLAT
            </div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-500 font-bold">
              LEED Certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
