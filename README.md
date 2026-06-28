# Räim Ruudus koduleht

React + Vite projekt Naissaarel asuvale väikesele baarile suure mere ääres Räim Ruudus.

## Kõige lihtsam käivitamine Windowsis

Tee projektikaustas topeltklõps failil:

```text
kaivita.bat
```

See fail paigaldab vajadusel sõltuvused, käivitab kodulehe arendusserveri ja avab brauseri automaatselt. Serveri sulgemiseks vajuta avanenud terminaliaknas `Ctrl+C`.

## Käivitamine

```bash
pnpm install
pnpm run dev
```

## Disainivariandid

Projektis on kolm eraldi vaadet:

- põhidisain: `http://localhost:5173/`
- plakatlik / ajakirjalik disain: `http://localhost:5173/?design=poster`
- saarekaardi ja külgribaga disain: `http://localhost:5173/?design=kaart`

Kui Vite näitab teist porti, näiteks `5174`, kasuta sama aadressi selle pordiga.

Tootmisversiooni kontroll:

```bash
pnpm run build
pnpm run preview
```

Kui pnpm ei ole arvutis paigaldatud, saab kasutada ka npm-i:

```bash
npm install
npm run dev
```

## Kontaktmeili muutmine

Kontaktmeil asub failis `src/data/siteConfig.js`.

```js
contactEmail: 'info@raimruudus.ee'
```

Muuda see aadressiks, kuhu peavad jõudma kontaktivormi ja viktoriini registreeringu kirjad.

## Lahtiolekuaegade muutmine

Lahtioleku info asub failis `src/data/siteConfig.js` väljal `openingInfo`.

Muuda tekste:

- `title`
- `exhibition`
- `appointment`

Neid kasutatakse avalehe infoplokis ja kontaktisektsioonis.

## Naissaarele tulemise info muutmine

Laeva info asub failis `src/data/siteConfig.js` väljal `travel`.

Seal saab muuta:

- pealkirja `title`;
- kirjeldust `text`;
- Nicesaar linki `url`.

Nupp "Vaata laeva infot" avab lingi uues aknas.

## Uute sündmuste ja viktoriinide lisamine

Järgmise viktoriini info asub failis `src/data/events.js`.

Muuda välju:

- `title`
- `date`
- `time`
- `location`
- `teamSize`
- `description`

Sündmuste kalendri "Tulekul" kaardid asuvad samas failis massiivis `upcomingEvents`.

Igal sündmusel on:

- `title`
- `date`
- `time`
- `description`
- `action`
- `href`

Kui lisad uue sündmuse, lisa uus objekt `upcomingEvents` massiivi. Nupp võib viidata näiteks `#viktoriinid` või `#kontakt`.

## KKK vastuste muutmine

Praktilise info / KKK küsimused asuvad failis `src/data/faq.js`.

Muuda või lisa objekte kujul:

```js
{
  question: 'Kas kaardiga saab maksta?',
  answer: 'Jah, kaardiga saab maksta.'
}
```

## Joogimenüü muutmine

Joogimenüü kategooriad asuvad failis `src/data/drinks.js`.

Igal kategoorial on:

- `title`
- `price`
- `tags`
- `description`
- `items`

Näide:

```js
{
  title: 'Õlled',
  price: 'alates 4 €',
  tags: ['külm', 'saareõhtu'],
  description: 'Kohalikud ja kergelt suvised valikud.',
  items: ['Laagerõlu', 'IPA / pale ale']
}
```

Praegu on menüü kujundatud baaritahvli stiilis. Kui soovid hiljem iga joogi eraldi hinnaga kuvada, võib `items` massiivi muuta objektideks ja täiendada `src/components/DrinksMenu.jsx` kuvamist.

## Vormide praegune lahendus

Projekt on seadistatud GitHub Pagesi jaoks, seega Netlify Forms ei ole aktiivne vormilahendus.
Vormide konfiguratsioon asub failis `src/data/siteConfig.js`:

```js
forms: {
  provider: 'mailto',
  formspreeEndpoint: '',
  debugLocalStorage: false,
}
```

Toetatud suunad:

- `provider: 'mailto'` avab külastaja e-posti kliendi ja koostab kirja haldaja aadressile;
- `provider: 'formspree'` saadab vormi Formspree endpointi, kui `formspreeEndpoint` on täidetud;
- kui Formspree endpoint puudub, kasutatakse fallbackina `mailto` lahendust.

Tootmisversioon ei salvesta päris kasutajate sõnumeid `localStorage`-isse. Arenduses saab debug-salvestuse sisse lülitada ainult siis, kui `debugLocalStorage: true`.

Formspree kasutamiseks:

1. loo Formspree vorm;
2. kopeeri endpoint `formspreeEndpoint` väärtuseks;
3. muuda `provider: 'formspree'`;
4. testi vormi production buildis.

## Sisu ja piltide vahetamine

Praegu on galeriid ehitatud visuaalsete placeholder-plokkidena. Kui päris fotod on olemas, lisa need näiteks `src/assets/` kausta ja asenda vastavad placeholderid `img` elementidega komponentides:

- `src/App.jsx` avalehe galerii jaoks;
- `src/components/Exhibition.jsx` näituse galerii jaoks.
