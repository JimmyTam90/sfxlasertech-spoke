import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/lib/config';
import { LEGAL_PAGES } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/60 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Row 1: logo (left) and legal links (right-aligned) */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo size="footer" />
          <nav aria-label="Legal" className="flex md:justify-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
              {LEGAL_PAGES.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="text-slate-300 hover:text-brand-light">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Row 2: disclaimer, email and copyright in one block, right side of the page, left-aligned text */}
        <div className="mt-8 max-w-xl space-y-3 border-t border-slate-800 pt-6 text-left text-xs leading-relaxed text-slate-400 md:ml-auto">
          <p>
            {SITE.brandName} is an independent guide to industrial laser equipment. We are not the manufacturer or the
            seller. Purchases happen on the merchant’s own website.
          </p>
          <p>
            This website may contain affiliate links. We may earn a commission when you purchase through eligible links, at
            no additional cost to you. Product names, images and specifications belong to {SITE.merchantName} and are shown
            for reference only.
          </p>
          <p>
            Contact:{' '}
            <a href={`mailto:${SITE.contactEmail}`} className="break-all text-slate-300 hover:text-brand-light">
              {SITE.contactEmail}
            </a>
          </p>
          <p>© {new Date().getFullYear()} {SITE.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
