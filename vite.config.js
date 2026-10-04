import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le site est servi sur GitHub Pages sous /EMMANY-LEBUGHE/.
// BASE_PATH permet de changer ce préfixe (ex. "/" pour un domaine personnalisé).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/EMMANY-LEBUGHE/',
  plugins: [react()],
});
