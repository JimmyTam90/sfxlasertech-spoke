import ProductImage from './ProductImage';
import AffiliateLink from './AffiliateLink';

/**
 * The single card used for every category card, collection card, featured model block and the hero
 * model block. The DOM order is fixed and is the visual order on mobile AND desktop (no CSS `order`,
 * no reversed flex, no overlay):
 *
 *   1. image        (data-card-slot="image")
 *   2. title        (data-card-slot="title")
 *   3. details      (data-card-slot="details"): description, specs, certifications, footnotes
 *   4. CTA          (data-card-slot="cta"): the only affiliate button, always last in the card
 *
 * Nothing (disclosure, badge, button) may be rendered before the image.
 * Extra spec markup is passed as `children` and lands inside "details", above the CTA.
 */
export default function Card({ item, placement, priority = false, headingLevel = 'h3', sizes, children }) {
  const Heading = headingLevel;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60">
      <div data-card-slot="image" className="relative aspect-[4/3] w-full bg-white">
        <ProductImage src={item.image.src} alt={item.image.alt} priority={priority} sizes={sizes} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Heading data-card-slot="title" className="text-lg font-semibold text-white">
          {item.name}
        </Heading>

        <div data-card-slot="details" className="space-y-3">
          {item.description && <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>}
          {children}
        </div>

        <div data-card-slot="cta" className="mt-auto pt-2">
          <AffiliateLink destination={item.destination} placement={placement} className="btn-primary w-full sm:w-auto">
            {item.cta} →
          </AffiliateLink>
        </div>
      </div>
    </article>
  );
}
