# Ellenőrzési jegyzőkönyv

Forrás: a felhasználó által feltöltött `parentegoaltending.zip`. Dátum: 2026-09-07.

## Elérhetőségek frissítése - 2026-09-07

Az optimalizált csomagban utólag az alábbi adatok frissültek:

- Telefon: a nyilvános telefonos elérhetőség a v4-es frissítésben kikerült (lásd `FRISSITES-v4.md`).
- E-mail: `parentegoaltending@gmail.com`.

A csere érinti az App.jsx elérhetőségeit és az ezekből képzett űrlapcímzettet, a két jogi oldalon szereplő e-mail-címeket, valamint a JavaScript nélkül megjelenő kapcsolati hivatkozást. A megjelenítési kód, CSS, képek és csomagfüggőségek változatlanok.

A `node scripts/check-project.mjs` ismét sikeresen lefutott. Automatikus szöveges ellenőrzés igazolja, hogy a régi telefonszám és e-mail-cím nincs a csomagban, a forrásfájlokban kizárólag a kért adatcsere történt. Ehhez az adatfrissítéshez új böngészős teszt vagy Vite-build nem futott. Az alábbi felületi eredmények a korábbi optimalizált változat tesztjére vonatkoznak.

## Az eredeti optimalizálás sikeres ellenőrzései

A JSX-modulok szintaktikai fordítása, a CSS PostCSS-elemzése, a konfigurációs JavaScript szintaktikai ellenőrzése és a `npm run check` alapjául szolgáló projektellenőrzés sikeres volt.

Az offline felületi teszt **96/96 ellenőrzése sikeres**. A vizsgált szélességek: 320, 360, 375, 390, 430, 600, 768, 820, 900, 1024, 1280, 1440 px. Fekvő mobilmenü: 390 x 320 px.

Vizsgálatok: vízszintes túlcsordulás; szekción belüli levágás; kártyaoszlopok; cookie-ablak méretezése; duplikált cím hiánya; futásidejű hibák; menünyitás, Escape, külső kattintás, fókusz és görgetés visszaállítása; asztali méretre váltás; anchor-navigáció; sütibeállítás mentése és visszatöltése; jogi modulok késleltetett kiértékelése; űrlap-validáció; tiltott tárhely kezelése; reduced-motion.

Az eredeti nyolc szekció sorrendjét és normalizált szövegtartalmát összevetettük. Mind megmaradt. Az új, kizárólag mobilos coach-kivonatot a szöveg-összehasonlítás nem számolta kétszer. Mindkét jogi JSX-fájl az eredeti optimalizálási tesztkor bájtszinten változatlan volt; az utólagos adatfrissítés kizárólag az e-mail-címeket módosította.

## Amit ez NEM igazol

- A teljes `npm ci` + Vite-build nem futott le a környezet hálózati korlátozása miatt. A szintaktikai és offline UI-teszt nem azonos a Vite bundler és a pluginok futtatásával.
- Nem történt npm biztonsági audit. A csomagverziók a feltöltött lockfile verziói, nem ellenőrizetlen új frissítések.
- Nem történt valódi iPhone/Safari, Cloudflare vagy telefonos hálózati teszt.
- A betűtípusok a tesztben rendszerbetűs tartalékkal jelentek meg. A szállított HTML továbbra is az eredeti Unbounded és DM Sans családokat kéri.
- Az offline dokumentum eredete miatt a localStorage tesztben memóriabeli helyettesítőt használtunk. A valódi böngésző tartós tárolását a localhost/dev oldalon kell véglegesíteni.
- A lazy modulok kiértékelése ellenőrzött, de a Vite-chunkok tényleges hálózati mérete nem mért.
- Nincs mért Lighthouse-pontszám, LCP-, CLS- vagy INP-eredmény; sebességnövekedésre százalékos ígéret nincs.

## Mért fájlméretek (nem betöltési idők)

| Fájl | Bájt |
|---|---:|
| Eredeti 600 px WebP | 58 006 |
| Eredeti 900 px WebP | 128 312 |
| Új 64 px logó | 2 468 |
| Új 128 px logó | 5 846 |
| Új 256 px logó | 15 350 |
| Új 320 px logó | 21 046 |
| Új 520 px logó | 48 136 |
| Új 780 px logó | 104 514 |
| Eredeti ICO | 71 888 |
| Új ICO | 4 299 |

A böngésző a megjelenítési méret és pixelsűrűség szerint választ. Az ismétlődő, azonos URL-es képeket nem szabad külön teljes letöltésként összeadni.

## Végső ellenőrzés a saját gépeden

```bash
npm ci
npm run check
npm run build
npm run preview
```

Ezután nézd meg a tényleges betűtípusokkal asztali és telefonos nézetben, friss betöltéssel és korábban elmentett cookie-választással is. A dev telepítést csak sikeres ellenőrzés után emeld át az éles repóba.

Hivatalos technikai háttér:

```text
https://react.dev/reference/react/lazy
https://web.dev/articles/font-best-practices
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
```
