"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion/presets";
import { useReducedMotion } from "./ReducedMotionGuard";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
};

export default function RevealGroup({ children, className = "" }: RevealGroupProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroupItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
