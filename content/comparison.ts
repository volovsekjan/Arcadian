/**
 * The comparison table in #compare.
 *
 * Two rules this table is held to.
 *
 * First, no public price. The Cost row used to render the Content tier's
 * figure through a PriceSet; with public pricing withdrawn, a fixed monthly
 * number here would be the only price left on the homepage and would
 * contradict the Work With Us section. It is a qualitative row now, and the
 * table no longer imports content/pricing.ts at all.
 *
 * Second, nothing we cannot defend. The earlier version asserted what a
 * freelancer or an in-house marketer would do, in a table whose whole purpose
 * is to flatter us. Rows that turned on someone else's working habits now say
 * "depends on the editor" or "depends on the workflow", which is both honest
 * and harder to argue with. The last row is still a plain loss for us, and
 * still rendered exactly like every other row: a table that wins every line
 * reads as an advert and takes the credible rows down with it.
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
    values: ["yes", "Depends on the editor", "Depends on the workflow"],
  },
  {
    criterion: "Cost",
    values: [
      "Scoped around your workflow",
      "Usually priced per project",
      "Internal time, salary and software",
    ],
  },
  {
    criterion: "Consistent look across listings and agents",
    values: ["yes", "Varies by editor", "Varies with workload"],
  },
  {
    criterion: "Repeatable process rather than a one-off brief",
    values: ["yes", "Depends on the arrangement", "Depends on the workflow"],
  },
  {
    criterion: "Turnaround agreed in advance",
    values: ["yes", "Agreed per project", "Depends on capacity"],
  },
  {
    criterion: "Supports higher listing volume without renegotiating",
    values: ["yes", "Depends on their capacity", "Depends on team capacity"],
  },
  {
    criterion: "On-site filming and drone",
    values: ["no", "yes", "Sometimes"],
  },
];

export const comparisonFootnote =
  "Most agencies end up combining two of these. If you already have an in-house marketer, we usually work alongside them rather than replacing them.";
