# TODO.md

Fresh-start cleanup list for the Odin Hugo website.

## Priority 1: Template Correctness

- Fix malformed anchor markup in `themes/odin/layouts/partials/header.html`.
  - There is an extra `>` after menu links.
  - The dark-mode control is an `<a>` but closes with `</button>`.
- Fix malformed anchor markup in `themes/odin/layouts/_default/list.html`.
  - Section listing links have an extra closing `>`.
- Fix malformed anchor markup in `themes/odin/layouts/partials/sidebar.html`.
  - Sidebar links have an extra closing `>`.
- Clean up invalid homepage HTML in `themes/odin/layouts/index.html`.
  - Remove the `<p><ul>...</ul></p>` pattern in the ChiAha section.
  - Check the extra closing `</div>` around the end of the production section.
  - Fix image tags that use `height="48px"/ >`.

## Priority 2: Metadata And SEO

- Remove duplicate `og:image` output in `themes/odin/layouts/partials/head.html`.
- Add a real `params.description` in `config.toml` or change metadata fallback behavior.
- Fix `og:site_name` so it uses the site title instead of `.Site.Params.title`.
- Consider adding Twitter card metadata.
- Audit pages with HTML-heavy summaries, especially showcase entries, so list pages and metadata stay clean.

## Priority 3: Accessibility And Link Hygiene

- Add `rel="noopener noreferrer"` to external links with `target="_blank"`.
- Make the dark-mode toggle a real `<button>` with an accessible label.
- Review iframe titles and video/image alt text.
- Check heading order on the homepage and article pages.
- Verify keyboard navigation through the main navigation and mobile menu.

## Priority 4: Frontend Maintainability

- Decide whether homepage sections should remain hardcoded or move into data files/partials.
- Reduce inline styles in `themes/odin/layouts/index.html`.
- Keep style ownership clear between `common.css`, `frontpage.css`, and `docs.css`.
- Make `script.js` more defensive around missing table-of-contents anchors.
- Consider replacing highlight assets with a documented vendoring workflow.

## Priority 5: Build And Repository Hygiene

- Align local development instructions with the deploy-pinned Hugo version, currently `0.145.0`.
- Decide whether `themes/odin/assets/node_modules/` should stay committed.
- Consider adding a simple HTML validation or smoke-test step for generated pages.
- Keep `public/` and `resources/` out of commits unless intentionally publishing generated output.

## Priority 6: Content Freshness

- Update footer copyright from `2016-2024`.
- Review homepage production claims and external product links for freshness.
- Review Discord, GitHub, sponsorship, and package links.
- Check old newsletter media links for broken external embeds.

## Verification Checklist

After meaningful changes:

```sh
hugo --minify
```

Then inspect:

- `/`
- `/docs/overview/`
- `/docs/install/`
- `/news/`
- latest newsletter page
- `/showcase/`
- one showcase detail page

Check both light and dark mode, plus mobile navigation behavior.
