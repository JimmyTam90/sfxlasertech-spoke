import Link from 'next/link';
import Logo from './Logo';
import MobileNav from './MobileNav';
import AffiliateLink from './AffiliateLink';
import { NAV_LINKS } from './nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/60 backdrop-blur-md bg-slate-900/80">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium text-slate-200">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rounded px-1 py-1 hover:text-brand-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <AffiliateLink
            destination={{ kind: 'category', id: 'all-laser-equipment' }}
            placement="header"
            className="btn-primary hidden sm:inline-flex"
          >
            Explore Equipment →
          </AffiliateLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
