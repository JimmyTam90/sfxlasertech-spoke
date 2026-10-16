import Link from 'next/link';

// Helper function to resolve subpath correctly for Hub-Spoke
const asset = (path) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/sfx-laser-tech';
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b1329', color: '#94a3b8', padding: '50px 20px 80px', borderTop: '1px solid #1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        .footer-container {
          max-width: 1152px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .footer-container {
            grid-template-columns: auto minmax(0, 1fr);
            gap: 40px 60px;
            align-items: start;
          }
        }
        .footer-links {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 12px 24px;
          justify-content: flex-start;
        }
        @media (min-width: 768px) {
          .footer-links {
            justify-content: flex-end;
            flex-wrap: nowrap;
            gap: 24px;
          }
        }
      `}</style>

      <div className="footer-container">
        
        {/* Cột 1: Logo & Tagline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <img 
              src={asset('/logo-trimmed.png')} 
              alt="SFX Laser Tech" 
              style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '220px', lineHeight: '1.4', margin: 0 }}>
            Independent Research &amp; Product Verification Lab.
          </p>
        </div>

        {/* Cột 2 - Hàng 1: Legal Links (Luôn nằm ngang thẳng hàng bên phải trên Desktop) */}
        <div className="footer-links">
          <Link href="/privacy" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Terms of Service</Link>
          <Link href="/affiliate-disclosure" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Affiliate Disclosure</Link>
          <Link href="/contact" style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Contact</Link>
        </div>

        {/* Cột 2 - Hàng 2: Text Block & Disclaimers (Tràn đều tự nhiên, lấp đầy khoảng trắng) */}
        <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.83rem', lineHeight: '1.5', color: '#94a3b8', textAlign: 'left' }}>
          <p style={{ margin: 0 }}>
            PrimeGearLab is an independent guide to industrial laser equipment. We are not the manufacturer or the seller. Purchases happen on the merchant’s own website.
          </p>
          <p style={{ margin: 0 }}>
            This website may contain affiliate links. We may earn a commission when you purchase through eligible links, at no additional cost to you. Product names, images and specifications belong to SFX Laser Tech and are shown for reference only.
          </p>
          <p style={{ margin: 0 }}>
            Contact: <a href="mailto:daniaengracia26377@gmail.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>daniaengracia26377@gmail.com</a>
          </p>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.78rem', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
            © 2026 PrimeGearLab. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
