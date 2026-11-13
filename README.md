# Сборник на Национален музей „Васил Левски“ – сайт

Статичен сайт на Astro. Всяка статия и всяко откритие имат собствена страница с готов HTML,
тагове за Google Scholar и структурирани данни (schema.org).

## Работа

    npm install
    npm run dev       # локално на http://localhost:4321/sbornik-levski/
    npm run build     # готовият сайт е в dist/

## Преди публикуване

1. `astro.config.mjs` – при собствен домейн сменете `site` и махнете `base`.
2. `src/site.ts` – заглавие, ISSN, имейл, адрес; накрая `sample: false`,
   за да се разреши индексирането (дотогава сайтът е с noindex и robots.txt го забранява).
3. Заменете примерните файлове в `src/content/`.

## Добавяне на съдържание

| Какво | Къде | Бележка |
|---|---|---|
| Том | `src/content/volumes/tom-N.md` | `number`, `year`, `spineColor`, по желание `pdf` |
| Статия | `src/content/articles/<адрес>.md` | името на файла (на латиница) става адрес: `/statii/<адрес>/` |
| Откритие | `src/content/discoveries/<адрес>.md` | `youtubeId` е кодът от адреса на видеото; `article` го връзва със статия |
| PDF файлове | `public/pdf/` | в статията: `pdf: /pdf/файл.pdf` |
| Теми и видове открития | `src/site.ts` | |
| Указания, редколегия | `src/pages/za-avtori.md`, `src/pages/redkolegia.md` | обикновен Markdown |

Полетата са описани в `src/content.config.ts`; при грешно или липсващо поле build-ът спира със съобщение.
За откриваемост най-важни са `abstract`, `abstractEn`, `keywords`, `pages` и `pdf` на всяка статия.

## Публикуване

Сайтът се публикува сам в GitHub Pages при всеки push в `main`
(`.github/workflows/deploy.yml`): https://viktorkombov.github.io/sbornik-levski/

Понеже живее в подпапка, вътрешните адреси в `.astro` файловете минават през `url()` от
`src/lib/url.ts` – напр. `href={url("/statii/...")}`. Полето `pdf: /pdf/файл.pdf` се пише както досега.
В Markdown текст връзките към други страници на сайта трябва да включват подпапката (`/sbornik-levski/...`).

При собствен домейн: в `astro.config.mjs` сменете `site` и махнете `base`.
