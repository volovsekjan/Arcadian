"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/utils";

type AccordionProps = {
  items: FaqItem[];
  className?: string;
  /** Index of the item open on load; null for all closed. */
  defaultOpen?: number | null;
};

/**
 * Single-open accordion with animated height, rotating chevron, and full
 * keyboard support (native buttons + aria-expanded/aria-controls).
 */
export function Accordion({ items, className, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3 className="font-display text-lg font-medium leading-snug">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300",
                  isOpen ? "text-ink" : "text-ink hover:text-gold",
                )}
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    "icon-inline text-gold transition-transform duration-300 ease-out-soft",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-graphite">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
