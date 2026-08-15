'use client';

import { useRef } from 'react';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import StageCaptions from './StageCaptions';

export default function HeroVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { progress } = useVideoScrub(videoRef, containerRef);

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden bg-black">
      {/* Direct hardware-accelerated 4K Video Element */}
      <video
        ref={videoRef}
        src="/Video.mp4"
        poster="/hero/poster.jpg"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 pointer-events-none" />

      {/* Synchronized Architectural Stage Captions & Progress HUD */}
      <StageCaptions progress={progress} />

      {/* Interactive Scroll Prompt Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 z-10"
        style={{ opacity: progress > 0.95 ? 0 : 1 }}
      >
        <span className="text-[10px] tracking-widest uppercase text-[#0EA5E9] font-mono animate-pulse">
          Scroll to build
        </span>
        <div className="w-[1px] h-8 bg-[#0EA5E9]/50 mt-4" />
      </div>
    </section>
  );
}
