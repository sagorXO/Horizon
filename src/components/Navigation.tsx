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
  onToggleTheme,
  currentTheme = 'day',
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Residences', href: '#residences' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Inquire', href: '#contact' },
  ];

  // Dynamic Theme Colors: Adapt logo & text based on scrolled state or night theme
  const isLightModeHeader = isScrolled && currentTheme === 'day';
  const logoTextColor = isLightModeHeader ? 'text-black' : 'text-white';
  const navLinkColor = isLightModeHeader ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white';
  const buttonStyle = isLightModeHeader
    ? 'border-black/30 bg-black/5 text-black hover:bg-black/10'
    : 'border-white/20 bg-black/40 text-white hover:bg-white/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${
        isScrolled
          ? isLightModeHeader
            ? 'bg-white/80 backdrop-blur-lg border-b border-black/10 shadow-sm'
            : 'bg-black/70 backdrop-blur-lg border-b border-white/10'
          : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left Side: Cinzel Typography Main Logo */}
        <a
          href="#"
          className="group flex items-center transition-opacity hover:opacity-85"
          aria-label="HORIZON Home"
        >
          <span
            className={`font-cinzel tracking-[0.2em] font-bold text-2xl md:text-3xl uppercase transition-colors duration-500 ${logoTextColor}`}
            style={{ fontFamily: 'var(--font-cinzel), Cinzel, Georgia, serif' }}
          >
            HORIZON
          </span>
        </a>

        {/* Right Side: Navigation Links & Controls (Helvetica typography) */}
        <div className="hidden md:flex items-center gap-8 font-sans">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium py-1 ${navLinkColor}`}
                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* DAY / NIGHT Theme Switcher Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 px-4 py-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-300 ${buttonStyle}`}
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              title="Toggle Day/Night Theme"
            >
              {currentTheme === 'day' ? (
                <>
                  <Sun size={13} className="text-amber-500" />
                  <span>Daylight</span>
                </>
              ) : (
                <>
                  <Moon size={13} className="text-sky-400" />
                  <span>Night</span>
                </>
              )}
            </button>
          )}

          {/* Enquire Button */}
          <a
            href="#contact"
            className="px-5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 shadow-sm"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Enquire
          </a>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center gap-3">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border ${buttonStyle}`}
            >
              {currentTheme === 'day' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${logoTextColor} focus:outline-none p-1`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full h-screen bg-black/95 backdrop-blur-xl px-8 py-10 flex flex-col gap-6 border-t border-white/10 font-sans">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl uppercase tracking-[0.2em] font-semibold text-white hover:text-[#38BDF8] transition-colors py-3 border-b border-white/10"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
