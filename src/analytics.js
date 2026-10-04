import { GA_MEASUREMENT_ID } from './config.js';

let ready = false;

// Charge gtag.js une seule fois, uniquement si un identifiant GA4 est configuré.
export function initAnalytics() {
  if (ready || !GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  ready = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

// Envoie un événement personnalisé (clic sur un contact, section consultée…).
export function track(event, params = {}) {
  if (ready && window.gtag) window.gtag('event', event, params);
}

// Mesure jusqu'où les visiteurs descendent : un événement « section_view » par section, une fois par visite.
export function trackSectionViews(ids) {
  if (!ready || !('IntersectionObserver' in window)) return () => {};
  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting && !seen.has(id)) {
          seen.add(id);
          track('section_view', { section: id });
        }
      }
    },
    // Une section compte comme vue quand elle traverse le milieu de l'écran (fonctionne aussi pour les sections très hautes).
    { rootMargin: '-45% 0px -45% 0px' },
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
  return () => observer.disconnect();
}
