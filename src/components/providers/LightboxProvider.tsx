"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type LightboxImage = { src: string; alt: string };

type LightboxContextValue = {
  open: (images: LightboxImage[], index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((imgs: LightboxImage[], i: number) => {
    setImages(imgs);
    setIndex(i);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, next, prev]);

  const value = useMemo(() => ({ open }), [open]);
  const current = images[index];
  const hasMany = images.length > 1;

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && current ? (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-rosewood/85 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-champagne/40 bg-ivory/90 text-rosewood transition hover:scale-105"
            >
              <X size={20} />
            </button>

            {hasMany ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-champagne/40 bg-ivory/85 text-rosewood transition hover:scale-105 sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-champagne/40 bg-ivory/85 text-rosewood transition hover:scale-105 sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}

            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[86vh] w-auto max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={1100}
                height={1400}
                className="max-h-[86vh] w-auto rounded-lg object-contain shadow-glow"
                sizes="92vw"
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
