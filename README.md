# Portfolio — Pierre Emmanuel Lebughe Litite

Portfolio d'ingénieur en géologie pétrolière. Le défilement raconte une descente dans le sous-sol,
de la surface jusqu'au réservoir, avec des animations Framer Motion liées au scroll.

## Développer

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # génère dist/
```

- Contenu (textes du CV) : `src/data.js`
- Photos : déposer les originaux dans `photos-src/`, puis `npm run images` pour régénérer les WebP de `src/assets/`
- Design : `design-system/emmany-portfolio/` (généré avec le skill UI UX Pro Max, dans `.claude/skills/`)

## Mise en ligne (Vercel)

Sur vercel.com : **Add New → Project**, importer le dépôt `EMMANY-LEBUGHE`, puis **Deploy**.
Vercel détecte Vite tout seul (`vercel.json` fixe la commande `npm run build` et le dossier `dist`).
Ensuite, chaque push sur `main` met le site à jour, et chaque PR reçoit une URL de prévisualisation.

## Suivi d'audience

Google Analytics 4 (`G-99N19MBP9J`) est chargé directement par le site, et le conteneur
Google Tag Manager `GTM-WFSNFKFZ` aussi (`src/config.js`). Ne pas ajouter de balise GA4 avec le même
identifiant dans Tag Manager, sinon les visites seraient comptées deux fois.

Événements envoyés à GA4 : `section_view` (paramètre `section`) et `contact_click`
(paramètre `method` : email, whatsapp, phone).
