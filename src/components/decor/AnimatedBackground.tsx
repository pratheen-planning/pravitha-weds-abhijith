"use client";

import { cn } from "@/lib/utils";

/**
 * Ambient luxury background: slow-drifting soft gradient blobs and faint light
 * rays. Pure CSS animation (transform/opacity only) — paused by the global
 * reduced-motion rule in globals.css. Fixed behind all content.
 */
export default function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-soft-cream" />

      {/* drifting color blobs */}
      <div className="absolute -left-32 -top-24 h-[34rem] w-[34rem] animate-blobDrift rounded-full bg-[radial-gradient(circle,rgba(244,184,195,0.45),transparent_65%)] blur-2xl" />
      <div className="absolute -right-40 top-1/4 h-[38rem] w-[38rem] animate-floatSlow rounded-full bg-[radial-gradient(circle,rgba(232,216,184,0.45),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[30rem] w-[30rem] animate-blobDrift rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.30),transparent_65%)] blur-2xl [animation-delay:-8s]" />

      {/* soft light rays */}
      <div className="absolute left-1/2 top-[-20%] h-[80%] w-[140%] -translate-x-1/2 bg-[conic-gradient(from_90deg_at_50%_0%,transparent_0deg,rgba(255,251,244,0.5)_12deg,transparent_24deg,transparent_60deg,rgba(212,175,55,0.10)_72deg,transparent_84deg)] opacity-60" />

      {/* fine grain for filmic texture */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(95,49,50,0.6)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
    </div>
  );
}
