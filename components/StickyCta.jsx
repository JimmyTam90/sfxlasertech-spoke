import AffiliateLink from './AffiliateLink';
import { resolveAffiliate } from '@/lib/affiliate';

const DESTINATION = { kind: 'category', id: 'all-laser-equipment' };

// Mobile-only bar. Hidden entirely when its destination is invalid.
export default function StickyCta() {
  if (!resolveAffiliate(DESTINATION).url) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-700 bg-slate-900/95 px-4 pt-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <AffiliateLink destination={DESTINATION} placement="sticky_mobile" className="btn-primary w-full">
        Explore Equipment →
      </AffiliateLink>
    </div>
  );
}
