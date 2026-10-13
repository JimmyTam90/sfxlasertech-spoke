import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/lib/config';
import { LEGAL_PAGES } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/60 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr,1fr,1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-slate-400">
            {SITE.brandName} is an independent guide to industrial laser equipment. We are not the
            manufacturer or the seller. Purchases happen on the merchant’s own website.
          </p>
        </div>

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL_PAGES.map((page) => (
              <li key={page.path}>
                <Link href={page.path} className="text-slate-300 hover:text-brand-light">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <p className="mt-3 text-sm">
            <a href={`mailto:${SITE.contactEmail}`} className="break-all text-slate-300 hover:text-brand-light">
              {SITE.contactEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-slate-400 sm:px-6">
          This website may contain affiliate links. We may earn a commission when you purchase
          through eligible links, at no additional cost to you. Product names, images and
          specifications belong to {SITE.merchantName} and are shown for reference only. © {new Date().getFullYear()} {SITE.brandName}.
        </p>
      </div>
    </footer>
  );
}
