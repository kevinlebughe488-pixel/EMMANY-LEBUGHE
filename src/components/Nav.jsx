import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { sections } from '../data.js';
import { useDepthLabel } from './DepthGauge.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';

const links = sections.filter((s) => s.id !== 'accueil');

export default function Nav({ active, progress }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const depth = useDepthLabel(progress);
  const reduce = useReducedMotion();

  useMotionValueEvent(progress, 'change', (v) => setScrolled(v > 0.01));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    // Bloque le défilement sur <html> (le body ne suffit pas : <html> a déjà un overflow-x).
    // Ne pas fixer le body : la page n'aurait plus de hauteur, la progression sauterait à 100 %
    // et toutes les animations liées au défilement bougeraient derrière le menu.
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      html.style.overflow = '';
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  // Ferme le menu puis défile vers la section, une fois le défilement de la page réactivé.
  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, '', `#${id}`);
    }, 60);
  };

  // Rideau qui descend ; simple fondu si l'utilisateur limite les animations.
  const curtain = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { clipPath: 'inset(0 0 100% 0)' },
        animate: { clipPath: 'inset(0 0 0% 0)' },
        exit: { clipPath: 'inset(0 0 100% 0)' },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav__inner">
          <a className="nav__brand" href="#accueil" aria-label="Retour en haut">
            <span className="nav__brand-mark" aria-hidden="true">
              PEL
            </span>
            <motion.span className="nav__depth" aria-hidden="true">
              {depth}
            </motion.span>
          </a>

          <nav aria-label="Navigation principale">
            <ul className="nav__links">
              {links.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'is-active' : undefined}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Hors du <header> : son flou d'arrière-plan (backdrop-filter) enfermerait le menu dans ses 64 px. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            {...curtain}
          >
            <button
              className="nav__toggle mobile-menu__close"
              type="button"
              aria-label="Fermer le menu"
              autoFocus
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
            <ol>
              {links.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                >
                  <a href={`#${s.id}`} onClick={(e) => goTo(e, s.id)}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
