/**
 * Brand accent, as literal hex.
 *
 * The accent lives in CSS, as `--accent-rgb` in app/globals.css — that is what
 * the whole page reads. This module exists for the places CSS cannot reach:
 * the generated OG image and the Apple touch icon, both rendered on the
 * server at build time.
 *
 * KEEP IN SYNC with the `:root` block in app/globals.css. Two declarations is
 * the floor here — a static image is rendered on the server at build time and
 * has no access to a browser custom property, so the value has to exist as a
 * literal somewhere. Everything else derives from one of these two.
 */

/** #D1A971 — the accent. Same gold as the logo and arch mark artwork. */
export const ACCENT = "#D1A971";

/** #E0C59E — the hover tint. The picker derives this from ACCENT at runtime. */
export const ACCENT_SOFT = "#E0C59E";
