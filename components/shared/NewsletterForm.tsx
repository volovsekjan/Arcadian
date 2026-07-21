"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Compact newsletter signup used in the footer's espresso column.
 *
 * // TODO: wire to an email marketing provider (e.g. Resend Audiences,
 * // Mailchimp); currently a stub that only shows a confirmation.
 */
export function NewsletterForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    if (input.value.trim() === "" || !input.checkValidity()) {
      input.reportValidity();
      return;
    }
    setSubscribed(true);
  }

  if (subscribed) {
    return (
      <p role="status" className="text-sm text-ivory/80">
        Thank you — you are on the list.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        ref={inputRef}
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@agency.com"
        className="h-11 w-full min-w-0 rounded-full border border-ivory/15 bg-ivory/5 px-5 text-sm text-ivory placeholder:text-ivory/60 focus-visible:ring-offset-espresso"
      />
      <button
        type="submit"
        aria-label="Subscribe to the newsletter"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-colors hover:bg-gold-soft focus-visible:ring-offset-espresso"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
}
