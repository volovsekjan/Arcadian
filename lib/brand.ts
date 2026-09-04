/**
 * Brand accent, as literal hex.
 *
 * The runtime accent lives in CSS, as `--accent-rgb` in app/globals.css — that
 * is what the whole page reads and what the AccentPicker rewrites. This module
 * exists for the places CSS cannot reach: the generated OG image, the Apple
 * touch icon, and the picker's own default and reset value.
 *
 * KEEP IN SYNC with the `:root` block in app/globals.css. Two declarations is
 * the floor here — a static image is rendered on the server at build time and
 * has no access to a browser custom property, so the value has to exist as a
 * literal somewhere. Everything else derives from one of these two.
 */

/** #D8A25C — the accent. */
export const ACCENT = "#D8A25C";

/** #E5BE8B — the hover tint. The picker derives this from ACCENT at runtime. */
export const ACCENT_SOFT = "#E5BE8B";
