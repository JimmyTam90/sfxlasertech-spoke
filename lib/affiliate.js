// Central affiliate destination resolver. Every affiliate CTA in the project goes through here.
// No component may build or modify an affiliate URL on its own.

import {
  AFFILIATE,
  DEFAULT_AFFILIATE_URL,
  CATEGORY_LINKS,
  COLLECTION_LINKS,
} from './config.js';

export const STATUS = {
  MAPPING_PROVIDED: 'MAPPING_PROVIDED',
  URL_SYNTAX_VALID: 'URL_SYNTAX_VALID',
  DESTINATION_NOT_RUNTIME_VERIFIED: 'DESTINATION_NOT_RUNTIME_VERIFIED',
  INVALID_INPUT: 'INVALID_INPUT',
  BLOCKED_MISSING_AFFILIATE_URL: 'BLOCKED_MISSING_AFFILIATE_URL',
  BLOCKED_AMBIGUOUS_MAPPING: 'BLOCKED_AMBIGUOUS_MAPPING',
};

const TABLES = {
  category: CATEGORY_LINKS,
  collection: COLLECTION_LINKS,
};

/**
 * Validate a candidate affiliate URL without altering it.
 * Rules: https only, host on the allowlist, tracking parameter present exactly once
 * with the expected value. A valid result does NOT prove the page exists or that
 * commission attribution works.
 */
export function validateAffiliateUrl(raw) {
  if (typeof raw !== 'string' || raw.trim() !== raw || raw === '') {
    return { ok: false, reason: 'URL is empty or has surrounding whitespace' };
  }
  let u;
  try {
    u = new URL(raw);
  } catch {
    return { ok: false, reason: 'URL does not parse' };
  }
  if (u.protocol !== 'https:') return { ok: false, reason: `Unsafe or non-https protocol: ${u.protocol}` };
  if (!AFFILIATE.allowedHosts.includes(u.hostname)) return { ok: false, reason: `Host not allowed: ${u.hostname}` };
  const values = u.searchParams.getAll(AFFILIATE.trackingParam);
  if (values.length !== 1) return { ok: false, reason: `Tracking parameter "${AFFILIATE.trackingParam}" appears ${values.length} times` };
  if (values[0] !== AFFILIATE.trackingValue) return { ok: false, reason: 'Tracking parameter value differs from the supplied identifier' };
  return { ok: true };
}

/**
 * Resolve a destination.
 *   kind: 'category' | 'collection' | 'default'
 *   id:   exact mapping key (ignored for 'default')
 * There is no fuzzy matching and no cross-table fallback: a missing key fails safely.
 */
export function resolveAffiliate({ kind, id } = {}) {
  let raw;
  let key;

  if (kind === 'default') {
    raw = DEFAULT_AFFILIATE_URL;
    key = 'default:default';
  } else if (kind in TABLES) {
    if (typeof id !== 'string' || id === '') {
      return { url: null, status: STATUS.BLOCKED_AMBIGUOUS_MAPPING, key: `${kind}:(missing id)` };
    }
    key = `${kind}:${id}`;
    const table = TABLES[kind];
    if (!Object.prototype.hasOwnProperty.call(table, id)) {
      return { url: null, status: STATUS.BLOCKED_MISSING_AFFILIATE_URL, key };
    }
    raw = table[id];
  } else {
    return { url: null, status: STATUS.BLOCKED_AMBIGUOUS_MAPPING, key: `${String(kind)}:${String(id)}` };
  }

  const check = validateAffiliateUrl(raw);
  if (!check.ok) {
    return { url: null, status: STATUS.INVALID_INPUT, key, reason: check.reason };
  }
  return { url: raw, status: STATUS.DESTINATION_NOT_RUNTIME_VERIFIED, key };
}

export function allMappingEntries() {
  return [
    ...Object.entries(CATEGORY_LINKS).map(([id, url]) => ({ kind: 'category', id, url })),
    ...Object.entries(COLLECTION_LINKS).map(([id, url]) => ({ kind: 'collection', id, url })),
    { kind: 'default', id: 'default', url: DEFAULT_AFFILIATE_URL },
  ];
}
