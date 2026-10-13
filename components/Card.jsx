import ProductImage from './ProductImage';
import AffiliateLink from './AffiliateLink';

// Mobile and desktop order: Image → Title → Description → CTA. The CTA is never overlaid on the image.
export default function Card({ item, placement, priority = false, children }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60">
      <div className="relative aspect-[4/3] w-full bg-white">
        <ProductImage src={item.image.src} alt={item.image.alt} priority={priority} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        {item.description && <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>}
        {children}
        <div className="mt-auto pt-2">
          <AffiliateLink destination={item.destination} placement={placement} className="btn-primary w-full sm:w-auto">
            {item.cta} →
          </AffiliateLink>
        </div>
      </div>
    </article>
  );
}
