'use client';

import React, { useEffect, useRef } from 'react';

interface ProceduralTowerCanvasProps {
  progress: number;
}

export function ProceduralTowerCanvas({ progress }: ProceduralTowerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<number>(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      // Background Sky Gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#040914');
      skyGradient.addColorStop(0.5, '#0B132B');
      skyGradient.addColorStop(1, '#000000');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Background City Silhouette
      ctx.save();
      ctx.fillStyle = '#080E1A';
      const numBuildings = 14;
      const buildingWidth = width / numBuildings;
      for (let i = 0; i < numBuildings; i++) {
        if (i === 6 || i === 7) continue; // Center space for Horizon Tower
        const bHeight = 120 + Math.sin(i * 99) * 80 + 100;
        const bX = i * buildingWidth;
        const bY = height - bHeight - 40;
        ctx.fillRect(bX, bY, buildingWidth - 4, bHeight + 40);

        // Windows on background buildings
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        for (let wy = bY + 15; wy < bY + bHeight - 15; wy += 18) {
          for (let wx = bX + 6; wx < bX + buildingWidth - 10; wx += 12) {
            if ((wx + wy) % 3 === 0) {
              ctx.fillRect(wx, wy, 4, 8);
            }
          }
        }
        ctx.fillStyle = '#080E1A';
      }
      ctx.restore();

      // Ground Plaza Grid
      ctx.save();
      const centerX = width / 2;
      const groundY = height * 0.72;
      
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      
      // Perspective Ground lines
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 15, groundY);
        ctx.lineTo(centerX + i * 50, height);
        ctx.stroke();
      }
      for (let y = groundY; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3D Isometric Projection Parameters for Tower
      const p = Math.min(1, Math.max(0, progressRef.current));
      
      // Camera Zoom and Pan Math
      const zoomP = Math.min(1, p / 0.5);
      const panP = Math.min(1, Math.max(0, (p - 0.75) / 0.25));

      const scale = 1 + zoomP * 0.35;
      const offsetY = panP * (height * 0.25);

      const towerCenterX = centerX;
      const towerBaseY = groundY + offsetY;
      const towerW = Math.min(width * 0.22, 160) * scale;
      const totalFloors = 14;
      const floorH = 22 * scale;

      ctx.save();
      ctx.translate(towerCenterX, towerBaseY);

      // --- Stage 0: Plot & Foundation (Progress 0.0 - 0.25) ---
      const stage1P = Math.min(1, p * 4);
      if (stage1P > 0) {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        
        // Base Slab
        ctx.beginPath();
        ctx.rect(-towerW / 2 - 20, 0, towerW + 40, 12);
        ctx.fill();
        ctx.stroke();

        // Foundation Pilings
        for (let i = -towerW / 2; i <= towerW / 2; i += 30) {
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(i - 4, 12, 8, 18 * stage1P);
        }
      }

      // --- Stage 1: Steel Exoskeleton Columns & Floors (Progress 0.25 - 0.50) ---
      const stage2P = Math.min(1, Math.max(0, (p - 0.25) * 4));
      if (stage2P > 0) {
        const activeFloors = Math.ceil(totalFloors * stage2P);

        for (let f = 0; f < activeFloors; f++) {
          const fy = -f * floorH;
          const floorProgress = Math.min(1, Math.max(0, (stage2P * totalFloors - f)));

          // Concrete Core
          ctx.fillStyle = '#0B0F19';
          ctx.fillRect(-towerW * 0.2, fy - floorH * floorProgress, towerW * 0.4, floorH * floorProgress);

          // Floor Slab Beam
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-towerW / 2, fy, towerW, 4);

          // Vertical Steel Columns
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-towerW / 2, fy);
          ctx.lineTo(-towerW / 2, fy - floorH * floorProgress);
          ctx.moveTo(towerW / 2, fy);
          ctx.lineTo(towerW / 2, fy - floorH * floorProgress);
          ctx.moveTo(0, fy);
          ctx.lineTo(0, fy - floorH * floorProgress);
          ctx.stroke();

          // Diagonal X-Bracing
          if (f % 2 === 0 && floorProgress > 0.5) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-towerW / 2, fy);
            ctx.lineTo(towerW / 2, fy - floorH);
            ctx.moveTo(towerW / 2, fy);
            ctx.lineTo(-towerW / 2, fy - floorH);
            ctx.stroke();
          }
        }
      }

      // --- Stage 2: Glass Glazing & Facade Panels (Progress 0.50 - 0.75) ---
      const stage3P = Math.min(1, Math.max(0, (p - 0.5) * 4));
      if (stage3P > 0) {
        const activeGlassFloors = Math.ceil(totalFloors * stage3P);

        for (let f = 0; f < activeGlassFloors; f++) {
          const fy = -f * floorH - floorH;
          const glassP = Math.min(1, Math.max(0, (stage3P * totalFloors - f)));
          
          const slideOffset = (1 - glassP) * (f % 2 === 0 ? 80 : -80);

          // Glass Panel Container
          ctx.save();
          ctx.translate(slideOffset, 0);

          // Glass Fill Gradient
          const glassGrad = ctx.createLinearGradient(-towerW / 2, fy, towerW / 2, fy + floorH);
          glassGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
          glassGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.25)');
          glassGrad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');

          ctx.fillStyle = glassGrad;
          ctx.fillRect(-towerW / 2 + 2, fy + 2, towerW - 4, floorH - 4);

          // Glowing Vertical Mullions
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 1;
          for (let m = -towerW / 2 + 15; m < towerW / 2; m += 25) {
            ctx.beginPath();
            ctx.moveTo(m, fy + 2);
            ctx.lineTo(m, fy + floorH - 2);
            ctx.stroke();
          }

          // Interior Warm Amber Lighting
          ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.fillRect(-towerW * 0.15, fy + 6, towerW * 0.3, floorH - 12);

          ctx.restore();
        }
      }

      // --- Stage 3 & 4: Crown, Spire & Helipad (Progress 0.75 - 1.0) ---
      const stage4P = Math.min(1, Math.max(0, (p - 0.75) * 4));
      if (stage4P > 0) {
        const topY = -totalFloors * floorH;
        const crownDescend = (1 - stage4P) * 120;

        ctx.save();
        ctx.translate(0, crownDescend);

        // Crown Slab
        ctx.fillStyle = '#0F172A';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.fillRect(-towerW / 2 - 5, topY - 15, towerW + 10, 15);
        ctx.strokeRect(-towerW / 2 - 5, topY - 15, towerW + 10, 15);

        // Roof Helipad
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(-25, topY - 20, 50, 5);
        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H', 0, topY - 14);

        // Antenna Spire
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, topY - 15);
        ctx.lineTo(0, topY - 65);
        ctx.stroke();

        // Aviation Beacon Flash
        const flash = Math.sin(Date.now() / 200) > 0;
        ctx.fillStyle = flash ? '#EF4444' : '#7F1D1D';
        ctx.beginPath();
        ctx.arc(0, topY - 65, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Mounted once, progressRef stays updated

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-[#000000]"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
