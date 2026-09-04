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
        // Satoshi is the dominant typeface. Both tokens resolve to it, so
        // `font-display` and `font-sans` differ by weight and size, not family.
        display: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
        // Accent only — reach for it through .type-lede / .type-note, not directly.
        serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        /*
         * Fluid editorial type scale. Sizes and line heights are unchanged;
         * the tracking is tightened a step at every heading level because this
         * scale was drawn for a serif display face, and Satoshi's wider,
         * rounder counters open up noticeably at 44px and above. Negative
         * tracking is what stops a large geometric sans reading as loose.
         */
        display: ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.04", letterSpacing: "-0.032em" }],
        "display-sm": [
          "clamp(2.25rem, 4.5vw, 4rem)",
          { lineHeight: "1.08", letterSpacing: "-0.026em" },
        ],
        h2: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.12", letterSpacing: "-0.022em" }],
        h3: ["clamp(1.375rem, 2.2vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.012em" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
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
