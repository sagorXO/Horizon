'use client';

import React from 'react';
import { ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';

export function ResidencesSection() {

  const residences = [
    {
      id: 1,
      name: 'The Garden Villa',
      category: 'GROUND & TERRACE LEVEL',
      tag: 'AVAILABLE',
      beds: '3 Bedrooms',
      baths: '3.5 Baths',
      sqft: '3,850 SQ.FT.',
      price: 'From $4.8M',
      features: ['Private Heated Pool', '400 sq.ft. Deck', 'Direct Forest Trail Access'],
    },
    {
      id: 2,
      name: 'The Horizon Sky Suite',
      category: 'LEVELS 02–04',
      tag: 'EXCLUSIVE',
      beds: '4 Bedrooms',
      baths: '4.5 Baths',
      sqft: '5,200 SQ.FT.',
      price: 'From $6.5M',
      features: ['270° Panoramic Glass', 'Double-Height Ceiling', 'Private Elevator Key'],
    },
    {
      id: 3,
      name: 'The Crown Penthouse',
      category: 'LEVEL 05 CROWN',
      tag: 'PENTHOUSE',
      beds: '5 Bedrooms',
      baths: '6.0 Baths',
      sqft: '8,400 SQ.FT.',
      price: 'Price Upon Request',
      features: ['360° Rooftop Deck', 'Private Helipad Access', 'Dedicated Butler Concierge'],
    },
  ];

  return (
    <section id="residences" className="py-36 md:py-48 bg-[#000000] text-white border-t border-white/10 relative">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 pb-16">
          <div>
            <div className="flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] text-[#38BDF8] mb-8">
              <span className="w-12 h-[1px] bg-[#38BDF8]" />
              Curated Collection
            </div>
            <h2 className="parallax-text text-5xl md:text-7xl lg:text-8xl font-serif italic text-white leading-[0.9] font-light" style={{ fontFamily: 'Fraunces, serif' }}>
              Bespoke <br /> Residences
            </h2>
          </div>
          <p className="text-sm uppercase tracking-[0.1em] font-sans text-[#D1D5DB] max-w-sm">
            Every residence is individually tailored with floor-to-ceiling glass, custom acoustic barrier design, and private outdoors.
          </p>
        </div>

        {/* Residence Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {residences.map((res) => (
            <div
              key={res.id}
              className="group glow-card relative bg-[#000000] backdrop-blur-2xl rounded-none p-8 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transform hover:-translate-y-2 overflow-hidden border border-white/10"
            >
              <div className="glow-bg absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] opacity-0 pointer-events-none w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-none mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div>
                {/* Tag & Category */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#38BDF8]">
                    {res.category}
                  </span>
                  <span className="px-3 py-1 rounded-none text-[10px] font-semibold uppercase tracking-wider bg-[#38BDF8]/20 text-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
                    {res.tag}
                  </span>
                </div>

                {/* Title & Price */}
                <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-2 group-hover:text-[#38BDF8] transition-colors" style={{ fontFamily: 'Fraunces, serif' }}>
                  {res.name}
                </h3>
                <div className="text-lg font-light text-white mb-8 relative z-10">
                  {res.price}
                </div>

                {/* Specs Pill List */}
                <div className="grid grid-cols-3 gap-2 p-4 rounded-none bg-[#000000] backdrop-blur-md mb-8 text-center text-xs text-white relative z-10 transition-all border border-white/10 group-hover:border-white/20">
                  <div className="flex flex-col items-center gap-1">
                    <Bed size={16} className="text-[#38BDF8] drop-shadow-[0_0_5px_#38BDF8]" />
                    <span className="text-[11px] font-light text-[#D1D5DB]">{res.beds}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Bath size={16} className="text-[#38BDF8] drop-shadow-[0_0_5px_#38BDF8]" />
                    <span className="text-[11px] font-light text-[#D1D5DB]">{res.baths}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Maximize2 size={16} className="text-[#38BDF8] drop-shadow-[0_0_5px_#38BDF8]" />
                    <span className="text-[11px] font-light text-[#D1D5DB]">{res.sqft}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 relative z-10">
                  {res.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-[#D1D5DB] font-light">
                      <span className="w-1.5 h-1.5 rounded-none bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <a
                href="#contact"
                className="magnetic-button w-full py-3.5 px-6 rounded-none text-xs uppercase tracking-[0.15em] font-bold bg-white text-black hover:bg-[#E5E7EB] transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
              >
                Inquire Floor Plan
                <ArrowUpRight size={16} strokeWidth={2} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
