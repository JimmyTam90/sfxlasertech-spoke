import { SITE } from './config.js';
import { MODELS } from './manifest.js';

// Social preview image: ALWAYS the first featured product photo (absolute https URL on the merchant
// CDN, copied verbatim from the merchant listing). Never the logo and never a placeholder.
export const OG_IMAGE = {
  url: MODELS[0].image.src,
  alt: MODELS[0].image.alt,
};

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
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
    twitter: {
      card: 'summary', // square product photo: show it whole instead of cropping to a wide banner
      title,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}

export const LEGAL_PAGES = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms-of-service' },
  { label: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
  { label: 'Contact', path: '/contact' },
];
