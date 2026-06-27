"use client";

import { motion, useReducedMotion } from "framer-motion";
import Sparkles from "@/components/decor/Sparkles";
import { wedding } from "@/data/wedding";
import { EASE } from "@/lib/motion";

export default function QuoteSection() {
  const reduce = useReducedMotion();
  const lines = wedding.quote;

  return (
    <section className="relative overflow-hidden px-5 py-28 sm:py-40">
      {/* light rays + sparkles */}
      <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent,rgba(212,175,55,0.06),transparent,rgba(244,184,195,0.08),transparent)]" />
      <Sparkles count={20} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 inline-block font-playfair text-6xl text-champagneGold/40"
        >
          &ldquo;
        </motion.span>

        <div className="space-y-2">
          {lines.map((line, li) => (
            <p key={line} className="font-cormorant text-3xl leading-snug text-rosewood sm:text-5xl">
              {line.split(" ").map((word, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    delay: reduce ? 0 : (li * 6 + wi) * 0.08,
                    ease: EASE
                  }}
                  className="mr-[0.28em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 font-poppins text-[0.7rem] uppercase tracking-[0.34em] text-roseGold"
        >
          — Pravitha &amp; Abhijith
        </motion.p>
      </div>
    </section>
  );
}
