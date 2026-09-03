/**
 * The comparison table in #compare.
 *
 * The last row is a loss for Arcadian and stays in, rendered exactly like
 * every other row. A table where one column wins seven out of seven reads as
 * an advert, and a buyer who has seen a few of those discounts the other six
 * rows along with it.
 */

/** `yes` renders a gold tick, `no` a muted cross, a string renders as plain text. */
export type ComparisonValue = "yes" | "no" | string;

export type ComparisonRow = {
  criterion: string;
  /** One value per column, in the order of `comparisonColumns`. */
  values: [ComparisonValue, ComparisonValue, ComparisonValue];
};

export const comparisonColumns = [
  "Arcadian",
  "Freelance editor",
  "In-house marketer or the agent",
] as const;

/** Index of the emphasised column. */
export const OURS = 0;

export const comparisonRows: ComparisonRow[] = [
  {
    criterion: "Works from photos you already have",
    values: ["yes", "usually wants a shoot", "has to film it"],
  },
  {
    criterion: "Cost",
    values: [
      "from AED 3,500/month, fixed",
      "per project, varies",
      "salary and software, or selling time",
    ],
  },
  {
    criterion: "Output per listing",
    values: ["Reel, cuts, carousel, Story set", "usually one edit", "whatever there is time for"],
  },
  {
    criterion: "Same look across every agent",
    values: ["yes", "no", "no"],
  },
  {
    criterion: "Turnaround agreed in writing",
    values: ["yes", "no", "no"],
  },
  {
    criterion: "Still delivering in your busiest month",
    values: ["yes", "no", "no"],
  },
  {
    criterion: "On-site filming and drone",
    values: ["no", "yes", "yes"],
  },
];

export const comparisonFootnote =
  "If you already have an in-house marketer, we usually work alongside them rather than replacing them.";
