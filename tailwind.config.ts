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
        h3: [
          "clamp(1.125rem, 1.5vw, 1.375rem)",
          { lineHeight: "1.35", letterSpacing: "-0.01em" },
        ],
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
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
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
