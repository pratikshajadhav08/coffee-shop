import React, { useEffect, useRef } from "react";

const EMBER_COLORS = ["#f4ead9", "#f7ecd9", "#e2803f", "#c4622d"];

// Warm particles that drift upward and twinkle, like embers rising off a
// roaster into a night sky — a "sprinkles / galaxy" style animated field,
// themed to the site instead of a generic starfield. Canvas-based so it
// stays smooth with a couple hundred particles; respects
// prefers-reduced-motion by rendering a single static frame instead of
// looping.
export function EmberField({ density = 90, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let particles = [];
    let raf = null;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function spawnParticle(anywhere) {
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 10,
        r: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.3 + 0.06,
        drift: (Math.random() - 0.5) * 0.25,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const count = Math.max(
        24,
        Math.min(density, Math.round((width * height) / 6500))
      );
      particles = Array.from({ length: count }, () => spawnParticle(true));
    }

    function drawFrame(twinkleFn) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        const twinkle = twinkleFn ? twinkleFn(p) : 1;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function tick() {
      particles.forEach((p) => {
        p.twinklePhase += p.twinkleSpeed;
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -8) Object.assign(p, spawnParticle(false));
      });
      drawFrame((p) => 0.4 + ((Math.sin(p.twinklePhase) + 1) / 2) * 0.6);
      raf = requestAnimationFrame(tick);
    }

    init();
    if (prefersReduced) {
      drawFrame();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      init();
      if (prefersReduced) drawFrame();
    });
    ro.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`ember-field ${className}`}
      aria-hidden="true"
    />
  );
}