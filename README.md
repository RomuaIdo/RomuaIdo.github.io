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
| `year` | yes | |
| `period` | no | |
| `status` | yes | `active`, `done` or `paused` |
| `context` | no | |
| `role` | yes | |
| `team` | yes | list of `{ name, github?, confirmed }` |
| `repos` | yes | list of `{ label, url }` |
| `cover` | no | image path |
| `coverAlt` | no | alt text for the cover |
| `order` | yes | sort position |
| `draft` | yes | hides the entry when `true` |

The body must use these sections, in order:

1. Context and problem
2. Architecture and decisions (trade-offs)
3. Implementation
4. Results and next steps

For media that does not exist yet, use the `<MediaPlaceholder>` component. For images, use the `<Figure>` component, which renders WebP with `loading="lazy"`.

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
