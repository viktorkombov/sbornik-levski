import type { APIRoute } from 'astro';
import { site } from '../site';
import { url as withBase } from '../lib/url';

export const GET: APIRoute = ({ site: url }) =>
  new Response(
    (site.sample ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n') +
      `\nSitemap: ${new URL(withBase('/sitemap-index.xml'), url)}\n`,
  );
