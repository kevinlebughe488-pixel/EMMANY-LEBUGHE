import { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useSmoothScroll } from '../hooks.js';
import { skillStrata } from '../data.js';

// Chaque groupe de compétences se dépose comme une couche sédimentaire :
// la plus ancienne (géologie) au fond, les suivantes par-dessus.
const DEPOSIT_START = 0.08;
const DEPOSIT_SPAN = 0.26;

function Item({ label, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.7, 1]);
  return <motion.li style={{ opacity, scale }}>{label}</motion.li>;
}

function Stratum({ stratum, order, progress, reduce }) {
  const a = DEPOSIT_START + order * DEPOSIT_SPAN;
  const y = useTransform(progress, [a, a + DEPOSIT_SPAN * 0.55], ['-70vh', '0vh']);
  const opacity = useTransform(progress, [a, a + DEPOSIT_SPAN * 0.25], [0, 1]);
  const rotate = useTransform(progress, [a, a + DEPOSIT_SPAN * 0.55], [order % 2 ? 3 : -3, 0]);
  const itemsStart = a + DEPOSIT_SPAN * 0.45;
  const step = (DEPOSIT_SPAN * 0.5) / stratum.items.length;

  return (
    <motion.div
      className="stratum"
      style={{ backgroundColor: stratum.color, ...(reduce ? {} : { y, opacity, rotate }) }}
    >
      <h3 className="stratum__head">
        {stratum.name}
        {stratum.note && <small>{stratum.note}</small>}
      </h3>
      <ul className="stratum__items">
        {stratum.items.map((item, i) =>
          reduce ? (
            <li key={item}>{item}</li>
          ) : (
            <Item key={item} label={item} progress={progress} range={[itemsStart + i * step, itemsStart + (i + 1) * step]} />
          ),
        )}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const p = useSmoothScroll(ref);
  // Affichage du haut vers le bas : la couche la plus récente en haut.
  const stacked = [...skillStrata].reverse();

  return (
    <section id="competences" className="pin skills" ref={ref}>
      <div className="pin__sticky">
        <div className="container skills__layout">
          <div className="skills__intro">
            <p className="eyebrow">Couche 05 · Compétences</p>
            <h2 className="section-title">Sédimentation des savoirs</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Une base solide en géosciences, des outils SIG et de modélisation, et des compétences acquises au
              contact de l’administration et du terrain : chaque couche s’appuie sur la précédente.
            </p>
          </div>
          <div className="skills__basin">
            {stacked.map((s) => (
              <Stratum
                key={s.name}
                stratum={s}
                order={skillStrata.indexOf(s)}
                progress={p}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
