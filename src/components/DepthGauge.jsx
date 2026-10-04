import { motion, useTransform } from 'framer-motion';
import { sections } from '../data.js';

// Profondeur fictive atteinte en bas de page : le visiteur « fore » jusqu'au réservoir.
export const MAX_DEPTH = 3200;

export function useDepthLabel(progress) {
  return useTransform(progress, (v) => `${Math.round(v * MAX_DEPTH).toLocaleString('fr-FR')} m`);
}

export default function DepthGauge({ active, stops, progress }) {
  const depth = useDepthLabel(progress);

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: progress }} aria-hidden="true" />
      <nav className="depth-gauge" aria-label="Profondeur dans le portfolio">
        <div className="depth-gauge__labels">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`depth-gauge__label${active === s.id ? ' is-active' : ''}`}
              style={{ top: `${stops[i] * 100}%` }}
            >
              {s.label}
            </a>
          ))}
          <motion.span className="depth-gauge__readout" aria-hidden="true">
            {depth}
          </motion.span>
        </div>
        <div className="depth-gauge__track" aria-hidden="true">
          <motion.div className="depth-gauge__fill" style={{ scaleY: progress }} />
        </div>
      </nav>
    </>
  );
}
