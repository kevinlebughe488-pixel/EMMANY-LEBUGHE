import { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useVelocity } from 'framer-motion';

// Fond vivant : des grains de sédiment remontent lentement, en permanence.
// Quand on défile, ils accélèrent dans le sens de la descente, puis reprennent leur dérive.
const COLORS = ['232,163,61', '111,195,200', '189,179,166'];

export default function AmbientField() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useEffect(() => {
    if (reduce) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let grains = [];
    let raf = 0;
    let boost = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      grains = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        speed: 0.08 + Math.random() * 0.25,
        sway: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.12 + Math.random() * 0.35,
      }));
    };

    const tick = (t) => {
      // Vitesse de défilement lissée : les grains « suivent » la descente puis ralentissent.
      boost += (velocity.get() / 900 - boost) * 0.06;
      ctx.clearRect(0, 0, w, h);
      for (const g of grains) {
        g.y -= g.speed + boost * g.speed * 6;
        g.x += Math.sin(t / 2400 + g.sway) * 0.15;
        if (g.y < -10) g.y = h + 10;
        if (g.y > h + 10) g.y = -10;
        const twinkle = 0.65 + 0.35 * Math.sin(t / 900 + g.sway * 3);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${g.color},${(g.alpha * twinkle).toFixed(3)})`;
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce, velocity]);

  if (reduce) return null;
  return <canvas ref={canvasRef} className="ambient" aria-hidden="true" />;
}
