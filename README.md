# Parente Goaltending - optimalizált forráscsomag

A feltöltött `parentegoaltending.zip` éles forráskódjából készült. Nem a `parente.dev` véleményes verziója.

**A Training szekció megmaradt. Testimonials és Reviews menüpont nincs.** A szekciók sorrendje, eredeti szövege, kapcsolati adatai, arculati színei és a logó grafikája megmaradtak. A mobilos coach-blokk ugyanazt a nevet és szerepet mutatja, amely asztali nézetben már szerepelt.

## 1. Indítás külön mappában

Bontsd ki a ZIP-et. A Terminálban abba a `parente-optimized` mappába lépj, amelyben a `package.json` található. Előbb állítsd le a régi helyi szervert `Ctrl+C`-vel, hogy ne a korábbi oldalt nézd.

Node.js **22.12.0 vagy újabb** szükséges; a `.nvmrc` Node 22-t jelöl. Az npm-telepítéshez internetkapcsolat kell.

```bash
node -v
npm ci
npm run check
npm run build
npm run preview
```

A `preview` a saját gépeden elkészült, optimalizált buildet mutatja. A Terminálban kiírt **Local** címet nyisd meg. Fejlesztéshez, automatikus frissítéssel:

```bash
npm run dev
```

Telefonos próbához, azonos megbízható Wi-Fi-hálózaton:

```bash
npm run dev:lan
```

A telefonon a Terminál **Network** címét használd, nem a `localhost` címet. A build telefonos ellenőrzéséhez `npm run preview:lan` is rendelkezésre áll.

## 2. Átvitel a dev repóba

Előbb készíts biztonsági másolatot a dev mappáról. A kicsomagolt projekt **tartalmát** másold a dev repó gyökerébe. A `package.json` ne egy további almappába kerüljön.

A meglévő `.git` mappát és saját `.env` fájlokat ne töröld és ne írd felül. A csomag nem tartalmaz Git-kapcsolatot, valódi titkos kulcsot, `node_modules` mappát vagy elavult `dist` buildet.

Ha felülmásoláskor a régi fájlok is megmaradnak, ezek az ismert, már nem használt fájlok eltávolíthatók:

```text
src/components/CookieBanner.jsx
public/images/optimized/parente-optimized.webp
public/images/optimized/parente-mobile.webp
public/images/optimized/parente-p-optimized.webp
public/images/optimized/parente-p-favicon.ico
```

A teljes eredeti logó forrása most az `image-sources/parente-logo.webp`. A nyilvános képváltozatok új, `v2` nevű fájlokat használnak. A `parente-p-256.png` megmaradt a megosztási metaadatokhoz és az Apple ikonhoz.

A dev mappában is futtasd a `npm ci`, `npm run check`, `npm run build` parancsokat. Csak a sikeres build és a saját mobilos ellenőrzésed után ments GitHubra, majd vidd át ugyanazt a forrást az éles repóba. Ne magát a ZIP-et töltsd a repó gyökerébe.

Cloudflare Pages projektbeállítások: build command `npm run build`, output directory `dist`. A publikus domaint és a repókapcsolatot ez a csomag nem állítja át.

## 3. Mi változott?

- A globális CSS és 66 statikus stílusblokk a `src/styles.css` fájlba került. A mobilos felülírások célzottak; nincs minden szekcióra kiterjedő tartalomlevágás.
- A Google Fonts stíluslapja közvetlenül a HTML fejlécéből indul. A betűcsaládok és súlyok maradtak. Betűtípusfájl nincs mellékelve.
- A teljes logó 64/128/256/320/520/780 px változatokat kapott. A `sizes`, `srcSet`, `loading`, méretattribútumok és prioritások az adott elhelyezést követik. A felső logó nem lazy-loaded.
- A favicon 71 888 bájtról 4 299 bájtra csökkent. Új 32 px PNG ikon is készült.
- A jogi oldalak `React.lazy` + `Suspense` megoldással, betöltési és hibajelzéssel nyílnak. A jogi szövegek változatlanok.
- Kompaktabb mobilos belső térközök, tableten kétoszlopos Programs, javított Camp, Contact és footer, valamint kis mobilos coach-blokk került a kódba.
- A mobilmenü nagyobb érintési felületet, Escape/külső érintésre bezárást, billentyűzetes fókuszkezelést, `aria-expanded` jelzést és görgetészárolást kapott. A feliratok igazítása az éles változatot követi, nem a dev jobbra igazítását.
- Mobilon nincs háttérelmosás. A ticker mobilon statikus; asztalon képernyőn kívül és háttérben szünetel. A csökkentett mozgás beállítása minden méreten érvényes.
- A hatástalan motion-propok és az el nem ért régi cookie-komponens kikerültek. Nincs új animációs függőség.
- A cookie-ablak natív `dialog` lett. A duplikált cím és hibás bekezdésbe ágyazás megszűnt. A korábbi választás visszatöltődik. Az X/Escape nem ad hozzájárulást.
- A telepítendő közvetlen csomagverziók a feltöltött lockfile meglévő verzióira vannak rögzítve. Nincs ellenőrizetlen nagyverzió-frissítés.

## 4. Ellenőrzés és korlátok

A `docs/ELLENORZES.md` tartalmazza a módszert és a korlátokat, a `docs/qa-results.json` a 96 sikeres automatikus ellenőrzést.

**A végleges Vite-buildet itt nem lehetett lefuttatni**, mert az npm-registry nem volt elérhető. A felület offline Chromium alatt, a feltöltött csomagból származó React 19.2.6-tal, külön JSX-fordítással lett ellenőrizve. Ez nem Lighthouse-mérés, nem valódi Safari-teszt és nem helyettesíti a saját `npm run build` futtatásodat.

A Google Fonts a tesztkörnyezetben nem töltődött be, ezért a valódi betűtípusokkal is nézd meg a tördelést a dev oldalon. Ellenőrizd a menüt fekvő telefonon, a cookie-beállítások újranyitását, a jogi oldalakat és az űrlapot.

Az űrlap az eredeti verzióhoz hasonlóan **előre kitöltött e-mailt nyit** (`mailto`); nem került bele szerveroldali levélküldés. A tesztek nem küldtek e-mailt. Nem került be új analitika, tracking, Instagram- vagy Google Reviews-widget.

A tábor dátuma, ára, a copyright-év és a sitemap eredeti domainje szándékosan maradt az eredeti tartalom szerint. Publikálás előtt ezek aktualitását külön érdemes ellenőrizni.

## 5. Képek újragenerálása

Nem szükséges a normál indításhoz. A mellékelt logóváltozatok már készen vannak.

```bash
npm run images
```

Logócsere esetén emeld a `v2` jelölést a fájlnevekben és az `App.jsx`-ben, hogy a cache ne tartsa meg a régi grafikát. A `public/_headers` a hash-elt JS/CSS-hez hosszú, a képekhez egyhetes cache-szabályt tartalmaz.
