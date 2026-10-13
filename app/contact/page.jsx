import { SITE } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: `Contact | ${SITE.brandName}`,
  description: `Contact ${SITE.brandName} about this equipment guide.`,
  path: '/contact',
});

export default function Contact() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-slate-300 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Contact</h1>
      <p>
        Questions about this guide, a correction, or a privacy request? Email us at{' '}
        <a className="text-brand-light underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
      <p>
        We are an independent publisher and cannot answer questions about orders, pricing, shipping, warranty or technical
        support for a machine. Please contact the merchant directly for those.
      </p>
    </article>
  );
}
