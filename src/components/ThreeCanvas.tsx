/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

// 3D Point Interface
interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
}

// 12 Vertices of an Icosahedron (3D Golden Ratio proportions)
const getIcosahedronVertices = (): Point3D[] => {
  const t = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden ratio
  return [
    { x: -1, y:  t, z:  0 },
    { x:  1, y:  t, z:  0 },
    { x: -1, y: -t, z:  0 },
    { x:  1, y: -t, z:  0 },

    { x:  0, y: -1, z:  t },
    { x:  0, y:  1, z:  t },
    { x:  0, y: -1, z: -t },
    { x:  0, y:  1, z: -t },

    { x:  t, y:  0, z: -1 },
    { x:  t, y:  0, z:  1 },
    { x: -t, y:  0, z: -1 },
    { x: -t, y:  0, z:  1 },
  ].map(p => {
    // Normalize to unit sphere and scale to comfortable size
    const length = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    return {
      x: (p.x / length) * 160,
      y: (p.y / length) * 160,
      z: (p.z / length) * 160,
    };
  });
};

// 30 Edges connecting the 12 vertices of an Icosahedron
const IcosahedronEdges = [
  [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
  [1, 5], [1, 9], [1, 8], [1, 7],
  [2, 11], [2, 10], [2, 6], [2, 3], [2, 4],
  [3, 9], [3, 8], [3, 6], [3, 4],
  [4, 11], [4, 5], [4, 9], [4, 2],
  [5, 11], [5, 9],
  [6, 10], [6, 7], [6, 8],
  [7, 10], [7, 8],
  [8, 9],
  [10, 11]
];

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const docHeightRef = useRef(1);
  const dprRef = useRef(1);
  const lowPowerRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

        dprRef.current = devicePixelRatio;
        lowPowerRef.current =
          window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        canvasRef.current.width = width * devicePixelRatio;
        canvasRef.current.height = height * devicePixelRatio;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        docHeightRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (lowPowerRef.current) {
        return;
      }

      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial trigger
    handleResize();
    handleScroll();

    // ResizeObserver for containers to catch any changes
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let focalLength = 400;
    let cameraZ = 300;
    let centerOffsetX = 0;
    let centerOffsetY = 0;

    const vertices = getIcosahedronVertices();
    const particleCount = lowPowerRef.current ? 40 : 72;
    const particles: Point3D[] = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 800 + 400,
      size: Math.random() * 1.5 + 0.5,
      color: `rgba(229, 224, 219, ${Math.random() * 0.4 + 0.1})`
    }));

    let animationFrameId: number;

    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const dpr = dprRef.current;
      const isLowPower = lowPowerRef.current;

      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const scrollPercent = Math.max(0, Math.min(1, scrollYRef.current / docHeightRef.current));

      let targetScale = 1.0;
      let targetCameraZ = 500;
      let targetCenterX = 0;
      let targetCenterY = 0;
      let baseSpeedMultiplier = 1.0;

      if (scrollPercent < 0.2) {
        // Hero stage (0% to 20%)
        // Gentle transition
        const p = scrollPercent / 0.2;
        targetScale = 1.1 - p * 0.2;
        targetCameraZ = 450 - p * 150; // Camera moves closer (Z decreases)
        targetCenterX = (width / 2) + mouseRef.current.x * 30;
        targetCenterY = (height / 2) + mouseRef.current.y * 30;
        baseSpeedMultiplier = 0.6;
      } else if (scrollPercent < 0.4) {
        // Transition to Categories/Story (20% to 40%)
        const p = (scrollPercent - 0.2) / 0.2;
        targetScale = 0.9 - p * 0.35; // Morph/shrink slightly
        targetCameraZ = 300 - p * 100; // Camera moves extremely close
        targetCenterX = (width / 2) - (p * (width * 0.20)) + mouseRef.current.x * 40; // Shift to left
        targetCenterY = (height / 2) + mouseRef.current.y * 40;
        baseSpeedMultiplier = 1.4;
      } else if (scrollPercent < 0.6) {
        // Transition to Features/Information (40% to 60%)
        const p = (scrollPercent - 0.4) / 0.2;
        targetScale = 0.55 + p * 0.3; // Expand slightly
        targetCameraZ = 200 + p * 200; // Recede back
        targetCenterX = (width / 2) - (width * 0.20) + (p * (width * 0.40)) + mouseRef.current.x * 50; // Shift across center to right
        targetCenterY = (height / 2) + (p * (height * 0.05)) + mouseRef.current.y * 50;
        baseSpeedMultiplier = 0.8;
      } else if (scrollPercent < 0.8) {
        // Transition to Proof Section (60% to 80%)
        const p = (scrollPercent - 0.6) / 0.2;
        targetScale = 0.85 - p * 0.4; // Contract
        targetCameraZ = 400 + p * 300; // Camera pulls far back
        targetCenterX = (width / 2) + (width * 0.20) - (p * (width * 0.20)) + mouseRef.current.x * 20; // Center again
        targetCenterY = (height / 2) + (height * 0.05) - (p * (height * 0.15)) + mouseRef.current.y * 20;
        baseSpeedMultiplier = 2.0; // Rapid movement
      } else {
        // Final Cinematic background (80% to 100%)
        const p = (scrollPercent - 0.8) / 0.2;
        targetScale = 0.45 + p * 0.55; // Huge atmospheric background
        targetCameraZ = 700 - p * 200;
        targetCenterX = (width / 2) + mouseRef.current.x * 15;
        targetCenterY = (height / 2) - (height * 0.1) + (p * (height * 0.1)) + mouseRef.current.y * 15;
        baseSpeedMultiplier = 0.3;
      }

      focalLength = 400; 
      cameraZ += (targetCameraZ - cameraZ) * 0.06;
      centerOffsetX += (targetCenterX - centerOffsetX) * 0.06;
      centerOffsetY += (targetCenterY - centerOffsetY) * 0.06;
      const currentScale = targetScale;

      const timeMs = time * 0.0003;
      targetRotY = timeMs * 0.8 + scrollPercent * Math.PI * 2.5 + mouseRef.current.x * 0.4;
      targetRotX = timeMs * 0.5 + scrollPercent * Math.PI * 1.5 + mouseRef.current.y * 0.4;

      rotationY += (targetRotY - rotationY) * 0.08;
      rotationX += (targetRotX - rotationX) * 0.08;
      rotationZ += (baseSpeedMultiplier * 0.002);

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);

      ctx.fillStyle = '#e5e0db';
      particles.forEach((p) => {
        p.y -= isLowPower ? 0.08 : 0.15;
        if (p.y < -400) p.y = 400;

        const px = p.x + mouseRef.current.x * 25;
        const py = p.y + mouseRef.current.y * 25;
        const pz = p.z;

        const ryX = px * cosY - pz * sinY;
        const ryZ = px * sinY + pz * cosY;

        const depth = ryZ + cameraZ;
        if (depth <= 0) return;

        const screenX = (ryX * focalLength) / depth + centerOffsetX;
        const screenY = (py * focalLength) / depth + centerOffsetY;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          ctx.fillStyle = p.color || 'rgba(229, 224, 219, 0.4)';
          ctx.beginPath();
          ctx.arc(screenX, screenY, (p.size || 1) * dpr * (300 / depth), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const projectedVertices = vertices.map((p) => {
        const sx = p.x * currentScale;
        const sy = p.y * currentScale;
        const sz = p.z * currentScale;

        let x1 = sx * cosY - sz * sinY;
        let z1 = sx * sinY + sz * cosY;

        let y2 = sy * cosX - z1 * sinX;
        let z2 = sy * sinX + z1 * cosX;

        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        const finalZ = z2 + cameraZ;
        const screenX = (x3 * focalLength) / finalZ + centerOffsetX;
        const screenY = (y2 * focalLength) / finalZ + centerOffsetY;

        return { x: screenX, y: screenY, z: finalZ };
      });

      IcosahedronEdges.forEach(([startIdx, endIdx]) => {
        const start = projectedVertices[startIdx];
        const end = projectedVertices[endIdx];

        if (!start || !end) return;

        const avgDepth = (start.z + end.z) / 2;
        const depthOpacity = Math.max(0.04, Math.min(0.65, 1 - (avgDepth - 100) / 800));

        ctx.strokeStyle = `rgba(140, 130, 117, ${depthOpacity})`;
        ctx.lineWidth = Math.max(0.5, (1.8 * (200 / avgDepth)) * dpr);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });

      projectedVertices.forEach((v) => {
        const rad = Math.max(1.5, (4 * (200 / v.z)) * dpr);
        ctx.fillStyle = `rgba(229, 224, 219, ${Math.max(0.1, Math.min(0.9, 1 - (v.z - 200) / 600))})`;

        ctx.beginPath();
        ctx.arc(v.x, v.y, rad, 0, Math.PI * 2);
        ctx.fill();

        if (!isLowPower) {
          ctx.strokeStyle = 'rgba(140, 130, 117, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(v.x, v.y, rad * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.strokeStyle = 'rgba(229, 224, 219, 0.025)';
      ctx.lineWidth = 1;
      const gridCount = isLowPower ? 5 : 8;
      for (let i = 1; i < gridCount; i++) {
        const yGrid = (height / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(0, yGrid);
        ctx.lineTo(width, yGrid);
        ctx.stroke();

        const xGrid = (width / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(xGrid, 0);
        ctx.lineTo(xGrid, height);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-canvas-container"
      className="fixed inset-0 w-full h-full -z-10 bg-[#0c0c0c] pointer-events-none transition-colors duration-1000"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
