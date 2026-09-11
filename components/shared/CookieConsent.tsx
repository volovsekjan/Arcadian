"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent, setConsent, type ConsentValue } from "@/lib/consent";

/**
 * Consent banner for the one optional thing this site loads.
 *
 * Behaviour, against the requirements it has to meet:
 *   - Shows only while no choice has been recorded, so it never reappears
 *     after Accept or Reject.
 *   - Accept and Reject are the same size, the same shape and the same type,
 *     side by side. Neither is styled to be the easier answer.
 *   - No pre-ticked boxes and no implied consent: the analytics script is not
 *     loaded until Accept is pressed, and closing or ignoring the banner
 *     leaves it unloaded. There is deliberately no dismiss-without-choosing
 *     control, because dismissing is not an answer.
 *   - Blocks nothing. The country cookie and the region preferences are
 *     strictly necessary and are unaffected by the choice made here.
 *   - Listens on CONSENT_EVENT, so resetting the choice from the Cookie Policy
 *     page brings the banner back without a reload.
 *
 * The copy says "analytics" rather than "analytics cookie" because that is
 * accurate: Plausible stores nothing on the device. The old wording described
 * a cookie that does not exist.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);

    const onChange = (event: Event) => {
      const next = (event as CustomEvent<ConsentValue | null>).detail ?? null;
      setVisible(next === null);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!visible) return null;

  const choose = (value: ConsentValue) => setConsent(value);

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-ivory/15 bg-espresso p-5 shadow-lift sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-body-sm leading-relaxed text-ivory/85">
        We would like to load privacy-friendly analytics to see which pages are useful. It sets no
        cookies and does not track you across sites. Nothing optional loads unless you accept.{" "}
        <Link
          href="/cookies"
          className="text-gold-soft underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ivory"
        >
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/*
          Matched pairs: same height, padding, radius, weight and border. The
          fills differ only so the two read as distinct buttons, not so one
          looks like the recommended answer.
        */}
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-10 rounded-full border border-gold bg-gold px-5 text-cta-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft focus-visible:ring-offset-espresso"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-10 rounded-full border border-ivory bg-transparent px-5 text-cta-sm font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink focus-visible:ring-offset-espresso"
        >
          Reject
        </button>
      </div>
    </section>
  );
}
