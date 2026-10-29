# Re:Read — Component System v1 (design review)

Status: **foundation work / not production approved**. This document defines a reusable website system rather than ad hoc homepage sections. Approval of the chocolate-marble hero and animated wordmark is retained.

## Product and UX contract
Re:Read publishes newly designed editions of overlooked books and compelling original writing. American Myths is the first collection, **still in research and acquisitions**. Do not imply books, covers, release dates, membership, physical shipments or submission capability already exist.

Primary reader task: understand Re:Read and join an actually operational email list for progress and eventual release news. Secondary task: learn about editorial focus and submission status. Future tasks: learn about specific books; browse editions; purchase when ready.

**Trust rules**
- No fictional book covers, invented titles, simulated customer testimonials, or pretend production imagery.
- Reference photographs must be actual, verified, properly licensed/credited and identified as references, not our work. Prefer original/commissioned photography.
- No invented shipping, membership, discounts or publication dates.
- Do not claim sign-up success until a real backend has accepted it.
- Keep the familiar navigation and labels. Do not hide required information behind discoverability tricks.

## Foundations
- Color: paper #fffaf2; ink #1b1b19; navy #293e52; red #c64b2e; gold #d4a775. Rich approved ebony marble is the hero pattern (subtle chocolate adjustment).
- Type: Space Grotesk for hierarchy and body, supplementary fonts only in the animated wordmark; use consistent headline scales and editorial body widths.
- Geometry: 12-column responsive grid; small set of repeated spacing/gutter values, large white space intentional rather than filler. Avoid arbitrary boxed cards and gratuitous rules.
- Pattern: one real approved source asset can shift color, but each use must have a job (a true material surface, not an unrelated stripe). No competing pattern behind dense text unless contrast works at all sizes.
- Motion: wordmark retained; movement only when it communicates something, never timed content needed for comprehension. Respect prefers-reduced-motion. No autoplaying carousels of critical content.
- Accessibility: real headings and landmarks, contrast checks, keyboard visible focus, input labels, text reflow and static-content fallback.

## Starting 10 component families
Each component should have an explicit purpose, default, variants, responsive rules, content requirements and states. Shared **tokens**, **buttons**, **links** and **forms** are primitives, not more decorative sections.

| Component | Job | Variants | UX guardrail |
|---|---|---|---|
| 01 GlobalHeader | persistent location, trusted identity, navigation | simple/expanded | sticky, keyboardable, stable height, accessible wordmark |
| 02 EditorialHero | say clearly what Re:Read does and offer one primary action | pattern-led/photo-led/plain | text never compromised; two actions max |
| 03 CollectionTeaser | introduce one collection without requiring a full microsite | horizontal / stacked / with status | concise; never fabricate books or dates |
| 04 EditorialSplit | tell one substantial story in image/text or text/text | reversed / light / navy | no arbitrary eyebrow labels or fake depth |
| 05 PhotoEssay | showcase carefully selected physical craft photographs | editorial grid / single lead | images serve specific narrative; no mandatory carousel |
| 06 MaterialDetail | connect one image and a tangible feature (endpaper, headband, stock, jacket) | image left/right / full-width | named detail + real photo + useful caption and credit |
| 07 ProcessStrip | show editorial progression where visitors need it | inline / vertical on mobile | current versus future differentiated; not a dashboard |
| 08 EmailCapture | get permission to send news | inline / standalone | required email semantics; functional service before calling it live |
| 09 ActionBanner | connect an editorial moment to a relevant user next step | dark/light/pattern | one purpose, one clear link, no redundant CTA |
| 10 SiteFooter | support contact, about, submissions, navigation and legal | compact/expanded | only real channels and links |

Future gated components: BookCard, BookDetail, ProductGallery, AddToCart, MemberAccount. **Not in current site** until actual inventory and programs exist.

## Suggested information architecture
1. Persistent GlobalHeader
2. Approved EditorialHero
3. Integrated CollectionTeaser for American Myths, treated as a deliberate extension of the hero rather than a second landing page
4. EditorialSplit leading to one **curated PhotoEssay or MaterialDetail** (not yet built until photographs are vetted)
5. EmailCapture explaining the actual value and frequency of signing up
6. Compact SiteFooter

The ProcessStrip belongs inside the relevant collection component **only if it increases understanding**. We can reuse it later on a collection page. No separate 'How It Works' section by default, but a plain-language explanation of *joining the list* is essential next to the email input.

## Design/workflow rules
- Build/approve **one component family at a time**; document its purpose, variations, constraints and responsive behavior.
- Maintain the workbench specimens separately from the public homepage; review components in context, not only in isolation.
- No new layout by accreting CSS overrides on old experiments. Create shared styles and instances. Content remains detachable from markup for future CMS use.
- Instrument later: newsletter conversions, newsletter click, submission intent; never send emails to analytics.
- Test mobile 375px, tablet 768px, desktop 1440px, large 1920px, keyboard, contrast, reduced-motion, missing images, and failure states.
- Production 'main' remains untouched without explicit approval.

## Research references (principles, not visual templates to copy)
- Fitzcarraldo Editions, brand consistency: https://fitzcarraldoeditions.com/about/
- Penguin Clothbound Classics, pattern/material as a cohesive edition: https://www.penguin.co.uk/discover/articles/clothbound-classics-little-history-making-of
- Outer Space Press, bookmaking material practice: https://www.outerspacepress.com/
- McSweeney's, clear editorial identity and reader actions: https://www.mcsweeneys.net/pages/about-us
- Brad Frost, atomic design / pattern library: https://atomicdesign.bradfrost.com/outline/
- Nielsen Norman Group, carousel UX: https://www.nngroup.com/articles/designing-effective-carousels/
- USWDS, user-task-oriented patterns: https://designsystem.digital.gov/patterns/intro/

## Status as of foundation review
- Approved: chocolate-marble hero visual, animated Re:Read wordmark, cream/navy/ink palette, endpapers.
- Implementing first: stable GlobalHeader, tidy EditorialHero, integrated CollectionTeaser, shared tokens.
- Provisional: newsletter design and service connection (backend not connected).
- Withdrawn from current page: photo ribbon, giant American Myths editorial section, three-stage dashboard.
- Next component to design after first review: **PhotoEssay** with genuinely vetted, high-quality craft images and precise photographic art direction.
