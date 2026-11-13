import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { themes, kinds } from './site';

// Том: src/content/volumes/tom-N.md
const volumes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/volumes' }),
  schema: z.object({
    number: z.number().int().positive(),
    year: z.number().int().optional(),
    pdf: z.string().optional(),
    spineColor: z.string().default('#7A2318'),
  }),
});

// Статия: src/content/articles/<адрес-на-латиница>.md
const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    authors: z.array(z.string()).min(1),
    volume: reference('volumes'),
    theme: z.enum(themes),
    pages: z.object({ from: z.number().int(), to: z.number().int() }).optional(),
    pdf: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    abstract: z.string().optional(),
    abstractEn: z.string().optional(),
  }),
});

// Откритие (видео): src/content/discoveries/<адрес-на-латиница>.md
const discoveries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/discoveries' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(Object.keys(kinds) as [string, ...string[]]),
    order: z.number().default(100),
    summary: z.string(),
    source: z.string().optional(),
    youtubeId: z.string().optional(),
    duration: z.string().optional(),
    date: z.coerce.date().optional(),
    article: reference('articles').optional(),
  }),
});

export const collections = { volumes, articles, discoveries };
