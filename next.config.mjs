/**
 * Hub–Spoke deployment (HUB_SPOKE_PROXY)
 *
 * The Hub (primegearlab.com) rewrites /sfx-laser-tech and /sfx-laser-tech/:path*
 * to this Spoke at the SAME path (https://sfxlasertech-spoke.vercel.app/sfx-laser-tech/...).
 * Because the Spoke itself must answer under that prefix, basePath is required.
 * basePath also prefixes /_next/static/*, so JS/CSS chunks resolve through the
 * Hub rewrite without needing assetPrefix.
 *
 * NOTE: keep BASE_PATH in sync with lib/config.js (scripts/audit-affiliate.mjs checks this).
 */
const BASE_PATH = '/sfx-laser-tech';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,
  trailingSlash: false, // TRAILING_SLASH_POLICY: DISABLED
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Product images are loaded directly from the merchant CDN (see components/ProductImage.jsx).
    remotePatterns: [
      { protocol: 'https', hostname: 'sfxlasertech.com', pathname: '/cdn/shop/**' },
    ],
  },
  async redirects() {
    return [
      {
        // Direct visits to the bare Spoke origin land on the project path.
        source: '/',
        destination: BASE_PATH,
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
