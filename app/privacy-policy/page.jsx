import { SITE } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: `Privacy Policy | ${SITE.brandName}`,
  description: `How ${SITE.brandName} handles visitor data, outbound-link measurement and optional analytics.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-slate-300 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="text-sm text-slate-400">Last updated {SITE.lastUpdated}</p>

      <h2 className="pt-4 text-xl font-semibold text-white">What this website is</h2>
      <p>
        {SITE.brandName} is an independent publisher that links to products sold by {SITE.merchantName}. We do not sell
        products, take orders or collect payment. Purchases happen on the merchant’s website under its own privacy policy.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Information we collect</h2>
      <p>
        We do not ask you to create an account or submit a form. When you click a link to the merchant, our server records an
        anonymous counter entry containing only which button was clicked and which destination it points to. It does not include
        your name, email address or any identifier, and we set no cookie for it.
      </p>
      <p>
        Our hosting provider may process standard technical data such as IP address and browser type to deliver the site and
        protect it from abuse. We do not use that data to identify you.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Optional analytics and advertising measurement</h2>
      <p>
        The site can be configured with Google Analytics 4, Google Ads conversion measurement and the Meta Pixel. These tools
        are loaded only if they are configured and only after you click Accept on the consent banner. If you decline, or if no
        tool is configured, none of them load. Where enabled, those providers may set cookies and process data under their own
        policies.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Affiliate links and the merchant</h2>
      <p>
        When you follow a link, the merchant’s website opens in a new tab. The link carries an affiliate reference so that a
        purchase can be credited to us. The merchant, not {SITE.brandName}, controls what it records after you arrive.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Your choices</h2>
      <p>
        You can decline optional analytics, clear your browser storage to reset your consent choice, or block cookies in your
        browser settings. To ask a question about this policy, email{' '}
        <a className="text-brand-light underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </article>
  );
}
