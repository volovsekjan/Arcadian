import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the leading Arcadian mark (the "[A] LABEL" pattern). */
  withMark?: boolean;
  /**
   * "light" (default) = on white surfaces; "dark" = on the midnight and black
   * bands. The mark inverts with it, see below.
   */
  tone?: "light" | "dark";
};

/**
 * Small-caps gold section label, led by the Arcadian monogram.
 *
 * The mark is the browser-tab icon: a rounded square, a serif "A", and the
 * gold dot. It is drawn inline rather than loaded from a file for three
 * reasons: it stays crisp at 20px where a raster of a rounded square shows its
 * edges, it costs no request, and the dot can take `fill-gold` — so unlike the
 * PNG it replaced, the mark now follows the accent picker instead of holding a
 * baked-in gold.
 *
 * It INVERTS on dark sections. The tab icon is a dark square, which would be
 * all but invisible on the midnight and black bands, so there the square takes
 * the light ink and the letter takes the dark. The gold dot is constant.
 *
 * KEEP IN SYNC with app/icon.svg, which is the same artwork at 64px and is
 * what Next serves as the favicon.
 */
function ArcadianMark({ tone }: { tone: "light" | "dark" }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5 shrink-0" role="presentation">
      <rect
        width="64"
        height="64"
        rx="14"
        className={tone === "dark" ? "fill-ivory" : "fill-espresso"}
      />
      <text
        x="31"
        y="44"
        textAnchor="middle"
        fontSize="36"
        fontFamily="Georgia, 'Times New Roman', serif"
        className={tone === "dark" ? "fill-espresso" : "fill-ivory"}
      >
        A
      </text>
      <circle cx="46" cy="21" r="3.5" className="fill-gold" />
    </svg>
  );
}

export function Eyebrow({ children, className, withMark = true, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-eyebrow font-semibold uppercase",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        className,
      )}
    >
      {withMark && <ArcadianMark tone={tone} />}
      {children}
    </span>
  );
}
