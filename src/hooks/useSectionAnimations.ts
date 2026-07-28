'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSectionAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal Elements (Titles, paragraphs, grid items)
      const revealElements = gsap.utils.toArray<HTMLElement>(
        'section h2, section p, section .grid > div, section ul > li, section a'
      );

      revealElements.forEach((el) => {
        // Skip elements inside the hero section to not interfere with its own animations
        if (el.closest('section')?.hasAttribute('data-hero')) return;
        
        // Exclude specific elements like the progress rail or captions that are handled separately
        if (el.closest('.pointer-events-none') || el.closest('.pointer-events-auto')) return;

        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. Parallax Text Blocks
      const parallaxBlocks = gsap.utils.toArray<HTMLElement>('.parallax-text');
      parallaxBlocks.forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
