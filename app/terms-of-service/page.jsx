import { SITE } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: `Terms of Service | ${SITE.brandName}`,
  description: `Terms for using the ${SITE.brandName} equipment guide.`,
  path: '/terms-of-service',
});

export default function TermsOfService() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-slate-300 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
      <p className="text-sm text-slate-400">Last updated {SITE.lastUpdated}</p>

      <h2 className="pt-4 text-xl font-semibold text-white">Independent guide</h2>
      <p>
        {SITE.brandName} is an independent informational website. We are not the manufacturer, seller or an official
        representative of {SITE.merchantName}. We do not process orders, set prices or provide warranty or support for any product.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Information accuracy</h2>
      <p>
        Product details come from the merchant’s public listings and may be incomplete or out of date. Prices, availability,
        specifications, certifications and warranty terms can change, so confirm them on the merchant’s website before you buy.
        The selector and application guides are general starting points, not engineering advice.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Safety</h2>
      <p>
        Industrial lasers can cause serious injury. Follow the manufacturer’s instructions, applicable laws and your site’s
        safety procedures. Nothing on this website replaces training, a hazard assessment or the advice of a qualified laser safety officer.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Third-party websites and trademarks</h2>
      <p>
        Links lead to websites we do not control, and we are not responsible for their content or practices. Product names and
        images belong to their owners and are shown for identification only.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">No warranty and limitation of liability</h2>
      <p>
        This website is provided as is, without warranties of any kind. To the extent permitted by law, {SITE.brandName} is not
        liable for losses arising from use of this website or from purchases made on third-party sites.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-white">Contact</h2>
      <p>
        Questions about these terms:{' '}
        <a className="text-brand-light underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </article>
  );
}
