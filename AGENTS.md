# AGENTS.md

Guidance for future agents working on this Hugo static site.

## Project Overview

This repository powers the Odin programming language website. It is a Hugo site with a custom theme at `themes/odin`.

The site has three main layers:

- `content/`: Markdown pages for docs, news, showcase, community, and spec content.
- `themes/odin/layouts/`: Hugo templates for the homepage, default list/single pages, and shared partials.
- `themes/odin/static/` and `static/`: Static assets copied into the generated site.

The homepage is mostly hand-authored HTML in `themes/odin/layouts/index.html`. Most inner pages are Markdown rendered through `themes/odin/layouts/_default/single.html` and `themes/odin/layouts/_default/list.html`.

## Build And Serve

Use Hugo Extended.

```sh
hugo --minify
hugo serve
```

The deploy workflow currently pins Hugo Extended `0.145.0` in `.github/workflows/deploy.yml`. Local versions may differ, so if a build issue is version-sensitive, compare against that version.

Generated output lives in `public/` and should not be committed unless the project policy changes.

## Styling

There are three style entrypoints:

- `themes/odin/static/css/common.css`: Shared tokens, base styles, header/footer, media, buttons, code, and tables.
- `themes/odin/static/css/frontpage.css`: Homepage-only sections.
- `themes/odin/static/css/docs.css`: Markdown/content page layouts.

Prefer existing site classes and shared tokens before adding new CSS. Keep custom CSS small and easy to trace.

## Templates

Important templates:

- `themes/odin/layouts/index.html`: Homepage.
- `themes/odin/layouts/_default/baseof.html`: Base shell, dark-mode script, header/footer.
- `themes/odin/layouts/_default/single.html`: Markdown article pages with sidebar and table of contents.
- `themes/odin/layouts/_default/list.html`: Section listing pages.
- `themes/odin/layouts/partials/head.html`: Metadata, styles, highlight.js, analytics.
- `themes/odin/layouts/partials/header.html`: Main navigation and appearance toggle.
- `themes/odin/layouts/partials/sidebar.html`: Section sidebar.
- `themes/odin/layouts/partials/footer.html`: Footer links.

When editing templates, check generated HTML in `public/` or through `hugo serve`. Hugo can succeed even when the final HTML is malformed.

## Content Conventions

Markdown content uses YAML front matter. Common fields include:

- `title`
- `linktitle`
- `summary`
- `slug`
- `author`
- `date`
- `categories`
- `weight`

Docs pages often use `weight` for ordering. News and showcase pages usually use `date`, `slug`, and `categories`.

Goldmark unsafe rendering is enabled in `config.toml`, so inline HTML in Markdown is allowed and used throughout the site. Treat Markdown files as part content, part template surface.

Project-level shortcodes live in `layouts/shortcodes/` and are used mainly by newsletter posts for images and videos.

## JavaScript

Global custom JavaScript:

- `themes/odin/static/js/script.js`: Table-of-contents active state and table styling.

Keep scripts defensive. Some templates do not include every element a script may look for.

## Assets

Root `static/` and theme `themes/odin/static/` are both copied into the final site. Be deliberate about where new assets go:

- Use root `static/` for site content assets such as news images and showcase media.
- Use theme static assets for theme-owned logos, libraries, and layout assets.

Avoid adding large generated files unless they are intentionally part of the published site.

## Before Finishing Changes

Run:

```sh
hugo --minify
```

For visual/template work, also run `hugo serve` and inspect the changed pages in a browser. Pay special attention to desktop and mobile widths, dark mode, the main navigation, sidebars, and table of contents.

## Known Cleanup Areas

The site currently builds, but some templates contain recoverable malformed HTML and stale metadata. See `TODO.md` for a prioritized list.
