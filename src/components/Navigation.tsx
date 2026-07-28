'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  skyBrightness?: number;
  isDarkTheme?: boolean;
  onToggleTheme?: () => void;
  currentTheme?: 'day' | 'night';
}

export function Navigation({
  skyBrightness,
  isDarkTheme = false,
  onToggleTheme,
  currentTheme = 'day',
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoFill = currentTheme === 'day' ? '#0F172A' : '#FFFFFF';
  const logoTextColor = currentTheme === 'day' ? 'text-[#0F172A]' : 'text-white';
  const navLinkColor = currentTheme === 'day' ? 'text-[#1E293B]' : 'text-[#E5E7EB]';

  const navItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Residences', href: '#residences' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? currentTheme === 'day'
            ? 'bg-white/85 backdrop-blur-md py-4 border-b border-slate-200 shadow-sm'
            : 'bg-[#000000]/80 backdrop-blur-md py-4 border-b border-[#1E293B]/50'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 flex items-center justify-between">
        {/* Adaptive Brand Logo Engine (SVG Brand Text "HORIZON") */}
        <a
          href="#"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-85"
          aria-label="HORIZON Home"
        >
          {/* Architectural Horizon SVG Emblem */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-500"
          >
            {/* Outer Architectural Spire Frame */}
            <path
              d="M20 2L36 38H4L20 2Z"
              stroke={logoFill}
              strokeWidth="2"
              strokeLinejoin="miter"
              className="transition-all duration-500"
            />
            {/* Interior Horizon Grid Line */}
            <path
              d="M12 24H28"
              stroke={logoFill}
              strokeWidth="1.5"
              className="transition-all duration-500"
            />
            {/* Crown Apex Spire Notch */}
            <path
              d="M20 2V14"
              stroke="#0284C7"
              strokeWidth="2"
            />
          </svg>

          {/* Luxury Serif Logo Text "HORIZON" */}
          <span
            className={`font-serif tracking-[0.25em] font-extrabold text-2xl md:text-3xl uppercase transition-colors duration-500 ${logoTextColor}`}
            style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
          >
            HORIZON
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[11px] font-sans uppercase tracking-[0.25em] ${navLinkColor} hover:text-[#0284C7] transition-colors relative py-2 font-semibold`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Switcher & Enquire Pill Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* DAY / NIGHT Interactive Lighting Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 px-4 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-300 ${
                currentTheme === 'day'
                  ? 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
                  : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
              }`}
              title="Toggle Daylight & Night Lights View"
            >
              {currentTheme === 'day' ? (
                <>
                  <Sun size={14} className="text-amber-500" />
                  <span>Daylight</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-sky-400" />
                  <span>Night Lights</span>
                </>
              )}
            </button>
          )}

          <a
            href="#contact"
            className="px-7 py-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-[#0284C7] text-white rounded-full hover:bg-[#0369A1] transition-all duration-300 shadow-md"
          >
            Enquire
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              {currentTheme === 'day' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-900 dark:text-white focus:outline-none p-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full h-screen bg-[#000000] px-8 py-12 flex flex-col gap-8 border-t border-[#1E293B]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-sans uppercase tracking-[0.2em] font-bold text-white hover:text-[#38BDF8] transition-colors py-2 border-b border-[#1E293B]/40"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 w-full text-center px-8 py-4 text-xs font-sans font-bold uppercase tracking-[0.2em] bg-[#0284C7] text-white hover:bg-[#0369A1] transition-colors rounded-full"
          >
            Enquire
          </a>
        </nav>
      )}
    </header>
  );
}
