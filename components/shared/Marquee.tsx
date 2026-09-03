"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Auto-scroll speed in pixels per second (leftward). */
  speed?: number;
};

const DRAG_THRESHOLD = 6; // px of travel before a press becomes a drag (taps still click)
const MAX_FLING = 2.2; // px/ms cap on release momentum
const FRICTION = 0.94; // momentum decay per ~16.7ms frame

/**
 * Alternating editorial offset, applied per card and identical across the
 * duplicated tracks so the rhythm stays continuous through the infinite wrap.
 * Even cards sit slightly higher, odd cards slightly lower — subtle on mobile,
 * a little more pronounced on larger screens.
 */
function withOffsets(children: ReactNode) {
  return Children.map(children, (child, i) => (
    <div
      className={cn(
        "shrink-0",
        i % 2 === 0 ? "-translate-y-3 sm:-translate-y-6" : "translate-y-3 sm:translate-y-6",
      )}
    >
      {child}
    </div>
  ));
}

/**
 * Seamless, infinite carousel. Two identical tracks translate as one motion
 * value `baseX`; the rendered offset is `wrap(-half, 0, baseX)`, so the seam
 * between the copies is invisible and motion loops forever in both directions.
 *
 * Everything drives the SAME `baseX`, which is what lets all interaction modes
 * coexist:
 *  - auto-scroll: a per-frame decrement, active only when idle;
 *  - hover (mouse) / focus-within / explicit pause: suspend auto-scroll;
 *  - drag / swipe: pointer movement sets baseX directly (auto suspended);
 *  - momentum: release velocity carries baseX and decays via friction.
 *
 * A drag beyond a small threshold suppresses the click so cards do not open the
 * lightbox mid-swipe; a genuine tap/click (or keyboard Enter) still opens it.
 * Under prefers-reduced-motion the animated track is hidden and a plain
 * horizontally scrollable row is shown instead.
 */
export function Marquee({ children, className, speed = 32 }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const reduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const dupRef = useRef<HTMLDivElement>(null);

  // Non-reactive state read inside the animation frame / pointer handlers.
  const widthRef = useRef(0); // width of one track copy (incl. trailing gap)
  const draggingRef = useRef(false);
  const hoveredRef = useRef(false);
  const focusRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedRef = useRef(false);
  const velocityRef = useRef(0); // px/ms
  // Timestamp until which a click is treated as the tail of a drag and
  // suppressed. Time-boxed (not a sticky flag) so a later genuine tap always
  // opens the lightbox even when a swipe fired no trailing click (touch).
  const suppressUntilRef = useRef(0);
  const activePointer = useRef<number | null>(null);
  const samplesRef = useRef<{ x: number; t: number }[]>([]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    reducedRef.current = !!reduced;
  }, [reduced]);

  // The duplicate track exists only for the seamless wrap. Keep its cards
  // clickable (so a tap on any visible card opens the lightbox regardless of
  // which copy is on screen) but out of the tab order — the container is
  // aria-hidden, so this also keeps them from being focusable-while-hidden.
  useEffect(() => {
    dupRef.current
      ?.querySelectorAll<HTMLElement>("a, button, [tabindex]")
      .forEach((node) => node.setAttribute("tabindex", "-1"));
  });

  // Measure one copy's width and keep it current across breakpoints/resizes.
  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => {
      widthRef.current = el.offsetWidth;
      baseX.set(baseX.get()); // force the wrap transform to recompute
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseX]);

  const x = useTransform(baseX, (v) => {
    const w = widthRef.current;
    return w ? `${wrap(-w, 0, v)}px` : "0px";
  });

  useAnimationFrame((_, delta) => {
    if (!widthRef.current || draggingRef.current) return;
    let move = 0;
    const v = velocityRef.current;
    if (Math.abs(v) > 0.015) {
      move += v * delta;
      velocityRef.current = v * Math.pow(FRICTION, delta / 16.6667);
    } else {
      velocityRef.current = 0;
    }
    const autoActive =
      !pausedRef.current && !hoveredRef.current && !focusRef.current && !reducedRef.current;
    if (autoActive) move += -speed * (delta / 1000);
    if (move !== 0) baseX.set(baseX.get() + move);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (reducedRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const startX = e.clientX;
    const startBase = baseX.get();
    let moved = false;
    activePointer.current = e.pointerId;
    velocityRef.current = 0;
    samplesRef.current = [{ x: startX, t: performance.now() }];

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerId !== activePointer.current) return;
      const dx = ev.clientX - startX;
      if (!draggingRef.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        draggingRef.current = true;
        setGrabbing(true);
      }
      moved = true;
      baseX.set(startBase + dx);
      const s = samplesRef.current;
      s.push({ x: ev.clientX, t: performance.now() });
      if (s.length > 6) s.shift();
    };
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerId !== activePointer.current) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      activePointer.current = null;
      if (draggingRef.current) {
        const s = samplesRef.current;
        const last = s[s.length - 1];
        const first = s.find((p) => last.t - p.t <= 100) ?? s[0];
        const dt = last.t - first.t;
        velocityRef.current = dt > 0 ? clamp((last.x - first.x) / dt, -MAX_FLING, MAX_FLING) : 0;
        draggingRef.current = false;
        setGrabbing(false);
        suppressUntilRef.current = performance.now() + 250; // drag must not open the lightbox
        return;
      }
      // A tap that lands on the duplicate (visual) copy: its cards are kept
      // unfocusable (tabindex=-1) for a11y, and Chromium then skips synthesizing
      // a touch click on them — trigger it so any visible card stays tappable.
      // Mouse clicks fire on tabindex=-1 natively, so only touch/pen need this.
      if (!moved && ev.pointerType !== "mouse") {
        const el = document.elementFromPoint(ev.clientX, ev.clientY);
        const card = el instanceof HTMLElement ? el.closest<HTMLElement>("a, button") : null;
        if (card && card.getAttribute("tabindex") === "-1") {
          card.click(); // fires now (suppression window still closed) → opens
          suppressUntilRef.current = performance.now() + 400; // eat any trailing native click
        }
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        onPointerDown={onPointerDown}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hoveredRef.current = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") hoveredRef.current = false;
        }}
        onFocus={() => {
          focusRef.current = true;
        }}
        onBlur={() => {
          focusRef.current = false;
        }}
        onClickCapture={(e) => {
          if (performance.now() < suppressUntilRef.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressUntilRef.current = 0;
          }
        }}
        className={cn(
          "touch-pan-y select-none overflow-hidden py-4 sm:py-8",
          "[&_a]:cursor-[inherit] [&_button]:cursor-[inherit] [&_img]:pointer-events-none",
          grabbing ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <motion.div style={{ x }} className="flex w-max motion-reduce:hidden">
          <div ref={copyRef} className="flex shrink-0 items-center gap-5 pr-5">
            {withOffsets(children)}
          </div>
          {/* Duplicate copy for the seamless wrap — hidden from AT and kept out
              of the tab order (see effect above), but still clickable. */}
          <div ref={dupRef} className="flex shrink-0 items-center gap-5 pr-5" aria-hidden="true">
            {withOffsets(children)}
          </div>
        </motion.div>

        {/* Reduced-motion fallback: a normal, swipeable/scrollable row. */}
        <div className="hidden items-center gap-5 overflow-x-auto pb-3 motion-reduce:flex">
          {withOffsets(children)}
        </div>
      </div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
