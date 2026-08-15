'use client';

import { Waves, Wine, Dumbbell, Telescope, Briefcase, ShieldCheck } from 'lucide-react';

export default function AmenitiesSection() {
  const amenities = [
    { icon: Waves, name: 'Hydrotherapy Spa & Infinity Pool', floor: 'Floor 45', desc: 'A sanctuary of water and light with panoramic city views.' },
    { icon: Wine, name: 'Sommelier Wine Vault', floor: 'Floor 44', desc: 'Climate-controlled private storage and tasting rooms.' },
    { icon: Dumbbell, name: 'High-Performance Wellness & Gym', floor: 'Floor 45', desc: 'Equipped with professional-grade machinery and private studios.' },
    { icon: Telescope, name: 'Sky Deck Observatory', floor: 'Floor 92', desc: 'The highest open-air observation deck in the hemisphere.' },
    { icon: Briefcase, name: 'Executive Boardroom', floor: 'Floor 44', desc: 'State-of-the-art meeting spaces for the global executive.' },
    { icon: ShieldCheck, name: '24/7 Concierge & Valet Security', floor: 'Ground', desc: 'Uncompromising privacy and white-glove service.' },
  ];

  return (
    <section id="amenities" className="bg-[#F8F8F8] text-[#0F172A] py-36 md:py-48 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="text-[10px] tracking-widest text-[#0EA5E9] uppercase mb-4 block">
            Curated Services
          </span>
          <h2 className="font-cinzel text-4xl md:text-5xl">Unrivaled Amenities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {amenities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex flex-col group">
                <div className="w-12 h-12 flex items-center justify-center bg-white border border-[#0F172A]/10 mb-8 transition-transform group-hover:-translate-y-2">
                  <Icon className="text-[#0EA5E9]" size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="font-cinzel text-xl">{item.name}</h3>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#64748B] mb-4 block">
                  {item.floor}
                </span>
                <p className="text-sm text-[#0F172A]/70 leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
