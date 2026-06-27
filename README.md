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

Projektis ei ole backendit. Vormide saatmine on lahendatud failis `src/services/formSubmit.js` kahe kihina:

1. andmed salvestatakse brauseri `localStorage` mock-andmetesse;
2. avatakse `mailto:` link, mis koostab e-kirja haldaja aadressile.

Viktoriini vormi eduteade on `Registreering saadetud!`.

Mock-andmete võtmed brauseris:

- `raimRuudusQuizRegistrations`
- `raimRuudusContactMessages`

## Kuidas vorm päriselt e-kirja saatma panna

Kõige lihtsamad variandid:

- Netlify Forms, kui sait majutatakse Netlifys;
- Formspree või Basin, kui soovid kiiret vormiteenust;
- EmailJS, kui soovid saata frontendist ilma oma serverita;
- Vercel/Netlify serverless endpoint koos teenusega Resend, SendGrid või Mailgun.

Praktiline serverless suund:

1. loo endpoint näiteks `/api/contact`;
2. valideeri samad väljad serveris uuesti;
3. saada e-kiri Resendi või SendGridi kaudu;
4. asenda `src/services/formSubmit.js` sees `openMailClient` päris `fetch('/api/contact')` päringuga;
5. jäta `localStorage` arenduse ajaks varukoopiaks või eemalda see tootmises.

Formspree kasutamisel:

1. loo Formspree vorm ja kopeeri endpoint;
2. saada `src/services/formSubmit.js` failist `fetch('https://formspree.io/f/...')` päring;
3. eemalda `window.location.href = mailtoUrl`, kui automaatne saatmine on töös.

Netlify Forms kasutamisel:

1. lisa vormidele Netlify nõutud atribuudid;
2. ehita ja majuta sait Netlifys;
3. kontrolli Netlify Forms paneelist, et registreeringud jõuavad kohale.

Resendi kasutamisel:

1. lisa serverless endpoint, näiteks `/api/contact`;
2. hoia Resendi API võti ainult serveri keskkonnamuutujas;
3. kutsu endpointi `src/services/formSubmit.js` failist `fetch` päringuga.

## Sisu ja piltide vahetamine

Praegu on galeriid ehitatud visuaalsete placeholder-plokkidena. Kui päris fotod on olemas, lisa need näiteks `src/assets/` kausta ja asenda vastavad placeholderid `img` elementidega komponentides:

- `src/App.jsx` avalehe galerii jaoks;
- `src/components/Exhibition.jsx` näituse galerii jaoks.
