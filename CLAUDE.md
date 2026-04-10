# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

This is a [Hugo](https://gohugo.io/) static site. Install Hugo, then:

```bash
hugo serve        # dev server at localhost with live reload
hugo              # build to /public
```

No npm build step is required for normal development — Bootstrap is vendored in `themes/odin/static/lib/` and `themes/odin/assets/node_modules/`. SCSS lives at `themes/odin/assets/scss/custom.scss` and Hugo processes it automatically.

## Architecture

**Theme:** All layout logic lives in `themes/odin/`. The root `layouts/` directory only contains shortcodes that override the theme.

**Content sections:**
- `content/docs/` — language documentation (Overview, FAQ, Install guide, etc.), rendered with a sidebar listing all pages in the section
- `content/news/` — quarterly newsletters and blog posts; named by date (`2026-Q1.md`) or slug (`calling-odin-from-python.md`)
- `content/showcase/` — project showcases with `weight` front matter controlling display order
- `content/community/` — community links

**Layouts:**
- `themes/odin/layouts/_default/` — base templates (`baseof.html`, `list.html`, `single.html`)
- `themes/odin/layouts/partials/` — reusable partials including `sidebar.html` (docs/community nav), `head.html`, `header.html`, `footer.html`, and newsletter media helpers (`newsletter-youtube.html`, etc.)
- `themes/odin/layouts/partials/odin-examples/` — partials for the interactive code examples on the home page (`hellope.html`, `soa-structs.html`, etc.)

**Front matter conventions:**
- Docs pages use `title`, `summary`, `weight` (controls sidebar order)
- News/blog posts use `title`, `summary`, `slug`, `author`, `date` (ISO string), `categories`
- Showcase entries use `title`, `slug`, `summary`, `author`, `date`, `categories`, `weight`

**Hugo config:** `config.toml` at root — sets `baseURL`, theme, nav menu items, and Goldmark renderer (unsafe HTML allowed, TOC up to level 4).

**Shortcodes:** Root `layouts/shortcodes/` overrides theme shortcodes. Hugo built-in shortcodes (`youtube`, etc.) are also used in content.

**Syntax highlighting:** `highlight.js` is vendored in `themes/odin/static/lib/highlight/` and `public/lib/highlight/`. Code blocks in Markdown use fenced code blocks with language identifiers (`odin`, `txt`, etc.).
