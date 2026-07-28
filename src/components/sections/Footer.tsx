'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-12 md:py-24 bg-[#000000] border-t border-white/10">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        
        <div className="flex flex-col gap-6">
          <a
            href="#"
            className="flex flex-col justify-center transition-opacity hover:opacity-80"
          >
            <span className="font-serif italic text-3xl text-white leading-none" style={{ fontFamily: 'Fraunces, serif' }}>
              Horizon
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#D1D5DB] mt-2">
              Residences
            </span>
          </a>
          
          <div className="text-[9px] font-sans tracking-[0.3em] text-[#D1D5DB] flex flex-col gap-1">
            <span>44° 18&apos; N, 73° 58&apos; W</span>
            <span>NEW YORK CITY</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 text-[9px] font-sans uppercase tracking-[0.2em] text-[#D1D5DB]">
          
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
            <a href="#" className="hover:text-white transition-colors">Equal Housing Opportunity</a>
          </div>

          <div className="text-[#D1D5DB]/50 md:text-right">
            © {new Date().getFullYear()} Horizon Residences. <br className="hidden md:block" /> All Rights Reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
}
