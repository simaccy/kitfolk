# KitFolk — marketing site

The trusted network for crew, kit and production. This is the early-access marketing site.

## Stack

- **Next.js 16** (App Router, Turbopack, RSC)
- **Tailwind CSS 4** (custom theme tokens via `@theme`)
- **TypeScript**
- **Motion** (subtle scroll reveals, REC pulse, marquee)
- **Instrument Serif** + **Inter** + **JetBrains Mono** (Google Fonts)

No backend. The early-access form simulates submission client-side — wire `EmailCapture` to your real endpoint when ready.

## Run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    layout.tsx          # Fonts, metadata, viewport, global wrappers
    page.tsx            # Composes the marketing page from sections
    globals.css         # Theme tokens + base styles + grain/grid helpers
  components/site/
    Container.tsx       # 1400px page container
    SectionLabel.tsx    # 01 / SECTION TITLE — call-sheet header
    Reveal.tsx          # Scroll fade-up wrapper (motion)
    Header.tsx          # Sticky header with REC indicator
    Hero.tsx            # Big headline + email capture + live network card
    Marquee.tsx         # Endless role-list scroll (DOP · GAFFER · ...)
    Problem.tsx         # Pain-points grid
    Solution.tsx        # 3 pillars: Verified Crew / Trusted Kit / Fast Hiring
    TrustSystem.tsx     # The differentiator: trust profile card + 5 signals
    HowItWorks.tsx      # 3-step flow
    Features.tsx        # V1 feature bento grid
    KitCircles.tsx      # Private trusted networks
    SocialProof.tsx     # Field testimonials + partner strip
    WhyNow.tsx          # 4 reasons the timing is now
    CTA.tsx             # Final email capture + role selector + invite "call sheet"
    Footer.tsx          # Sitemap + giant KITFOLK wordmark
    EmailCapture.tsx    # Form (client) — handles loading / success / error
```

## Design language

This site is built around a sustained **call-sheet / film-print** metaphor:

- **Section numbers** read like scene numbers (`01 / HERO`, `02 / PROBLEM`).
- **Mono labels** (uppercase, tracked) for every metadata / state line.
- **Editorial serif** (Instrument Serif, italic accents) for all big headlines.
- **REC indicator** with red pulse in the header — like a viewfinder.
- **Film perforation rails** down the sides of the hero.
- **Subtle grain** overlay across cinematic sections.
- Colour palette tuned warm (`#0b0b0a` → `#f5f1e8`) with one orange accent (`#ff6a3d`) used sparingly as a "safety light".

## Customising

- **Theme tokens** live in `src/app/globals.css` under `@theme`. Tailwind utilities like `bg-bg`, `text-flare`, `border-rule` come from those.
- **Copy** is hard-coded in each section component — they're small and self-contained.
- **Email capture endpoint** — replace the `setTimeout` in `EmailCapture.tsx` with your real fetch.

## Notes

- The site is fully static — `npm run build` renders the page as static HTML.
- Mobile-first; layouts collapse cleanly down to phone.
- Includes accessible labels, semantic landmarks, keyboard-friendly form, and reduced-motion-friendly animations.
