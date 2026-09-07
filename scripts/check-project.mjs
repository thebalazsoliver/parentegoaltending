import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(path.join(root, file), 'utf8');
const required = ['index.html','src/App.jsx','src/main.jsx','src/styles.css',
  'src/pages/PrivacyPolicy.jsx','src/pages/CookiePolicy.jsx','package-lock.json','vite.config.js'];
for (const file of required) assert(existsSync(path.join(root, file)), `Missing file: ${file}`);
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
for (const group of ['dependencies','devDependencies']) {
  for (const [name, version] of Object.entries(pkg[group] || {})) {
    assert.equal(version, lock.packages[''][group][name], `Manifest/lock mismatch: ${name}`);
    assert.equal(version, lock.packages[`node_modules/${name}`].version, `Unpinned version: ${name}`);
  }
}
const app = read('src/App.jsx');
assert(!app.includes('const G ='), 'CSS still embedded in JavaScript');
assert(!app.includes('<motion.'), 'Unused motion wrapper remains');
assert(!app.includes('TestimonialsSection'), 'Unexpected review section');
assert(app.includes('<Training />'), 'Original Training section is missing');
assert(app.includes('lazy(() => import("./pages/PrivacyPolicy.jsx"))'), 'Privacy page is not deferred');
assert(app.includes('lazy(() => import("./pages/CookiePolicy.jsx"))'), 'Cookie policy is not deferred');
assert.equal((app.match(/id="cookie-title"/g) || []).length, 1, 'Duplicate cookie heading');
assert(!read('src/styles.css').includes('@import'), 'Unexpected render-time font import');
assert(read('index.html').includes('rel="stylesheet" href="https://fonts.googleapis.com'), 'Font stylesheet missing');
for (const width of [64,128,256,320,520,780]) {
  const file = `public/images/optimized/parente-logo-${width}-v2.webp`;
  const data = readFileSync(path.join(root,file));
  assert.equal(data.toString('ascii',0,4),'RIFF', `Invalid WebP file: ${file}`);
  assert.equal(data.toString('ascii',8,12),'WEBP', `Invalid WebP file: ${file}`);
}
console.log('Project structure, pinned versions, source safeguards and image files: OK.');
console.log('Next: npm run build, then npm run preview. This check does not replace a Vite build.');
