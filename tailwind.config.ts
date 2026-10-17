import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Arcadian design tokens — warm, editorial luxury.
 * All colors MUST be referenced through these tokens; no inline hex in components.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFFF", // primary background (white)
        bone: "#FFFFFF", // alt sections — white; separated by hairline borders, not fill
        paper: "#FFFFFF", // cards
        ink: "#17150F", // primary text (warm near-black)
        graphite: "#4A463D", // secondary text
        mist: "#8C877A", // muted text / captions
        line: "#EAE6E0", // hairline borders — the only thing separating white bands now
        /*
         * THE ACCENT. Every gold on the site resolves through --accent-rgb,
         * set once in app/globals.css :root and re-writable at runtime by the
         * AccentPicker. Change it in one place and buttons, borders, icons,
         * rules, ticks, focus rings and tints all follow.
         *
         * Values are space-separated RGB channels, not hex, because the UI
         * leans on Tailwind's opacity modifiers (bg-gold/10, ring-gold/50,
         * border-gold/40, decoration-gold/50 ...) and only this form lets
         * `<alpha-value>` resolve.
         */
        gold: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          // Hover tint. Derived from the accent by the picker, so hovers move
          // with it instead of drifting back to the old brand gold.
          soft: "rgb(var(--accent-soft-rgb) / <alpha-value>)",
          // Was #896029, a darker shade held back for small text. Now an alias
          // of the accent itself, per the brand decision to run a single gold.
          deep: "rgb(var(--accent-rgb) / <alpha-value>)",
        },
        espresso: "#201D16", // dark surfaces: video cards, lightbox, cookie banner, mobile nav
        // The single dark block that closes the page — contact and footer share
        // it so the two read as one continuous surface, with no seam between.
        midnight: "#0F0F0E",
      },
      fontFamily: {
        // DUAL VOICE, and the only two families on the site.
        // sans  = Satoshi: every informational word. Body copy, section
        //         headings, subheadings, navigation, buttons, fine print.
        // serif = Prata: the lines meant to be felt. The hero quote, and any
        //         slogan explicitly opted in through `.type-slogan`.
        // There is deliberately no third token and no `display` alias: two
        // names for Satoshi is how a dual-voice system drifts.
        sans: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        /*
         * THE SCALE. Every font size on the site is one of these nine tokens;
         * there are no arbitrary `text-[...]` values and no uses of Tailwind's
         * default scale left. Each name states its role, so a stray size is
         * visible in review rather than only on the page.
         *
         * Fluid steps use clamp(min, vw, max): the min protects small screens,
         * the max stops headings running away on a desktop monitor.
         *
         * `fine` is the floor. Nothing meant to be read is set below 13px,
         * which is why there is no token under it to reach for.
         */
        // Hero H1. The only place this size appears.
        display: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        // Section H2. Distinctly a heading, never competing with the hero.
        h2: ["clamp(1.375rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        // Subheadings and card titles. One token, where there used to be 18px
        // and 20px sitting side by side.
        h3: ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        // Reading size. Section ledes, the hero subhead, long-form copy.
        body: ["1.0625rem", { lineHeight: "1.7" }],
        // Supporting copy: card and step descriptions, list items, table data.
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        // Primary call to action.
        cta: ["1rem", { lineHeight: "1.2" }],
        // Secondary and supporting calls to action.
        "cta-sm": ["0.875rem", { lineHeight: "1.2" }],
        // Fine print, badges, captions, footnotes. The accessibility floor.
        fine: ["0.8125rem", { lineHeight: "1.5" }],
        // Uppercase section label.
        // Uppercase section label. 15px so it carries next to the 16px arch
        // mark beside it; at 13px the mark read as the louder of the two.
        eyebrow: ["0.9375rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      spacing: {
        /*
         * Vertical breathing room on ONE side of a major section, so the gap
         * between any two adjacent sections is twice this.
         *
         * Single source of truth: every section uses `py-section
         * md:py-section-lg`, and the hero uses the `pb-` form because its top
         * is the navbar gap rather than a section gap and stays tighter.
         *
         * History: py-24 md:py-32 (96/128px a side) read as a void once the
         * band separators came out and every background went white; it came
         * down to 4/5rem, then back up a step to these values.
         */
        section: "4.5rem",
        "section-lg": "5.5rem",
        /*
         * Half the section step, for the seam between two sections that share
         * a background and so already read as one block. The full step exists
         * to separate visually distinct bands; across an invisible boundary it
         * only adds void.
         *
         * Used on the contact/footer seam, which is one continuous midnight
         * surface with no border between the two.
         */
        "section-seam": "2.25rem",
        "section-seam-lg": "2.75rem",
        /*
         * The hero opener, above the H1. Still larger than a section step,
         * because this is the first thing under a sticky navbar rather than a
         * gap between two bands and has no neighbour above to share the space
         * with. But it was 7rem / 9rem, which on top of the navbar's own 5rem
         * put the headline 224px down an empty white page and read as a gap
         * rather than as a pause.
         *
         * The desktop value is now the clear space a reader actually sees:
         * 6rem between the bottom of the navbar and the first line.
         *
         * IT ALSO SETS THE HERO VIDEO'S CEILING. The video is centred on this
         * block, so it grows upward as this shrinks. Cutting further means
         * re-checking the height cap in components/sections/Hero.tsx.
         *
         * The mobile value stays a step above `section` (4.5rem) rather than
         * landing on it. At 4.5rem the two compile to a single shared rule and
         * the hero opener stops being an exception at all, which is the drift
         * this token was named to prevent.
         *
         * Named rather than left as a raw pt-24, so it is visibly an
         * exception instead of drift.
         */
        "hero-top": "5rem",
        "hero-top-lg": "6rem",
      },
      maxWidth: {
        container: "85rem", // 1360px content column
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 64s) linear infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        // Soft, subtle elevation — never heavy
        card: "0 1px 2px rgb(23 21 15 / 0.04), 0 8px 24px -12px rgb(23 21 15 / 0.10)",
        lift: "0 2px 4px rgb(23 21 15 / 0.05), 0 16px 40px -16px rgb(23 21 15 / 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
