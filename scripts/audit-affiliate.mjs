// Static affiliate + deployment audit. Run: npm run audit:affiliate
// Source-code inspection only. It does NOT prove runtime behaviour, that the merchant pages exist,
// or that commission attribution works (see README "Verification status").

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const { SITE, CATEGORY_LINKS, COLLECTION_LINKS, DEFAULT_AFFILIATE_URL } = await import(
  pathToFileURL(join(ROOT, 'lib/config.js')).href
);
const { resolveAffiliate, allMappingEntries } = await import(pathToFileURL(join(ROOT, 'lib/affiliate.js')).href);
const manifest = await import(pathToFileURL(join(ROOT, 'lib/manifest.js')).href);

// 1. Mapping fixtures: the authoritative URLs supplied by the owner (2026-10-14).
const SUPPLIED = {
  'category:laser-cleaning-machines': 'https://sfxlasertech.com/collections/laser-cleaning-machine?ref=hppfdpph',
  'category:laser-welding-machines': 'https://sfxlasertech.com/collections/laser-welding-machine?ref=hppfdpph',
  'category:laser-marking-engraving': 'https://sfxlasertech.com/collections/fiber-laser-marking-machine?ref=hppfdpph',
  'category:fiber-laser-cutters': 'https://sfxlasertech.com/collections/fiber-laser-cutting-machine?ref=hppfdpph',
  'category:machine-tool-accessories': 'https://sfxlasertech.com/collections/machine-tool-accessories?ref=hppfdpph',
  'category:all-laser-equipment': 'https://sfxlasertech.com/collections/all?ref=hppfdpph',
  'collection:air-cooled-pulse-cleaners': 'https://sfxlasertech.com/collections/laser-cleaning-machine?ref=hppfdpph',
  'collection:handheld-welder-cleaners': 'https://sfxlasertech.com/collections/laser-welding-machine?ref=hppfdpph',
  'default:default': 'https://sfxlasertech.com/?ref=hppfdpph',
};
const entries = allMappingEntries();
check('mapping count matches supplied input', entries.length === Object.keys(SUPPLIED).length, `${entries.length} entries`);
for (const e of entries) {
  const key = `${e.kind}:${e.id}`;
  check(`mapping preserved exactly: ${key}`, SUPPLIED[key] === e.url);
  const r = resolveAffiliate({ kind: e.kind, id: e.id });
  check(`resolver returns URL (syntax valid, ref=hppfdpph once): ${key}`, r.url === e.url, r.status);
}
check('default URL unchanged', DEFAULT_AFFILIATE_URL === SUPPLIED['default:default']);
check('missing key fails safely', resolveAffiliate({ kind: 'category', id: 'nope' }).url === null);
check('cross-table lookup blocked', resolveAffiliate({ kind: 'collection', id: 'laser-cleaning-machines' }).url === null);
check('unsafe kind blocked', resolveAffiliate({ kind: 'javascript', id: 'x' }).url === null);

// 1b. Repository-wide: retired handles must not exist; every outbound merchant URL keeps ref=hppfdpph once.
const RETIRED = [
  ['fiber-laser-welding', '-machine'],
  ['fiber-laser-making', '-machine'],
  ['pulse-laser-cleaning', '-machine'],
  ['collections/', 'frontpage'],
].map((p) => p.join(''));
function walkAll(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.next', '.git', 'package-lock.json'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkAll(p, out);
    else if (['.js', '.jsx', '.mjs', '.json', '.md', '.css', '.svg'].includes(extname(p))) out.push(p);
  }
  return out;
}
const everyFile = walkAll(ROOT);
const retiredHits = [];
const noRef = [];
for (const f of everyFile) {
  const src = readFileSync(f, 'utf8');
  for (const slug of RETIRED) if (src.includes(slug)) retiredHits.push(`${relative(ROOT, f)}: ${slug}`);
  for (const url of src.match(/https:\/\/sfxlasertech\.com\/[^\s'"`)<>]*/g) || []) {
    if (url.startsWith('https://sfxlasertech.com/cdn/')) continue; // image assets, not affiliate links
    if (url.includes('${')) continue;
    if ((url.match(/[?&]ref=hppfdpph(?![\w])/g) || []).length !== 1) noRef.push(`${relative(ROOT, f)}: ${url}`);
  }
}
check('no retired/misspelled handles anywhere in the repository', retiredHits.length === 0, retiredHits.join(' | '));
check('every outbound merchant URL has exactly one ref=hppfdpph', noRef.length === 0, noRef.join(' | '));
{
  const urls = allMappingEntries().map((e) => e.url);
  check('all mapped URLs are real merchant collection/home URLs with ref', urls.every((u) => /^https:\/\/sfxlasertech\.com\/(collections\/[a-z0-9-]+)?\?ref=hppfdpph$/.test(u)));
}

// 2. Manifest destinations all resolve; images are https merchant URLs.
const dests = [
  ...manifest.CATEGORIES, ...manifest.COLLECTIONS, ...manifest.MODELS, ...manifest.APPLICATIONS,
].map((i) => ({ id: i.id, d: i.destination }));
for (const j of manifest.SELECTOR.jobs) for (const o of j.options) dests.push({ id: `selector:${j.id}:${o.id}`, d: o.result.destination });
for (const { id, d } of dests) check(`manifest destination resolves: ${id}`, Boolean(resolveAffiliate(d).url), `${d.kind}:${d.id}`);
for (const i of [...manifest.CATEGORIES, ...manifest.COLLECTIONS, ...manifest.MODELS]) {
  check(`image URL is https merchant CDN: ${i.id}`, /^https:\/\/sfxlasertech\.com\/cdn\/shop\//.test(i.image.src) && i.image.alt.length > 5);
}

// 3. basePath sync between next.config.mjs and lib/config.js.
const nextConfig = readFileSync(join(ROOT, 'next.config.mjs'), 'utf8');
const m = nextConfig.match(/const BASE_PATH = '([^']+)'/);
check('basePath in next.config.mjs equals SITE.basePath', Boolean(m) && m[1] === SITE.basePath, m ? m[1] : 'not found');
check('canonicalBase = origin + basePath', SITE.canonicalBase === `${SITE.origin}${SITE.basePath}`);
check('trailingSlash disabled', /trailingSlash:\s*false/.test(nextConfig));
check('no assetPrefix configured', !/assetPrefix/.test(nextConfig.replace(/\/\*[\s\S]*?\*\//g, '')));

// 4. Source scan.
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.js', '.jsx', '.mjs'].includes(extname(p))) out.push(p);
  }
  return out;
}
const files = [...walk(join(ROOT, 'app')), ...walk(join(ROOT, 'components')), ...walk(join(ROOT, 'lib'))];
const rel = (f) => relative(ROOT, f);

const bad = { hash: [], nav: [], blankNoRel: [], rawMerchant: [], emptyHref: [] };
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  if (/href\s*=\s*["']#["']/.test(src)) bad.hash.push(rel(f));
  if (/href\s*=\s*["']{2}/.test(src)) bad.emptyHref.push(rel(f));
  if (/router\.(push|replace)\(|window\.open\(|window\.location|location\.href\s*=/.test(src)) bad.nav.push(rel(f));
  // every <a ... target="_blank" ...> must also carry rel="noopener noreferrer"
  for (const tag of src.match(/<a\b[^>]*>/g) || []) {
    if (/target\s*=\s*["']_blank["']/.test(tag) && !/rel\s*=\s*["']noopener noreferrer["']/.test(tag)) bad.blankNoRel.push(`${rel(f)}: ${tag.slice(0, 60)}`);
  }
  // merchant URLs may only appear in the config + manifest data files
  if (/sfxlasertech\.com/.test(src) && !['lib/config.js', 'lib/manifest.js', 'lib/affiliate.js'].includes(rel(f))) bad.rawMerchant.push(rel(f));
}
check('no href="#"', bad.hash.length === 0, bad.hash.join(', '));
check('no empty href', bad.emptyHref.length === 0, bad.emptyHref.join(', '));
check('no router/window navigation in app, components, lib', bad.nav.length === 0, bad.nav.join(', '));
check('every target=_blank anchor has rel="noopener noreferrer"', bad.blankNoRel.length === 0, bad.blankNoRel.join(' | '));
check('merchant URLs only in config/manifest/resolver', bad.rawMerchant.length === 0, bad.rawMerchant.join(', '));

const cta = readFileSync(join(ROOT, 'components/AffiliateLink.jsx'), 'utf8');
check('AffiliateLink renders <a target="_blank" rel="noopener noreferrer">', /<a\b[\s\S]*?target="_blank"[\s\S]*?rel="noopener noreferrer"/.test(cta));
check('AffiliateLink has no click handler', !/onClick/.test(cta));
check('AffiliateLink renders nothing without a valid URL', /if \(!url\)[\s\S]*return null/.test(cta));

const affiliateAnchors = files.filter((f) => rel(f) !== 'components/AffiliateLink.jsx').filter((f) => /<a\b[^>]*href=\{[^}]*(url|Url|affiliate)/.test(readFileSync(f, 'utf8')));
check('no affiliate anchors outside AffiliateLink', affiliateAnchors.length === 0, affiliateAnchors.map(rel).join(', '));

// Card layout order: Image -> Title -> Details/Specs -> CTA (single shared Card component).
const card = readFileSync(join(ROOT, 'components/Card.jsx'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const slot = (n) => card.indexOf(`data-card-slot="${n}"`);
check('Card slots in order image < title < details < cta', slot('image') > -1 && slot('image') < slot('title') && slot('title') < slot('details') && slot('details') < slot('cta'));
check('Card: image is the first element rendered', card.indexOf('<article') < slot('image') && !/<article[^>]*>\s*<(?!div data-card-slot="image")/.test(card));
check('Card: CTA is the last element before the card closes', /data-card-slot="cta"[\s\S]*<\/AffiliateLink>\s*<\/div>\s*<\/div>\s*<\/article>/.test(card));
check('Card: no order-*/reverse/absolute layout tricks', !/\border-\d|\border-(first|last)|flex-(col|row)-reverse|\babsolute\b/.test(card));
const page = readFileSync(join(ROOT, 'app/page.jsx'), 'utf8');
check('home page has no hand-built image blocks (all cards use <Card>)', !/<ProductImage/.test(page));

const analytics = readFileSync(join(ROOT, 'components/Analytics.jsx'), 'utf8');
check('analytics listener never calls preventDefault', !/preventDefault/.test(analytics));

// 5. Required files / policy.
for (const p of ['app/privacy-policy/page.jsx', 'app/terms-of-service/page.jsx', 'app/affiliate-disclosure/page.jsx', 'app/contact/page.jsx', 'app/api/track-click/route.js', 'postcss.config.mjs', 'app/globals.css']) {
  check(`file exists: ${p}`, existsSync(join(ROOT, p)));
}
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
check('next pinned to 14.2.35', pkg.dependencies.next === '14.2.35');
for (const d of ['tailwindcss', 'postcss', 'autoprefixer']) check(`${d} in dependencies (REPOSITORY_CONSTRAINTS)`, Boolean(pkg.dependencies[d]));
{
  const logoSrc = readFileSync(join(ROOT, 'components/Logo.jsx'), 'utf8');
  check('logo file exists at public/logo.png (served at /sfx-laser-tech/logo.png via basePath)', existsSync(join(ROOT, 'public/logo.png')));
  check('logo is not nested in public/sfx-laser-tech (would double the basePath)', !existsSync(join(ROOT, 'public/sfx-laser-tech')));
  check('Logo renders the image with the required alt text', SITE.logo.alt === 'PrimeGearLab Logo' && /alt=\{alt\}/.test(logoSrc) && /<img\b/.test(logoSrc) && /SITE\.basePath/.test(logoSrc));
  check('Logo: no text-badge fallback left', !/>\s*PG\s*</.test(logoSrc));
  check('Logo has width/height attributes (no layout shift) and aspect-preserving w-auto', /width=\{/.test(logoSrc) && /height=\{/.test(logoSrc) && /w-auto/.test(logoSrc));
  check('Header and Footer both use <Logo>', /<Logo\b/.test(readFileSync(join(ROOT, 'components/Header.jsx'), 'utf8')) && /<Logo\b/.test(readFileSync(join(ROOT, 'components/Footer.jsx'), 'utf8')));
  check('brand master file kept', existsSync(join(ROOT, 'brand/logo-original.png')));
}

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail && !r.ok ? `  -> ${r.detail}` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed (static source inspection only).`);
process.exit(failed ? 1 : 0);
