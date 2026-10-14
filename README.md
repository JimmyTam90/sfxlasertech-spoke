# sfx-laser-tech (PrimeGearLab spoke)

Next.js 14.2.35 · App Router · JavaScript · npm · Tailwind CSS 3 · Hub–Spoke deployment.
Collection and category hub for SFX Laser Tech equipment, published by PrimeGearLab.

## Run

```bash
npm install
npm run dev            # http://localhost:3000/sfx-laser-tech
npm run build && npm start
npm run lint
npm run audit:affiliate                              # static source audit
BASE_URL=http://localhost:3000 node scripts/audit-rendered.mjs   # rendered-HTML audit (server must be running)
```

Optional analytics: copy `.env.example` values into Vercel project settings. Empty or `XXXX` placeholders keep an integration off.

## Architecture

| Concern | Implementation |
| --- | --- |
| Single source of truth | `lib/config.js` (inputs), `lib/manifest.js` (catalog) |
| Affiliate resolver | `lib/affiliate.js`: exact keys only, no fuzzy match, no cross-table fallback, fails safely |
| Affiliate anchor | `components/AffiliateLink.jsx`: the only place an external affiliate `<a>` is rendered |
| CTA contract | real `<a>`, `target="_blank"`, `rel="noopener noreferrer"`, no click handler, renders nothing when no valid URL |
| Card layout | `components/Card.jsx` is the only card (categories, collections, featured models, hero model). Fixed DOM order Image → Title → Details/Specs → CTA on mobile and desktop; the audit fails if it changes |
| Click measurement | `components/Analytics.jsx` listener (never cancels navigation) + `app/api/track-click/route.js` |
| Public URL strategy | `basePath: '/sfx-laser-tech'`, no `assetPrefix`, `trailingSlash: false` |
| Canonical / sitemap | absolute `https://primegearlab.com/sfx-laser-tech/...` via `lib/seo.js`, `app/sitemap.js` |

### Why basePath

The Hub rewrites `/sfx-laser-tech` and `/sfx-laser-tech/:path*` to the Spoke at the **same path**, so the Spoke must answer under that prefix. `basePath` also prefixes `/_next/static/*`, so chunks load through the Hub rewrite and `assetPrefix` is not needed. `next/link` adds the prefix to internal links automatically. No local files are referenced from `public/`; product images load from the merchant CDN.

### Hub rewrite (to add in the Hub project, not changed here)

```json
{
  "rewrites": [
    { "source": "/sfx-laser-tech", "destination": "https://sfxlasertech-spoke.vercel.app/sfx-laser-tech" },
    { "source": "/sfx-laser-tech/:path*", "destination": "https://sfxlasertech-spoke.vercel.app/sfx-laser-tech/:path*" }
  ]
}
```

The supplied configuration was a bare fragment; it is wrapped in a `rewrites` array here. Confirm it matches how the Hub project is configured.

## Configuration summary (Section 2)

- **Confirmed inputs:** all of Section 1 was used as supplied. Affiliate URLs match the owner's authoritative mapping (checked by `audit:affiliate`).
- **Missing inputs:** GA4 ID, Google Ads ID/label, Meta Pixel ID are placeholders, so those integrations are off.
- **Conflicts / issues recorded:**
  1. The official PrimeGearLab logo is `public/logo.png` (served at `/sfx-laser-tech/logo.png` through `basePath`; do not nest it in `public/sfx-laser-tech/`). It is the supplied artwork with the empty transparent margin cropped and scaled to 400 px wide. The untouched original is kept at `brand/logo-original.png`. `BRAND_LOGO_URL` in the input is the **merchant's** logo and is not used.
  2. `REPOSITORY_CONSTRAINTS` requires `tailwindcss`, `postcss`, `autoprefixer` in `dependencies`. Followed (Section 5.2 says not to force this on every project; here it is an explicit input and does no harm).
  3. Three earlier destination handles did not load; they were replaced by the authoritative mapping below.
  4. `OFFER_CANDIDATES` such as "factory-direct pricing" and "California & New York support centers" could not be verified. They are **not** stated as facts. The page only repeats what the merchant's own site states, and says so.

## Destination mapping (authoritative, supplied 2026-10-14)

All URLs live in `lib/config.js` only and keep `?ref=hppfdpph`. Each was fetched on 2026-10-14 and loaded as a real merchant page. That proves the page exists, not that commission attribution works, so every destination stays `DESTINATION_NOT_RUNTIME_VERIFIED` in code.

| Key(s) | URL handle | Merchant page |
| --- | --- | --- |
| category: laser-cleaning-machines; collection: air-cooled-pulse-cleaners | `collections/laser-cleaning-machine` | "Laser Cleaning Machine", 14 products |
| category: laser-welding-machines; collection: handheld-welder-cleaners | `collections/laser-welding-machine` | "Laser Welding Machine", 23 products |
| category: laser-marking-engraving | `collections/fiber-laser-marking-machine` | "JPT LP+", 3 products |
| category: fiber-laser-cutters | `collections/fiber-laser-cutting-machine` | "Fiber Laser Cutting Machine", 9 products |
| category: machine-tool-accessories | `collections/machine-tool-accessories` | "Machine Tool Accessories", 2 products |
| category: all-laser-equipment | `collections/all` | "Products", 118 products |
| default | `/` (homepage) | loads |

Notes:

- The merchant has no pulse-only or handheld-only collection, so those two collection keys reuse the cleaning and welding URLs. Their button labels say so.
- The marking collection holds only three models (50W JPT and portable 20W/30W/50W). JPT MOPA M7 models are in the full catalog, so the M7 card and selector result link to `collections/all`.
- `npm run audit:affiliate` fails if an outbound merchant URL lacks a single `ref=hppfdpph`, or if any retired handle from the earlier mapping reappears.

## Data integrity

- Prices, stock, optical cable length and warranty terms are intentionally **not shown** (not verified; listings had inconsistent variant pricing and mixed stock).
- Specs shown (power, cooling) come only from merchant listing titles.
- Certifications, US service centers, shipping are labelled as "stated by the merchant".
- No ratings, reviews, urgency or discounts. No Product/Offer structured data. Only `WebSite` JSON-LD.
- Images are hotlinked from the merchant CDN, copied verbatim from the merchant's listing pages. Confirm the affiliate program terms allow this. A labelled "Image unavailable" placeholder replaces any image that fails to load, so there are no blank boxes.

## Analytics and consent

| Integration | Status |
| --- | --- |
| First-party click counter (`/api/track-click`) | `CONFIGURED_NOT_TESTED` (anonymous; placement + destination key only; logs one line; no cookies) |
| GA4 `affiliate_click` event | `READY_FOR_CONFIGURATION` (needs `NEXT_PUBLIC_GA4_ID`) |
| Google Ads click conversion | `READY_FOR_CONFIGURATION` (needs ID and label) |
| Meta Pixel `AffiliateClick` | `READY_FOR_CONFIGURATION` (needs ID) |

`CONSENT_REQUIREMENTS: AUTO_REVIEW` decision: third-party scripts load only when configured **and** the visitor clicks Accept in a banner. The banner is shown only when at least one third-party ID is configured. The first-party counter carries no identifiers. These record **clicks**, never purchases or commissions. Have counsel review privacy/consent wording for your jurisdictions; the legal pages are plain-language drafts, not legal advice.

## Verification status (Section 20)

| Check | Status | Notes |
| --- | --- | --- |
| Source-code inspection / static affiliate audit | PASS | `npm run audit:affiliate`, 87/87 |
| Syntax + import resolution (all JS/JSX) | PASS | TypeScript parser; not a substitute for the build |
| `npm install`, lockfile | BLOCKED | Package registry denied by the build sandbox's egress policy. No `package-lock.json` was generated; run `npm install` once and commit it |
| `next lint` | BLOCKED | Needs install |
| `next build` (production build, Tailwind output) | BLOCKED | Needs install. **Run this first.** |
| Rendered-HTML / DOM audit | NOT_EXECUTED | `scripts/audit-rendered.mjs` is ready; needs a running build |
| Mobile/desktop layout, console errors | NOT_EXECUTED | Needs a running build and a browser |
| Merchant image loading | NOT_EXECUTED | Merchant host unreachable from the sandbox shell |
| Destination availability | PASS (page loads) | All 7 mapped URLs fetched with `ref` on 2026-10-14; this is not attribution proof |
| Hub–Spoke routing | NOT_EXECUTED | Needs both deployments |
| Affiliate attribution / commission | NOT_EXECUTED | Needs a real click-through and the merchant's dashboard |

## Hub–Spoke items to test after deploy

1. `https://primegearlab.com/sfx-laser-tech` returns the page with CSS and JS from `/sfx-laser-tech/_next/static/...`.
2. `https://primegearlab.com/sfx-laser-tech/` (trailing slash) should redirect to the no-slash URL **on primegearlab.com**, not on the Spoke host. If it redirects to `sfxlasertech-spoke.vercel.app`, add a Hub-level redirect.
3. `/sfx-laser-tech/sitemap.xml` works. Crawlers read `robots.txt` only at the Hub **root**; add `Sitemap: https://primegearlab.com/sfx-laser-tech/sitemap.xml` there.
4. The favicon is a plain text monogram placeholder at `/sfx-laser-tech/icon.svg`.
5. Every outbound button opens the merchant in a new tab with `?ref=hppfdpph` intact.
6. Paid ads: per the supplied restrictions, do not bid on "SFX Laser" / "SFX Laser Tech" brand keywords if the merchant forbids it.
