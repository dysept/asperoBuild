"use client";
import { useEffect, useRef } from "react";

export default function GridAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let startTime: number | null = null;
    const DURATION = 2200; // ms

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function drawGrid(progress: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const ease = easeOutCubic(progress);

      // Perspective transform parameters
      const rotX = (1 - ease) * 55; // degrees — starts rotated, ends at 0
      const rotY = (1 - ease) * -10;
      const scale = 1 + (1 - ease) * 0.5;
      const opacity = ease * 0.07;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.5;

      const cellSize = 60;
      const cols = Math.ceil(w / cellSize) + 2;
      const rows = Math.ceil(h / cellSize) + 2;

      // Apply pseudo-3D perspective via a simple vertical squish
      const perspectiveFactor = Math.cos((rotX * Math.PI) / 180);
      const shearFactor = Math.sin((rotY * Math.PI) / 180) * 0.2;

      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, scale * perspectiveFactor);
      ctx.transform(1, 0, shearFactor, 1, 0, 0);
      ctx.translate(-w / 2, -h / 2);

      // Vertical lines
      for (let col = -1; col <= cols; col++) {
        const x = col * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, -cellSize);
        ctx.lineTo(x, h + cellSize);
        ctx.stroke();
      }

      // Horizontal lines
      for (let row = -1; row <= rows; row++) {
        const y = row * cellSize;
        ctx.beginPath();
        ctx.moveTo(-cellSize, y);
        ctx.lineTo(w + cellSize, y);
        ctx.stroke();
      }

      ctx.restore();

      // Scanline sweep glow effect during reveal
      if (progress < 0.7) {
        const sweepY = ease * h * 1.4 - h * 0.2;
        const grad = ctx.createLinearGradient(0, sweepY - 80, 0, sweepY + 80);
        grad.addColorStop(0, "rgba(229, 51, 51, 0)");
        grad.addColorStop(0.5, `rgba(229, 51, 51, ${(1 - progress) * 0.12})`);
        grad.addColorStop(1, "rgba(229, 51, 51, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, sweepY - 80, w, 160);
      }
    }

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      drawGrid(progress);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        // Keep final static grid
        drawGrid(1);
      }
    }

    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
