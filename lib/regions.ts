/**
 * Region and currency catalogue.
 *
 * The site's home market is the UAE and its list prices are in AED — that is
 * the base, and every other region falls back to it until a real price list
 * exists for that currency (see content/pricing.ts). Change BASE_REGION to
 * move the base; nothing else needs editing.
 *
 * Detection is deliberately network-free. `middleware.ts` reads the country
 * from the platform's own edge headers when they exist, and the client falls
 * back to the browser's IANA time zone. No visitor IP is ever sent to a
 * third-party geo-IP service, which would be a new processor to disclose in
 * the privacy policy and a consent question of its own.
 */

export type CurrencyCode = "AED" | "EUR" | "GBP" | "USD";

export type RegionId = "ae" | "eu" | "uk" | "us" | "intl";

/**
 * A display price per currency, e.g. `{ AED: "AED 3,500", EUR: "€900" }`.
 *
 * AED is required and the others are optional on purpose: these are list
 * prices, not conversions. A EUR figure is a commercial decision about what
 * the studio charges a European agency, not AED divided by a rate that moves
 * daily — so a currency with no entry falls back to AED rather than showing
 * an invented number that would also go stale.
 */
export type PriceSet = { AED: string } & Partial<Record<Exclude<CurrencyCode, "AED">, string>>;

/** The price to show for a currency, falling back to the base list. */
export function priceIn(set: PriceSet, currency: CurrencyCode): string {
  return set[currency] ?? set.AED;
}

export type Region = {
  id: RegionId;
  /** Shown in the banner and the selector. */
  label: string;
  currency: CurrencyCode;
};

/** The site's home market. Its currency is the base every price is quoted in. */
export const BASE_REGION: RegionId = "ae";

export const regions: Region[] = [
  { id: "ae", label: "United Arab Emirates", currency: "AED" },
  { id: "eu", label: "Europe (euro area)", currency: "EUR" },
  { id: "uk", label: "United Kingdom", currency: "GBP" },
  { id: "us", label: "United States", currency: "USD" },
  { id: "intl", label: "Rest of the world", currency: "AED" },
];

export function regionById(id: RegionId): Region {
  return regions.find((region) => region.id === id) ?? regions[0];
}

export const baseRegion = regionById(BASE_REGION);

/** Euro-area members. Slovenia (SI) is here, so a Slovenian visitor gets EUR. */
const EURO_AREA = [
  "AT",
  "BE",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES",
];

/** ISO 3166-1 alpha-2 -> region. Anything unlisted is "intl". */
const COUNTRY_TO_REGION: Record<string, RegionId> = {
  AE: "ae",
  GB: "uk",
  US: "us",
  ...Object.fromEntries(EURO_AREA.map((code) => [code, "eu" as RegionId])),
};

export function regionForCountry(country: string | null | undefined): RegionId {
  if (!country) return BASE_REGION;
  return COUNTRY_TO_REGION[country.toUpperCase()] ?? "intl";
}

/* ------------------------------------------------------------------------- *
 * Storage
 * ------------------------------------------------------------------------- */

/** Set by middleware. Holds a two-letter country code and nothing else. */
export const COUNTRY_COOKIE = "arcadian-country";

/** A region the visitor picked by hand. Always beats detection. */
const REGION_KEY = "arcadian:region";

/** Set once the banner has been dismissed, so it does not come back. */
const BANNER_KEY = "arcadian:region-banner-dismissed";

const isRegionId = (value: string): value is RegionId =>
  regions.some((region) => region.id === value);

export function getStoredRegion(): RegionId | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(REGION_KEY);
    return value && isRegionId(value) ? value : null;
  } catch {
    return null;
  }
}

export function setStoredRegion(id: RegionId): void {
  try {
    window.localStorage.setItem(REGION_KEY, id);
  } catch {
    // Storage unavailable (private mode) — the choice lasts this page only.
  }
}

export function isBannerDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(BANNER_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissBanner(): void {
  try {
    window.localStorage.setItem(BANNER_KEY, "1");
  } catch {
    // As above — dismissal then lasts for this page only.
  }
}

/* ------------------------------------------------------------------------- *
 * Client-side detection
 * ------------------------------------------------------------------------- */

export function getCountryCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([A-Za-z]{2})(?:;|$)`));
  return match ? match[1].toUpperCase() : null;
}

/**
 * Time zone -> country, used only when the edge cookie is absent: local
 * development, and any host that does not add a geo header.
 *
 * Covers exactly the countries this site distinguishes. Everything else
 * resolves to "intl", which is the correct answer for it anyway.
 */
const TIME_ZONE_TO_COUNTRY: Record<string, string> = {
  "Asia/Dubai": "AE",
  "Europe/London": "GB",
  "Europe/Vienna": "AT",
  "Europe/Brussels": "BE",
  "Europe/Zagreb": "HR",
  "Asia/Nicosia": "CY",
  "Europe/Tallinn": "EE",
  "Europe/Helsinki": "FI",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Athens": "GR",
  "Europe/Dublin": "IE",
  "Europe/Rome": "IT",
  "Europe/Riga": "LV",
  "Europe/Vilnius": "LT",
  "Europe/Luxembourg": "LU",
  "Europe/Malta": "MT",
  "Europe/Amsterdam": "NL",
  "Europe/Lisbon": "PT",
  "Europe/Bratislava": "SK",
  "Europe/Ljubljana": "SI",
  "Europe/Madrid": "ES",
  "America/New_York": "US",
  "America/Detroit": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Phoenix": "US",
  "America/Los_Angeles": "US",
  "America/Anchorage": "US",
  "Pacific/Honolulu": "US",
};

export function countryFromTimeZone(): string | null {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return zone ? (TIME_ZONE_TO_COUNTRY[zone] ?? null) : null;
  } catch {
    return null;
  }
}

/** Best available guess, cookie first. */
export function detectRegion(): RegionId {
  const country = getCountryCookie() ?? countryFromTimeZone();
  return regionForCountry(country);
}
