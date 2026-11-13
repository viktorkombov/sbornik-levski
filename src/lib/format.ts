import { site } from '../site';

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function roman(n: number): string {
  let out = '';
  for (const [v, s] of ROMAN) while (n >= v) { out += s; n -= v; }
  return out;
}

export const volLabel = (n: number) => `Том ${roman(n)}`;

export function pagesLabel(p?: { from: number; to: number }): string {
  return p ? `с. ${p.from}–${p.to}` : 'с. [00–00]';
}

export function citation(a: {
  title: string; authors: string[]; pages?: { from: number; to: number };
}, v: { number: number; year?: number }): string {
  return `${a.authors.join(', ')}. ${a.title.replace(/\.$/, '')}. – В: ${site.title}, т. ${roman(v.number)}, ${site.city}, ${v.year ?? '[ГОДИНА]'}, ${pagesLabel(a.pages)}.`;
}

export const or = (value: string | undefined, placeholder: string) => value || `[${placeholder}]`;
