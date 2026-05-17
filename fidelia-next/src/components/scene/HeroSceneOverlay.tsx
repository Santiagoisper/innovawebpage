"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";

const HERO_BG = "#020812";

/**
 * Vignette for depth; bottom fade strengthens near handoff to Curie hero.
 */
export default function HeroSceneOverlay() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const staticProgress = useMotionValue(0);

  const activeProgress = progress ?? staticProgress;
  const handoffOpacity = useTransform(activeProgress, [0, 0.58, 0.72, 1], [0.22, 0.22, 0.06, 0]);
  const galaxyGlow = useTransform(activeProgress, [0, 0.35], [0.08, 0.04]);

  if (reducedMotion || !progress) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 42%, rgba(85,162,210,0.08) 0%, transparent 60%)`,
        }}
      />
    );
  }

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(85,162,210,0.12) 0%, transparent 58%)",
          opacity: galaxyGlow,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          opacity: handoffOpacity,
          background: `linear-gradient(to top, ${HERO_BG} 0%, rgba(2,8,18,0.9) 42%, transparent 100%)`,
        }}
      />
    </>
  );
}
