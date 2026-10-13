// The ONLY component that renders an external affiliate anchor.
// It resolves the URL through the central resolver and enforces the CTA contract:
// a real <a>, target="_blank", rel="noopener noreferrer", no click handler, no router navigation.
// If no valid destination exists it renders nothing (never a placeholder hash link).

import { resolveAffiliate } from '@/lib/affiliate';

export default function AffiliateLink({ destination, placement, className = '', children }) {
  const { url, key, status } = resolveAffiliate(destination);

  if (!url) {
    console.error(`[AffiliateLink] No clickable CTA rendered for ${key}: ${status}`);
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-affiliate="true"
      data-placement={placement}
      data-dest-key={key}
    >
      {children}
      <span className="sr-only"> (opens the merchant website in a new tab)</span>
    </a>
  );
}
