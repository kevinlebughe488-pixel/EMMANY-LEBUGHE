# Portfolio — Pierre Emmanuel Lebughe Litite

Portfolio d'ingénieur en géologie pétrolière. Le défilement raconte une descente dans le sous-sol,
de la surface jusqu'au réservoir, avec des animations Framer Motion liées au scroll.

## Développer

```bash
npm install
npm run dev      # http://localhost:5173/EMMANY-LEBUGHE/
npm run build    # génère dist/
```

- Contenu (textes du CV) : `src/data.js`
- Photos : déposer les originaux dans `photos-src/`, puis `npm run images` pour régénérer les WebP de `src/assets/`
- Design : `design-system/emmany-portfolio/` (généré avec le skill UI UX Pro Max, dans `.claude/skills/`)

## Mise en ligne

Chaque push sur `main` déploie le site sur GitHub Pages (`.github/workflows/deploy.yml`).
Dans **Settings → Pages**, la source doit être **GitHub Actions**.

## Google Analytics

Le suivi GA4 se charge seulement si un identifiant de mesure (`G-XXXXXXXXXX`) est fourni :
ajouter une variable de dépôt `GA_MEASUREMENT_ID` dans **Settings → Secrets and variables → Actions → Variables**,
ou l'écrire directement dans `src/config.js`. Événements envoyés : `section_view` (sections consultées)
et `contact_click` (e-mail, WhatsApp, téléphone).
