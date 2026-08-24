"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky condensing navbar. Solid ivory at the top of the page; after a
 * small scroll it condenses and gains a hairline border with a soft blur.
 * On mobile, the menu opens as a full-screen espresso overlay beneath the
 * header, so the toggle stays reachable to close it.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Condense on scroll, with hysteresis. Collapsing the bar removes 16px of
  // document height, and the browser's scroll anchoring compensates by pulling
  // scrollY back — with a single threshold, every position between it and
  // it+16px is an unstable flip-flop zone (the header "vibrates"). Collapse at
  // 80 / expand at 40: the 40px gap swallows the anchoring correction so the
  // state can't re-cross a boundary. Passive listener + initial check so a
  // page restored mid-scroll renders the condensed state immediately.
  useEffect(() => {
    const onScroll = () =>
      setScrolled((prev) => (prev ? window.scrollY > 40 : window.scrollY > 80));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the overlay is open: lock body scroll and make the page behind it
  // inert, so Tab and screen readers cannot reach visually hidden content.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const covered = [document.getElementById("main"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    covered.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      document.body.style.overflow = previous;
      covered.forEach((el) => el.removeAttribute("inert"));
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu]);

  // If the viewport grows past the mobile breakpoint, release the overlay.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300 ease-out-soft",
          open
            ? "border-bone/10 bg-gold"
            : scrolled
              ? "border-bone/15 bg-gold/95 backdrop-blur-md"
              : "border-transparent bg-gold",
        )}
      >
        <div
          className={cn(
            "transition-[height] duration-300 ease-out-soft",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Container className="flex h-full items-center justify-between">
            <Link
              href="/"
              aria-label="Arcadian — home"
              onClick={() => setOpen(false)}
              className={cn("inline-flex items-center", open && "focus-visible:ring-offset-espresso")}
            >
              <Wordmark priority />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm text-bone/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bone after:transition-transform after:duration-300 after:ease-out-soft hover:text-bone hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 sm:gap-5">
              <Button
                href={site.cta.href}
                size="md"
                className="hidden bg-bone text-gold hover:bg-paper sm:inline-flex"
              >
                {site.cta.label}
              </Button>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => (open ? closeMenu() : setOpen(true))}
                className={cn(
                  "-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-bone transition-colors duration-300 hover:text-gold-soft lg:hidden",
                )}
              >
                {open ? (
                  <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </Container>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-gold lg:hidden"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex min-h-full flex-col pb-10 pt-28">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
                  {site.nav.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-baseline gap-4 py-5 focus-visible:ring-offset-espresso"
                      >
                        <span
                          aria-hidden="true"
                          className="font-sans text-eyebrow font-bold text-bone/60"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-3xl font-medium tracking-tight text-ivory transition-colors duration-300 ease-out-soft hover:text-gold-soft">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto pt-12">
                <Button
                  href={site.cta.href}
                  size="lg"
                  onClick={closeMenu}
                  className="w-full bg-bone text-gold hover:bg-paper focus-visible:ring-offset-espresso sm:w-auto"
                >
                  {site.cta.label}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
