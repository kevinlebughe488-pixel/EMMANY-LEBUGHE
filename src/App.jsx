import { useEffect, useState } from 'react';
import { MotionConfig, useMotionValueEvent, useScroll } from 'framer-motion';
import { sections } from './data.js';
import { initAnalytics, trackSectionViews } from './analytics.js';
import Nav from './components/Nav.jsx';
import DepthGauge from './components/DepthGauge.jsx';
import Hero from './components/Hero.jsx';
import Profile from './components/Profile.jsx';
import Formation from './components/Formation.jsx';
import Experience from './components/Experience.jsx';
import Fieldwork from './components/Fieldwork.jsx';
import Skills from './components/Skills.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';

// Position (0 → 1) du début de chaque section dans la page, recalculée au redimensionnement.
function useSectionStops() {
  const [stops, setStops] = useState(() => sections.map((_, i) => i / (sections.length - 1)));

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setStops(
        sections.map(({ id }) => {
          const el = document.getElementById(id);
          return el ? Math.min(1, Math.max(0, el.offsetTop / max)) : 0;
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('load', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', measure);
    };
  }, []);

  return stops;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const stops = useSectionStops();
  const [active, setActive] = useState(sections[0].id);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let current = sections[0].id;
    stops.forEach((stop, i) => {
      if (v + 0.002 >= stop) current = sections[i].id;
    });
    setActive((prev) => (prev === current ? prev : current));
  });

  useEffect(() => {
    initAnalytics();
    return trackSectionViews(sections.map((s) => s.id));
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#profil">
        Aller au contenu
      </a>
      <Nav active={active} progress={scrollYProgress} />
      <DepthGauge active={active} stops={stops} progress={scrollYProgress} />
      <main>
        <Hero />
        <Profile />
        <Formation />
        <Experience />
        <Fieldwork />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Pierre Emmanuel Lebughe Litite</span>
          <span>Kinshasa · République démocratique du Congo</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
