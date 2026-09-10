import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** "dark" for sections on espresso backgrounds. */
  tone?: "light" | "dark";
  /**
   * Title voice.
   *
   * "heading" (default) — Satoshi semibold at `text-h2`. Every section
   *   heading on the site, because a heading is informational.
   * "slogan" — Prata at the same size, for a line meant to be felt rather
   *   than read. Opt in per section; nothing uses it by default.
   */
  emphasis?: "heading" | "slogan";
  className?: string;
};

/**
 * Eyebrow + display H2 + optional description, in the house style.
 *
 * The title is `text-h2` in Satoshi semibold and the description `text-body`
 * in Satoshi. Setting both here rather than per section is what keeps the
 * scale consistent across all eleven sections, and re-pointable from one file.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  emphasis = "heading",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "text-h2",
          emphasis === "slogan" ? "type-slogan" : "font-sans font-semibold",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-body", tone === "dark" ? "text-ivory/70" : "text-graphite")}>
          {description}
        </p>
      )}
    </div>
  );
}
