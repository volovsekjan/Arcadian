import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

/** Paper surface with hairline border — the house card. No heavy shadows. */
export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl border border-line bg-paper", className)}>{children}</div>
  );
}
