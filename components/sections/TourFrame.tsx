"use client";

import { useEffect, useRef, useState } from "react";

type TourFrameProps = {
  src: string;
  title: string;
};

/**
 * The tour iframe, mounted only once it is actually on screen.
 *
 * WHY THIS IS NOT JUST AN IFRAME. The tour boots by painting its style chips,
 * and that routine ends with
 *
 *   chips.querySelector(`[data-id="..."]`)
 *        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
 *
 * which is sound inside its own page: the chip row scrolls horizontally and
 * this keeps the active chip in view. In an iframe it is not contained.
 * scrollIntoView walks every scrolling ancestor, and the outermost one is our
 * document, so the browser scrolls the homepage down to reveal the frame.
 * The tour boots on load, so the homepage jumped to this section on load, and
 * html { scroll-behavior: smooth } made it a visible glide rather than a
 * flicker. Nothing in this repo was scrolling anywhere.
 *
 * So the iframe is kept out of the DOM until it is in view. An element that
 * does not exist cannot boot, and code that never runs cannot scroll us. By
 * the time it does mount the section is already on screen, which is precisely
 * when `block: 'nearest'` has nothing left to do. No scroll is fought, forced
 * or undone, and the external app is untouched.
 *
 * THE OBSERVER'S MARGINS ARE THE WHOLE TRICK. A plain intersection test fires
 * when the first pixel appears, and at one pixel the chips are still below the
 * fold, so the tour would boot and scroll after all. Insetting the root by 15%
 * top and bottom means the frame has to reach the middle of the viewport
 * first. It also fires for any frame height: a threshold like 0.35 is
 * unreachable whenever the frame is taller than the window, a band is not.
 *
 * The wrapper keeps its classes in both states, so the box the tour will
 * occupy is already the right size before it arrives and nothing shifts when
 * it does.
 */
export function TourFrame({ src, title }: TourFrameProps) {
  const slot = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = slot.current;
    if (!el) return;

    // No observer (older Safari, some in-app browsers): show the tour rather
    // than withhold it. The scroll jump is the lesser problem than a section
    // that is permanently blank.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "-15% 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={slot}
      className="mt-12 aspect-video w-full overflow-hidden rounded-2xl md:min-h-[480px]"
    >
      {inView ? (
        <iframe
          src={src}
          title={title}
          allow="fullscreen; gyroscope; accelerometer; clipboard-write; web-share"
          loading="lazy"
          className="h-full w-full border-0"
        />
      ) : null}
    </div>
  );
}
