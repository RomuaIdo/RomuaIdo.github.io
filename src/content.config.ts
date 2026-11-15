import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { domains } from './config/domains';

const domainKeys = Object.keys(domains) as [keyof typeof domains, ...(keyof typeof domains)[]];

const person = z.object({
  name: z.string(),
  github: z.string().optional(),
  // Set to true once the person agreed to be credited by name.
  confirmed: z.boolean().default(false),
});

// Month as "YYYY-MM".
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

const repo = z.object({
  label: z.string(),
  url: z.url(),
});

// Case studies. Files live in src/content/projects/<lang>/<slug>.mdx.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(220),
      domain: z.enum(domainKeys),
      stack: z.array(z.string()).min(1),
      // Status is derived from these dates at build time (see lib/timeline.ts).
      start: month,
      // Expected or actual end month; omit for open-ended work.
      end: month.optional(),
      paused: z.boolean().default(false),
      // Course or program the project belongs to.
      context: z.string().optional(),
      // Featured projects get a full row in the index; the rest go to the coursework list.
      featured: z.boolean().default(true),
      role: z.string(),
      team: z.array(person).default([]),
      repos: z.array(repo).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      order: z.number().int(),
      draft: z.boolean().default(false),
    }),
});

// Short bench logs (repairs, reverse engineering, tooling).
const bench = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bench' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(220),
    tags: z.array(z.string()).default([]),
    year: z.string(),
    repos: z.array(repo).default([]),
    order: z.number().int(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, bench };
