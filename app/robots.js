import { SITE } from '@/lib/config';

// Served at <spoke>/sfx-laser-tech/robots.txt. Crawlers read robots.txt only from the hub ROOT
// (https://primegearlab.com/robots.txt), so the hub's own robots file should reference the sitemap below.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE.canonicalBase}/sitemap.xml`,
  };
}
