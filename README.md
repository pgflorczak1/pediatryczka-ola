# Pediatryczka Ola — strona

Statyczna strona (HTML + CSS + JS), bez builda i bez zależności.

## Struktura
- `index.html` — strona główna (Moja Historia, Książka, O Mnie, W Mediach)
- `ksiazka.html` — strona książki (opis, ceny, przyciski do salescrm)
- `regulamin.html`, `polityka-prywatnosci.html` — podstrony z pełnymi tekstami
- `styles.css`, `script.js`
- `assets/` — zdjęcia; `assets/obrazy/` — 8 obrazów LOLALI (+ miniatury `-s`) i zdjęcia płócien `plan-*.webp`; `assets/foto/` — zdjęcia z albumu w książce

## Linki sklepu
W `index.html` sekcja `#ksiazka`:
- książka → https://pediatryczka.salescrm.pl/cart/add_product/13860
- e-book → https://pediatryczka.salescrm.pl/cart/add_product/16813

## Do uzupełnienia
- link do artykułu Onet.pl (sekcja `#prasa`, teraz prowadzi do onet.pl)
- `polityka-prywatnosci.html` §4 — tytuł i początek pkt 1 (oznaczone na stronie)

## Publikacja (darmowo)
Netlify: przeciągnij folder na https://app.netlify.com/drop
Cloudflare Pages / Vercel / GitHub Pages: wskaż ten folder jako root, bez komendy build.
Potem w panelu domeny (tam, gdzie była podpięta do Wix) zmień rekordy DNS na te podane przez hosting.

## Jak wprowadzać zmiany
1. Załóż repozytorium na GitHubie i wrzuć ten folder (`git init && git add . && git commit -m "start"`).
2. Podepnij repo pod Cloudflare Pages / Netlify (framework: none, build command: puste, output dir: `/`).
3. Od tej pory każdy `git push` = automatyczna publikacja. Teksty edytujesz w plikach `.html`, kolory/fonty w `styles.css` (sekcja `:root` na górze). Cytaty z książki: sekcja `#cytaty` w `index.html`; obrazy: sekcja `#obrazy`; zdjęcia z albumu: sekcja `#chwile`.
