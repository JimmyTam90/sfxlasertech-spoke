// Rendered-HTML audit against a RUNNING server. Run after `npm run build && npm start`:
//   BASE_URL=http://localhost:3000 node scripts/audit-rendered.mjs
// Checks the server-rendered HTML of every route: external anchors, canonical, title, nav targets.

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const PREFIX = '/sfx-laser-tech';
const CANONICAL_BASE = 'https://primegearlab.com/sfx-laser-tech';
const ROUTES = ['', '/privacy-policy', '/terms-of-service', '/affiliate-disclosure', '/contact'];

let failed = 0;
const ok = (name, pass, detail = '') => {
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${!pass && detail ? `  -> ${detail}` : ''}`);
};

for (const route of ROUTES) {
  const url = `${BASE}${PREFIX}${route}`;
  const res = await fetch(url, { redirect: 'manual' });
  ok(`${route || '/'} responds 200`, res.status === 200, `status ${res.status}`);
  if (res.status !== 200) continue;
  const html = await res.text();

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  ok(`${route || '/'} canonical uses public hub URL`, canonical && canonical[1] === `${CANONICAL_BASE}${route}`, canonical ? canonical[1] : 'missing');
  ok(`${route || '/'} has one <title>`, (html.match(/<title>/g) || []).length === 1);

  const anchors = html.match(/<a\b[^>]*>/g) || [];
  const external = anchors.filter((a) => /href="https?:\/\/sfxlasertech\.com/.test(a));
  for (const a of external) {
    const good = /target="_blank"/.test(a) && /rel="noopener noreferrer"/.test(a) && /ref=hppfdpph/.test(a) && (a.match(/ref=hppfdpph/g) || []).length === 1;
    ok(`${route || '/'} affiliate anchor attrs + single ref`, good, a.slice(0, 140));
  }
  ok(`${route || '/'} has affiliate CTAs (header at minimum)`, external.length >= 1, `${external.length}`);
  ok(`${route || '/'} no href="#" or empty href`, !anchors.some((a) => /href="#?"/.test(a)));
  ok(`${route || '/'} internal links keep the ${PREFIX} prefix`, anchors.filter((a) => /href="\/(?!sfx-laser-tech|_next)/.test(a)).length === 0);
}

const home = await (await fetch(`${BASE}${PREFIX}`)).text();
for (const id of ['categories', 'applications', 'faq', 'selector']) ok(`home has #${id}`, new RegExp(`id="${id}"`).test(home));
ok('home footer legal labels in Title Case', ['Privacy Policy', 'Terms of Service', 'Affiliate Disclosure', 'Contact'].every((l) => home.includes(`>${l}<`)));
ok('JS chunks served under prefix', /\/sfx-laser-tech\/_next\/static\//.test(home));

for (const p of ['/sitemap.xml', '/robots.txt']) {
  const r = await fetch(`${BASE}${PREFIX}${p}`);
  const t = await r.text();
  ok(`${p} responds and uses public hub origin`, r.status === 200 && t.includes(CANONICAL_BASE), `status ${r.status}`);
}

process.exit(failed ? 1 : 0);
