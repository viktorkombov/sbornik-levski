import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://viktorkombov.github.io',
  // Сайтът е в подпапка на GitHub Pages. При собствен домейн махнете base и сменете site.
  base: '/sbornik-levski',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
