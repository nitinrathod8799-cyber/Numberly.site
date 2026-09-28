# Numberly — Free Online Calculators

A production-ready calculator platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
React 19, Lucide icons and Recharts.

## Run it locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

Other useful commands:

```bash
npm run build   # production build (also type-checks)
npm run start   # run the production build locally
npm run test    # run the unit test suite (57 tests, Vitest)
npm run lint    # ESLint
```

Requires Node.js 18.18+ (Node 20 LTS recommended).

## What's included

**21 live calculators**, each with its own permanent URL:

| Calculator | URL | Category |
|---|---|---|
| Normal Calculator | `/calculators/normal-calculator` | Math |
| Percentage Calculator | `/calculators/percentage-calculator` | Math |
| Discount Calculator | `/calculators/discount-calculator` | Math |
| Average Calculator | `/calculators/average-calculator` | Math |
| Profit & Loss Calculator | `/calculators/profit-loss-calculator` | Math |
| Ratio Calculator | `/calculators/ratio-calculator` | Math |
| SIP Calculator (flagship) | `/calculators/sip-calculator` | Finance |
| EMI Calculator | `/calculators/emi-calculator` | Finance |
| GST Calculator | `/calculators/gst-calculator` | Finance |
| Compound Interest Calculator | `/calculators/compound-interest-calculator` | Finance |
| FD Calculator | `/calculators/fd-calculator` | Finance |
| Lumpsum Calculator | `/calculators/lumpsum-calculator` | Finance |
| Loan Calculator | `/calculators/loan-calculator` | Finance |
| CAGR Calculator | `/calculators/cagr-calculator` | Finance |
| Age Calculator | `/calculators/age-calculator` | Everyday |
| BMI Calculator | `/calculators/bmi-calculator` | Everyday |
| Date Difference Calculator | `/calculators/date-difference-calculator` | Everyday |
| Days Between Dates | `/calculators/days-between-dates-calculator` | Everyday |
| Time Duration Calculator | `/calculators/time-duration-calculator` | Everyday |
| Tile Calculator | `/calculators/tile-calculator` | Construction |
| Concrete Calculator | `/calculators/concrete-calculator` | Construction |

Plus: homepage with instant search, `/calculators` directory, `/categories` index, `/categories/[math|finance|everyday|construction]`,
`/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, a custom 404 page, `sitemap.xml` and
`robots.txt`.

Four more calculators (RD, Simple Interest, Paint, GPA) are registered as **"Coming soon"** cards —
research-validated as the next batch, not yet built.

## The logo

The round Numberly logo lives in three places, all generated from one source image:

- `public/logo.png` — used in the Header and Footer (via `next/image`)
- `app/icon.png` — the browser tab favicon (512×512)
- `app/apple-icon.png` — the iOS home-screen icon (180×180)

### How to change the logo yourself

1. Make your new logo square (equal width and height) with the design centred — a circular logo with
   some transparent or plain background margin around it works best.
2. Replace these three files with your new image, keeping the exact same filenames and folder locations:
   - `public/logo.png`
   - `app/icon.png`
   - `app/apple-icon.png`
3. If your new logo isn't already circular, crop it to a circle first (any image editor, or ask an AI
   image tool to "crop this to a circle with a transparent background").
4. Run `npm run dev` (or rebuild) and check the header, footer and browser tab — no code changes are
   needed, since all three components just reference these file paths.

## Before you deploy — placeholders to replace

- `app/terms/page.tsx`, section 16 (Governing Law and Jurisdiction): currently
  `[GOVERNING LAW / JURISDICTION]`. Replace after legal review with your actual governing law/jurisdiction.
- `lib/site.ts` → `legalLastUpdated`: update whenever privacy-policy/terms/disclaimer content changes.
- `lib/site.ts` → `url`: set to the real production domain (`https://numberly.site`) before deploying.

## How to add a new calculator

The whole site is driven by one registry file, so adding calculator #11 doesn't touch routing, search,
categories, or the homepage.

1. **Write the calculation logic** in `lib/calculators/your-calc.ts` — a pure, exported function with
   no UI dependencies (see `lib/calculators/gst.ts` for a short example).
2. **Add a test** in `tests/calculators/your-calc.test.ts`.
3. **Build the interactive UI** in `components/calculator/apps/YourCalcApp.tsx` (a client component). Reuse
   `NumberField`, `ChipGroup`, `Toggle`, `ResultStat` and `YearlyTable` from `components/ui` and
   `components/calculator` wherever they fit.
4. **Register it** in `data/calculators.tsx` — one object with `name`, `slug`, `category`,
   `description`, `keywords` (drives search) and an `icon`. This alone makes it appear in search, the
   homepage popular list (if you add its slug there), `/calculators`, and its category page.
5. **Create the route** at `app/calculators/your-calc-slug/page.tsx`. Copy an existing page (e.g.
   `percentage-calculator/page.tsx`) as a template: it needs `metadata` (title/description/canonical) and
   wraps your app component in `<CalculatorPageShell>`, with a "how it works / formula / example / notes /
   FAQ" content block below it.
6. Optionally add it to the `RELATED` map in `data/calculators.tsx` so other calculators link to it.

That's the whole process — no other file needs to change.

## Architecture

```
app/                          Routes (Next.js App Router)
  calculators/
    <slug>/page.tsx            One folder per calculator — never a single dynamic page
  categories/[slug]/page.tsx   math / finance / everyday / construction
  about/, contact/, privacy-policy/, terms/, disclaimer/
  sitemap.ts, robots.ts        Generated automatically from the registry
  layout.tsx, page.tsx (home), not-found.tsx, icon.tsx

components/
  layout/                     Header, Footer, Container, Breadcrumb
  search/                     Instant client-side search (SearchBar)
  calculator/
    apps/                     One interactive client component per calculator
    CalculatorPageShell.tsx   Shared page skeleton (breadcrumb, H1, related calculators)
    CalculatorCard.tsx, FAQAccordion.tsx, YearlyTable.tsx, ResultStat.tsx, RelatedCalculators.tsx
  charts/                     SipChart, EmiChart (Recharts, client-only)
  ui/                         NumberField, ChipGroup, Toggle — small shared primitives

lib/
  calculators/                Pure calculation engines (no React, no UI) — fully unit tested
  format.ts                   Indian/international currency + number formatting
  validation.ts                Small shared input helpers
  site.ts                     Site name/description/URL in one place

data/
  calculators.tsx              THE single source of truth: search, listings, categories, related links

tests/
  calculators/                Vitest unit tests for every calculation engine (57 tests)
```

### Why no backend in v1

Every calculation runs client-side in the browser: faster, free to host, and nothing you type is ever
sent to a server. The Normal Calculator's history uses `localStorage` only. If you later need accounts,
saved calculations, or an admin dashboard, add Next.js API routes + a database (Postgres via Prisma/Drizzle
is a natural fit) without needing to rewrite any calculator logic — the `lib/calculators/*` functions
are already pure and framework-agnostic.

### SEO

Every calculator page has a unique `<title>`, meta description, canonical URL and Open Graph tags (see the
`metadata` export at the top of each `app/calculators/*/page.tsx` file). `app/sitemap.ts` and
`app/robots.ts` generate `sitemap.xml` / `robots.txt` automatically from the calculator registry, so a new
calculator is included the moment it's added to `data/calculators.tsx`.

### Before you deploy

- Update `lib/site.ts` with your real production domain (`siteConfig.url`) — it feeds every canonical
  URL, the sitemap, and Open Graph tags.
- Update the contact email domain logic in `app/contact/page.tsx` if you don't want `hello@<your-domain>`.
- Swap the "Numberly" name/logo in `lib/site.ts` and `components/layout/Header.tsx` if you want a
  different brand.
- The favicon is generated in `app/icon.tsx` (no static `.ico` needed) — edit the emoji/color there to
  rebrand it.

## Tests

57 unit tests across all 10 calculation engines: standard cases, zero/edge cases, validation errors, and
calculator-specific behaviours (step-up SIP, inflation adjustment, goal mode, contribution timing, leap
years, different loan tenures, GST add/remove, compounding frequency, mix grades, and more).

```bash
npm run test
```
