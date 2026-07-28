import type { ServiceLevel } from "./types";

/**
 * The three ways to work with Arcadian, in one line each. This wording is the
 * canonical version — pricing and FAQ copy should stay consistent with it.
 */
export const serviceLevels: ServiceLevel[] = [
  {
    name: "Content",
    summary: "We make the content. Your team posts it.",
  },
  {
    name: "Managed Content",
    summary: "We make it, schedule it and post it.",
  },
  {
    name: "Funnel Takeover",
    summary:
      "We manage the content and handle the first response to comments and DMs before passing serious enquiries to your agents.",
  },
];
