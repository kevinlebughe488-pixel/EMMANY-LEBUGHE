// Identifiant de mesure Google Analytics 4 (format « G-XXXXXXXXXX »).
// Tant qu'il est vide, aucun script de suivi n'est chargé.
// Il peut aussi être fourni au moment du build via la variable VITE_GA_MEASUREMENT_ID.
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
