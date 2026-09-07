# v4 - Instagram DM és e-mail kapcsolat

Dátum: 2026-09-08. Alap: `parentegoaltending-optimized-contacts-v3.zip`.

## Módosítások

Az ügyfél nyilvános telefonszáma és a hozzá tartozó híváshivatkozások kikerültek. Az asztali hero szövege most csak: "Available by appointment".

A Contact részben a meglévő piros gombstílusú "Message on Instagram" és körvonalas "Email us" gomb szerepel. Mobilon egymás alatt jelennek meg. Az Instagram-profil külön hivatkozása és a meglévő Follow on Instagram szekció is megmaradt.

- DM gomb címe: `https://ig.me/m/parentegoaltending`
- E-mail: `parentegoaltending@gmail.com`

Az űrlap **Phone mezője megmaradt**, továbbra is opcionális, és a látogató által megadott szám bekerül az előre kitöltött e-mailbe. Nem került be automatikus üzenetküldés, API vagy widget.

A rolling bar, a korábban javított térközök, a navigáció, a többi szekció és a képfájlok változatlanok. A mobilos coach-kivonat nem került vissza. Vélemények szekció továbbra sincs.

A jogi oldalak a v3 csomagban már csak az e-mail-címet tartalmazták kapcsolati elérhetőségként, így ezekhez nem kellett hozzányúlni. A "September 8, 2026" dátum és az űrlapon kérhető telefonszám adatfelsorolása megmaradt.

## Ellenőrzések

- `npm run check`: sikeres, a kapcsolati módosításokra vonatkozó ellenőrzésekkel bővítve.
- JSX szintaktikai fordítás (3 modul) és CSS-elemzés: sikeres.
- Offline Chromium/React 19.2.6 felületi teszt: 112/112 sikeres ellenőrzés; 320, 375, 390, 430, 768, 1024 és 1440 px szélességen.
- Az űrlap JSX-e, a menü, a ticker komponens és a két jogi oldal a v3 forrásával megegyezik. A CSS kizárólag az új kapcsolati elemek saját osztályaival bővült.

Eredmények: `contact-qa-v4.json`. A korábbi `qa-results.json` nem a v4 tesztje, hanem az eredeti optimalizálás történeti jegyzőkönyve.

### Korlátok

A teszt rendszerbetűs tartalékkal és memóriabeli localStorage-helyettesítővel futott. Nem volt elérhető az npm-registry; a Vite-build itt nem volt ellenőrizhető. A JSX/CSS és offline felületi teszt nem helyettesíti a Vite-buildet.

A DM-link címe be van állítva, de a tényleges Instagram-beszélgetés megnyitását bejelentkezett fiókkal nem tudtuk ellenőrizni. Nem küldtünk tesztüzenetet. Az élesítés előtt ezt a dev oldalon másik, bejelentkezett Instagram-fiókkal próbáld ki. A külön profilhivatkozás és az e-mailes kapcsolat alternatívaként is megmarad.

## Használat

A kicsomagolt projektben:

```bash
npm ci
npm run check
npm run build
npm run preview
```

Először a dev repóban tesztelj. A saját `.git` mappádat és `.env` fájljaidat őrizd meg. A ZIP nem tartalmaz Git-előzményeket, node_modules mappát vagy hozzáférési kulcsot.
