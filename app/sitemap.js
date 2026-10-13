import { SITE } from '@/lib/config';
import { LEGAL_PAGES } from '@/lib/seo';

// Only routes that exist. URLs use the PUBLIC hub origin and subpath.
export default function sitemap() {
  const lastModified = new Date(SITE.lastUpdated);
  return [
    { url: SITE.canonicalBase, lastModified },
    ...LEGAL_PAGES.map((p) => ({ url: `${SITE.canonicalBase}${p.path}`, lastModified })),
  ];
}
