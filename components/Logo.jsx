import Link from 'next/link';
import { SITE } from '@/lib/config';

// The logo artwork already contains the brand name, so ONLY the image is rendered (no text beside it).
const SIZES = {
  header: 'h-12 sm:h-16', // inside the 64px (mobile) / 80px (sm+) sticky header
  footer: 'h-16 sm:h-20',
};

// A plain <img> is used on purpose: the file sits in public/ and the Hub-Spoke deployment serves it
// under the basePath, so the URL is built from SITE.basePath. Width/height attributes reserve space
// (no layout shift); h-* + w-auto keeps the natural aspect ratio.
export default function Logo({ size = 'header' }) {
  const { file, width, height, alt } = SITE.logo;
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-md" aria-label={`${SITE.brandName} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${SITE.basePath}${file}`}
        alt={alt}
        width={width}
        height={height}
        className={`${SIZES[size] || SIZES.header} w-auto object-contain`}
      />
    </Link>
  );
}
