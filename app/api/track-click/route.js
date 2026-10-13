import { NextResponse } from 'next/server';
import { allMappingEntries } from '@/lib/affiliate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Anonymous outbound-click counter. Stores nothing and sets no cookies: it writes one structured
// log line (placement + destination key). This measures CLICKS only, not purchases or commission.
const VALID_KEYS = new Set(allMappingEntries().map((e) => `${e.kind}:${e.id}`));
const PLACEMENT = /^[a-z0-9_]{1,40}$/;

export async function POST(request) {
  let body;
  try {
    const text = await request.text();
    if (text.length > 1024) return new NextResponse(null, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const { placement, destinationKey } = body || {};
  if (typeof placement !== 'string' || !PLACEMENT.test(placement)) {
    return new NextResponse(null, { status: 400 });
  }
  if (typeof destinationKey !== 'string' || !VALID_KEYS.has(destinationKey)) {
    return new NextResponse(null, { status: 400 });
  }

  console.log(JSON.stringify({ event: 'affiliate_click', placement, destinationKey, at: new Date().toISOString() }));
  return new NextResponse(null, { status: 204 });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: 'POST' } });
}
