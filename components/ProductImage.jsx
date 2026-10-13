'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Loads a verified merchant image. If it fails (including failures that happen before
// hydration), an honest labelled placeholder is shown instead of an empty box.
export default function ProductImage({ src, alt, priority = false, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-slate-100 p-4 text-center text-xs text-slate-600">
        <span className="font-semibold">Image unavailable</span>
        <span>See the merchant site for photos</span>
      </div>
    );
  }

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      onError={() => setFailed(true)}
      className="object-contain p-3"
    />
  );
}
