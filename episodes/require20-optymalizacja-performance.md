---
title: "require(#20) - Tricki na optymalizację stron"
shortDescription: "W tym odcinku prezentujemy wybrane przez nas techniki, pozwalające na przyspieszanie stron internetowych. Koncenturjemy się na prostych i łatwych w zaimplementowaniu rozwiązaniach, więc na pewno na każdą stronę znajdzie się coś, co pozwoli usprawnić jej wydajność."
publicationDate: "2020-10-12"
audioUrl: "https://anchor.fm/s/139df89c/podcast/play/20990244/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-12%2F24ff3d1f-0cbf-2e32-ab3d-788db7da55d2.mp3"
spotifyUrl: "https://open.spotify.com/show/55IXMbPmncm67FA5ZAydtL?si=aXQlmjrpSZu-7IoLkuTTrw"
youtubeUrl: "https://www.youtube.com/watch?v=xOBumZMEx_4"
slug: "/20/tricki-na-optymalizacje-stron"
---

W tym odcinku prezentujemy wybrane przez nas techniki, pozwalające na przyspieszanie stron internetowych. Koncenturjemy się na prostych i łatwych w zaimplementowaniu rozwiązaniach, więc na pewno na każdą stronę znajdzie się coś, co pozwoli usprawnić jej wydajność.

## Szybkie nowości

- Deno 1.4 https://deno.land/posts/v1.4
- GitHub CLI https://github.blog/2020-09-17-github-cli-1-0-is-now-available/
- Vue 3 https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## Linki i notatki

### Caching

- Cachowanie assetów i `Cache-Control`
- Cloudflare https://www.cloudflare.com/
- Cachowanie requestów w `localStorage`

### Optymalizacja kodu strony

- **Minifikuj pliki strony**
- Ładowanie skryptów, `async` vs `defer`
  - https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- Preloading
- Usuwaj nieużywany kod, nie powielaj jego wielu podobnych fragmentów
- Korzystaj z module bundlerów oraz z Tree Shakingu
  - https://webpack.js.org/
  - https://parceljs.org/

### Obrazki

- Wybierz odpowiedni format pliku - JPEG, PNG, GIF, **WEBP**
  - https://caniuse.com/?search=webp
- Możesz dostosować rozmiar obrazka względem rozmiaru ekranu, korzystając z tagu `<picture>`
- Imagemin:
  - https://github.com/imagemin/imagemin
  - https://github.com/imagemin/imagemin-cli
  - https://github.com/webpack-contrib/image-minimizer-webpack-plugin
- Blurhash https://github.com/woltapp/blurhash
- Korzystaj z SVG
  - `svgo` - optimizer do plików SVG https://github.com/svg/svgo

### Lazy loading

- Lazy loading kodu
- Lazy loading assetów:
  - `<img loading="lazy">`
  - Intersection Observer API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  - https://www.npmjs.com/package/lozad

### Inne pro-tipy

- Przy ładowaniu czcionek, korzystaj tylko z tych subsetów, których potrzebujesz
- Korzystając z gotowych setów ikonek, ładuj tylko te ikony, z których korzystasz

### Co zrobi te rzeczy za nas?

- Gatsby.js https://www.gatsbyjs.com/
  - Prerendering
  - Prefetching stron przez przekierowaniem
  - Optymalizacja obrazków z `gatsby-image` https://www.gatsbyjs.com/plugins/gatsby-image/
- Next.js
  - SSR

## 🔥 Fajne rzeczy 🔥

- Adam - Hacktoberfest
  - https://hacktoberfest.digitalocean.com/
  - https://github.com/requirepodcast/episodes
- Artur - https://github.com/shrutikapoor08/devjoke
