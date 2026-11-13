// Сайтът може да живее в подпапка (base в astro.config.mjs), затова вътрешните
// адреси минават оттук: url('/statii/x/') → '/sbornik-levski/statii/x/'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (path.startsWith('/') ? base + path : path);
