import Link from 'next/link';
import Logo from './Logo';
import { SITE } from '@/lib/config';
import { LEGAL_PAGES } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/60 bg-slate-950">
      {/* Desktop: logo on the left, everything else stacked on the right, so the footer is only as tall
          as its text. Mobile: single column. */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-5 md:grid-cols-[auto,1fr] md:gap-x-10">
          <div className="md:self-start">
            <Logo size="footer" />
          </div>

          <div className="flex flex-col gap-4">
            {/* Legal links, right-aligned */}
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

            {/* Disclaimer, contact and copyright: right side of the page, text left-aligned */}
            <div className="max-w-xl space-y-2 border-t border-slate-800 pt-4 text-left text-xs leading-relaxed text-slate-400 md:ml-auto">
              <p>
                {SITE.brandName} is an independent guide to industrial laser equipment. We are not the manufacturer or the
                seller. Purchases happen on the merchant’s own website.
              </p>
              <p>
                This website may contain affiliate links. We may earn a commission when you purchase through eligible links,
                at no additional cost to you. Product names, images and specifications belong to {SITE.merchantName} and
                are shown for reference only.
              </p>
              <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-1">
                <span>
                  Contact:{' '}
                  <a href={`mailto:${SITE.contactEmail}`} className="break-all text-slate-300 hover:text-brand-light">
                    {SITE.contactEmail}
                  </a>
                </span>
                <span>© {new Date().getFullYear()} {SITE.brandName}. All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
