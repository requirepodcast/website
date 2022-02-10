---
title: "require(#24) - Trochę o module bundlerach"
shortDescription: "Module bundlery to bardzo przydatne narzędzia wchodzące w skład niemalże każdej nowoczesnej strony internetowej. Zazwyczaj znajdują się pod spodem innych narzędzi, ale warto się również przyjrzeć im samym. W tym odcinku rozmawiamy o tym czym są, co mogą dla nas zrobić oraz porównujemy najciekawsze z nich."
publicationDate: "2020-12-08"
audioUrl: "https://anchor.fm/s/139df89c/podcast/play/23693724/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-11-8%2F96959065-cc3b-b85b-7cb5-7b48a2076936.mp3"
spotifyUrl: "https://open.spotify.com/episode/4u7ojiTM8pUJAu4gRAjMxd?si=8f9ddncPQdiQ2PyK6l4pGA"
youtubeUrl: "https://youtu.be/tnTTf61NA8c"
slug: "/24/troche-o-module-bundlerach"
---

Module bundlery to bardzo przydatne narzędzia wchodzące w skład niemalże każdej nowoczesnej strony internetowej. Zazwyczaj znajdują się pod spodem innych narzędzi, ale warto się również przyjrzeć im samym. W tym odcinku rozmawiamy o tym czym są, co mogą dla nas zrobić oraz porównujemy najciekawsze z nich.

## Linki i notatki

### Czym są module bundlery?

- Główny cel - łączenie kodu składającego się z wielu modułów
- Przerabianie jednego kodu w inny kod, kompatybilny z przeglądarką (+ polyfille)
- Transpilowanie do czystego CSS'a i/lub ładowanie styli (np. SASS, LESS, Stylus)
- Tłumaczenie kodu z template engine'u (jak np. Pug czy EJS) na HTML
- Wsparcie dla dodadków do JS'a (np. JSX, Vue, itp.)
- Wsparcie dla języków kompilowanych do JS'a (np. TypeScript, CoffeeScript)
- Ładowanie i kompresja obrazków (więcej w [odcinku 20](https://require.pl/archive/20/tricki-na-optymalizacje-stron))
- Tree Shaking

### Popularne i ciekawe module bundlery

- Webpack https://webpack.js.org/
  - Najbardziej zaawansowany, najpopularniejszy, najtrudniejszy, uznawany za pewien standard.
- Parcel https://parceljs.org/
  - "Przeciwieństwo" do webpacka, super prosty. Zero potrzeb konfiguracji, `parcel watch index.html`.
- Rollup https://rollupjs.org/
  - Główna konkurencja dla webpacka, łatwiejszy od niego, zrobi generalnie to samo.

---

- ESBuild https://esbuild.github.io/
  - Stworzony w **Go** z myślą o wydajności
  - Skoncentrowany na składni ESM
- Snowpack https://www.snowpack.dev/
  - Wyróżnia się wydajnością w developmencie
  - Do budowania koncowych bundli może wykorzystywać inne bundlery
  - Tylko ES modules
- Rome https://rome.tools/
  - Cały toolkit do pisania kodu, brak potrzebnej konfiguracji, wspiera wszystko po wyjęciu z pudełka
  - Całkiem świeży, rozwijany przez Facebooka

## Szybkie nowości

- Angular 11 https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7
- Tailwind CSS v2.0 https://blog.tailwindcss.com/tailwindcss-v2
  - Bardzo polecamy zobaczyć sobie Tailwinda, w porównaniu do CSS'a to takie klocki _Duplo_
- Gatsby 2.28
  https://twitter.com/GatsbyJS/status/1334135834778406915 https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%402.28.0
