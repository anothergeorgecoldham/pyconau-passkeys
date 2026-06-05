# Repository instructions for Copilot

## Project shape

This repository is the source workspace for `pyconau-passkeys`, an 11ty static companion site for George Coldham's PyCon AU talk, "Passkeys: Authentication Without Shared Secrets." It is currently organized around the authoritative handover materials in `Information/`, not a fully scaffolded application.

Use these files as the primary brief when implementing the site:

- `Information/pyconau-passkeys-handover.md` - complete project handover, information architecture, slide-by-slide content, source catalogue, and recommended repo artifacts.
- `Information/talk-data.yaml` - structured source of truth for project metadata, sources, slides, notes, image names, and `source_keys`.
- `Information/theme.css` - base design system and reusable visual component styles.
- `Information/copilot-build-prompt.md` - condensed implementation brief and definition of done.

## Build, test, and lint commands

There is no `package.json` or executable build/test/lint setup yet. The project brief specifies an 11ty site with these scripts once Node tooling is added:

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "convert:slides": "node scripts/convert-slides.mjs"
  }
}
```

Expected commands after scaffolding:

```bash
npm install
npm run dev
npm run build
npm run convert:slides
```

No single-test command exists yet because no test framework is configured.

## Architecture and data flow

The intended implementation is a static 11ty/GitHub Pages site. Content should be data-driven from the talk data rather than duplicated across templates. When scaffolding the site, copy or transform `Information/talk-data.yaml` into `src/_data/talk.yaml` and treat that file as the generated site's single source of truth.

Expected high-level structure:

- `src/_data/talk.yaml` supplies project metadata, authoritative sources, and slide records.
- `src/_includes/layouts/base.njk` and `src/_includes/layouts/slide.njk` provide shared page framing and slide page layout.
- A slide pagination template, such as `src/slides/slides.11tydata.js`, generates one page per slide.
- `src/assets/css/theme.css` carries forward the design system from `Information/theme.css`.
- `src/assets/slides/` contains converted WebP slide images referenced by generated slide pages.
- `.github/workflows/deploy.yml` should deploy the 11ty build to GitHub Pages using the official Eleventy/GitHub Pages approach.

Configure the GitHub Pages path prefix for `/pyconau-passkeys/` unless a custom domain is added.

## Content conventions

Each generated slide page should render the same content model:

1. Slide image hero or gallery plate.
2. Slide title and intention.
3. Page summary.
4. Speaker track as readable prose.
5. Highlight notes as callouts.
6. Additional reading resolved from `source_keys`.
7. Previous/next navigation.

Preserve the slide sequence and slug-based routes from the handover and data file. The intended routes include `/slides/01-passkeys-authentication-without-shared-secrets/` through `/slides/11-fewer-passwords/`, plus `/slides/12-resources/` as a future placeholder and `/resources/` for the grouped source catalogue.

Group resources by meaningful source type: standards, government guidance, developer implementation, enterprise deployment, and site build documentation. Microsoft references are acceptable where relevant, but keep the public tone vendor-neutral and balance them with standards, government, FIDO, OWASP, MDN, web.dev, and passkeys.dev sources.

## Design conventions

Do not apply a generic documentation or blog theme. The site should extend the modern Art Nouveau slide deck as a polished conference companion and visual essay.

Use the existing palette and CSS variables from `Information/theme.css`: plum as the anchor color, mist/cream backgrounds, pale gold and peach accents, sage support color, expressive serif headings, and readable sans-serif body text. Reuse component patterns already represented there: `hero-panel`, `slide-plate`, `content-panel`, `speaker-track`, `note-callout`, `source-grid`, `source-card`, and `slide-nav`.

Treat each slide page like a gallery plate with technical notes below it. Use subtle CSS-only transitions, preserve visible focus states, support `prefers-reduced-motion`, keep JavaScript optional and minimal, and optimize first for desktop/laptop conference browsing while remaining responsive.

## Asset conventions

The source slide images are PNGs. Convert them to high-quality WebP for the site and reference the WebP images from generated pages. Prefer full-resolution WebP at quality around 90-92 using `sharp`, `@11ty/eleventy-img`, or an equivalent script.

Slide 12 is intentionally future-facing: keep `/slides/12-resources/` available, use the placeholder image/data until the GitHub Pages URL is confirmed, and later add a QR code, short URL, repo link, and further-reading callout.
