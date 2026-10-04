import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile, traits } from '../data.js';

function Word({ children, progress, range, reduce }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className="reveal-text__word" style={reduce ? undefined : { opacity, y }}>
      {children}
    </motion.span>
  );
}

export default function Profile() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Le texte s'éclaire mot après mot, au rythme du défilement.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = profile.split(' ');

  return (
    <section id="profil" className="section">
      <div className="container">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          Couche 01 · Profil
        </motion.p>
        <p ref={ref} className="reveal-text">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={reduce}>
              {word}
            </Word>
          ))}
        </p>
        <ul className="traits" aria-label="Qualités" style={{ listStyle: 'none', padding: 0 }}>
          {traits.map((t, i) => (
            <motion.li
              key={t}
              className="chip"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
