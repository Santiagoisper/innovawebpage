"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import {
  CURIE_EMERGENCE_SCALE_END,
  CURIE_EMERGENCE_SCALE_START,
} from "@/lib/data/curieHero";
import { getCurieEmergence } from "@/lib/scene/journeyPhases";
import { useCurieHandoffProgress } from "@/hooks/useCurieHandoff";
import CuriePlate from "./CuriePlate";

/**
 * Curie funde encima del ADN (z-2) mientras el WebGL se desvanece (z-1).
 */
export default function CurieEmergenceLayer() {
  const reducedMotion = useReducedMotion();
  const handoffProgress = useCurieHandoffProgress();
  const opacity = getCurieEmergence(handoffProgress);
  const e = opacity;
  const imageScale =
    CURIE_EMERGENCE_SCALE_START + e * (CURIE_EMERGENCE_SCALE_END - CURIE_EMERGENCE_SCALE_START);

  if (reducedMotion || opacity <= 0) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      style={{ opacity }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{ scale: imageScale }}
      >
        <CuriePlate />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,8,18,0.82) 0%, rgba(2,8,18,0.48) 40%, rgba(2,8,18,0.12) 72%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
