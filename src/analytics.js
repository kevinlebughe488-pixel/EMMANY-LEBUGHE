import { GA_MEASUREMENT_ID, GTM_ID } from './config.js';

let ready = false;

function loadScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

// Charge Google Tag Manager (et GA4 en direct si un identifiant est fourni), une seule fois.
export function initAnalytics() {
  if (ready || typeof window === 'undefined' || (!GTM_ID && !GA_MEASUREMENT_ID)) return;
  ready = true;
  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`);
  }

  if (GA_MEASUREMENT_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`);
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }
}

// Envoie un événement personnalisé (clic sur un contact, section consultée…).
// Avec Tag Manager, il arrive dans la couche de données sous le même nom.
export function track(event, params = {}) {
  if (!ready) return;
  if (GA_MEASUREMENT_ID && window.gtag) window.gtag('event', event, params);
  else window.dataLayer.push({ event, ...params });
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
