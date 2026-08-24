import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the short leading gold rule (the "— LABEL" pattern). */
  withRule?: boolean;
  /**
   * "light" (default) = on ivory/bone/paper, uses gold-deep so the 13px label
   * meets AA contrast; "dark" = on espresso, where standard gold passes.
   */
  tone?: "light" | "dark";
};

/** Small-caps gold section label, e.g. "— OUR WORK". */
export function Eyebrow({ children, className, withRule = true, tone = "light" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-sans text-eyebrow font-bold uppercase",
        tone === "dark" ? "text-bone" : "text-gold-deep",
        className,
      )}
    >
      {withRule && <span aria-hidden="true" className="h-px w-8 bg-current" />}
      {children}
    </span>
  );
}
