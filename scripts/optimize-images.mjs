import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'image-sources/parente-logo.webp');
const output = path.join(root, 'public/images/optimized');
// Bump "v2" here and in App.jsx when changing the logo (cache busting).
for (const width of [64, 128, 256, 320, 520, 780]) {
  await sharp(source).resize(width, width).webp({ quality: 88, effort: 6 })
    .toFile(path.join(output, `parente-logo-${width}-v2.webp`));
}
console.log('Responsive logo variants generated.');
