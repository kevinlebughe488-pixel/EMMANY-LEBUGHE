import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { experience } from '../data.js';

export default function Experience() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  // Le « train de tiges » descend le long des missions à mesure qu'on défile.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="section">
      <div className="container">
        <p className="eyebrow">Couche 03 · Expérience</p>
        <div className="experience__layout">
          <motion.div
            className="experience__head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="experience__org">{experience.org}</h2>
            <p className="experience__unit">{experience.unit}</p>
            <div className="experience__badges">
              <span className="chip">{experience.role}</span>
              <span className="chip">{experience.period}</span>
            </div>
          </motion.div>

          <div className="drill" ref={listRef}>
            <span className="drill__pipe" aria-hidden="true">
              <motion.span className="drill__pipe-fill" style={{ scaleY: reduce ? 1 : fill }} />
            </span>
            <ol className="drill__list">
            {experience.tasks.map((task, i) => (
              <motion.li
                key={i}
                className="drill__item"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="drill__index">{String(i + 1).padStart(2, '0')}</span>
                {task}
              </motion.li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
