import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

// Project status derived from start/end months, evaluated at build time.
// A scheduled rebuild (deploy.yml) keeps it current without client JS.

type Data = CollectionEntry<'projects'>['data'];
export type State = 'active' | 'done' | 'paused';

const parse = (m: string) => {
  const [y, mo] = m.split('-').map(Number);
  return { y, mo };
};

const fmt = (m: string) => {
  const { y, mo } = parse(m);
  return `${String(mo).padStart(2, '0')}/${y}`;
};

// First instant after the given month.
const afterMonth = (m: string) => {
  const { y, mo } = parse(m);
  return new Date(Date.UTC(y, mo, 1));
};

export function projectState(d: Data, now = new Date()): State {
  if (d.end && now >= afterMonth(d.end)) return 'done';
  return d.paused ? 'paused' : 'active';
}

const words = {
  pt: { active: 'em andamento', done: 'concluído', paused: 'pausado', expected: 'previsão de término em', doneIn: 'concluído em' },
  en: { active: 'in progress', done: 'complete', paused: 'paused', expected: 'expected to end', doneIn: 'completed' },
} as const;

// Short label for the index, e.g. "em andamento".
export function stateLabel(d: Data, lang: Lang, now = new Date()) {
  return words[lang][projectState(d, now)];
}

// Full status line for the case study, e.g. "em andamento · previsão de término em 12/2026".
export function statusLine(d: Data, lang: Lang, now = new Date()) {
  const w = words[lang];
  const state = projectState(d, now);
  if (state === 'done') return `${w.doneIn} ${fmt(d.end!)}`;
  return d.end ? `${w[state]} · ${w.expected} ${fmt(d.end)}` : w[state];
}

// Period as "04/2026 – 06/2026", or "desde 06/2026" while open-ended.
export function periodLabel(d: Data, lang: Lang) {
  if (!d.end) return `${lang === 'pt' ? 'desde' : 'since'} ${fmt(d.start)}`;
  return d.start === d.end ? fmt(d.start) : `${fmt(d.start)} – ${fmt(d.end)}`;
}

// Year column: "2026" or "2024–2025".
export function yearLabel(d: Data) {
  const a = parse(d.start).y;
  const b = d.end ? parse(d.end).y : a;
  return a === b ? String(a) : `${a}–${b}`;
}
