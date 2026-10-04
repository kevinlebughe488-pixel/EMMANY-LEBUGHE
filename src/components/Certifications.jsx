import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { certifications, languages } from '../data.js';
import { CheckIcon } from './Icons.jsx';
import logoEna from '../assets/logo-ena-240.webp';
import logoCali from '../assets/logo-cali-240.webp';

const logos = { ena: logoEna, cali: logoCali };

function Cert({ cert, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Les cartes se redressent comme des pages qu'on relève, à mesure qu'elles entrent à l'écran.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [55, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80 + index * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.article ref={ref} className="cert" style={reduce ? undefined : { rotateX, y, opacity }}>
      <div className="cert__logo">
        <img src={logos[cert.logo]} alt={`Logo ${cert.short}`} width="240" height="240" loading="lazy" />
      </div>
      <div>
        <h3>{cert.org}</h3>
        <ul>
          {cert.items.map((item) => (
            <li key={item}>
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <p className="eyebrow">Couche 06 · Certifications</p>
        <h2 className="section-title">Formations complémentaires</h2>
        <div className="certs">
          {certifications.map((c, i) => (
            <Cert key={c.short} cert={c} index={i} />
          ))}
        </div>

        <div className="langs">
          {languages.map((l, i) => (
            <div key={l.name}>
              <div className="lang__row">
                {l.name}
                <span>{l.level}</span>
              </div>
              <div
                className="lang__bar"
                role="img"
                aria-label={`${l.name} : niveau ${l.level.toLowerCase()}`}
              >
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: l.value }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ delay: i * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
