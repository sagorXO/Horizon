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

      // --- 1. Atmospheric Sky & Background (PBR-like Environmental Shading) ---
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(0.4, '#0B132B');
      skyGrad.addColorStop(0.7, '#070D1B');
      skyGrad.addColorStop(1, '#000000');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Atmospheric Horizon Radial Glow
      const horizonGlow = ctx.createRadialGradient(width * 0.5, height * 0.7, 50, width * 0.5, height * 0.7, width * 0.6);
      horizonGlow.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      horizonGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.04)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle Background Stars / Micro Bokeh
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let s = 0; s < 30; s++) {
        const starX = (Math.sin(s * 91.34) * 0.5 + 0.5) * width;
        const starY = (Math.cos(s * 47.12) * 0.5 + 0.5) * height * 0.5;
        const starSize = (s % 3 === 0) ? 1.5 : 1;
        ctx.fillRect(starX, starY, starSize, starSize);
      }
      ctx.restore();

      // --- 2. Detailed Parallax City Skyline Silhouette ---
      ctx.save();
      const groundY = height * 0.72;
      const centerX = width / 2;

      // Far Background Layer (Distant Towers)
      ctx.fillStyle = '#060B14';
      const farBuildings = 18;
      const farW = width / farBuildings;
      for (let i = 0; i < farBuildings; i++) {
        if (i >= 7 && i <= 10) continue; // Gap for central tower focus
        const hOffset = Math.sin(i * 77) * 70 + 130;
        const bX = i * farW;
        const bY = groundY - hOffset;
        ctx.fillRect(bX, bY, farW + 1, hOffset + (height - groundY));
      }

      // Midground Skyline Layer with Spires & Windows
      const numBuildings = 14;
      const buildingW = width / numBuildings;
      for (let i = 0; i < numBuildings; i++) {
        if (i === 6 || i === 7) continue; // Center space reserved for Horizon Skyscraper

        const bHeight = 140 + Math.sin(i * 123.45) * 90 + 80;
        const bX = i * buildingW + 4;
        const bW = buildingW - 8;
        const bY = groundY - bHeight;

        // Building Body Silhouette Gradient
        const bGrad = ctx.createLinearGradient(bX, bY, bX + bW, groundY);
        bGrad.addColorStop(0, '#0D1527');
        bGrad.addColorStop(1, '#050912');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bX, bY, bW, bHeight + (height - groundY));

        // Architectural Roof Spires / Caps
        if (i % 3 === 0) {
          ctx.fillStyle = '#0D1527';
          ctx.beginPath();
          ctx.moveTo(bX + bW * 0.2, bY);
          ctx.lineTo(bX + bW * 0.5, bY - 25);
          ctx.lineTo(bX + bW * 0.8, bY);
          ctx.closePath();
          ctx.fill();
        }

        // Metallic Edge Highlight
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(bX, bY, bW, bHeight);

        // Windows Pattern
        for (let wy = bY + 12; wy < groundY - 10; wy += 16) {
          for (let wx = bX + 6; wx < bX + bW - 8; wx += 10) {
            const litSeed = (wx * 17 + wy * 31) % 7;
            if (litSeed === 1) {
              ctx.fillStyle = 'rgba(56, 189, 248, 0.35)'; // Sky Cyan
              ctx.fillRect(wx, wy, 4, 7);
            } else if (litSeed === 3) {
              ctx.fillStyle = 'rgba(245, 158, 11, 0.25)'; // Amber Glow
              ctx.fillRect(wx, wy, 4, 7);
            }
          }
        }
      }
      ctx.restore();

      // --- 3. 3D Perspective Ground Grid & Horizon Line ---
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;

      // Perspective Rays
      for (let i = -14; i <= 14; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX + i * 12, groundY);
        ctx.lineTo(centerX + i * 55, height);
        ctx.stroke();
      }
      // Horizontal Grid Lines with Fog Fade
      for (let y = groundY; y <= height; y += 18) {
        const lineAlpha = (y - groundY) / (height - groundY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.05 + lineAlpha * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Glowing Ground Horizon Line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();
      ctx.restore();

      // --- 4. 3D Photorealistic Horizon Skyscraper Tower ---
      const p = Math.min(1, Math.max(0, progressRef.current));
      
      const zoomP = Math.min(1, p / 0.5);
      const panP = Math.min(1, Math.max(0, (p - 0.75) / 0.25));

      const scale = 1 + zoomP * 0.32;
      const offsetY = panP * (height * 0.22);

      const towerCenterX = centerX;
      const towerBaseY = groundY + offsetY;
      const towerWidth = Math.min(width * 0.22, 170) * scale;
      const totalFloors = 15;
      const floorH = 22 * scale;

      // Perspective 3D Face Offsets (Isometric Depth)
      const depthX = towerWidth * 0.45; // Right face width
      const depthY = depthX * 0.35;      // Angle tilt

      ctx.save();
      ctx.translate(towerCenterX - towerWidth * 0.25, towerBaseY);

      // --- STAGE 0: Excavation & Foundation Grid (Progress 0.0 - 0.20) ---
      const stage0P = Math.min(1, p * 5);
      if (stage0P > 0) {
        ctx.save();
        // Foundation Mat Slab
        ctx.fillStyle = '#0F172A';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.rect(-towerWidth / 2 - 25, 0, towerWidth + depthX + 50, 14);
        ctx.fill();
        ctx.stroke();

        // Foundation Sub-Pilings
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#020617';
        for (let i = -towerWidth / 2 - 15; i <= towerWidth / 2 + depthX + 15; i += 24) {
          ctx.fillRect(i, 14, 10, 22 * stage0P);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.strokeRect(i, 14, 10, 22 * stage0P);
        }
        ctx.restore();
      }

      // --- STAGE 1: Steel Exoskeleton Columns & Floor Slabs (Progress 0.20 - 0.45) ---
      const stage1P = Math.min(1, Math.max(0, (p - 0.2) * 4));
      if (stage1P > 0) {
        const activeFloors = Math.ceil(totalFloors * stage1P);

        for (let f = 0; f < activeFloors; f++) {
          const fy = -f * floorH;
          const fProgress = Math.min(1, Math.max(0, (stage1P * totalFloors - f)));

          // Reinforced Concrete Central Core
          ctx.fillStyle = '#090D16';
          ctx.fillRect(-towerWidth * 0.15, fy - floorH * fProgress, towerWidth * 0.3, floorH * fProgress);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.strokeRect(-towerWidth * 0.15, fy - floorH * fProgress, towerWidth * 0.3, floorH * fProgress);

          // Floor Structural Slab
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-towerWidth / 2, fy, towerWidth, 4);

          // 3D Perspective Floor Slab Extension
          ctx.beginPath();
          ctx.moveTo(towerWidth / 2, fy);
          ctx.lineTo(towerWidth / 2 + depthX, fy - depthY);
          ctx.lineTo(towerWidth / 2 + depthX, fy - depthY + 4);
          ctx.lineTo(towerWidth / 2, fy + 4);
          ctx.closePath();
          ctx.fillStyle = '#0F172A';
          ctx.fill();

          // Steel Perimeter Columns with Metallic Highlight
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 2;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 4;

          const colPositions = [-towerWidth / 2, -towerWidth * 0.16, towerWidth * 0.16, towerWidth / 2];
          colPositions.forEach((cx) => {
            ctx.beginPath();
            ctx.moveTo(cx, fy);
            ctx.lineTo(cx, fy - floorH * fProgress);
            ctx.stroke();
          });
          ctx.shadowBlur = 0;

          // Diagonal X-Bracing Truss
          if (f % 2 === 0 && fProgress > 0.5) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-towerWidth / 2, fy);
            ctx.lineTo(towerWidth / 2, fy - floorH);
            ctx.moveTo(towerWidth / 2, fy);
            ctx.lineTo(-towerWidth / 2, fy - floorH);
            ctx.stroke();
          }
        }
      }

      // --- STAGE 2 & 3: Glass Panel Cladding, Glowing Mullions & Metallic Spandrels (Progress 0.45 - 0.85) ---
      const stage2P = Math.min(1, Math.max(0, (p - 0.45) * 2.5));
      if (stage2P > 0) {
        const activeGlassFloors = Math.ceil(totalFloors * stage2P);

        for (let f = 0; f < activeGlassFloors; f++) {
          const fy = -f * floorH - floorH;
          const glassP = Math.min(1, Math.max(0, (stage2P * totalFloors - f)));
          const slideOffset = (1 - glassP) * (f % 2 === 0 ? 90 : -90);

          ctx.save();
          ctx.translate(slideOffset, 0);

          // --- Left Facade (Front Face) ---
          const glassGrad = ctx.createLinearGradient(-towerWidth / 2, fy, towerWidth / 2, fy + floorH);
          glassGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');   // High Cyan Refraction
          glassGrad.addColorStop(0.35, 'rgba(2, 132, 199, 0.35)');  // Deep Glass Body
          glassGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.85)');    // PBR Shadowing
          glassGrad.addColorStop(1, 'rgba(56, 189, 248, 0.45)');   // Specular Edge

          ctx.fillStyle = glassGrad;
          ctx.fillRect(-towerWidth / 2 + 1, fy + 1, towerWidth - 2, floorH - 2);

          // PBR Fresnel Reflection Sweep
          const sweepGrad = ctx.createLinearGradient(-towerWidth / 2, fy, towerWidth / 2, fy + floorH);
          sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
          sweepGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.0)');
          sweepGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.0)');
          sweepGrad.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
          ctx.fillStyle = sweepGrad;
          ctx.fillRect(-towerWidth / 2 + 1, fy + 1, towerWidth - 2, floorH - 2);

          // Metallic Spandrel Panel Band
          const spandrelH = 6;
          const spandrelGrad = ctx.createLinearGradient(-towerWidth / 2, fy + floorH - spandrelH, towerWidth / 2, fy + floorH);
          spandrelGrad.addColorStop(0, '#334155');
          spandrelGrad.addColorStop(0.5, '#475569');
          spandrelGrad.addColorStop(1, '#0F172A');
          ctx.fillStyle = spandrelGrad;
          ctx.fillRect(-towerWidth / 2, fy + floorH - spandrelH, towerWidth, spandrelH);
          
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-towerWidth / 2, fy + floorH - spandrelH, towerWidth, spandrelH);

          // Glowing Vertical Mullions
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 8;
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 1.5;

          const mullionSpacing = towerWidth / 5;
          for (let m = -towerWidth / 2 + mullionSpacing; m < towerWidth / 2; m += mullionSpacing) {
            ctx.beginPath();
            ctx.moveTo(m, fy + 1);
            ctx.lineTo(m, fy + floorH - 1);
            ctx.stroke();
          }
          ctx.shadowBlur = 0;

          // --- Right Facade (3D Isometric Perspective Face) ---
          ctx.beginPath();
          ctx.moveTo(towerWidth / 2, fy);
          ctx.lineTo(towerWidth / 2 + depthX, fy - depthY);
          ctx.lineTo(towerWidth / 2 + depthX, fy - depthY + floorH);
          ctx.lineTo(towerWidth / 2, fy + floorH);
          ctx.closePath();

          const rightGlassGrad = ctx.createLinearGradient(towerWidth / 2, fy, towerWidth / 2 + depthX, fy - depthY);
          rightGlassGrad.addColorStop(0, 'rgba(2, 132, 199, 0.5)');
          rightGlassGrad.addColorStop(1, 'rgba(11, 19, 43, 0.9)');
          ctx.fillStyle = rightGlassGrad;
          ctx.fill();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Interior Warm Amber Lighting (Active on Stage 4 / progress > 0.75)
          if (p > 0.75) {
            const glowIntensity = Math.min(1, (p - 0.75) * 4);
            ctx.fillStyle = `rgba(245, 158, 11, ${0.45 * glowIntensity})`;
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 12;
            ctx.fillRect(-towerWidth * 0.2, fy + 4, towerWidth * 0.4, floorH - 12);
            ctx.shadowBlur = 0;
          }

          ctx.restore();
        }
      }

      // --- STAGE 4: Roof Crown, Helipad & Aviation Spire (Progress 0.85 - 1.0) ---
      const stage4P = Math.min(1, Math.max(0, (p - 0.85) * 6.66));
      if (stage4P > 0) {
        const topY = -totalFloors * floorH;
        const crownDescend = (1 - stage4P) * 100;

        ctx.save();
        ctx.translate(0, crownDescend);

        // 3D Roof Top Slab
        ctx.fillStyle = '#1E293B';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 10;

        // Front Face Crown Box
        ctx.fillRect(-towerWidth / 2 - 6, topY - 18, towerWidth + 12, 18);
        ctx.strokeRect(-towerWidth / 2 - 6, topY - 18, towerWidth + 12, 18);

        // Right Perspective Face Crown Box
        ctx.beginPath();
        ctx.moveTo(towerWidth / 2 + 6, topY - 18);
        ctx.lineTo(towerWidth / 2 + depthX, topY - 18 - depthY);
        ctx.lineTo(towerWidth / 2 + depthX, topY - depthY);
        ctx.lineTo(towerWidth / 2 + 6, topY);
        ctx.closePath();
        ctx.fillStyle = '#0F172A';
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Roof Helipad Platform
        ctx.fillStyle = '#090D16';
        ctx.fillRect(-28, topY - 24, 56, 6);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1;
        ctx.strokeRect(-28, topY - 24, 56, 6);

        ctx.fillStyle = '#38BDF8';
        ctx.font = '900 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H', 0, topY - 17);

        // High Aviation Spire
        ctx.strokeStyle = '#F8FAFC';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, topY - 24);
        ctx.lineTo(0, topY - 75);
        ctx.stroke();

        // Strobe Red Beacon Light Flash
        const strobe = Math.floor(Date.now() / 250) % 2 === 0;
        ctx.fillStyle = strobe ? '#EF4444' : '#7F1D1D';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = strobe ? 16 : 2;
        ctx.beginPath();
        ctx.arc(0, topY - 75, 4.5, 0, Math.PI * 2);
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
