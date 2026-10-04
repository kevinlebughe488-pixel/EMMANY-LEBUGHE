import { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useSmoothScroll } from '../hooks.js';
import { fieldwork } from '../data.js';
import terrain600 from '../assets/terrain-600.webp';
import terrain810 from '../assets/terrain-810.webp';

const ALT = 'Pierre Emmanuel assis sur un rocher au pied d’une cascade, lors d’une sortie de terrain';
const STEPS_START = 0.34;
const STEP_SPAN = (1 - STEPS_START) / fieldwork.steps.length;

function Step({ step, index, progress }) {
  const a = STEPS_START + index * STEP_SPAN;
  const b = a + STEP_SPAN;
  const last = index === fieldwork.steps.length - 1;
  const opacity = useTransform(progress, [a, a + 0.05, b - 0.05, b], [0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, [a, a + 0.06, b - 0.05, b], [60, 0, 0, last ? 0 : -60]);
  return (
    <motion.div className="terrain__step" style={{ opacity, y }}>
      <p className="eyebrow">{step.kicker}</p>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </motion.div>
  );
}

function Dot({ index, progress }) {
  const a = STEPS_START + index * STEP_SPAN;
  const scaleX = useTransform(progress, [a, a + STEP_SPAN], [0, 1]);
  return (
    <span>
      <motion.i style={{ scaleX }} />
    </span>
  );
}

export default function Fieldwork() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const p = useSmoothScroll(ref);

  // La photo s'ouvre depuis une petite fenêtre jusqu'au plein écran.
  const clipPath = useTransform(
    p,
    [0, 0.3],
    ['inset(28% 30% 28% 30% round 28px)', 'inset(0% 0% 0% 0% round 0px)'],
  );
  const imgScale = useTransform(p, [0, 0.3, 1], [1.35, 1.08, 1]);
  const introScale = useTransform(p, [0, 0.3], [1, 1.25]);
  const introOpacity = useTransform(p, [0.18, 0.3], [1, 0]);
  const shadeOpacity = useTransform(p, [0.22, 0.36], [0, 1]);

  if (reduce) {
    return (
      <section id="terrain" className="section">
        <div className="container">
          <p className="eyebrow">Couche 04 · Terrain</p>
          <h2 className="section-title">Sur le terrain</h2>
          <img
            src={terrain810}
            alt={ALT}
            width="810"
            height="1080"
            loading="lazy"
            style={{ marginTop: '2rem', borderRadius: 'var(--radius)', maxHeight: '80vh', width: 'auto' }}
          />
          {fieldwork.steps.map((s) => (
            <div key={s.title} style={{ marginTop: '2rem' }}>
              <p className="eyebrow">{s.kicker}</p>
              <h3 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{s.title}</h3>
              <p className="lead" style={{ marginTop: '0.5rem' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="terrain" className="pin terrain" ref={ref}>
      <div className="pin__sticky">
        <div className="terrain__stage">
          <motion.div className="terrain__photo" style={{ clipPath }}>
            {/* Lent mouvement de caméra permanent (effet Ken Burns), même à l'arrêt. */}
            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ scale: [1, 1.07, 1], x: ['0%', '-1.5%', '0%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            >
            <motion.img
              src={terrain810}
              srcSet={`${terrain600} 600w, ${terrain810} 810w`}
              sizes="100vw"
              alt={ALT}
              width="810"
              height="1080"
              loading="lazy"
              style={{ scale: imgScale }}
            />
            </motion.div>
            <motion.div className="terrain__shade" style={{ opacity: shadeOpacity }} />
          </motion.div>

          <motion.div className="terrain__intro" style={{ scale: introScale, opacity: introOpacity }}>
            <div>
              <p className="eyebrow" style={{ justifyContent: 'center' }}>
                Couche 04 · Terrain
              </p>
              <h2>Sur le terrain</h2>
            </div>
          </motion.div>

          <div className="terrain__steps">
            <div className="container">
              <div className="terrain__step-slot">
                {fieldwork.steps.map((s, i) => (
                  <Step key={s.title} step={s} index={i} progress={p} />
                ))}
              </div>
              <div className="terrain__dots" aria-hidden="true">
                {fieldwork.steps.map((s, i) => (
                  <Dot key={s.title} index={i} progress={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
