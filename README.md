# Arcadian — Marketing Landing Page

Premium single-page marketing site for **Arcadian**, a real-estate video production studio
that turns property photos into cinematic, social-first videos.

Built with **Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS + Framer Motion**,
ready to deploy to Vercel.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                 | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Development server                                |
| `npm run build`        | Production build (type-checks + lints)           |
| `npm run start`        | Serve the production build                        |
| `npm run lint`         | ESLint (next/core-web-vitals)                     |
| `npm run format`       | Prettier (with Tailwind class sorting)            |
| `npm run placeholders` | Regenerate the SVG placeholder assets in /public |

Deploy: push to a Git repo and import into [Vercel](https://vercel.com) — zero config needed.

---

## Where to edit things (all copy lives in `/content`)

| What                          | File                                                    |
| ----------------------------- | ------------------------------------------------------- |
| Domain, email, socials, nav   | [content/site.ts](content/site.ts)                      |
| Portfolio projects & videos   | [content/projects.ts](content/projects.ts)              |
| Services                      | [content/services.ts](content/services.ts)              |
| Process steps                 | [content/steps.ts](content/steps.ts)                    |
| **Prices & plan features**    | [content/pricing.ts](content/pricing.ts)                |
| **Testimonials**              | [content/testimonials.ts](content/testimonials.ts)      |
| FAQ (also feeds JSON-LD)      | [content/faq.ts](content/faq.ts)                        |
| Stats & client logos          | [content/stats.ts](content/stats.ts)                    |
| SEO defaults                  | [lib/metadata.ts](lib/metadata.ts)                      |
| Design tokens (colors, type)  | [tailwind.config.ts](tailwind.config.ts)                |

Search the repo for **`[PLACEHOLDER]`** and **`TODO`** — every item that must be replaced
before launch is marked with one of the two (most carry both).

### Pre-launch checklist

1. `content/site.ts` — set the real **domain** (`url`) and **contact email**. The domain
   drives canonical URLs, sitemap, robots, JSON-LD, and the OG image.
2. `content/pricing.ts` — set real **prices**, delivery times, and monthly volumes.
3. `content/testimonials.ts` — replace the template quotes with **real, permissioned**
   client quotes. Do not launch with the placeholders.
4. `content/projects.ts` — real project titles/locations, real poster frames
   (JPG/WebP, ~720×1280) in `/public/posters`, and hosted video URLs (see below).
5. `content/stats.ts` — real stats and real client logos in `/public/logos`.
6. `/public/images` — replace the two placeholder artworks with real photography.
7. Legal pages (`app/privacy-policy`, `app/terms`, `app/cookies`) — insert final legal
   text reviewed by counsel.
8. Once all SVG placeholders are replaced with real raster images, remove
   `dangerouslyAllowSVG` from [next.config.mjs](next.config.mjs).

---

## Plugging in the email provider

The contact form posts JSON to [app/api/contact/route.ts](app/api/contact/route.ts), which
validates with the shared Zod schema ([lib/validation.ts](lib/validation.ts)) and currently
just returns success. The route contains a ready-to-uncomment **Resend** example — install
`resend`, set `RESEND_API_KEY`, and send the email where the `TODO` marks the spot. Add rate
limiting (e.g. Upstash Ratelimit) before launch.

## Plugging in the video host

Portfolio entries in [content/projects.ts](content/projects.ts) have `video: null`, which
shows a "final video coming soon" state in the lightbox. For production:

1. Upload finals to **Mux** or **Cloudflare Stream** (do **not** put multi-MB mp4s in `/public`).
2. Set each project's `video` to the hosted MP4/HLS URL and `poster` to a real frame.

## Analytics & cookie consent (GDPR)

Analytics are **off by default**. The consent banner
([components/shared/CookieConsent.tsx](components/shared/CookieConsent.tsx)) stores the
choice in `localStorage`; only after "Accept" does
[components/shared/Analytics.tsx](components/shared/Analytics.tsx) inject the **Plausible**
script (set your real `data-domain` via `content/site.ts`, or swap in Vercel Analytics —
instructions are in the file).

## Switching the site language

All copy is data in `/content` plus a handful of UI strings inside components:

1. Translate the `/content` files (services, steps, FAQ, pricing features, site tagline…).
2. Search `components/` and `app/` for user-facing strings (form labels, buttons,
   cookie banner, 404, legal pages) and translate in place.
3. Set `lang="sl"` on `<html>` in [app/layout.tsx](app/layout.tsx) and update
   `locale`/`openGraph.locale` in `content/site.ts` + `lib/metadata.ts`.

## Architecture notes

- **Sections** compose in [app/page.tsx](app/page.tsx); each lives in
  `components/sections/` and imports its own content — no prop drilling.
- **UI primitives** (`components/ui/`): Container, Eyebrow, SectionHeading, Button, Card.
- **Shared interactive** (`components/shared/`): Reveal (scroll animation), Marquee,
  VideoCard + Lightbox, Accordion, forms, cookie consent — the only `"use client"` islands;
  everything else is server-rendered.
- **SEO**: Metadata API defaults in `lib/metadata.ts`; JSON-LD (Organization, Service,
  FAQPage) in `lib/schema.ts`; `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`;
  branded OG image generated by `app/opengraph-image.tsx`.
- **Accessibility**: WCAG 2.1 AA targets — keyboard navigable, visible focus rings, one
  `<h1>`, labelled forms/accordion/lightbox, `prefers-reduced-motion` respected everywhere
  (marquee becomes a swipeable row, reveals/animations disable).
