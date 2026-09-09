import { NextResponse, type NextRequest } from "next/server";
import { COUNTRY_COOKIE } from "@/lib/regions";

/**
 * Writes the visitor's country into a cookie the client can read.
 *
 * The pages are statically generated, so they cannot read request headers
 * themselves. This is the one place the country is available, and a cookie is
 * how it reaches the RegionProvider without making every page dynamic.
 *
 * The value is a two-letter country code and nothing else: no IP, no
 * identifier, nothing that distinguishes one visitor in a country from
 * another. It is a functional cookie, not an analytics one, which is why it
 * sits outside the consent gate — but it IS a cookie, so it is listed in
 * app/cookies/page.tsx.
 *
 * `request.geo` is populated by Vercel; the two header reads cover Cloudflare
 * and a direct Vercel proxy. On any other host none of the three exist, no
 * cookie is written, and the client falls back to its time zone.
 */
export const config = {
  // Pages only. Assets and API routes get no cookie, so nothing that should be
  // cached hard picks up a Set-Cookie header it does not need.
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};

const COUNTRY_PATTERN = /^[A-Za-z]{2}$/;

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const country =
    request.geo?.country ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    "";

  if (COUNTRY_PATTERN.test(country)) {
    response.cookies.set(COUNTRY_COOKIE, country.toUpperCase(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      // Read by client JS on purpose — it is not a secret and not a session.
      httpOnly: false,
    });
  }

  return response;
}
