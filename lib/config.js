// Single source of truth for project inputs (mirrors Section 1 of the master prompt).
// Do not duplicate these values in components.

export const SITE = {
  projectName: 'sfx-laser-tech',
  brandName: 'PrimeGearLab',
  merchantName: 'SFX Laser Tech',
  language: 'en',
  locale: 'en_US',
  contactEmail: 'daniaengracia26377@gmail.com',
  origin: 'https://primegearlab.com',
  basePath: '/sfx-laser-tech', // must equal basePath in next.config.mjs
  canonicalBase: 'https://primegearlab.com/sfx-laser-tech', // no trailing slash
  trackEndpoint: '/api/track-click',
  lastUpdated: '2026-10-13',
};

export const AFFILIATE = {
  trackingParam: 'ref',
  trackingValue: 'hppfdpph',
  allowedHosts: ['sfxlasertech.com'],
};

export const DEFAULT_AFFILIATE_URL = 'https://sfxlasertech.com/?ref=hppfdpph';

// AUTHORITATIVE MAPPING (supplied 2026-10-14). Every URL below was fetched with ?ref=hppfdpph on
// 2026-10-14 and loaded as a real page. Keep the tracking parameter on every URL.
const URL_CLEANING = 'https://sfxlasertech.com/collections/laser-cleaning-machine?ref=hppfdpph';
const URL_WELDING = 'https://sfxlasertech.com/collections/laser-welding-machine?ref=hppfdpph';
const URL_MARKING = 'https://sfxlasertech.com/collections/fiber-laser-marking-machine?ref=hppfdpph';
const URL_CUTTING = 'https://sfxlasertech.com/collections/fiber-laser-cutting-machine?ref=hppfdpph';
const URL_ACCESSORIES = 'https://sfxlasertech.com/collections/machine-tool-accessories?ref=hppfdpph';
const URL_ALL = 'https://sfxlasertech.com/collections/all?ref=hppfdpph';

// Category-level destinations.
export const CATEGORY_LINKS = {
  'laser-cleaning-machines': URL_CLEANING,
  'laser-welding-machines': URL_WELDING,
  'laser-marking-engraving': URL_MARKING,
  'fiber-laser-cutters': URL_CUTTING,
  'machine-tool-accessories': URL_ACCESSORIES,
  'all-laser-equipment': URL_ALL,
};

// Collection-level destinations. There is no separate merchant collection for pulse-only cleaners or
// handheld-only welders, so these use the matching category collection (which contains those models).
export const COLLECTION_LINKS = {
  'air-cooled-pulse-cleaners': URL_CLEANING,
  'handheld-welder-cleaners': URL_WELDING,
};

// Runtime evidence (fetched 2026-10-14). OBSERVED_LIVE = the URL itself loaded as a real page.
// This is NOT proof that commission attribution works.
export const DESTINATION_EVIDENCE = {
  'category:laser-cleaning-machines': { state: 'OBSERVED_LIVE', note: 'Title "Laser Cleaning Machine", 14 products.' },
  'category:laser-welding-machines': { state: 'OBSERVED_LIVE', note: 'Title "Laser Welding Machine", 23 products.' },
  'category:laser-marking-engraving': { state: 'OBSERVED_LIVE', note: 'Title "JPT LP+", 3 products (50W JPT and portable 20W/30W/50W). Does not include JPT MOPA M7.' },
  'category:fiber-laser-cutters': { state: 'OBSERVED_LIVE', note: 'Title "Fiber Laser Cutting Machine", 9 products.' },
  'category:machine-tool-accessories': { state: 'OBSERVED_LIVE', note: 'Title "Machine Tool Accessories", 2 products.' },
  'category:all-laser-equipment': { state: 'OBSERVED_LIVE', note: 'Title "Products", 118 products.' },
  'collection:air-cooled-pulse-cleaners': { state: 'OBSERVED_LIVE', note: 'Same URL as the cleaning category.' },
  'collection:handheld-welder-cleaners': { state: 'OBSERVED_LIVE', note: 'Same URL as the welding category.' },
  'default:default': { state: 'OBSERVED_LIVE', note: 'Merchant homepage loaded.' },
};
