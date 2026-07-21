"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

/**
 * GDPR cookie banner. Analytics stay OFF until the user explicitly accepts
 * (see components/shared/Analytics.tsx). Choice persists in localStorage.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  // Read storage only after mount to avoid a hydration mismatch.
  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-ivory/15 bg-espresso p-5 shadow-lift sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm leading-relaxed text-ivory/85">
        We use one privacy-friendly analytics cookie to understand how visitors use this site —
        nothing is set unless you accept.{" "}
        <Link
          href="/cookies"
          className="text-gold-soft underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ivory"
        >
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-10 rounded-full bg-gold px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-gold-soft focus-visible:ring-offset-espresso"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-10 rounded-full border border-ivory/25 px-5 text-sm font-medium text-ivory transition-colors duration-300 hover:border-ivory/60 focus-visible:ring-offset-espresso"
        >
          Decline
        </button>
      </div>
    </section>
  );
}
