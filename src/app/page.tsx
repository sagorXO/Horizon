'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { HeroCanvas } from '@/components/hero/HeroCanvas';
import { ProgressRail } from '@/components/hero/ProgressRail';
import { StageCaptions } from '@/components/hero/StageCaptions';
import { VisionSection } from '@/components/sections/VisionSection';
import { ResidencesSection } from '@/components/sections/ResidencesSection';
import { AmenitiesSection } from '@/components/sections/AmenitiesSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { useSectionAnimations } from '@/hooks/useSectionAnimations';
import { useMicroInteractions } from '@/hooks/useMicroInteractions';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<'day' | 'night'>('day');
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useSectionAnimations();
  useMicroInteractions();

  useEffect(() => {
    // Check prefers-reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setScrollProgress(1.0);
      return;
    }

    // Initialize GSAP ScrollTrigger for pinned viewport 3D assembly sequence
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      const st = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      triggerRef.current = st;
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  return (
    <main className="min-h-screen bg-white text-[#0F172A] relative selection:bg-[#0284C7] selection:text-white">
      {/* Fixed Navigation Header with Interactive DAY/NIGHT Theme Switcher */}
      <Navigation
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Vertical Fixed Progress Indicator Rail */}
      <ProgressRail progress={scrollProgress} />

      {/* Pinned Hero Section Viewport — 100% Covered by WebGL Sky & 3D Skyscraper Canvas */}
      <section
        ref={heroRef}
        data-hero="true"
        className="w-full h-screen relative overflow-hidden flex flex-col justify-center items-center"
      >
        {/* 3D WebGL Canvas Viewport Fully Covering Hero Section */}
        <div className="absolute inset-0 w-full h-full z-0">
          <HeroCanvas progress={scrollProgress} currentTheme={currentTheme} />
        </div>

        {/* Left-Aligned Construction Stage Captions Overlay */}
        <StageCaptions progress={scrollProgress} />

        {/* Scroll Prompt Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${
            scrollProgress > 0.95 ? 'opacity-0' : 'opacity-85 animate-pulse'
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#0284C7] font-mono font-bold">
            SCROLL TO BUILD
          </span>
          <div className="w-4 h-7 rounded-none border border-[#0284C7]/50 flex justify-center p-1 bg-white/40 backdrop-blur-sm">
            <div className="w-1 h-1.5 rounded-none bg-[#0284C7] animate-bounce" />
          </div>
        </div>
      </section>

      {/* Alternating High-Contrast Content Sections (White & Dark Charcoal) */}
      <div className="relative z-20">
        <VisionSection />
        <ResidencesSection />
        <AmenitiesSection />
        <LocationSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
