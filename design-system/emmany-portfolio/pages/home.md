# Surcharge : page d'accueil (le site tient sur une seule page)

Ces règles priment sur MASTER.md, généré par UI UX Pro Max. On garde de MASTER la typographie
(Archivo pour les titres, Space Grotesk pour le texte), la checklist d'accessibilité et les points
de rupture ; la palette claire « monochrome + bleu » est remplacée par une palette sombre « sous-sol ».

## Concept
Le défilement est une descente dans le sous-sol, de la surface au réservoir. Chaque section est une
« couche » numérotée ; une jauge de profondeur (0 → 3 200 m) suit la lecture.

## Palette (jetons dans src/styles.css)
| Rôle | Valeur |
|------|--------|
| Fond | `#0f0c0a` |
| Texte | `#f5efe6` (texte secondaire `#bdb3a6`) |
| Accent hydrocarbure | `#e8a33d` (texte dessus `#1a1208`) |
| Accent sismique | `#6fc3c8` |
| Strates | `#8e6b4a`, `#6b4a32`, `#4a3324`, `#33241a`, `#241a14` |

## Mouvement (Framer Motion)
- Animations liées au défilement (`useScroll` + `useTransform`), pas de simples apparitions.
- Sections épinglées (sticky) : accueil, formation, terrain, compétences. Pas plus.
- N'animer que `transform`, `opacity`, `clip-path` et `pathLength`.
- `prefers-reduced-motion` : `MotionConfig reducedMotion="user"`, sections non épinglées et état final affiché.

## Responsive
Vérifié à 390, 768, 1024 et 1440 px. Aucune barre de défilement horizontale.
