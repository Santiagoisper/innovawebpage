"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "./ReducedMotionGuard";

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-[#55A2D2]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
