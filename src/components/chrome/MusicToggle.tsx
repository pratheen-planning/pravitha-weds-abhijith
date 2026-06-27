"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle({
  musicOn,
  onToggle
}: {
  musicOn: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileTap={{ scale: 0.92 }}
      aria-label={musicOn ? "Pause background music" : "Play background music"}
      aria-pressed={musicOn}
      className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full border border-champagneGold/60 bg-rosewood text-ivory shadow-glow transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {musicOn ? (
        <>
          <span className="absolute inset-0 animate-ping rounded-full border border-champagneGold/40" />
          <Volume2 size={20} />
        </>
      ) : (
        <VolumeX size={20} />
      )}
    </motion.button>
  );
}
