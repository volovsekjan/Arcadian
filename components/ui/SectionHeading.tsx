import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** "dark" for sections on espresso backgrounds. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Eyebrow + display H2 + optional description, in the house style.
 *
 * The description is the site's one recurring editorial voice, so it carries
 * `.type-lede` (Instrument Serif) while the heading stays Satoshi. Setting it
 * here rather than per section is what keeps the serif consistent across all
 * eleven sections — and easy to withdraw from all of them at once.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
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
          "font-display text-h2 font-medium",
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
