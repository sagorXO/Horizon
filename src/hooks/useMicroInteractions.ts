'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useMicroInteractions() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic Buttons
      const magneticButtons = gsap.utils.toArray<HTMLElement>('.magnetic-button');
      
      magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.5,
            ease: 'power3.out',
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)',
          });
        });
      });

      // Mouse-tracking Light Gradients
      const glowCards = gsap.utils.toArray<HTMLElement>('.glow-card');
      
      glowCards.forEach((card) => {
        // Assume there is a `.glow-bg` inside
        const glowBg = card.querySelector('.glow-bg') as HTMLElement;
        if (!glowBg) return;

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          gsap.to(glowBg, {
            x,
            y,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(glowBg, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
