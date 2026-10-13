// Analytics configuration read from public env vars (inlined at build time).
// Placeholder values (containing "XXXX") or empty values keep an integration disabled.
// Each variable is referenced literally so Next.js can inline it.

function clean(value) {
  if (typeof value !== 'string') return '';
  const v = value.trim();
  if (!v || /x{4,}/i.test(v)) return '';
  return v;
}

export const ANALYTICS = {
  ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  adsId: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  adsLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL),
  metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
};

export const THIRD_PARTY_CONFIGURED = Boolean(
  ANALYTICS.ga4Id || ANALYTICS.adsId || ANALYTICS.metaPixelId
);
