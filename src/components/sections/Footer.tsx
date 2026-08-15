'use client';

import Link from 'next/link';

export default function Footer() {
  const links = [
    { label: 'Vision', href: '/#vision' },
    { label: 'Projects', href: '/projects' },
    { label: 'Residences', href: '/#residences' },
    { label: 'Amenities', href: '/#amenities' },
    { label: 'About', href: '/about' },
    { label: 'Inquire', href: '/contact' },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10 py-16 px-6">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="HORIZON" className="h-6 w-auto opacity-70" style={{ filter: 'invert(1) brightness(2)' }} />
          <span className="font-cinzel text-xs tracking-[0.25em] text-white/50">
            ATELIER // HORIZON
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-[#0EA5E9] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            © {new Date().getFullYear()} HORIZON Atelier. All rights reserved.
          </span>
        </div>
        
      </div>
    </footer>
  );
}
