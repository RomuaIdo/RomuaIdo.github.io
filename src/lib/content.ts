import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { entryLang } from '../i18n/utils';

export async function getProjects(lang: Lang) {
  const all = await getCollection('projects', (e) => entryLang(e.id) === lang && !e.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getBench(lang: Lang) {
  const all = await getCollection('bench', (e) => entryLang(e.id) === lang && !e.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}
