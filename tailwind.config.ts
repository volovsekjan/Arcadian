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
        gold: {
          DEFAULT: "#D8A25C", // primary accent (brand gold)
          soft: "#E5BE8B", // accent hover / highlights (lighter tint of the brand gold)
          deep: "#896029", // darker shade of the brand gold for SMALL text on light surfaces (AA ≥4.5:1)
        },
        espresso: "#201D16", // dark surfaces: video cards, lightbox, cookie banner, mobile nav
        // The single dark block that closes the page — contact and footer share
        // it so the two read as one continuous surface, with no seam between.
        midnight: "#0F0F0E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // Fluid editorial type scale
        display: ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-sm": [
          "clamp(2.25rem, 4.5vw, 4rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
        h2: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.375rem, 2.2vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
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
