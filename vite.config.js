import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le site est servi à la racine du domaine (Vercel).
// BASE_PATH permet de changer ce préfixe si le site est un jour servi dans un sous-dossier.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
