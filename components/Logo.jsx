import Link from 'next/link';
import { SITE } from '@/lib/config';

const SIZES = {
  header: 'h-10', // 40px tall inside the 64px sticky header
  footer: 'h-14',
};

// Official PrimeGearLab logo beside the brand name. A plain <img> is used on purpose: the file sits
// in public/ and the Hub-Spoke deployment serves it under the basePath, so the URL is built from
// SITE.basePath (next/image with unoptimized would not add the prefix). Width/height attributes
// reserve space (no layout shift); h-* + w-auto keeps the aspect ratio.
export default function Logo({ size = 'header' }) {
  const { file, width, height, alt } = SITE.logo;
  return (
    <Link href="/" className="flex items-center gap-3 rounded-md" aria-label={`${SITE.brandName} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${SITE.basePath}${file}`}
        alt={alt}
        width={width}
        height={height}
        className={`${SIZES[size] || SIZES.header} w-auto max-w-[5rem] shrink-0 object-contain`}
      />
      <span className="text-lg font-bold tracking-tight text-white">{SITE.brandName}</span>
    </Link>
  );
}
