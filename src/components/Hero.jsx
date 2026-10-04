import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useSmoothScroll, wavePath } from '../hooks.js';
import { person } from '../data.js';
import { PinIcon } from './Icons.jsx';
import portrait480 from '../assets/portrait-480.webp';
import portrait760 from '../assets/portrait-760.webp';

const ease = [0.22, 1, 0.36, 1];

// Couches de terrain qui montent et recouvrent la surface pendant le défilement.
// La dernière a la couleur du fond : à la fin, l'écran est entièrement « sous terre ».
const layers = [
  { color: 'var(--stratum-1)', from: 74, rise: 0.78, amp: 14, phase: 0, speed: 38 },
  { color: 'var(--stratum-2)', from: 80, rise: 0.86, amp: 11, phase: 1.3, speed: 30 },
  { color: 'var(--stratum-3)', from: 86, rise: 0.93, amp: 13, phase: 2.6, speed: 46 },
  { color: 'var(--stratum-4)', from: 91, rise: 0.98, amp: 10, phase: 3.9, speed: 34 },
  { color: 'var(--bg)', from: 96, rise: 1.0, amp: 12, phase: 5.2, speed: 52 },
].map((l) => ({ ...l, wave: wavePath({ amp: l.amp, phase: l.phase }) }));

function Layer({ layer, index, progress, reduce, offset }) {
  const from = layer.from + offset;
  const y = useTransform(progress, [0, 1], [`${from}vh`, `${from - layer.rise * 100 - offset}vh`]);
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '140vh',
        background: layer.color,
        y: reduce ? `${from}vh` : y,
        zIndex: index,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.8, ease }}
    >
      {/* La crête de chaque couche ondule en continu, même quand on ne défile pas. */}
      <motion.svg
        viewBox="0 0 2400 80"
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 'calc(100% - 1px)', left: 0, width: '200%', height: '7vw', minHeight: 36 }}
        animate={reduce ? undefined : { x: index % 2 ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: layer.speed, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <path d={layer.wave} fill={layer.color} />
      </motion.svg>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useSmoothScroll(ref);

  const contentY = useTransform(scrollYProgress, [0, 0.8], ['0vh', '-18vh']);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.82]);
  const portraitRotate = useTransform(scrollYProgress, [0, 0.8], [0, -4]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const lines = [person.firstName, person.lastName];

  // Sur petit écran, le texte descend plus bas : les couches démarrent plus bas pour ne pas le recouvrir.
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    const update = () => setOffset(mq.matches ? 14 : 8);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section id="accueil" className="hero" ref={ref} aria-label="Présentation">
      <div className="hero__sticky">
        <div className="hero__strata" aria-hidden="true">
          {layers.map((layer, i) => (
            <Layer key={i} layer={layer} index={i} progress={scrollYProgress} reduce={reduce} offset={offset} />
          ))}
        </div>

        <motion.div
          className="container hero__grid"
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              Portfolio · Géologie pétrolière
            </motion.p>
            <h1 className="hero__name" style={{ marginTop: '1.2rem' }}>
              {lines.map((line, i) => (
                <span key={line} className={`hero__name-line${i === 1 ? ' hero__name-line--accent' : ''}`}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.15 + i * 0.14, duration: 1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="hero__role"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
            >
              <strong>{person.title}</strong>
              <span className="hero__pill">
                <span className="hero__pill-dot" aria-hidden="true" />
                Disponible · {person.role}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <PinIcon width={16} height={16} /> Kinshasa, RDC
              </span>
            </motion.div>
          </div>

          {/* Le portrait flotte doucement, entouré d'anneaux de « courbes de niveau » qui tournent en continu. */}
          <motion.div
            className="hero__portrait-wrap"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.svg
              className="hero__rings"
              viewBox="0 0 200 200"
              aria-hidden="true"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="100" cy="100" r="96" fill="none" stroke="var(--oil)" strokeOpacity="0.45" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="var(--seismic)" strokeOpacity="0.25" strokeDasharray="30 10 4 10" />
              <circle cx="100" cy="4" r="3" fill="var(--oil)" />
            </motion.svg>
            <motion.div
              className="hero__portrait"
              style={reduce ? undefined : { scale: portraitScale, rotate: portraitRotate }}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ delay: 0.3, duration: 1.2, ease }}
            >
              <motion.img
                src={portrait760}
                srcSet={`${portrait480} 480w, ${portrait760} 760w`}
                sizes="(min-width: 900px) 360px, 60vw"
                width="760"
                height="1082"
                alt="Portrait de Pierre Emmanuel Lebughe Litite, en costume, relisant un document"
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 1.6, ease }}
                fetchpriority="high"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="hero__scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
          Descendre
          <motion.i
            animate={reduce ? undefined : { scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
