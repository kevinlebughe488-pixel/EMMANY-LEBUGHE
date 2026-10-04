// Convertit les photos sources (photos-src/) en WebP optimisés dans src/assets/.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const out = 'src/assets';
mkdirSync(out, { recursive: true });

const jobs = [
  { src: 'photos-src/portrait.jpg', name: 'portrait', widths: [480, 760] },
  { src: 'photos-src/terrain.jpg', name: 'terrain', widths: [600, 810] },
  { src: 'photos-src/logo-ena.png', name: 'logo-ena', widths: [240] },
  { src: 'photos-src/logo-cali.png', name: 'logo-cali', widths: [240] },
];

for (const { src, name, widths } of jobs) {
  for (const w of widths) {
    const file = `${out}/${name}-${w}.webp`;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: name === 'terrain' ? 68 : 80 }).toFile(file);
    console.log('→', file);
  }
}
