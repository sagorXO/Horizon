'use client';

import Link from 'next/link';

export default function Footer() {
  const links = ['Vision', 'Residences', 'Amenities', 'Gallery', 'Location', 'Inquire'];

  return (
    <footer className="bg-black text-white border-t border-white/10 py-12 px-6">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div>
          <img src="/logo.png" alt="HORIZON" className="h-6 w-auto opacity-70" style={{ filter: 'invert(1) brightness(2)' }} />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {links.map((link) => (
            <Link 
              key={link} 
              href={link === 'Inquire' ? '/inquire' : `/#${link.toLowerCase()}`}
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        <div>
          <span className="text-[10px] text-white/40 tracking-wider">
            © 2025 HORIZON. All rights reserved.
          </span>
        </div>
        
      </div>
    </footer>
  );
}
