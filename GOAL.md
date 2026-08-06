# GOAL.md

## Current Big Goal

Create a new Odin frontpage that is clear, minimal, modern, and easier to evolve than the current hand-built homepage.

The first major piece of work is the custom homepage template at `themes/odin/layouts/index.html`. The rest of the site can remain on the current previous theme for now. The new frontpage should get its own stylesheet first, then later we can decide what becomes part of a broader site-wide design system.

## Product Direction

The new frontpage should make Odin feel:

- serious without feeling heavy
- modern without feeling trendy
- simple without feeling sparse
- technical without becoming dense
- calm, soft, and approachable

The page should help a new visitor quickly understand:

- what Odin is
- why it exists
- what it is good at
- how to try it
- where to go next

The target is not a marketing splash page. It should feel like the front door to a practical programming language.

## Inspiration: Swift.org Deep Analysis

Use [swift.org](https://www.swift.org/) as design inspiration, not as a clone.

Swift's current frontpage is useful because it solves the same kind of problem: introduce a programming language to new visitors, communicate technical credibility, and create a simple path into installation, docs, community, packages, and blog content.

### Information Architecture

Swift keeps the homepage extremely linear:

1. Header navigation
   - Logo on the left.
   - Docs, Community, Packages, Blog, and Install on the right.
   - The nav is minimal and does not compete with the hero.

2. Hero
   - One clear identity statement: Swift is a powerful, flexible, multiplatform programming language.
   - One compact value phrase: "Fast. Expressive. Safe."
   - One dominant CTA: Install.
   - One small support line: tools for Linux, macOS, and Windows.

3. Use cases
   - "Create using Swift" introduces practical domains before the page explains language features.
   - The first row gives three larger cards: Cloud Services, Command Line, Embedded.
   - A second compact link row covers broader areas: iOS apps, Windows apps, Machine Learning & AI, Packages.

4. Short positioning paragraph
   - Swift explains that it is meant for every layer of the stack.
   - This paragraph bridges use cases into the feature sections.

5. Feature proof sections
   - Fast, Expressive, Safe, Interoperable, and Adaptable.
   - Each feature has a clear title, a short subtitle, a short paragraph, and a real code example.
   - Layout alternates text/code alignment to create rhythm without adding more visual concepts.

6. Open source close
   - The page ends with contribution/community links.
   - Footer navigation expands into tools, community, governance, and legal links.

The key lesson for Odin: start with orientation, then use cases, then proof. Do not start by explaining every feature. The frontpage should move from "what is this?" to "what can I build?" to "why should I believe it?"

### Visual Design

Swift's visual tone is soft, warm, and low-friction:

- The hero uses a warm beige/orange field with visible grain.
- Large abstract swoops create motion and identity without requiring a product screenshot.
- Text is centered in the hero, with generous vertical spacing.
- The primary button is large, rounded, orange/red, and visually obvious.
- Use-case cards are softly rounded and sit on warm translucent surfaces.
- Feature sections shift into cooler pale backgrounds, giving the page a calm second act.
- Code blocks are light, softly bordered, rounded rectangles with syntax color.
- The site avoids hard dividers; section transitions are handled by background changes, spacing, and large abstract shapes.
- The header is translucent/light and restrained.

The key lesson for Odin: use softness and restraint, but keep Odin more grounded. Swift can lean into warm expressive abstraction; Odin should use similar polish while feeling lower-level, precise, and data-oriented.

### Typography And Hierarchy

Swift's hierarchy is simple and effective:

- Hero headline is large but not huge.
- Hero supporting phrase is shorter and lighter.
- Feature titles are large and confident.
- Feature subtitles are compact and plain.
- Body copy is narrow enough to read quickly.
- Code blocks function as visual anchors and proof.

Approximate observed desktop behavior:

- Header height is about 67px.
- Hero headline is about 48px, 600 weight, with relaxed line height.
- Hero subtitle is about 32px, regular weight.
- Feature headings are about 48px.
- Body text is around 17px with generous line height.
- Code is around 14px with roomy padding.

The key lesson for Odin: do not overcomplicate type scale. One strong headline style, one strong section title style, one body style, and one code style are enough.

### Content Rhythm

Swift uses a good alternating pattern:

- broad promise
- practical use cases
- compact explanation
- feature proof
- feature proof
- feature proof
- open source/community

The feature sections work because every block has the same mental model:

- title
- short claim
- explanation
- code

This is exactly the kind of "things of 3" or structured content Odin should use. A visitor should learn the page pattern once, then scan it easily.

For Odin, candidate repeated groups:

- Simplicity / Performance / Data-Oriented Design
- Systems / Tools / Graphics & Simulation
- Core / Vendor / Packages
- Read the Docs / Download / Join the Community

### What To Borrow

Borrow:

- The calm single-primary-action hero.
- The compact value phrase after the hero statement.
- The use-case grid before deep feature explanation.
- Repeated feature rows with real code.
- Soft textured backgrounds.
- Large spacing and low visual clutter.
- Alternating text/code layouts.
- A warm-to-cool page flow.
- A footer/community close that feels like the natural next step.

### What Not To Borrow

Do not borrow directly:

- Swift's orange brand palette.
- Swift's specific abstract bird/swoop shapes.
- The large pill button style exactly as-is.
- The exact "Fast. Expressive. Safe." value phrase.
- Apple-like brand softness to the point where Odin feels less technical.
- A page that is too centered for too long; Odin can benefit from more editorial left/right structure after the hero.

### Odin-Specific Translation

Swift's page sells broad approachability. Odin should sell practical clarity.

Where Swift says:

- powerful
- flexible
- multiplatform
- fast / expressive / safe

Odin should communicate:

- simple
- explicit
- fast
- data-oriented
- modern systems programming
- joy without ceremony

Possible Odin hero framing:

- "Odin is a modern systems language for data-oriented software."
- "Simple. Explicit. Fast."
- "Built for control, clarity, and the joy of programming."

The final copy should come from the Odin creator's preferences, but the structure should remain crisp: one identity statement, one compact value phrase, and one or two direct actions.

## Content Strategy

Simplify and restructure the existing homepage content. Preserve the strongest ideas, but remove repetition and historical clutter.

Prefer sections built from consistent data-like groups:

- title
- subtitle
- body/content
- optional code example
- optional call to action

When useful, organize content in groups of three. Examples:

- three primary language values
- three use cases
- three next steps
- three community/resource links

Possible high-level structure:

1. Hero
   - Odin identity statement.
   - Short value phrase.
   - Primary actions: Download / Read the Docs.
   - A compact code sample or visual code surface.

2. Why Odin
   - Three concise pillars such as Simplicity, Performance, Data-Oriented Design.
   - Keep each item short and concrete.

3. Build With Odin
   - Use-case cards or rows for systems, games/tools, graphics/simulation, command-line, libraries, etc.
   - Avoid trying to list everything.

4. Language Features
   - A few feature sections paired with real Odin code.
   - Reuse or replace the current examples: Hellope, array programming, SOA types, context system, reflection.

5. Batteries Included
   - Explain `core` and `vendor` libraries in a restrained way.
   - Keep logos secondary; do not let brand/logo clusters dominate.

6. Odin In Production
   - Keep production proof, but make it more compact.
   - Avoid turning the page into a long JangaFX/ChiAha feature article.

7. Community / Open Source
   - Clear links to GitHub, Discord, docs, packages, news, and showcase.

## Visual Direction

The current blue is not sacred. The Odin logo and brand colors may change in the future, so avoid designing a system that depends too heavily on the existing blue.

Use a softer modern palette with:

- neutral page backgrounds
- subtle warm/cool accent colors
- strong readable text contrast
- restrained borders and shadows
- gentle section separation

Use `static/noise.png` for subtle grain on backgrounds. The goal is smooth surfaces that still have a tactile texture. Noise should be quiet and layered, not visually dirty.

Avoid:

- loud gradients as the main identity
- heavy framework-card feeling
- large logo walls above the fold
- dense walls of copy
- oversized hero claims that feel generic

## Motion Direction

Add light background flow animations, especially near the hero and major section transitions.

Motion should be:

- slow
- ambient
- subtle
- non-blocking
- respectful of `prefers-reduced-motion`

Good candidates:

- soft flowing background fields
- subtle gradient drift
- quiet code-surface highlights
- gentle entrance transitions for section content

Avoid motion that distracts from reading or makes code harder to inspect.

## Frontend Architecture

For now, create a new frontpage-only stylesheet.

Possible file:

- `themes/odin/static/css/frontpage.css`

Only load it on the homepage. The current site-wide CSS and the old framework can remain in place while the frontpage is rebuilt.

Over time, useful pieces from the new frontpage CSS may become the basis for a broader custom design system. That is future work.

Prefer extracting homepage sections into partials or data-driven structures if it makes the page easier to reason about. The current single large `index.html` is hard to maintain.

Potential template direction:

- Keep `themes/odin/layouts/index.html` as the composition root.
- Add partials under `themes/odin/layouts/partials/frontpage/`.
- Consider data files later if content becomes repetitive enough.

## Implementation Principles

- Start by creating a clean new homepage structure, not by endlessly patching the current one.
- Keep the first version modest and coherent.
- Use real Odin code examples.
- Make the page responsive from the start.
- Keep text short and specific.
- Preserve working links and obvious navigation paths.
- Do not redesign the entire site yet.
- Do not depend on the current blue as the permanent brand anchor.
- Respect dark mode expectations, even if the first pass has a preferred visual theme.

## Acceptance Criteria

The frontpage rebuild is ready when:

- The homepage has a clear modern structure and no longer feels like accumulated sections.
- The visual style is soft, minimal, polished, and recognizably technical.
- The page works well on mobile and desktop.
- The page has a dedicated frontpage stylesheet.
- `static/noise.png` is used subtly in at least one major background treatment.
- Animations are subtle and support `prefers-reduced-motion`.
- Existing core navigation remains usable.
- The page builds with `hugo --minify`.
- The implementation does not force a full-site the old framework replacement yet.

## Later Work

After the frontpage is settled:

- Extract shared design tokens from the frontpage CSS.
- Decide how much of the new style should replace the old framework site-wide.
- Redesign docs/news/showcase pages using the new design language.
- Revisit logo, color, and brand assets if the Odin project wants that.
- Add stronger validation and visual regression checks for generated pages.
