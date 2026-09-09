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
   * Title treatment.
   *
   * "display" (default) — Prata at h2. The house voice, for the sections that
   *   make a claim.
   * "compact" — Satoshi, bold, one size down at h3. For the functional
   *   sections (the form, the FAQ, compliance), where the heading is a
   *   signpost rather than a statement. It changes face because Prata ships a
   *   single weight and a bold Prata would be a synthetic fake.
   */
  emphasis?: "display" | "compact";
  className?: string;
};

/**
 * Eyebrow + display H2 + optional description, in the house style.
 *
 * The title carries `.type-title` (Prata) and the description `.type-lede`
 * (Satoshi). Setting both here rather than per section is what keeps the two
 * faces consistent across all eleven sections, and re-pointable from one file.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  emphasis = "display",
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
          emphasis === "compact" ? "type-title-compact text-h3" : "type-title text-h2",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("type-lede mt-5", tone === "dark" ? "text-ivory/70" : "text-graphite")}>
          {description}
        </p>
      )}
    </div>
  );
}
