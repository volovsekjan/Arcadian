"use client";

import { useRegion } from "@/components/shared/RegionProvider";
import { priceIn, type PriceSet } from "@/lib/regions";

type PriceProps = {
  set: PriceSet;
  /** Rendered straight after the figure, e.g. "/month". */
  suffix?: string;
  className?: string;
};

/**
 * A price in the visitor's active currency.
 *
 * Deliberately the only client component in the pricing and comparison
 * sections: both stay server-rendered and only the figure itself hydrates.
 * A currency with no list of its own falls back to AED, so this never prints
 * a converted number.
 */
export function Price({ set, suffix, className }: PriceProps) {
  const { currency } = useRegion();

  return (
    <span className={className}>
      {priceIn(set, currency)}
      {suffix}
    </span>
  );
}
