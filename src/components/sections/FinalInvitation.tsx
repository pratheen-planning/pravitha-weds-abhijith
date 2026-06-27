"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingPetals from "@/components/decor/FloatingPetals";
import Sparkles from "@/components/decor/Sparkles";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/data/wedding";

export default function FinalInvitation() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,184,195,0.28),transparent_55%)]" />
      <FloatingPetals count={16} />
      <Sparkles count={18} />

      {/* floating hearts */}
      {!reduce
        ? [0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute text-roseGold/30"
              style={{ left: `${15 + i * 22}%`, bottom: "-2rem" }}
              animate={{ y: ["0vh", "-70vh"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 9 + i * 2, repeat: Infinity, delay: i * 2.5, ease: "easeOut" }}
            >
              <Heart size={20 + i * 6} fill="currentColor" strokeWidth={0} />
            </motion.span>
          ))
        : null}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal variant="scaleReveal">
          <span className="inline-grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-pearl text-gold shadow-gold">
            <Heart size={28} fill="currentColor" strokeWidth={1} />
          </span>
        </Reveal>

        <Reveal variant="fadeUp" className="mt-8">
          <p className="font-playfair text-3xl font-medium leading-snug text-rosewood sm:text-5xl">
            We request the honour of your presence to bless us on the beginning of our
            new journey.
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.15} className="mt-8">
          <p className="font-cormorant text-2xl text-roseGold">
            {wedding.bride} <span className="text-champagneGold">&</span> {wedding.groom}
          </p>
          <p className="mt-2 font-poppins text-sm uppercase tracking-[0.26em] text-ink/55">
            {wedding.weddingDate}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
