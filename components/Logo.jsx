import Link from 'next/link';
import { SITE } from '@/lib/config';

// No PrimeGearLab logo file was supplied (BRAND_LOGO_PATH does not exist in the project), and the
// configured BRAND_LOGO_URL belongs to the merchant, not to this publisher. So this renders an
// honest text-brand fallback: a plain monogram badge beside the brand name.
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-md" aria-label={`${SITE.brandName} home`}>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-light/60 bg-slate-800 text-sm font-bold tracking-tight text-brand-light"
      >
        PG
      </span>
      <span className="text-lg font-bold tracking-tight text-white">{SITE.brandName}</span>
    </Link>
  );
}
