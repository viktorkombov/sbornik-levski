// Кратък указател за AI асистенти: какво е сайтът и къде са статиите.
import type { APIRoute } from 'astro';
import { site, kinds } from '../site';
import { load } from '../lib/data';
import { volLabel } from '../lib/format';
import { url as withBase } from '../lib/url';

export const GET: APIRoute = async ({ site: url }) => {
  const { volumes, articles, discoveries } = await load();
  const abs = (p: string) => new URL(withBase(p), url).href;
  const lines = [`# ${site.title}`, '', `> ${site.description}`, '', `Издател: ${site.publisher}, ${site.city}.`];
  for (const v of volumes) {
    lines.push('', `## ${volLabel(v.data.number)}${v.data.year ? ` (${v.data.year})` : ''}`, '');
    for (const a of articles.filter((x) => x.vol.id === v.id)) {
      lines.push(`- [${a.data.title}](${abs(`/statii/${a.id}/`)}): ${a.data.authors.join(', ')}`);
    }
  }
  lines.push('', '## Открития', '');
  for (const d of discoveries) {
    lines.push(`- [${d.data.title}](${abs(`/otkritia/${d.id}/`)}): ${kinds[d.data.kind][0]}. ${d.data.summary}`);
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
