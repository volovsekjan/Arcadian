/**
 * Cookie-consent state, shared by the CookieConsent banner, the control on the
 * Cookie Policy page, and the Analytics loader. Client-side only.
 *
 * Three states, and the distinction matters:
 *   null       no choice made yet, so the banner shows and nothing optional loads
 *   "denied"   choice made, banner stays away, nothing optional loads
 *   "granted"  choice made, optional analytics may load
 *
 * Every change fires CONSENT_EVENT, so a withdrawal unmounts the analytics
 * script immediately rather than waiting for a reload. That is what makes
 * withdrawing consent as easy as giving it.
 */
export type ConsentValue = "granted" | "denied";

const STORAGE_KEY = "arcadian-cookie-consent";

/** Fired whenever the choice changes. `detail` is null once it is reset. */
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
  window.dispatchEvent(new CustomEvent<ConsentValue | null>(CONSENT_EVENT, { detail: value }));
}

/**
 * Forget the choice entirely, returning the visitor to the pre-consent state:
 * optional scripts stop, and the banner will ask again.
 */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing stored to remove.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue | null>(CONSENT_EVENT, { detail: null }));
}
