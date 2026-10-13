import { SITE } from './config.js';

/** Build per-page metadata with an absolute canonical on the PUBLIC hub URL (never the spoke URL). */
export function pageMeta({ title, description, path = '' }) {
  const url = `${SITE.canonicalBase}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.brandName,
      locale: SITE.locale,
      type: 'website',
    },
    twitter: { card: 'summary', title, description },
  };
}

export const LEGAL_PAGES = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' },
  { label: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
  { label: 'Contact', path: '/contact' },
];
