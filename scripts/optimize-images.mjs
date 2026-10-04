// Convertit les photos sources (photos-src/) en WebP optimisés dans src/assets/.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = 'src/assets';
mkdirSync(out, { recursive: true });

const jobs = [
  { src: 'photos-src/portrait.jpg', name: 'portrait', widths: [480, 760] },
  { src: 'photos-src/logo-ena.png', name: 'logo-ena', widths: [240] },
  { src: 'photos-src/logo-cali.png', name: 'logo-cali', widths: [240] },
];

// Photo de terrain : elle s'affiche en plein écran, bien au-delà de sa taille d'origine (810 × 1080).
// On garde la pleine résolution sans recompression visible, et on prépare des versions agrandies
// (interpolation Lanczos + léger renforcement de netteté) pour les grands écrans et les écrans haute densité.
for (const w of [810, 1620, 2430]) {
  const file = `${out}/terrain-${w}.webp`;
  let img = sharp('photos-src/terrain.jpg').resize({ width: w, kernel: 'lanczos3' });
  if (w > 810) img = img.sharpen({ sigma: 0.8, m1: 0.5, m2: 1.5 });
  await img.webp({ quality: 90, smartSubsample: true, effort: 6 }).toFile(file);
  console.log('→', file);
}

for (const { src, name, widths } of jobs) {
  for (const w of widths) {
    const file = `${out}/${name}-${w}.webp`;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
    console.log('→', file);
  }
}
