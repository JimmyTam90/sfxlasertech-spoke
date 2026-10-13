import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import Analytics from '@/components/Analytics';
import { SITE } from '@/lib/config';
import { pageMeta } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(SITE.origin),
  ...pageMeta({
    title: `Industrial Laser Equipment Guide | ${SITE.brandName}`,
    description:
      'Independent guide to laser cleaning, welding, marking and cutting machines from SFX Laser Tech. Compare categories, use the power selector, then check specs and pricing with the merchant.',
  }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.brandName,
  url: SITE.canonicalBase,
  inLanguage: SITE.language,
};

export default function RootLayout({ children }) {
  return (
    <html lang={SITE.language}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <Analytics />
      </body>
    </html>
  );
}
