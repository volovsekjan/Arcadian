import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about this project's custom font sizes.
 *
 * The scale in tailwind.config.ts uses names rather than numbers — `text-h2`,
 * `text-eyebrow`, `text-body`, `text-display`. Out of the box, tailwind-merge
 * only recognises the stock size names (xs, sm, base, lg, 2xl …), so it
 * classified all of ours as *colour* utilities. Merging then treated
 * `text-h2` and `text-ink` as the same group and kept only the last one:
 *
 *   twMerge("font-display text-h2 font-medium", "text-ink")
 *     -> "font-display font-medium text-ink"     // the size silently vanished
 *
 * Every component that paired a named size with a conditional colour through
 * `cn()` lost the size: section headings fell back to body size, and eyebrow
 * labels with them. Declaring the scale below puts them in the `font-size`
 * group, where they belong, and both survive the merge.
 *
 * Keep this list in step with `theme.extend.fontSize` in tailwind.config.ts.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "display-sm", "h2", "h3", "body", "eyebrow"] }],
    },
  },
});

/** Merge Tailwind class names with sensible conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
