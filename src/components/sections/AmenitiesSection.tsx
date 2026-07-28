'use client';

import React from 'react';
import { Wine, Dumbbell, Shield, Coffee, Waves, Eye } from 'lucide-react';

export function AmenitiesSection() {
  const amenities = [
    {
      icon: Waves,
      name: 'Hydrotherapy Spa & Infinity Pool',
      floor: 'GROUND & TERRACE',
      desc: 'Heated saltwater pool with underwater acoustic audio and panoramic forest views.',
    },
    {
      icon: Wine,
      name: 'Sommelier Wine Vault & Tasting Lounge',
      floor: 'SUBTERRANEAN LEVEL 01',
      desc: 'Temperature and humidity controlled private lockers with sommelier service.',
    },
    {
      icon: Dumbbell,
      name: 'High-Performance Wellness & Gym',
      floor: 'LEVEL 02',
      desc: 'Equipped with Biostrenth technology, sauna, steam room, and cold plunge tanks.',
    },
    {
      icon: Eye,
      name: 'Sky Deck Observatory & Stargazing',
      floor: 'ROOFTOP CROWN',
      desc: 'Private outdoor lounge with custom fire features and astronomical telescope.',
    },
    {
      icon: Coffee,
      name: 'Executive Boardroom & Private Offices',
      floor: 'LEVEL 01',
      desc: 'Encrypted high-speed fiber internet, video conferencing suite, and espresso bar.',
    },
    {
      icon: Shield,
      name: '24/7 Concierge & Valet Security',
      floor: 'ENTRANCE LOBBY',
      desc: 'Discrete biometrics, private vehicle vault, and white-glove resident services.',
    },
  ];

  return (
    <section id="amenities" className="py-32 md:py-40 bg-white text-[#0F172A] border-t border-slate-200 relative">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-[0.3em] text-[#0284C7] font-bold mb-4">
            <span className="w-12 h-[2px] bg-[#0284C7]" />
            EXCLUSIVELY FOR RESIDENTS
          </div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#0F172A] tracking-tight font-normal"
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            Private Amenities & Services
          </h2>
        </div>

        {/* 2-Column Amenity Grid in Crisp White */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {amenities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="p-8 bg-slate-50 border border-slate-200 transition-all duration-300 flex items-start gap-6 group hover:border-[#0284C7] hover:shadow-xl relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7] shrink-0 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-300">
                  <Icon size={22} />
                </div>
                <div className="relative z-10 w-full">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-xl font-serif font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-1 font-bold shrink-0">
                      {item.floor}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
