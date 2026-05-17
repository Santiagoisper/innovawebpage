"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "@/components/scene/HeroScrollContext";

export default function CosmicIntroOverlay() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const staticProgress = useMotionValue(0);
  const active = progress ?? staticProgress;

  const hintOpacity = useTransform(active, [0, 0.08, 0.28], [1, 1, 0]);
  const titleOpacity = useTransform(active, [0, 0.1, 0.22], [1, 0.85, 0]);

  if (reducedMotion || !progress) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-white max-w-xl text-balance">
          Through the helix of evidence
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-[rgba(255,255,255,0.55)] max-w-md">
          A passage from the cosmos of discovery into clinical execution across Latin America.
        </p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ opacity: hintOpacity }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(255,255,255,0.45)]">
          Scroll
        </span>
        <span className="block h-11 w-px bg-gradient-to-b from-white/70 to-transparent" />
      </motion.div>
    </>
  );
}
