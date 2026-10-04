// Google Tag Manager : conteneur du portfolio. Les balises (dont Google Analytics 4)
// se configurent ensuite dans l'interface de Tag Manager, sans toucher au code.
export const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-WFSNFKFZ';

// Google Analytics 4, chargé directement sur la page. Ne pas ajouter aussi une balise GA4
// avec cet identifiant dans Tag Manager : les visites seraient comptées deux fois.
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-99N19MBP9J';
