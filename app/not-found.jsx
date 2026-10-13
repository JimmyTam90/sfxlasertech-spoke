import Link from 'next/link';

export const metadata = { title: 'Page Not Found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-300">That page does not exist. Return to the equipment guide to keep browsing.</p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </section>
  );
}
