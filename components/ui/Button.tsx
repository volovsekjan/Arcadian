import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorButtonProps = CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<"a">,
    keyof CommonProps | "href"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    keyof CommonProps
  >;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-300 ease-out-soft disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "rounded-full bg-gold text-ink hover:bg-gold-soft",
  secondary:
    "rounded-full border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  ghost: "text-ink underline decoration-gold/50 underline-offset-4 hover:decoration-gold",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/**
 * Primary CTA (gold pill), secondary (outline pill), or ghost (underlined
 * text link). Renders a Next.js <Link> when `href` is provided.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
