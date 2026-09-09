import Image from "next/image";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the leading arch mark (the "◠◠◠ LABEL" pattern). */
  withMark?: boolean;
  /**
   * "light" (default) = on white surfaces; "dark" = on the midnight and black
   * bands. Only the label colour changes — the mark is gold in both.
   */
  tone?: "light" | "dark";
};

/**
 * Small-caps gold section label, led by the Arcadian arch mark.
 *
 * The mark replaced a 1px gold rule. It is `icon_gold_mark.png`, trimmed from
 * the supplied `icon_gold.png` — the original is a 4500x4500 square in which
 * the arches occupy only the middle 54% by 29%, so rendering it untrimmed put
 * a tiny mark inside a box seven times its height and pushed every section
 * heading down the page.
 *
 * Sized 30x16px. The arches read as a small emblem before the 13px label
 * rather than a hairline flourish — they are the only mark the section labels
 * share, so they carry the section-heading rhythm on their own now that the
 * band separators are gone.
 *
 * The mark is a raster with #D1A971 baked in, which is the same gold as the
 * accent default and the logo artwork — so it matches out of the box. It does
 * not follow `--accent-rgb` though, so picking a different accent leaves these
 * marks and the logo behind. Recolouring them needs an SVG of the mark.
 */
export function Eyebrow({ children, className, withMark = true, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-eyebrow font-semibold uppercase",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      {withMark && (
        <Image
          src="/logos/icon_gold_mark.png"
          alt=""
          width={1216}
          height={656}
          aria-hidden="true"
          className="h-4 w-auto shrink-0"
        />
      )}
      {children}
    </span>
  );
}
