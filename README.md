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

- **Confirmed inputs:** all of Section 1 was used as supplied. Affiliate URLs are byte-for-byte as supplied (checked by `audit:affiliate`).
- **Missing inputs:** GA4 ID, Google Ads ID/label, Meta Pixel ID are placeholders, so those integrations are off. PrimeGearLab logo file not supplied.
- **Conflicts / issues recorded:**
  1. `BRAND_LOGO_PATH` (`/sfx-laser-tech/logo.png`) does not exist, and `BRAND_LOGO_URL` is the **merchant's** logo, not PrimeGearLab's. The header uses a plain text monogram fallback beside the brand name. Drop a real logo in and swap `components/Logo.jsx`.
  2. `REPOSITORY_CONSTRAINTS` requires `tailwindcss`, `postcss`, `autoprefixer` in `dependencies`. Followed (Section 5.2 says not to force this on every project; here it is an explicit input and does no harm).
  3. Three supplied destination URLs did not load during research (next section).
  4. `OFFER_CANDIDATES` such as "factory-direct pricing" and "California & New York support centers" could not be verified. They are **not** stated as facts. The page only repeats what the merchant's own site states, and says so.

## Destination evidence (observed 2026-10-13)

Syntax validity of a URL does not prove the page exists or that commission attribution works. All destinations are `DESTINATION_NOT_RUNTIME_VERIFIED` in code.

| Key | Supplied handle | Research result |
| --- | --- | --- |
| category: laser-cleaning-machines | `laser-cleaning-machine` | Loaded, "Laser Cleaning Machine", 14 products |
| category: laser-welding-machines | `fiber-laser-welding-machine` | **Failed to fetch** (with and without `ref`). Merchant nav uses `laser-welding-machine`, which loaded (23 products) |
| category: laser-marking-engraving | `fiber-laser-making-machine` | **Failed to fetch**. Likely typo of "marking". `fiber-laser-marking-machine` loads but is titled "JPT LP+" (3 products) |
| category: fiber-laser-cutters | `fiber-laser-cutting-machine` | Loaded, 9 products |
| category: machine-tool-accessories | `machine-tool-accessories` | Loaded, 2 products |
| category: all-laser-equipment | `all` | Loaded, 118 products |
| collection: air-cooled-pulse-cleaners | `pulse-laser-cleaning-machine` | **Failed to fetch** (with and without `ref`) |
| collection: handheld-welder-cleaners | `frontpage` | Loads, but is the merchant "frontpage" list (33 mixed products), not handheld welders only |

A failed fetch is not proof of a 404, but the three failures are consistent with handles that do not exist on the merchant's store. **They were kept exactly as supplied** (Section 2: no silent changes to affiliate URLs). Suggested fixes, to apply only if you confirm them:

- `laser-welding-machines` → `https://sfxlasertech.com/collections/laser-welding-machine?ref=hppfdpph`
- `laser-marking-engraving` → confirm the right marking collection handle with the merchant (the merchant nav also lists `portable-laser-marking-machine`, `jpt-mopa-m7`)
- `air-cooled-pulse-cleaners` → no loading pulse-only handle was found; `laser-cleaning-machine` loads and contains the pulse cleaners

Edit `lib/config.js` only; no component builds URLs.

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
| Destination availability | PARTIAL | See table above; 3 of 8 supplied handles failed to load |
| Hub–Spoke routing | NOT_EXECUTED | Needs both deployments |
| Affiliate attribution / commission | NOT_EXECUTED | Needs a real click-through and the merchant's dashboard |

## Hub–Spoke items to test after deploy

1. `https://primegearlab.com/sfx-laser-tech` returns the page with CSS and JS from `/sfx-laser-tech/_next/static/...`.
2. `https://primegearlab.com/sfx-laser-tech/` (trailing slash) should redirect to the no-slash URL **on primegearlab.com**, not on the Spoke host. If it redirects to `sfxlasertech-spoke.vercel.app`, add a Hub-level redirect.
3. `/sfx-laser-tech/sitemap.xml` works. Crawlers read `robots.txt` only at the Hub **root**; add `Sitemap: https://primegearlab.com/sfx-laser-tech/sitemap.xml` there.
4. The favicon is a plain text monogram placeholder at `/sfx-laser-tech/icon.svg`.
5. Every outbound button opens the merchant in a new tab with `?ref=hppfdpph` intact.
6. Paid ads: per the supplied restrictions, do not bid on "SFX Laser" / "SFX Laser Tech" brand keywords if the merchant forbids it.
