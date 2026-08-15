'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  triggerRef: RefObject<HTMLDivElement | null>,
  scrollEnd = '+=300%',
  lerpFactor = 0.2
) {
  const [progress, setProgress] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [duration, setDuration] = useState(8.3); // default fallback duration

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rAfRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Step 1: Initialize video metadata and prime hardware decoder
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const handleLoaded = () => {
      if (!isMounted) return;
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
        setIsVideoReady(true);
      }
    };

    const primeVideo = async () => {
      try {
        video.currentTime = 0.01;
        await video.play();
        video.pause();
      } catch {
        // Autoplay may be restricted before interaction; safe to ignore
      }
      handleLoaded();
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);
    video.addEventListener('canplaythrough', handleLoaded);

    if (video.readyState >= 1) {
      handleLoaded();
    }

    primeVideo();

    return () => {
      isMounted = false;
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
      video.removeEventListener('canplaythrough', handleLoaded);
    };
  }, [videoRef]);

  // Step 2: GSAP ScrollTrigger & 60fps lerp loop
  useEffect(() => {
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!trigger || !video) return;

    const effectiveDuration = duration > 0 ? duration : 8.3;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: scrollEnd,
      pin: true,
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
        targetTimeRef.current = self.progress * effectiveDuration;
      },
    });

    const updateLoop = () => {
      if (video) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        currentTimeRef.current += diff * lerpFactor;
        const clamped = Math.max(0, Math.min(currentTimeRef.current, effectiveDuration - 0.02));

        if (Math.abs(video.currentTime - clamped) > 0.02 && !video.seeking) {
          video.currentTime = clamped;
        }
      }
      rAfRef.current = requestAnimationFrame(updateLoop);
    };

    const handleSeeked = () => {
      if (video) {
        const clamped = Math.max(0, Math.min(currentTimeRef.current, effectiveDuration - 0.02));
        if (Math.abs(video.currentTime - clamped) > 0.02 && !video.seeking) {
          video.currentTime = clamped;
        }
      }
    };

    video.addEventListener('seeked', handleSeeked);
    rAfRef.current = requestAnimationFrame(updateLoop);

    return () => {
      scrollTriggerRef.current?.kill();
      video.removeEventListener('seeked', handleSeeked);
      if (rAfRef.current !== null) cancelAnimationFrame(rAfRef.current);
    };
  }, [isVideoReady, duration, triggerRef, videoRef, scrollEnd, lerpFactor]);

  return { progress, isVideoReady, duration };
}
