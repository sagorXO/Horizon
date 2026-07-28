'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Engine } from '@/gl/Engine';
import { Environment } from '@/gl/Environment';
import { BuildingAssembly } from '@/gl/BuildingAssembly';
import { ProceduralTowerCanvas } from './ProceduralTowerCanvas';

interface HeroCanvasProps {
  progress: number;
  currentTheme?: 'day' | 'night';
}

export function HeroCanvas({ progress, currentTheme = 'day' }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const envRef = useRef<Environment | null>(null);
  const bldRef = useRef<BuildingAssembly | null>(null);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  // 1. Synchronous WebGL feature and context probe
  useEffect(() => {
    try {
      if (typeof window === 'undefined') {
        setWebGLAvailable(false);
        return;
      }
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebGLAvailable(!!gl);
    } catch {
      setWebGLAvailable(false);
    }
  }, []);

  // 2. Initialize Vanilla WebGL Engine into container ref
  useEffect(() => {
    if (webGLAvailable !== true || !containerRef.current) return;

    try {
      // Mount WebGL Engine to DOM container ref
      const engine = new Engine(containerRef.current);
      engineRef.current = engine;

      const scene = engine.getScene();

      // Create environment & building assembly modules
      const env = new Environment(scene);
      const bld = new BuildingAssembly();
      scene.add(bld.group);

      envRef.current = env;
      bldRef.current = bld;

      // Set initial theme
      env.setTheme(currentTheme);

      // Initial building state at current progress
      bld.assembleBuilding(progress);
      engine.updateCameraFromProgress(progress);

      // Register tick callbacks for dynamic environmental and light updates
      engine.addUpdateCallback((delta, now) => {
        env.update(delta);
        bld.update(now / 1000);
      });

      engine.start();

      // Handle window resize event
      const handleResize = () => {
        engine.handleResize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        engine.stop();
        bld.dispose();
        env.dispose();
        engine.dispose();
        engineRef.current = null;
        envRef.current = null;
        bldRef.current = null;
      };
    } catch (err) {
      console.warn('WebGL engine initialization bypassed, rendering Procedural Canvas.', err);
      setWebGLAvailable(false);
    }
  }, [webGLAvailable]);

  // Sync theme changes to environment
  useEffect(() => {
    if (envRef.current) {
      envRef.current.setTheme(currentTheme);
    }
  }, [currentTheme]);

  // Sync scroll progress to building assembly matrix & camera position
  useEffect(() => {
    if (bldRef.current) {
      bldRef.current.assembleBuilding(progress);
    }
    if (engineRef.current) {
      engineRef.current.updateCameraFromProgress(progress);
    }
  }, [progress]);

  if (webGLAvailable === false) {
    return <ProceduralTowerCanvas progress={progress} />;
  }

  return (
    <div className="w-full h-full relative bg-transparent overflow-hidden">
      {/* Vanilla WebGL Engine Canvas Mounting Target Container - Full Bleed 3D Engine */}
      <div ref={containerRef} className="w-full h-full block absolute inset-0 z-0" />
    </div>
  );
}
