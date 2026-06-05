# Copilot / Coding Agent Build Prompt

You are building `pyconau-passkeys`, an 11ty static site hosted on GitHub Pages for George Coldham's PyCon AU talk, **Authentication for humans, why passkeys finally make sense.**

Use these files as your authoritative brief:

- `pyconau-passkeys-handover.md`
- `talk-data.yaml`
- `theme.css`

## Build goals

Create a polished conference companion site and visual essay. The site must feel visually connected to the modern Art Nouveau slide deck: elegant, lyrical, technical, poetic, but still readable and fast.

## Technical requirements

- Use 11ty.
- Deploy through GitHub Actions to GitHub Pages.
- Configure path prefix for `/pyconau-passkeys/` unless a custom domain is configured.
- Use `talk-data.yaml` as the single source of truth.
- Generate one slide page per slide.
- Include the Slide 12 resources route.
- Convert slide PNGs to high-quality WebP and reference those WebP images from the generated pages.
- Use semantic HTML and accessible alt text.
- Add `prefers-reduced-motion` support.
- Keep JavaScript optional and minimal.

## Design requirements

- Use `theme.css` as the base design system.
- Do not use a generic documentation/blog theme.
- Build reusable components:
  - slide hero image plate
  - speaker track section
  - highlighted note callout
  - source card
  - previous/next navigation
  - resources index
- Preserve reading comfort: max-width long text, generous spacing, high contrast.
- Use subtle transitions only.

## Suggested pages

- `/`
- `/slides/01-passkeys-authentication-without-shared-secrets/` through `/slides/11-fewer-passwords/`
- `/slides/12-resources/`
- `/resources/`
- `/about/`

## Build scripts

Implement:

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "convert:slides": "node scripts/convert-slides.mjs"
  }
}
```

Use `sharp` or `@11ty/eleventy-img` for conversion. Prefer full-resolution WebP at quality around 90–92.

## Definition of done

- `npm run build` succeeds.
- Site works under GitHub Pages path prefix.
- Every slide page renders the WebP slide, speaker track, highlighted notes, and mapped additional reading.
- Resources page groups authoritative passkey links by standards, government guidance, developer implementation and enterprise deployment.
- Design is visually distinctive and consistent with the deck.
- Site remains accessible, responsive and static.
