"use client";

import { MotionConfig, motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger group members by ~0.08s increments. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  once?: boolean;
};

/**
 * Scroll-reveal wrapper: fade + rise, ease-out.
 *
 * The markup is identical on server and client for every user —
 * `MotionConfig reducedMotion="user"` disables the transform animation for
 * prefers-reduced-motion users while still resolving opacity to 1. (Branching
 * to a plain <div> based on useReducedMotion() would hydrate differently from
 * the SSR output and leave the server-rendered `opacity:0` in place forever.)
 */
export function Reveal({ children, className, delay = 0, y = 16, once = true }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
