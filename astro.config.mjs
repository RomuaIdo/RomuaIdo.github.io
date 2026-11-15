// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkAscii from './src/plugins/remark-ascii.mjs';

export default defineConfig({
  site: 'https://romuaido.github.io',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    // MDX inherits this processor.
    processor: unified({
      remarkPlugins: [remarkMath, remarkAscii],
      rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-dimmed' }, defaultColor: false },
  },
  integrations: [
    mdx(),
    sitemap({ i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } } }),
  ],
  vite: { plugins: [tailwindcss()] },
});
