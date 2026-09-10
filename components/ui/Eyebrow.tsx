import Image from "next/image";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the leading gold arch mark. */
  withMark?: boolean;
  /**
   * "light" (default) = on white surfaces; "dark" = on the midnight and black
   * bands. Only the label colour changes; the mark is gold on both.
   */
  tone?: "light" | "dark";
};

/**
 * Small-caps gold section label, led by the arch mark.
 *
 * ONE component, so the mark is identical across every section that uses a
 * SectionHeading: What we do, The problem we remove, Services, The
 * alternatives, How it works, and the five others. Setting it here is what
 * keeps it consistent rather than five sections each doing their own thing.
 *
 * `icon_gold_mark.png` is trimmed from the supplied `icon_gold.png`, whose
 * arches occupy only the middle 54% by 29% of a 4500px square. Rendered
 * untrimmed it put a tiny mark inside a box seven times its height and pushed
 * every heading down the page.
 *
 * Sized 30x16px, which matches the cap height of the 13px label beside it.
 *
 * Trade-off worth knowing: this is a raster with #D1A971 baked in. It matches
 * the accent default, but unlike an inline SVG it does not read
 * `--accent-rgb`, so changing the accent in the picker leaves these marks and
 * the logo on the old gold.
 */
export function Eyebrow({ children, className, withMark = true, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        // `leading-none` is the alignment fix, not `items-center` — that was
        // already here. The token's 1.2 line height reserves descender space
        // that uppercase text never uses, so centring the 16px mark against
        // that taller box left it sitting low against the letters. Collapsing
        // the box to the glyph height puts the mark's centre on the cap band.
        // Safe at 1.0 here because the label is uppercase and has no
        // descenders to clip.
        "inline-flex items-center gap-2.5 font-sans text-eyebrow font-bold uppercase leading-none",
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
      {/*
        Optical correction, on top of the geometric centring above.
        The mark is bottom-heavy: its legs are solid vertical strokes while the
        arch tops are thin curves, so its visual mass sits below its geometric
        centre. Centred by the box, the label therefore reads high against it.
        This drops the label onto the mark's optical centre.

        `translate-y` rather than a margin so the nudge stays purely visual:
        a margin on a flex item would change the item's box, and with
        `items-center` that shifts the centring it is trying to correct.
        In `em` so it tracks the label size if the token changes.
      */}
      <span className="translate-y-[0.1em]">{children}</span>
    </span>
  );
}
