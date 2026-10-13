import { SITE } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: `Affiliate Disclosure | ${SITE.brandName}`,
  description: `How ${SITE.brandName} earns commissions from links to ${SITE.merchantName}.`,
  path: '/affiliate-disclosure',
});

export default function AffiliateDisclosure() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-slate-300 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Affiliate Disclosure</h1>
      <p className="text-sm text-slate-400">Last updated {SITE.lastUpdated}</p>

      <p className="rounded-lg border border-slate-700 bg-slate-800/60 p-4">
        This website may contain affiliate links. We may earn a commission when you purchase through eligible links, at no
        additional cost to you.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">How it works</h2>
      <p>
        Buttons and links on this website that lead to {SITE.merchantName} include an affiliate reference. If you buy after
        following one, {SITE.merchantName}’s affiliate program may pay us a commission. The price you pay is set by the merchant
        and is not increased because of our link.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">What this does and does not mean</h2>
      <p>
        Not every click results in a commission, and eligibility depends on the merchant’s program terms. Our category order and
        selector suggestions are based on the type of work, not on how much we might earn. {SITE.brandName} is not the seller and
        has no say in the merchant’s pricing, stock or support.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Questions</h2>
      <p>
        Email{' '}
        <a className="text-brand-light underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </article>
  );
}
