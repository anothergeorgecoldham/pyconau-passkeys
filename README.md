# pyconau-passkeys

Companion website for George Coldham's PyCon AU talk, **Authentication for humans, why passkeys finally make sense.**

The site is an Eleventy static site designed as an audience-facing visual essay: one page per slide, key ideas, and authoritative references.

## Commands

```bash
npm install
npm run convert:slides
npm run dev
npm run build
```

There is no test or lint command configured yet.

## Source material

- `src/_data/talk.yaml` is the site source of truth.
- `Information/pyconau-passkeys-handover.md` is the full handover brief.
- `Information/theme.css` is the base design system.
- `scripts/convert-slides.mjs` converts the provided PNG artwork into WebP files in `src/assets/slides/`.

The GitHub Pages build uses the `/pyconau-passkeys/` path prefix.
