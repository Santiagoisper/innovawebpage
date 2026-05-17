"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { useReducedMotion } from "./ReducedMotionGuard";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Vertical shift in px at full scroll through target */
  offset?: number;
  targetRef?: RefObject<HTMLElement | null>;
};

export default function ParallaxLayer({
  children,
  className = "",
  offset = 40,
  targetRef,
}: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset * 0.5, -offset * 0.5]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
