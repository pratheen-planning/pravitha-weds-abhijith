"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkle, Heart, Gem, Crown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { wedding } from "@/data/wedding";

const ICONS = [Sparkle, Heart, Gem, Crown];

export default function LoveStoryTimeline() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Two Paths, One Promise" title="Our Love Story" />

        <Reveal variant="fadeUp" className="mx-auto mt-8 max-w-2xl text-center">
          <p className="font-cormorant text-2xl leading-relaxed text-ink/75 sm:text-3xl">
            {wedding.story[0]}
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* central connecting line */}
          <span className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-champagneGold/10 via-champagneGold/60 to-champagneGold/10 md:left-1/2 md:-translate-x-1/2" />

          <ol className="space-y-10 md:space-y-16">
            {wedding.timeline.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              const isFeatured = item.title === "Proposal";
              const onLeft = i % 2 === 0;
              return (
                <li key={item.title} className="relative">
                  <div
                    className={`flex items-center gap-5 md:gap-0 ${
                      onLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* node */}
                    <span className="absolute left-7 z-10 -translate-x-1/2 md:left-1/2">
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={`grid h-14 w-14 place-items-center rounded-full border bg-pearl text-rosewood shadow-soft ${
                          isFeatured ? "border-gold shadow-gold" : "border-champagneGold/50"
                        }`}
                      >
                        <motion.span
                          animate={reduce || !isFeatured ? undefined : { scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Icon size={22} className={isFeatured ? "text-gold" : "text-roseGold"} />
                        </motion.span>
                      </motion.span>
                    </span>

                    {/* card */}
                    <div className="w-full pl-16 md:w-1/2 md:pl-0">
                      <Reveal
                        variant={onLeft ? "slideRight" : "slideLeft"}
                        className={`${onLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                      >
                        <motion.div
                          whileHover={reduce ? undefined : { y: -6 }}
                          className={`group rounded-2xl border bg-pearl/70 p-6 backdrop-blur-sm transition-shadow ${
                            isFeatured
                              ? "border-gold/40 shadow-gold"
                              : "border-champagneGold/25 shadow-soft hover:shadow-glow"
                          }`}
                        >
                          <span className="font-poppins text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-champagneGold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-1 font-playfair text-2xl font-semibold text-rosewood sm:text-3xl">
                            {item.title}
                          </h3>
                          <p className="mt-2 font-cormorant text-xl text-ink/70">{item.detail}</p>
                        </motion.div>
                      </Reveal>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
