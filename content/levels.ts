import type { ServiceLevel } from "./types";

/**
 * The three things we can take off an agency's plate.
 *
 * These are SERVICE AREAS, not packages. They deliberately carry no price, no
 * deliverable counts and no plan names: what a given agency actually takes is
 * scoped in conversation. Wording stays conditional ("we can", "where agreed")
 * so nothing here reads as a fixed tier.
 */
export const serviceLevels: ServiceLevel[] = [
  {
    name: "Content Production",
    summary:
      "Property Reels, short-form edits, Story assets, carousels and feed content created from the listing photos you already have.",
  },
  {
    name: "Publishing Support",
    summary:
      "We can prepare content for your team to publish, or help organise and schedule the agreed content around your workflow.",
  },
  {
    name: "Enquiry Support",
    summary:
      "Where agreed, we can help manage the first response to social enquiries before qualified conversations are handed back to your team.",
  },
];
