import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { interests, person } from '../data.js';
import { track } from '../analytics.js';
import { ChatIcon, MailIcon, PhoneIcon } from './Icons.jsx';

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Le réservoir se remplit pendant que la section entre à l'écran.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const oil = useTransform(scrollYProgress, [0.1, 1], [0, 1]);

  const actions = [
    {
      href: `mailto:${person.email}`,
      label: 'Envoyer un e-mail',
      icon: MailIcon,
      method: 'email',
      primary: true,
    },
    { href: person.whatsapp, label: 'WhatsApp', icon: ChatIcon, method: 'whatsapp', external: true },
    { href: person.phoneHref, label: person.phoneDisplay, icon: PhoneIcon, method: 'phone' },
  ];

  return (
    <section id="contact" className="reservoir" ref={ref}>
      <motion.div className="reservoir__oil" style={{ scaleY: reduce ? 1 : oil }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <p className="eyebrow">Couche 07 · Réservoir atteint</p>
        {/* Le déclenchement se fait sur le titre : les mots, masqués par overflow: hidden, ne seraient jamais « visibles ». */}
        <motion.h2
          className="reservoir__title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          {['Travaillons', 'ensemble'].map((word, i) => (
            <span key={word} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'inline-block' }}
                variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
                transition={{ delay: i * 0.12, duration: 0.9, ease }}
              >
                {i === 1 ? <em>{word}.</em> : word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <motion.p
          className="lead"
          style={{ marginTop: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          À la recherche d’un poste de géologue pétrolier junior, et ouvert aux autres domaines de la géologie. Basé à
          Kinshasa, disponible pour le terrain.
        </motion.p>

        <div className="contact-actions">
          {actions.map(({ href, label, icon: Icon, method, primary, external }, i) => (
            <motion.a
              key={method}
              className={`btn${primary ? ' btn--primary' : ''}`}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => track('contact_click', { method })}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease }}
            >
              <Icon />
              <span>{label}</span>
            </motion.a>
          ))}
        </div>

        <p className="contact-plain">
          <a href={`mailto:${person.email}`} onClick={() => track('contact_click', { method: 'email_text' })}>
            {person.email}
          </a>
          <span aria-hidden="true"> · </span>
          {person.location}
        </p>

        <div className="interests">
          <p className="interests__label">Centres d’intérêt</p>
          <ul className="sr-only">
            {interests.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="marquee" aria-hidden="true">
            <motion.div
              className="marquee__track"
              animate={reduce ? undefined : { x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              {[...interests, ...interests].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
