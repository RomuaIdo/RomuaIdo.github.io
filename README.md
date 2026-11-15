# github.io

Source of Vinícius Romualdo Silva's portfolio, published at https://romuaido.github.io.

## Stack

- Astro (static site generation) with TypeScript
- Tailwind CSS v4
- MDX content collections validated with Zod
- KaTeX via `remark-math` and `rehype-katex`
- `ascii` fenced blocks rendered as figures by a custom remark plugin (`src/plugins/remark-ascii.mjs`)
- Portuguese (pt-BR) at `/` and English at `/en/`

## Structure

```
src/
├── config/
│   ├── site.ts          # personal data, GitHub handle and contact links (edit here)
│   └── domains.ts       # project domains and channel colors
├── i18n/                # UI strings and localized routes
├── content/
│   ├── projects/
│   │   ├── pt/          # case studies (pt-BR)
│   │   └── en/          # case studies (English)
│   └── bench/
│       ├── pt/          # bench logs (pt-BR)
│       └── en/          # bench logs (English)
├── components/
├── layouts/
├── views/               # page bodies shared by both languages
├── pages/               # thin routes
└── styles/
    └── global.css
.github/workflows/
└── deploy.yml
```

## Writing a case study

Add an MDX file to `src/content/projects/pt/` and/or `src/content/projects/en/`. The frontmatter fields are:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `summary` | yes | 220 characters or fewer |
| `domain` | yes | `embedded`, `hardware`, `vision`, `iot` or `software` |
| `stack` | yes | list of technologies |
| `start` | yes | start month, `YYYY-MM` |
| `end` | no | expected or actual end month, `YYYY-MM`; omit for open-ended work |
| `paused` | no | boolean, default `false` |
| `featured` | no | boolean, default `true`; `false` lists the project in the compact "Coursework" section instead of the main index |
| `context` | no | course or program |
| `role` | yes | |
| `team` | yes | list of `{ name, github?, confirmed }` |
| `repos` | yes | list of `{ label, url }` |
| `cover` | no | image path |
| `coverAlt` | no | alt text for the cover |
| `order` | yes | sort position |
| `draft` | yes | hides the entry when `true` |

### Automatic status

Status is derived at build time in `src/lib/timeline.ts`. Up to the last day of the `end` month, the project shows as in progress with its expected end date; from the first day of the following month, it shows as completed in the `end` month (e.g. `end: '2026-12'` reads "concluído em 12/2026" from January 2027 on).

The deploy workflow rebuilds daily (cron 06:00 UTC) so the published site stays current. GitHub disables scheduled workflows after 60 days without repository activity; if that happens, re-enable the workflow in the Actions tab.

The body must use these sections, in order:

1. Context and problem
2. Architecture and decisions (trade-offs)
3. Implementation
4. Results and next steps

For media that does not exist yet, use the `<MediaPlaceholder>` component. For images, use the `<Figure>` component, which renders WebP with `loading="lazy"`. A case study or bench page can import images from `src/assets/` inside its MDX and render them with `<Figure src={...} alt="..." />`.

## Commands

```sh
npm install
npm run dev       # local development server
npm run build     # type check (astro check) and static build
npm run preview   # serve the built site locally
```

## Deploy

Pushes to `main` build and publish the site through GitHub Actions (`.github/workflows/deploy.yml`).

In the repository settings, under Pages, set Source to "GitHub Actions".
