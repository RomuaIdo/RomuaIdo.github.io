import { defaultLang, languages, routes, ui, type Lang, type UiKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export const projectHref = (lang: Lang, slug: string) => `${routes[lang].projects}/${slug}/`;
export const benchHref = (lang: Lang, slug: string) => `${routes[lang].bench}/${slug}/`;

// Maps the current path to its counterpart in the other language.
export function translatePath(pathname: string, target: Lang): string {
  const from: Lang = pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'pt';
  if (from === target) return pathname;
  const src = routes[from];
  const dst = routes[target];
  const keys = ['projects', 'bench', 'about'] as const;
  for (const k of keys) {
    if (pathname === src[k] || pathname.startsWith(`${src[k]}/`)) {
      return dst[k] + pathname.slice(src[k].length);
    }
  }
  return dst.home;
}

// Content entries are stored as "<lang>/<slug>"; this strips the language prefix.
export const entrySlug = (id: string) => id.split('/').slice(1).join('/');
export const entryLang = (id: string) => id.split('/')[0] as Lang;
