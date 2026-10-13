// Single source of truth for project inputs (mirrors Section 1 of the master prompt).
// Do not duplicate these values in components.

export const SITE = {
  projectName: 'sfx-laser-tech',
  brandName: 'PrimeGearLab',
  merchantName: 'SFX Laser Tech',
  language: 'en',
  locale: 'en_US',
  contactEmail: 'daniaengracia26377@gmail.com',
  sourceWebsite: 'https://sfxlasertech.com/',
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

// PRODUCT_DEEP_LINKS_MAPPING (category-level destinations), exactly as supplied.
export const CATEGORY_LINKS = {
  'laser-cleaning-machines': 'https://sfxlasertech.com/collections/laser-cleaning-machine?ref=hppfdpph',
  'laser-welding-machines': 'https://sfxlasertech.com/collections/fiber-laser-welding-machine?ref=hppfdpph',
  'laser-marking-engraving': 'https://sfxlasertech.com/collections/fiber-laser-making-machine?ref=hppfdpph',
  'fiber-laser-cutters': 'https://sfxlasertech.com/collections/fiber-laser-cutting-machine?ref=hppfdpph',
  'machine-tool-accessories': 'https://sfxlasertech.com/collections/machine-tool-accessories?ref=hppfdpph',
  'all-laser-equipment': 'https://sfxlasertech.com/collections/all?ref=hppfdpph',
};

// COLLECTION_DEEP_LINKS_MAPPING, exactly as supplied.
export const COLLECTION_LINKS = {
  'air-cooled-pulse-cleaners': 'https://sfxlasertech.com/collections/pulse-laser-cleaning-machine?ref=hppfdpph',
  'handheld-welder-cleaners': 'https://sfxlasertech.com/collections/frontpage?ref=hppfdpph',
};

// Evidence gathered on 2026-10-13 by fetching the merchant's pages (see README "Destination evidence").
// OBSERVED_LIVE  = the supplied URL itself loaded as a collection page.
// FETCH_FAILED   = the supplied URL could not be fetched during research; NOT proof it is broken.
export const DESTINATION_EVIDENCE = {
  'category:laser-cleaning-machines': { state: 'OBSERVED_LIVE' },
  'category:laser-welding-machines': {
    state: 'FETCH_FAILED',
    note: 'Handle "fiber-laser-welding-machine" failed to fetch. The merchant nav uses "laser-welding-machine", which loaded (23 products).',
  },
  'category:laser-marking-engraving': {
    state: 'FETCH_FAILED',
    note: 'Handle "fiber-laser-making-machine" failed to fetch (possible typo of "marking"). "fiber-laser-marking-machine" loaded but is titled "JPT LP+" (3 products).',
  },
  'category:fiber-laser-cutters': { state: 'OBSERVED_LIVE' },
  'category:machine-tool-accessories': { state: 'OBSERVED_LIVE' },
  'category:all-laser-equipment': { state: 'OBSERVED_LIVE' },
  'collection:air-cooled-pulse-cleaners': {
    state: 'FETCH_FAILED',
    note: 'Handle "pulse-laser-cleaning-machine" failed to fetch with and without the ref parameter.',
  },
  'collection:handheld-welder-cleaners': {
    state: 'OBSERVED_LIVE',
    note: 'Loads, but the collection is the merchant "frontpage" (titled "Home", 33 mixed products), not a handheld-welder-only list.',
  },
  'default:default': { state: 'NOT_CHECKED' },
};
