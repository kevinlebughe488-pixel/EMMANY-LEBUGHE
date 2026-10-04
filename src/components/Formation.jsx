import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { education } from '../data.js';

// --- Géométrie d'une coupe sismique stylisée : un anticlinal faillé qui piège des hydrocarbures ---
const W = 600;
const H = 360;
const CREST_X = 300;
const OWC = 182; // contact huile/eau

const bump = (x) => Math.exp(-(((x - CREST_X) / 140) ** 2));
const faultX = (y) => 440 + (y - 120) * 0.27;

function horizonY(k, x, withWiggle = true) {
  const amp = Math.min(55, 12 + k * 11);
  let y = 46 + k * 30 - amp * bump(x);
  if (withWiggle) y += 2.2 * Math.sin(x * 0.09 + k * 1.7) + 1.3 * Math.sin(x * 0.23 + k);
  if (y > 120 && x > faultX(y)) y += 16; // rejet de la faille
  return y;
}

function horizonPath(k) {
  let d = '';
  let wasRight = null;
  for (let x = 0; x <= W; x += 6) {
    const y = horizonY(k, x);
    const right = y > 120 && x > faultX(y - 16);
    d += `${wasRight === null || right !== wasRight ? 'M' : 'L'}${x} ${y.toFixed(1)} `;
    wasRight = right;
  }
  return d.trim();
}

const HORIZONS = Array.from({ length: 10 }, (_, k) => horizonPath(k));

const RESERVOIR = (() => {
  const top = [];
  const bottom = [];
  for (let x = 120; x <= 480; x += 4) {
    const y5 = horizonY(5, x, false);
    if (y5 >= OWC) continue;
    top.push(`${x} ${y5.toFixed(1)}`);
    bottom.unshift(`${x} ${Math.min(OWC, horizonY(6, x, false)).toFixed(1)}`);
  }
  return `M${top.join(' L')} L${bottom.join(' L')} Z`;
})();

const TRACES = Array.from({ length: 50 }, (_, i) => {
  const x0 = 6 + i * 12;
  let d = `M${x0} 0`;
  for (let y = 0; y <= H; y += 8) d += ` L${(x0 + 2.5 * Math.sin(y * 0.18 + i)).toFixed(1)} ${y}`;
  return d;
});

const CREST_Y = horizonY(5, CREST_X, false);

function Horizon({ d, progress, index, reduce }) {
  const start = 0.04 + index * 0.04;
  const pathLength = useTransform(progress, [start, start + 0.2], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={index === 5 ? 'var(--seismic)' : '#cbbfae'}
      strokeOpacity={index === 5 ? 0.95 : 0.55}
      strokeWidth={index === 5 ? 2.2 : 1.4}
      style={{ pathLength: reduce ? 1 : pathLength }}
    />
  );
}

function Reveal({ progress, range, reduce, children, ...rest }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [24, 0]);
  return (
    <motion.div style={reduce ? undefined : { opacity, y }} {...rest}>
      {children}
    </motion.div>
  );
}

export default function Formation() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const faultOpacity = useTransform(p, [0.46, 0.56], [0, 0.8]);
  const oilScale = useTransform(p, [0.58, 0.72], [0, 1]);
  const oilOpacity = useTransform(p, [0.58, 0.66], [0, 1]);
  const wellLength = useTransform(p, [0.7, 0.86], [0, 1]);
  const legendOpacity = useTransform(p, [0.82, 0.9], [0, 1]);
  const svgScale = useTransform(p, [0, 0.9], [0.94, 1]);

  return (
    <section id="formation" className="pin formation" ref={ref}>
      <div className="pin__sticky">
        <div className="container formation__grid">
          <div className="formation__text">
            <p className="eyebrow">Couche 02 · Formation</p>
            <Reveal progress={p} range={[0, 0.08]} reduce={reduce}>
              <h2 className="formation__school">{education.school}</h2>
              <div className="formation__meta">
                <span>{education.degree}</span>
                <span aria-hidden="true">·</span>
                <span>{education.year}</span>
              </div>
            </Reveal>
            <Reveal progress={p} range={[0.12, 0.26]} reduce={reduce} className="thesis">
              <p className="thesis__label">Mémoire de fin d’études</p>
              <p className="thesis__title">« {education.thesis} »</p>
            </Reveal>
            <Reveal progress={p} range={[0.3, 0.42]} reduce={reduce}>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                {education.defense}. Un travail d’interprétation sismique sur les systèmes pétroliers d’offshore profond,
                là où les pièges sont discrets et se révèlent couche après couche.
              </p>
            </Reveal>
          </div>

          <motion.figure className="seismic" style={{ margin: 0, scale: reduce ? 1 : svgScale }}>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="seismic-title">
              <title id="seismic-title">
                Coupe sismique stylisée : un anticlinal faillé piège des hydrocarbures, atteint par un forage.
              </title>
              <g stroke="#cbbfae" strokeOpacity="0.07" fill="none">
                {TRACES.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              <motion.path
                d={RESERVOIR}
                fill="var(--oil)"
                fillOpacity="0.85"
                style={{
                  scaleY: reduce ? 1 : oilScale,
                  opacity: reduce ? 1 : oilOpacity,
                  originY: 1,
                  transformBox: 'fill-box',
                }}
              />
              {HORIZONS.map((d, i) => (
                <Horizon key={i} d={d} index={i} progress={p} reduce={reduce} />
              ))}
              <motion.line
                x1={faultX(120)}
                y1="120"
                x2={faultX(H)}
                y2={H}
                stroke="#e46a4f"
                strokeWidth="2"
                strokeDasharray="6 5"
                style={{ opacity: reduce ? 0.8 : faultOpacity }}
              />
              <motion.path
                d={`M${CREST_X} 20 V${(CREST_Y + 14).toFixed(1)}`}
                stroke="var(--fg)"
                strokeWidth="2.5"
                fill="none"
                style={{ pathLength: reduce ? 1 : wellLength }}
              />
              <motion.g style={{ opacity: reduce ? 1 : legendOpacity }}>
                <path d={`M${CREST_X - 12} 20 L${CREST_X} 2 L${CREST_X + 12} 20 M${CREST_X - 7} 12 H${CREST_X + 7}`} fill="none" stroke="var(--fg)" />
                <circle cx={CREST_X} cy={CREST_Y + 14} r="5" fill="var(--fg)" />
              </motion.g>
            </svg>
            <figcaption className="seismic__caption">Profil sismique · illustration</figcaption>
            <motion.div className="seismic__legend" style={{ opacity: reduce ? 1 : legendOpacity }} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12">
                <rect width="12" height="12" rx="3" fill="var(--oil)" />
              </svg>
              Piège atteint
            </motion.div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
