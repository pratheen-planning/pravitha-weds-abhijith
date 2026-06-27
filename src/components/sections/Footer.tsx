"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Sparkles from "@/components/decor/Sparkles";
import FloralDivider from "@/components/decor/FloralDivider";
import { scrollToId } from "@/lib/useLenis";
import { wedding } from "@/data/wedding";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#FAF6EE,#F6EEE0)] px-5 py-16 text-center">
      <Sparkles count={14} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="font-cormorant text-2xl font-semibold tracking-wide text-rosewood transition hover:text-roseGold"
          aria-label="Back to top"
        >
          P <span className="text-gold">♡</span> A
        </button>

        <FloralDivider className="my-7" />

        <p className="inline-flex items-center gap-2 font-poppins text-sm text-ink/65">
          Made with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-roseGold"
          >
            <Heart size={16} fill="currentColor" strokeWidth={0} />
          </motion.span>
          for
        </p>
        <p className="mt-2 font-playfair text-2xl font-semibold text-rosewood">
          {wedding.bride} &amp; {wedding.groom}
        </p>
        <p className="mt-4 font-poppins text-xs tracking-[0.16em] text-ink/40">
          {wedding.weddingDate} · {wedding.venueName}, Chengannur
        </p>
      </div>
    </footer>
  );
}
