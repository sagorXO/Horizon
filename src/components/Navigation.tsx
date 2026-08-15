'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Vision', href: '/#vision' },
    { label: 'Projects', href: '/projects' },
    { label: 'Residences', href: '/#residences' },
    { label: 'Amenities', href: '/#amenities' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-black/85 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="z-50 flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="HORIZON"
              className="h-8 w-auto"
              style={{ filter: 'invert(1) brightness(2)' }}
            />
            <span className="hidden sm:inline-block font-cinzel text-xs tracking-[0.3em] text-white/70">
              ATELIER
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-[10px] uppercase font-mono tracking-widest text-white/70 hover:text-[#0EA5E9] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact"
              className="border border-white text-white px-6 py-2.5 text-[10px] uppercase font-mono tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Inquire
            </Link>
          </nav>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center space-y-7 transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.label} 
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm uppercase font-mono tracking-widest text-white/80 hover:text-[#0EA5E9] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link 
          href="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="border border-white text-white px-8 py-3.5 text-xs uppercase font-mono tracking-widest hover:bg-white hover:text-black transition-colors mt-6"
        >
          Inquire Now
        </Link>
      </div>
    </>
  );
}
