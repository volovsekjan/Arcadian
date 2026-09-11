"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  clearConsent,
  getConsent,
  setConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * The control on the Cookie Policy page for changing an existing choice.
 *
 * The GDPR requires withdrawing consent to be as easy as giving it. The banner
 * only appears until a choice is made, so without this the only way back was
 * clearing browser data, which is not equivalent. Here the same two options
 * are always available, plus a reset that returns the visitor to the
 * pre-consent state so the banner asks again.
 *
 * Listens on CONSENT_EVENT as well as reading storage, so this stays in step
 * if the banner is answered while this page is open.
 */
export function CookieChoice() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsentState(getConsent());
    setReady(true);

    const onChange = (event: Event) => {
      setConsentState((event as CustomEvent<ConsentValue | null>).detail ?? null);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const choose = useCallback((value: ConsentValue) => setConsent(value), []);

  // Rendered only after mount, so the server and the client agree on markup
  // before storage has been read.
  const status = !ready
    ? "Checking your current choice."
    : consent === "granted"
      ? "You have accepted optional analytics."
      : consent === "denied"
        ? "You have declined optional analytics. Nothing optional is loaded."
        : "You have not made a choice yet, so nothing optional is loaded.";

  return (
    <div className="mt-6 rounded-2xl border border-line p-6">
      <p className="font-sans text-eyebrow font-bold uppercase text-gold-deep">Your choice</p>
      <p className="mt-3 leading-relaxed text-graphite">{status}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {/*
          Same height, same padding, same type, same border weight. Only the
          fill differs, and only to show which one is currently active, so
          neither option is nudged.
        */}
        <button
          type="button"
          onClick={() => choose("granted")}
          aria-pressed={consent === "granted"}
          className={
            consent === "granted"
              ? "h-10 rounded-full border border-gold bg-gold px-5 text-cta-sm font-medium text-ink transition-colors duration-300"
              : "h-10 rounded-full border border-line px-5 text-cta-sm font-medium text-ink transition-colors duration-300 hover:border-ink"
          }
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          aria-pressed={consent === "denied"}
          className={
            consent === "denied"
              ? "h-10 rounded-full border border-ink bg-ink px-5 text-cta-sm font-medium text-ivory transition-colors duration-300"
              : "h-10 rounded-full border border-line px-5 text-cta-sm font-medium text-ink transition-colors duration-300 hover:border-ink"
          }
        >
          Reject analytics
        </button>
        {ready && consent !== null && (
          <button
            type="button"
            onClick={clearConsent}
            className="text-cta-sm text-graphite underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:decoration-gold"
          >
            Reset and ask me again
          </button>
        )}
      </div>
    </div>
  );
}
