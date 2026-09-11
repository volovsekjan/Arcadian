"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { CONSENT_EVENT, getConsent, type ConsentValue } from "@/lib/consent";

/**
 * Privacy-friendly analytics, loaded ONLY after cookie consent is granted.
 *
 * TODO: set a real production domain in content/site.ts. `data-domain` is
 * derived from it, so while site.url is the .invalid placeholder this reports
 * to a Plausible site that does not exist.
 * (it is derived from site.url in content/site.ts). To use Vercel Analytics
 * instead: `npm i @vercel/analytics` and render <VercelAnalytics /> here under
 * the same consent gate.
 */
export function Analytics() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (event: Event) => {
      // `detail` is null when the choice is reset from the Cookie Policy page.
      // Anything other than "granted" unmounts the script below.
      setConsentState((event as CustomEvent<ConsentValue | null>).detail ?? null);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "granted") return null;

  return (
    <Script
      defer
      strategy="afterInteractive"
      data-domain={new URL(site.url).hostname}
      src="https://plausible.io/js/script.js"
    />
  );
}
