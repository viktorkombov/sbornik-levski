import { getCollection } from 'astro:content';

// Зарежда всичко наведнъж: томове по номер, статии по том и страница, открития по ред.
export async function load() {
  const volumes = (await getCollection('volumes')).sort((a, b) => a.data.number - b.data.number);
  const volById = new Map(volumes.map((v) => [v.id, v]));
  const articles = (await getCollection('articles'))
    .map((a) => ({ ...a, vol: volById.get(a.data.volume.id)! }))
    .sort(
      (a, b) =>
        a.vol.data.number - b.vol.data.number ||
        (a.data.pages?.from ?? 1e9) - (b.data.pages?.from ?? 1e9) ||
        a.id.localeCompare(b.id),
    );
  const artById = new Map(articles.map((a) => [a.id, a]));
  const discoveries = (await getCollection('discoveries'))
    .map((d) => ({ ...d, art: d.data.article ? artById.get(d.data.article.id) : undefined }))
    .sort((a, b) => a.data.order - b.data.order);
  return { volumes, articles, discoveries };
}
