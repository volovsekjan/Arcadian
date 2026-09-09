import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Preload the logo (use for the above-the-fold navbar, not the footer). */
  priority?: boolean;
  /**
   * Which cut of the wordmark to use. The two files are the same artwork in
   * two ink colours, so pick by the surface behind it:
   *   "ink"   black wordmark, for white surfaces (the navbar)
   *   "ivory" white wordmark, for the midnight and espresso surfaces
   *           (the footer, and the navbar while the mobile overlay is open)
   * The arch glyph is gold in both, so only the word changes colour.
   */
  tone?: "ink" | "ivory";
};

/**
 * The Arcadian brand mark.
 *
 * Both files are trimmed from the supplied logo_webpage.png / logo_footer.png.
 * Those are 8334x2503 canvases in which the artwork occupies 83% of the width
 * and only 45% of the height, so used untrimmed the logo either rendered small
 * inside a tall transparent box or forced the navbar taller to compensate.
 * Trimming to the artwork lets `h-*` mean what it says. The originals are kept
 * in public/logos as the source files.
 *
 * Both trimmed files share one bounding box, so the mark sits identically in
 * the navbar and the footer.
 *
 * Sized by height with `w-auto`, so the ratio is always preserved; the
 * intrinsic width/height below reserve the box and prevent layout shift.
 */
export function Wordmark({ className, priority = false, tone = "ink" }: WordmarkProps) {
  return (
    <Image
      src={tone === "ivory" ? "/logos/logo_footer_mark.png" : "/logos/logo_webpage_mark.png"}
      alt="Arcadian"
      width={1726}
      height={284}
      priority={priority}
      className={cn("h-6 w-auto sm:h-7", className)}
    />
  );
}
