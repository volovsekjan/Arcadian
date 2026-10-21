"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** next/image sizes hint for both layers. */
  sizes?: string;
};

/**
 * Draggable before/after comparison. The "after" image is the base layer;
 * the "before" image sits on top, clipped to the left of the divider.
 *
 * TWO INPUT MODES, deliberately different.
 *
 * Mouse and pen: drag anywhere on the image, exactly as before. A cursor can
 * be placed precisely and has no competing gesture to perform, so the whole
 * surface stays grabbable and `cursor-ew-resize` advertises it.
 *
 * Touch: the handle only. A finger on the image is far more likely to be the
 * start of a page scroll than the start of a comparison, and the old
 * behaviour claimed every one of those gestures: it repositioned the divider
 * on contact and reserved the horizontal axis across the whole picture. So a
 * touch that does not begin on the handle is ignored outright here, and the
 * image carries `touch-auto`, which is to say it behaves like any other
 * picture on the page.
 *
 * The handle carries `touch-none` instead, which is what keeps a drag that
 * started there from being stolen by the scroller. Nothing calls
 * preventDefault: touch-action states the intent declaratively, on the one
 * element the intent applies to, so there is no gesture the page can lock up.
 *
 * Keyboard is unchanged: focus the handle, then arrows, Home or End.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  sizes = "(min-width: 1024px) 384px, 90vw",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // divider position, 0–100 (%)
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const positionFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  /**
   * Capture on the container rather than on whichever element was pressed, so
   * that a drag begun on the handle still delivers its moves to the one
   * onPointerMove below.
   */
  const startDrag = (pointerId: number) => {
    draggingRef.current = true;
    containerRef.current?.setPointerCapture(pointerId);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // A finger anywhere on the image is not a drag. It is almost always the
    // start of a page scroll, and it is left to the browser as one.
    if (event.pointerType === "touch") return;
    startDrag(event.pointerId);
    positionFromClientX(event.clientX);
  };

  const onHandlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    // Mouse and pen already reach startDrag by bubbling to the container,
    // which also snaps the divider to the cursor. Only touch needs the handle
    // to be an entry point of its own.
    if (event.pointerType !== "touch") return;
    startDrag(event.pointerId);
    // No positionFromClientX here on purpose: the finger is already on the
    // handle, and snapping the divider to the exact contact point reads as a
    // twitch. The first pointermove takes over.
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) positionFromClientX(event.clientX);
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = 5;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - step));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      // touch-auto, not pan-y: the image reserves no axis at all now, so every
      // touch gesture over it scrolls, flicks and zooms the page exactly as it
      // would over a plain photo. cursor-ew-resize still advertises the
      // drag-anywhere behaviour, which is mouse and pen only and unchanged.
      className="relative aspect-[9/16] w-full cursor-ew-resize touch-auto select-none overflow-hidden rounded-2xl border border-ivory/10"
    >
      {/* After — base layer */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover"
      />

      {/* Before — clipped to the left of the divider */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={before} alt="" fill sizes={sizes} draggable={false} className="object-cover" />
      </div>
      {/* The before layer is aria-hidden (it duplicates the same room); expose
          its description to AT without rendering a second image. */}
      <span className="sr-only">{beforeAlt}</span>

      <span className="absolute left-3 top-3 rounded-full bg-espresso/70 px-3 py-1.5 text-fine font-semibold uppercase tracking-[0.1em] text-ivory backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1.5 text-fine font-semibold uppercase tracking-[0.1em] text-ink backdrop-blur-sm">
        After
      </span>

      {/* Divider + handle */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-ivory/90"
        style={{ left: `${position}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
        onKeyDown={onKeyDown}
        onPointerDown={onHandlePointerDown}
        /*
          Unchanged visually: still the 44px circle with the arrows.

          touch-none is what lets a drag that starts here survive. Touch-action
          is read from the element the touch lands on, so putting it on the
          handle alone means the browser surrenders the gesture only once a
          finger is actually on the control.

          The ::before is an invisible 8px ring around it, taking the touch
          target to 60px without moving a pixel of the design. Worth having now
          that the handle is the only way to drag on touch; it sits inside the
          container's overflow-hidden, so it cannot widen the page.
        */
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center rounded-full border border-ivory/40 bg-espresso/70 text-ivory shadow-lift backdrop-blur-sm transition-colors before:absolute before:-inset-2 before:content-[''] hover:bg-espresso/90 focus-visible:ring-offset-espresso"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="icon-list" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
