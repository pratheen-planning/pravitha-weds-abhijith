"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLightbox } from "@/components/providers/LightboxProvider";
import { wedding } from "@/data/wedding";

export default function Gallery() {
  const reduce = useReducedMotion();
  const { open } = useLightbox();
  const images = wedding.gallery.map((g) => ({ src: g.src, alt: g.alt }));

  return (
    <section id="gallery" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Moments & Beauty" title="Our Gallery" />

        <div className="mt-14 [column-gap:1rem] sm:columns-2 lg:columns-3">
          {wedding.gallery.map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => open(images, i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { scale: 1.015, rotate: i % 2 ? 0.6 : -0.6 }}
              aria-label={`View ${item.alt}`}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-champagneGold/25 shadow-soft transition-shadow duration-500 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_2px_rgba(212,175,55,0.6)]" />
              <Image
                src={item.src}
                alt={item.alt}
                width={700}
                height={item.span === "tall" ? 950 : item.span === "wide" ? 480 : 700}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-rosewood/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
