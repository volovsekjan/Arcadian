"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Subtle scroll-to-top affordance, appears after the first screens. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Move focus off the button before it hides itself, so keyboard/AT focus
    // is not stranded on an invisible, aria-hidden element.
    event.currentTarget.blur();
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/90 text-ink shadow-card backdrop-blur transition-all duration-300 ease-out-soft hover:border-gold hover:text-gold",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp className="icon-inline" aria-hidden="true" />
    </button>
  );
}
