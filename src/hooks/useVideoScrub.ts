'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  triggerRef: RefObject<HTMLDivElement | null>,
  scrollEnd = '+=300%',
  lerpFactor = 0.25
) {
  const [progress, setProgress] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duration, setDuration] = useState(0);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rAfRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Helper to render video frame to canvas
  const renderFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const w = video.videoWidth || 1920;
    const h = video.videoHeight || 1080;

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.drawImage(video, 0, 0, w, h);
  };

  // Step 1: Initialize video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
        setIsVideoReady(true);
        renderFrame();
      }
    };

    video.addEventListener('loadedmetadata', handleReady);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('seeked', renderFrame);

    if (video.readyState >= 2) {
      handleReady();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('seeked', renderFrame);
    };
  }, [videoRef, canvasRef]);

  // Step 2: GSAP ScrollTrigger & render loop
  useEffect(() => {
    if (!isVideoReady || !triggerRef.current || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: scrollEnd,
      pin: true,
      scrub: 0.15,
      anticipatePin: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
        targetTimeRef.current = self.progress * duration;
      },
    });

    const updateLoop = () => {
      if (video && video.readyState >= 2) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * lerpFactor;
        const clamped = Math.max(0, Math.min(currentTimeRef.current, duration));

        if (Math.abs(video.currentTime - clamped) > 0.001 && !video.seeking) {
          video.currentTime = clamped;
        }

        renderFrame();
      }
      rAfRef.current = requestAnimationFrame(updateLoop);
    };

    rAfRef.current = requestAnimationFrame(updateLoop);

    return () => {
      scrollTriggerRef.current?.kill();
      if (rAfRef.current !== null) cancelAnimationFrame(rAfRef.current);
    };
  }, [isVideoReady, duration, triggerRef, videoRef, canvasRef, scrollEnd, lerpFactor]);

  return { progress, isVideoReady, duration };
}
