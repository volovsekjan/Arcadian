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
        ivory: "#F3F3F4", // primary background (cool off-white)
        bone: "#FFF7F5", // sand — light warm sections & cards on earth
        paper: "#FFFFFF", // white surfaces (forms, chips)
        ink: "#161616", // primary text (coal)
        graphite: "#4B4B50", // secondary text
        mist: "#8B8B91", // muted text / captions
        line: "#E3E3E6", // borders / hairlines
        gold: {
          // Token name kept for low-churn migration — the value is now the
          // brand maroon used for CTAs, icons, and the navbar.
          DEFAULT: "#590800",
          soft: "#E7B3A6", // light warm tint for accents/errors on dark surfaces
          deep: "#590800", // small accent text on light surfaces (AA ≥4.5:1)
        },
        espresso: "#161616", // coal — dark sections (footer, problem, final CTA)
        earth: "#722613", // pricing band & cards on sand
      },
      fontFamily: {
        display: ["var(--font-prata)", "Georgia", "serif"],
        sans: ["var(--font-satoshi)", ...defaultTheme.fontFamily.sans],
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
