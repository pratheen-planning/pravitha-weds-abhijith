"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/useLenis";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "story", label: "Our Story" },
  { id: "couple", label: "The Couple" },
  { id: "details", label: "Details" },
  { id: "countdown", label: "Countdown" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  function go(id: string) {
    setMenuOpen(false);
    scrollToId(id);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
        scrolled
          ? "border-b border-champagneGold/20 bg-ivory/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="font-cormorant text-xl font-semibold tracking-wide text-rosewood"
          aria-label="Back to top"
        >
          P <span className="text-roseGold">♡</span> A
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="group relative py-1 font-poppins text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink/70 transition hover:text-rosewood"
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold-gradient transition-all duration-300",
                    active === l.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-champagneGold/40 text-rosewood md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-champagneGold/20 bg-ivory/95 px-5 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.id} className="border-b border-champagneGold/10 last:border-0">
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  className="block w-full py-3.5 text-left font-poppins text-sm uppercase tracking-[0.16em] text-ink/75"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
