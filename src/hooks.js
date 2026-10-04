import { useScroll, useSpring } from 'framer-motion';

// Progression de défilement amortie : quand on s'arrête de défiler,
// les animations finissent leur course en douceur au lieu de se figer net.
export function useSmoothScroll(target, offset = ['start start', 'end end']) {
  const { scrollYProgress } = useScroll({ target, offset });
  return useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6, restDelta: 0.0005 });
}

// Courbe sinusoïdale répétable : décaler le tracé de la moitié de sa largeur ne crée aucune coupure.
export function wavePath({ width = 2400, height = 80, base = 40, amp = 12, period = 600, phase = 0 }) {
  let d = `M0 ${height} L0 ${base}`;
  for (let x = 0; x <= width; x += 20) {
    const y = base + amp * Math.sin((2 * Math.PI * x) / period + phase) + amp * 0.35 * Math.sin((4 * Math.PI * x) / period + phase * 2);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return `${d} L${width} ${height} Z`;
}
