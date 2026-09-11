# Tomin Photo

Fotografportefølje med React, TypeScript, Vite, styled-components, GSAP ScrollTrigger/Flip og Motion.

## Lokal utvikling

```sh
npm install
npm run dev
```

Vite viser lokaladressen i terminalen. Nettstedet har fem fullskjermskapitler med scrollstyrte bildeoverganger, et redaksjonelt galleri, animert kontaktark og en bildeviser med piltaster og Escape. Redusert bevegelse viser kapitlene uten scrollanimasjoner.

## Bilder

Legg JPG, JPEG, PNG, WebP eller AVIF i `src/assets/photos/`, også i undermapper. Kjør `npm run photos` etter at du legger til eller endrer bilder mens serveren kjører. Dette skjer også automatisk ved oppstart og bygg.

`scripts/prepare-photos.mjs` lager WebP-kopier på opptil 720, 1600 og 2560 piksler i `public/photos/`. Originalene beholdes urørt. Eksisterende kopier gjenbrukes når originalen ikke har endret seg. Unngå filnavn som bare skiller seg i mellomrom eller spesialtegn, da navnene normaliseres.

`src/data/generated-photos.json` genereres automatisk. Rediger titler, alternativ tekst, rekkefølge på forsidekapitler og mobilutsnitt i `src/data/photos.ts`. De nåværende 21 bildene har egne beskrivelser; nye bilder får en generell tekst fram til den redigeres.

## Arbeidsfiler

- `src/App.tsx`: scrollytelling, navigasjon, Flip-galleri og bildeviser.
- `src/styles.ts`: styled-components og responsive oppsett.
- `src/index.css`: globale stiler og skrifter.
- `src/lib/animation.ts`: GSAP-registrering.

`npm run build` forbereder bilder, sjekker TypeScript og lager produksjonsbygg. `npm run lint` kjører Oxlint. `npm run preview` viser produksjonsbygget.

Barlow Condensed og DM Sans lastes fra Google Fonts med systemfonter som reserve. Alle grensesnittikoner er SVG og gjengis likt på mobil og PC.

## Kontakt og Netlify Forms

`/kontakt/` inneholder et skjema for print, bruk av bilder og andre henvendelser, og `/takk/` er takkesiden. Netlify-konfigurasjonen bygger med `npm run build`, publiserer `dist` og støtter direkte åpning av begge adressene. Det eksisterende skjemanavnet `booking` er beholdt for kompatibilitet med Netlify. Telefon, sted og dato beholdes som skjulte felt for eldre innsendinger; `photograph` identifiserer fotografiet kunden spør om.

Skjemaet heter `booking`. Den skjulte HTML-definisjonen i `index.html` har samme feltnavn som React-skjemaet i `src/Contact.tsx`, inkludert honeypot. Behold disse i samsvar ved endringer.

Aktiver form detection i Netlify under Forms og deploy på nytt. Kontroller at `booking` vises der, og konfigurer eventuelle e-postvarsler. Produksjonsskjemaet bruker vanlig POST til `/takk/`; Netlify håndterer mottak og omdirigering. Lokalt avbrytes innsending med en tydelig beskjed; ingen data sendes og ingen falsk kvittering vises. Innsending er ikke ende-til-ende-verifisert mot Netlify.

Oppsett: https://docs.netlify.com/manage/forms/setup/
