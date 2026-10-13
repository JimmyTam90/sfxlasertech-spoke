'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ANALYTICS, THIRD_PARTY_CONFIGURED } from '@/lib/analytics-config';
import { SITE } from '@/lib/config';

const CONSENT_KEY = 'pgl-consent';
const TRACK_URL = `${SITE.basePath}${SITE.trackEndpoint}`;

function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function writeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: the choice applies to this page view only */
  }
}

/**
 * Affiliate click measurement. The listener NEVER prevents or rewrites navigation: the native
 * new-tab anchor proceeds untouched. It records clicks only, not purchases or attribution.
 *
 *  - First-party beacon to /api/track-click: anonymous (placement + destination key), no cookies.
 *  - GA4 "affiliate_click", Google Ads click conversion, Meta custom event: loaded only when the
 *    matching ID is configured AND the visitor has accepted the consent banner.
 */
export default function Analytics() {
  const [consent, setConsent] = useState(null); // 'granted' | 'denied' | null
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target instanceof Element ? event.target.closest('a[data-affiliate="true"]') : null;
      if (!target) return;
      const placement = target.getAttribute('data-placement') || 'unknown';
      const destinationKey = target.getAttribute('data-dest-key') || 'unknown';

      try {
        const body = JSON.stringify({ placement, destinationKey });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(TRACK_URL, new Blob([body], { type: 'application/json' }));
        } else {
          fetch(TRACK_URL, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
        }
      } catch {
        /* measurement must never affect navigation */
      }

      if (readConsent() !== 'granted') return;
      try {
        if (ANALYTICS.ga4Id && typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_click', {
            placement,
            destination_key: destinationKey,
            transport_type: 'beacon',
          });
        }
        if (ANALYTICS.adsId && ANALYTICS.adsLabel && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', { send_to: `${ANALYTICS.adsId}/${ANALYTICS.adsLabel}` });
        }
        if (ANALYTICS.metaPixelId && typeof window.fbq === 'function') {
          window.fbq('trackCustom', 'AffiliateClick', { placement, destination_key: destinationKey });
        }
      } catch {
        /* ignore third-party errors */
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const choose = (value) => {
    writeConsent(value);
    setConsent(value);
  };

  const gtagId = ANALYTICS.ga4Id || ANALYTICS.adsId;

  return (
    <>
      {consent === 'granted' && gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${
              ANALYTICS.ga4Id ? `gtag('config','${ANALYTICS.ga4Id}');` : ''
            }${ANALYTICS.adsId ? `gtag('config','${ANALYTICS.adsId}');` : ''}`}
          </Script>
        </>
      )}
      {consent === 'granted' && ANALYTICS.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ANALYTICS.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {ready && THIRD_PARTY_CONFIGURED && consent === null && (
        <div
          role="dialog"
          aria-label="Analytics consent"
          className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-xl rounded-xl border border-slate-600 bg-slate-900 p-4 shadow-xl md:bottom-4"
        >
          <p className="text-sm text-slate-200">
            We use analytics and advertising measurement cookies to understand which links are useful. They load only if you accept.
          </p>
          <div className="mt-3 flex gap-3">
            <button type="button" className="btn-primary" onClick={() => choose('granted')}>
              Accept
            </button>
            <button type="button" className="btn-secondary" onClick={() => choose('denied')}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
