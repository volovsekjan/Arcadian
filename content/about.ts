import type { Capability } from "./types";

/**
 * The four capability blocks in #about, rendered 01 to 04 on the black band.
 *
 * Every line describes how we work rather than how well. There is no client
 * count, no years figure, no award, no "leading" and no "best": none of that
 * is evidenced anywhere on this site, and the rest of the page is careful not
 * to claim it. "Years of editing experience" is deliberately left unquantified
 * for the same reason.
 *
 * No em dashes in this file. The section's typography is deliberately plain,
 * and the dash was reading as decoration inside a short line.
 */
export const capabilities: Capability[] = [
  {
    title: "Video & Motion",
    description:
      "Years of editing experience shaped around short-form, social-first property content.",
  },
  {
    title: "Design",
    description: "Strong composition, visual hierarchy and brand consistency across every format.",
  },
  {
    title: "AI-Assisted Production",
    description:
      "Modern AI tools integrated where they improve production quality, efficiency and creative possibilities.",
  },
  {
    title: "Always Evolving",
    description:
      "We continuously test new tools, formats and workflows as content production keeps changing.",
  },
];
