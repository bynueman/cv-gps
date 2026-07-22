# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (Indonesian/English) static marketing site for CV Gama Putra Santosa, an Indonesian food producer with two product families: Kuicip (cassava chips) and Putri Teko (traditional/herbal beverages). Next.js 14 App Router · TypeScript · Tailwind CSS · GSAP + ScrollTrigger. Fully static output (30 prerendered pages). See `README.md` for the full page/animation map and handoff checklist.

## Commands

```bash
npm run dev    # dev server at http://localhost:3000
npm run build  # production build (also the type-check gate — no separate test suite)
npm run lint   # next lint
```

There are no tests; `npm run build` is the verification step (it type-checks and prerenders all static paths).

## Architecture

The core split: **server files in `src/app/` contain only metadata + `generateStaticParams`** and immediately delegate to a client template in `src/components/pages/` (e.g. `app/products/kuicip/[slug]/page.tsx` → `pages/ProductDetail`). All interactivity, i18n, and GSAP live client-side. Home page sections live in `src/components/sections/`.

**All content is data in `src/lib/`, not in components:**
- `src/lib/content.ts` — brands, 22 products (8 `kuicipProducts`, 14 `putriTekoProducts`), `company` info, plus `logos`/`groupShots` asset maps. `articles` is intentionally empty — News & Activities is pending an admin panel/CMS; keep the `Article` type and helpers (`getArticle`, `featuredArticles`) as the contract that panel writes against. Adding a product object here automatically propagates to catalogs, static params, related/featured logic. Putri Teko products need `group: "rtd" | "brew"` and `packaging: "botol" | "kotak" | "toples" | "kemasan" | "besek"` (drives catalog grouping, card aspect ratio, and the packaging badge). All products reference real studio photos in `public/images/**`; `company` contact details (address, emails, WhatsApp, hours, Google Maps embed) are confirmed real business info — but still don't add unverified factual claims (certifications, export volumes, dates) to copy; it is deliberately inquiry-oriented.
- `src/lib/i18n.tsx` — all UI strings. `id` (Indonesian) is the canonical dictionary; `en: typeof id` type-checks against it, so every new string must be added to both or the build fails. Data-level content instead uses `Bilingual = { id, en }` fields in `content.ts`, resolved via `name[lang]`. `LanguageProvider` sits in the root layout so the language toggle survives navigation; default language is Indonesian.

**GSAP conventions:**
- Always import from `@/lib/gsap` (registers ScrollTrigger), never from `gsap` directly.
- All motion goes through `gsap.matchMedia()` gated on `prefers-reduced-motion: no-preference`, with cleanup via `mm.revert()`. Mobile gets simplified/fade-only passes.
- Section entrance animation is the shared `useReveal` hook + `[data-reveal]` attributes — reuse it rather than writing new reveal tweens. Pass the language as a dep so reveals re-run on language switch.
- `MotionBackdrop` is the reusable scroll-reactive background layer (`data-drift` = scrubbed parallax, `data-float` = idle drift).

**Images:** every product/article has `image: string | null`; `null` renders SVG placeholder packshots (`Packshot.tsx` / `ProductPackshot.tsx` / `components/graphics/`), a path switches to `next/image` automatically. Real images go in `public/images/**`.

**Styling:** custom Tailwind palette in `tailwind.config.ts` (cream/espresso neutral base, gold for Kuicip, ginger/tamarind/turmeric/herbal for Putri Teko). Shared utility classes (`.btn`, `.kicker`, `.container-page`) are in `src/app/globals.css`. Accent colors stay inside cards/planes; the cream/espresso base carries the corporate layer.
