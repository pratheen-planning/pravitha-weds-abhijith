"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery-smooth scrolling via Lenis. Automatically disabled when the user
 * prefers reduced motion. Exposes the instance on window for anchor scrolling.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}

/** Smoothly scroll to an element id, honoring Lenis when present. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -10 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
