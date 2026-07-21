/**
 * Cookie-consent state, shared by the CookieConsent banner and the
 * Analytics loader. Client-side only.
 */
export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "arcadian-cookie-consent";

/** Custom event fired whenever the user changes their consent choice. */
export const CONSENT_EVENT = "arcadian:consent-change";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable (private mode etc.) — treat as session-only consent.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
