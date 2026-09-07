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
// v4: no public business phone; keep the visitor's optional phone field.
assert(!/\bphoneDisplay\b|\bphoneHref\b|tel:/.test(app), 'Public telephone reference remains');
assert(app.includes('const instagramDmUrl = "https://ig.me/m/parentegoaltending";'), 'Instagram DM URL missing');
assert(app.includes('href={instagramDmUrl}'), 'Instagram DM button missing');
assert(app.includes('<span>Message on Instagram</span>'), 'Instagram button label changed');
assert(app.includes('href={`mailto:${emailAddress}`} className="cta-outline"'), 'Email button missing');
assert(app.includes('name="phone" type="tel" autoComplete="tel"'), 'Visitor phone field missing');
assert(app.includes('Phone: ${formData.phone}'), 'Visitor phone missing from email body');
assert(read('src/pages/PrivacyPolicy.jsx').includes('<li>Phone number</li>'), 'Visitor phone disclosure missing');
assert(app.includes('Available by appointment</div>'), 'Hero appointment text missing');
for (const page of ['src/pages/PrivacyPolicy.jsx', 'src/pages/CookiePolicy.jsx']) {
  assert(read(page).includes('parentegoaltending@gmail.com'), `Email missing: ${page}`);
}
console.log('Project structure, pinned versions, source safeguards and image files: OK.');
console.log('Next: npm run build, then npm run preview. This check does not replace a Vite build.');
