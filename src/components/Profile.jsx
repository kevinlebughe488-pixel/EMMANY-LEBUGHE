import { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { person, profileFacts, profileIntro, profileText, traits } from '../data.js';
import { useSmoothScroll } from '../hooks.js';

const ease = [0.22, 1, 0.36, 1];

// Mots mis en valeur dans le texte du profil.
const HIGHLIGHTS = ['exploration', 'interprétation', 'systèmes', 'pétroliers', 'terrain', 'junior'];
const isHighlight = (w) => HIGHLIGHTS.some((h) => w.toLowerCase().includes(h));

export default function Profile() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const p = useSmoothScroll(ref, ['start end', 'end start']);
  // Légère parallaxe : la fiche et le texte ne défilent pas à la même vitesse.
  const cardY = useTransform(p, [0, 1], [60, -60]);
  const words = profileText.split(' ');

  return (
    <section id="profil" className="section profile" ref={ref}>
      <div className="container profile__grid">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            Couche 01 · Profil
          </motion.p>
          <motion.h2
            className="profile__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease }}
          >
            {profileIntro}
          </motion.h2>

          {/* Le texte se dépose mot à mot, tout seul, dès qu'il apparaît à l'écran. */}
          <motion.p
            className="profile__text"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ shown: { transition: { staggerChildren: 0.012, delayChildren: 0.15 } } }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={`profile__word${isHighlight(word) ? ' is-key' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
                  shown: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 0.5, ease } },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <ul className="traits" aria-label="Qualités">
            {traits.map((t, i) => (
              <motion.li
                key={t}
                className="chip"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.aside
          className="fact-card"
          aria-label="En bref"
          style={reduce ? undefined : { y: cardY }}
          initial={{ opacity: 0, rotateY: -18 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
        >
          {/* Une « carotte » de forage dont les couches défilent en continu. */}
          <div className="fact-card__core" aria-hidden="true" />
          <div className="fact-card__body">
            <p className="fact-card__label">En bref</p>
            <dl className="facts">
              {profileFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  className="facts__row"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                >
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </motion.div>
              ))}
            </dl>
            <p className="fact-card__status">
              <span className="pulse-dot" aria-hidden="true" />
              Disponible · {person.role}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
