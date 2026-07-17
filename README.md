# CV Gama Putra Santosa — Company Website

Bilingual (ID/EN) multi-page website for an Indonesian food production
company from Sleman, Yogyakarta, presenting two product families:
**Kuicip** (modern cassava chips, 70 gr ziplock, 8 flavors) and
**Putri Teko** (traditional/herbal beverages).

Stack: **Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger**.
Fully static output (30 prerendered pages).

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Content sourcing: factual context vs placeholder

The copy is written to stay inside publicly known context and invite
inquiry instead of making claims.

**Based on public context** (safe to keep):
- Company: food production, Sleman, DI Yogyakarta.
- Kuicip: cassava chips, 70 gr packaging, flavors Original, Balado,
  Barbeque, Rendang, Spicy Mala, Seaweed, Truffle, Chili Lime.
- Putri Teko: traditional/herbal drinks incl. ginger-based drinks and
  Wedang Uwuh.

**Editable placeholders** (marked in code, replace before launch):
- Street address, email, WhatsApp (`company` in `src/lib/content.ts`).
- The Putri Teko RTD vs brew split and the SKUs flagged
  `placeholder: true` (Kunyit Asam, Jahe Merah Seduh, Wedang Rempah).
- All product blurbs/flavor personalities, serving notes, and articles.
- No certifications, export destinations, volumes, or founding dates
  are claimed anywhere; export copy is inquiry-oriented on purpose.

## Page architecture

| Route | Server file | Template component |
| --- | --- | --- |
| `/` (Beranda) | `app/page.tsx` | 7 home sections (below) |
| `/products` | `app/products/page.tsx` | `pages/ProductsOverview` |
| `/products/kuicip` | `app/products/kuicip/page.tsx` | `pages/KuicipCatalog` |
| `/products/kuicip/[slug]` | `…/[slug]/page.tsx` (SSG, 8 paths) | `pages/ProductDetail` |
| `/products/putri-teko` | `app/products/putri-teko/page.tsx` | `pages/TekoCatalog` |
| `/products/putri-teko/[slug]` | `…/[slug]/page.tsx` (SSG, 6 paths) | `pages/ProductDetail` |
| `/export` | `app/export/page.tsx` | `pages/ExportPage` |
| `/news` | `app/news/page.tsx` | `pages/NewsList` |
| `/news/[slug]` | `app/news/[slug]/page.tsx` (SSG, 6 paths) | `pages/ArticleDetail` |
| `/contact` | `app/contact/page.tsx` | `pages/ContactPage` |

Home sections (in `components/sections/`): `Hero` (pinned scroll
story) → `CompanyIntro` (editorial + fact panel) → `FeaturedProducts`
(bento subset: 4 Kuicip + 2 RTD + 2 brew) → `ProductFamilies` (split
two-worlds storytelling) → `ExportPreview` → `NewsPreview` (3 featured
articles) → `ContactCTA`.

## Folder structure

```
src/
├── app/                        # routes (server files: metadata + static params only)
│   ├── layout.tsx              # fonts, Header/Footer, LanguageProvider
│   ├── page.tsx                # home
│   ├── products/{page,kuicip/…,putri-teko/…}
│   ├── export/page.tsx · news/{page,[slug]} · contact/page.tsx
│   └── globals.css             # Tailwind layers, .btn/.kicker/.container-page
├── components/
│   ├── Header.tsx              # sticky transparent→solid, active nav, mobile menu
│   ├── Footer.tsx · LangSwitch.tsx · ContactForm.tsx
│   ├── Packshot.tsx            # image slot: real photo or SVG placeholder
│   ├── ProductPackshot.tsx     # picks pouch/bottle/sachet per product
│   ├── ProductCard.tsx         # default + wide (bento) variants
│   ├── ArticleCard.tsx · PageHeader.tsx · ExportCTA.tsx
│   ├── MotionBackdrop.tsx      # scroll-reactive background shape layer
│   ├── graphics/               # PouchSVG, BottleSVG, SachetSVG, ChipSVG, SteamSVG
│   ├── sections/               # home sections
│   └── pages/                  # inner-page client templates
├── hooks/useReveal.ts          # shared [data-reveal] ScrollTrigger reveal
└── lib/
    ├── i18n.tsx                # UI dictionary (id canonical, en type-checked)
    ├── content.ts              # brands, 14 products, 6 articles, company info
    └── gsap.ts                 # gsap + ScrollTrigger registration
```

## Language system

- `LanguageProvider` in the root layout — state survives client-side
  navigation, so the ID|EN toggle (header + footer) is consistent
  across all pages. Default: Indonesian.
- UI copy: `src/lib/i18n.tsx`. `id` is the canonical dictionary shape,
  `en: typeof id` — a missing translation is a compile error.
- Data content (product names/blurbs, articles): `{ id, en }` fields in
  `src/lib/content.ts`, resolved with `name[lang]`.

Example shape:

```ts
const id = { nav: { home: "Beranda" }, hero: { title: "Pangan lokal…" } };
const en: typeof id = { nav: { home: "Home" }, hero: { title: "Local ingredients…" } };
```

## GSAP animation map

All motion sits behind `prefers-reduced-motion`; mobile gets a
simplified fade-only pass. Cleanup via `gsap.matchMedia().revert()`.

| Where | What |
| --- | --- |
| Home hero (`sections/Hero`) | Load-in stagger for copy/packshots, then a **pinned scrub story** (~620px, desktop only): ziplock knob slides across → track dims → chip ovals emerge with back-out overshoot → pouches lift → steam paths draw in (dashoffset) → arches stretch; scroll hint fades. Idle loops: steam float + ingredient particles. |
| `MotionBackdrop` | Reusable background layer (variants `kuicip`/`teko`/`neutral`): chip ovals, dotted spice arcs, ribbons, steam curves, ingredient dots. `data-drift` = scrubbed parallax factor; `data-float` = desktop idle drift. Used on intro, featured, catalogs, page headers, product detail hero. |
| `useReveal` hook | Section entrances: `[data-reveal]` children fade + rise 28px, 0.12s stagger, once, at `top 78%`. Used by every section and inner page. |
| Product cards | CSS-only hover: card lift + shadow, packshot tilt, accent circle scale. |
| Family panels (`ProductFamilies`) | CSS hover: accent shapes scale/translate, packshots lift. |
| News pages | Calmer on purpose: reveals + quiet image zoom only, no drifting shapes. |
| Header | CSS transition transparent → blurred cream after 12px scroll. |

## Spatial / bento system

- Layered planes: packshots on arch/circle color planes, offset fact
  panel with corner accent, overlapping pouch fans, inset dark bands.
- Bento rhythm on home featured (upright grid + wide horizontal cards)
  and Putri Teko catalog (light RTD panel vs dark brew panel).
- Accent colors stay inside cards/planes; the neutral cream/espresso
  base carries the corporate layer.

## Images

See `public/images/README.md`. Every product/article has an
`image: string | null` slot in `content.ts`; `null` renders the SVG
placeholder packshots, a path switches to `next/image` automatically
(`Packshot.tsx` / `ProductPackshot.tsx`).

## Adding SKUs / growing the site

- New Kuicip flavor: add one object to `kuicipProducts` — catalog,
  static params, related products, and featured logic pick it up.
- New Putri Teko SKU: add to `putriTekoProducts` with `group: "rtd" |
  "brew"`.
- New article: add to `articles`; `featured: true` surfaces it on home.
- New product family: extend `brands` + add a category page following
  `KuicipCatalog`/`TekoCatalog`.

## Handoff checklist

- [ ] Replace `company` placeholders (address, email, WhatsApp).
- [ ] Confirm the Putri Teko SKU list; remove `placeholder: true` items
      that don't exist.
- [ ] Drop real packshots into `public/images/**` and set paths.
- [ ] Wire `ContactForm.handleSubmit` to an API route / form service.
- [ ] Embed the real map on `/contact` (slot is ready).
- [ ] Review article copy or swap `articles` for a CMS feed
      (the `Article` type is the contract).
