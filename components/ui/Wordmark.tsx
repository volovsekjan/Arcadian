import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Preload the logo (use for the above-the-fold navbar, not the footer). */
  priority?: boolean;
};

/**
 * The Arcadian brand mark — the official logo (public/logos/arcadian_logo.svg).
 * It is a gold two-tone wordmark that reads on both ivory and espresso surfaces,
 * so it needs no per-background tinting. Single source of truth for the brand
 * mark across the navbar and footer.
 *
 * Sized by height (`h-*`) with `w-auto`, so the aspect ratio is always
 * preserved; the intrinsic width/height below reserve the box and prevent any
 * layout shift. The SVG's viewBox was cropped to the artwork (art untouched),
 * giving a ~5:1 ratio so the mark fills its box instead of floating in padding.
 */
export function Wordmark({ className, priority = false }: WordmarkProps) {
  return (
    <Image
      src="/logos/arcadian_logo.svg"
      alt="Arcadian"
      width={887}
      height={176}
      priority={priority}
      // SVGs gain nothing from the raster optimizer; serving the file directly
      // avoids Next's SVG content-type handling and keeps rendering deterministic.
      unoptimized
      className={cn("h-6 w-auto sm:h-7", className)}
    />
  );
}
