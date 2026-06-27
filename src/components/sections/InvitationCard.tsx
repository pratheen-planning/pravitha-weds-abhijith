"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Sparkles from "@/components/decor/Sparkles";
import { useLightbox } from "@/components/providers/LightboxProvider";
import { wedding } from "@/data/wedding";

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" className={className} aria-hidden="true">
      <g fill="none" stroke="#C9A24B" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 6c26 0 42 16 42 42" />
        <path d="M6 18c18 0 30 12 30 30" opacity="0.6" />
        <path d="M6 6c10 2 16 8 18 18" />
      </g>
      <circle cx="6" cy="6" r="2.6" fill="#B76E79" />
      <circle cx="20" cy="20" r="1.8" fill="#C9A24B" />
    </svg>
  );
}

export default function InvitationCard() {
  const reduce = useReducedMotion();
  const { open } = useLightbox();

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <Sparkles count={14} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <SectionHeading eyebrow="With Joyful Hearts" title="The Invitation" />

        <Reveal variant="blurReveal" className="mt-14">
          <motion.div
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-gold/40 bg-[linear-gradient(160deg,#FFFBF4,#FBE1E6_60%,#F6EEE0)] p-1.5 shadow-glow"
          >
            {/* shimmer sweep */}
            {!reduce ? (
              <span className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-rose-sheen opacity-70 transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />
            ) : null}

            <div className="relative rounded-[1.6rem] border border-champagneGold/40 px-7 py-12 text-center sm:px-12 sm:py-14">
              <CornerFlourish className="absolute left-3 top-3" />
              <CornerFlourish className="absolute right-3 top-3 -scale-x-100" />
              <CornerFlourish className="absolute bottom-3 left-3 -scale-y-100" />
              <CornerFlourish className="absolute bottom-3 right-3 -scale-100" />

              <p className="font-cormorant text-base tracking-[0.28em] text-roseGold">
                OM GANESHAYA NAMAH
              </p>

              <p className="mt-7 font-poppins text-[0.66rem] uppercase tracking-[0.3em] text-ink/55">
                Together with their families
              </p>

              <h3 className="mt-5 font-playfair text-4xl font-semibold leading-tight text-rosewood sm:text-5xl">
                {wedding.bride}
              </h3>
              <div className="my-3 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-champagneGold/60" />
                <motion.span
                  animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gold"
                >
                  <Heart size={22} fill="currentColor" strokeWidth={1} />
                </motion.span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-champagneGold/60" />
              </div>
              <h3 className="font-playfair text-4xl font-semibold leading-tight text-rosewood sm:text-5xl">
                {wedding.groom}
              </h3>

              <p className="mx-auto mt-7 max-w-sm font-cormorant text-xl leading-relaxed text-ink/75">
                request the honour of your presence as they exchange vows and begin
                their journey together.
              </p>

              <div className="mt-8 flex flex-col items-center gap-1">
                <p className="font-playfair text-2xl font-semibold text-rosewood">
                  {wedding.weddingDate}
                </p>
                <p className="font-poppins text-sm tracking-[0.16em] text-roseGold">
                  {wedding.weddingTime}
                </p>
                <p className="mt-3 font-cormorant text-xl text-ink/75">{wedding.venueName}</p>
                <p className="font-poppins text-xs tracking-[0.12em] text-ink/55">
                  {wedding.venueLines.join(", ")}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  open(
                    [{ src: "/images/invitation-card.jpg", alt: "Printed invitation card" }],
                    0
                  )
                }
                className="mt-9 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-gradient px-7 py-3 font-poppins text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-rosewood shadow-gold transition hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                View Printed Card
              </button>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
