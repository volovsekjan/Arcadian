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
 *
 * PRESENTATION ONLY, below this line. None of the consent logic above changed
 * when the banner became a corner card.
 *
 * It used to be a full-width bar centred at the bottom of the viewport, which
 * read as a modal interrupting the page. It is now a compact notification
 * pinned to the bottom right on sm and up, and a near-full-width card at the
 * bottom on phones, where a 28rem card pinned to one corner would leave an odd
 * strip of page beside it.
 *
 * Surface is bg-black, the same as Spotlight and Who we are, rather than the
 * espresso it used before: the card sits over whichever section happens to be
 * on screen, and black separates from every one of them. Border, radius,
 * shadow, type scale and button shapes are all existing tokens.
 *
 * Hierarchy comes from weight and opacity within one typeface, not from a
 * second one: the ask in text-ivory, the qualifications in text-ivory/60, the
 * link in the site's underline style.
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
      // Mobile: inset on both sides, so it can never be wider than the
      // viewport. sm and up: left-auto releases the left edge, and w-full
      // capped by max-w-md resolves to 28rem (448px) against the viewport.
      className="fixed inset-x-4 bottom-4 z-[90] rounded-2xl border border-ivory/15 bg-black p-6 shadow-lift sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-md"
    >
      <p className="text-body-sm font-medium leading-relaxed text-ivory">
        We would like to load privacy-friendly analytics to see which pages are useful.
      </p>
      <p className="mt-2.5 text-body-sm leading-relaxed text-ivory/60">
        It sets no cookies and does not track you across sites. Nothing optional loads unless you
        accept.{" "}
        <Link
          href="/cookies"
          className="text-ivory/80 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ivory hover:decoration-gold focus-visible:ring-offset-black"
        >
          Cookie policy
        </Link>
      </p>

      {/*
        Matched pairs: same height, padding, radius, weight and border, taken
        from the md size and the primary/secondary shapes in ui/Button. The
        fills differ only so the two read as distinct buttons, not so one looks
        like the recommended answer. flex-1 keeps them exactly equal in width,
        and flex-wrap stacks them rather than letting either overflow on a very
        narrow screen.
      */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-11 flex-1 rounded-full border border-gold bg-gold px-6 text-cta-sm font-medium text-ink transition-all duration-300 ease-out-soft hover:border-gold-soft hover:bg-gold-soft focus-visible:ring-offset-black"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-11 flex-1 rounded-full border border-ivory bg-transparent px-6 text-cta-sm font-medium text-ivory transition-all duration-300 ease-out-soft hover:bg-ivory hover:text-ink focus-visible:ring-offset-black"
        >
          Reject
        </button>
      </div>
    </section>
  );
}
