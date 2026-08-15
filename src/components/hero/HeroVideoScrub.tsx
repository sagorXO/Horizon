'use client';

import { useRef } from 'react';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import StageCaptions from './StageCaptions';

export default function HeroVideoScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { progress } = useVideoScrub(videoRef, canvasRef, containerRef);

  return (
    <section ref={containerRef} className="w-full h-screen relative overflow-hidden bg-black">
      {/* Video element acting as the underlying hardware decoder */}
      <video
        ref={videoRef}
        src="/Video.mp4"
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Canvas rendering layer with poster fallback for zero-second display */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          backgroundImage: 'url(/hero/poster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 pointer-events-none" />

      <StageCaptions progress={progress} />

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500"
        style={{ opacity: progress > 0.95 ? 0 : 1 }}
      >
        <span className="text-[10px] tracking-widest uppercase text-[#0EA5E9] animate-pulse">
          Scroll to build
        </span>
        <div className="w-[1px] h-8 bg-[#0EA5E9]/50 mt-4" />
      </div>
    </section>
  );
}
