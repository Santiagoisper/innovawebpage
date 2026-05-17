"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "@/components/scene/HeroScrollContext";

type HeroScrollContentProps = {
  children: ReactNode;
  className?: string;
};

function ScrollDrivenContent({
  progress,
  className,
  children,
}: {
  progress: MotionValue<number>;
  className: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [0, 0.45, 1], [1, 0.94, 0.84]);
  const y = useTransform(progress, [0, 1], [0, -16]);
  const scale = useTransform(progress, [0, 1], [1, 0.985]);

  return (
    <motion.div className={className} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

export default function HeroScrollContent({ children, className = "" }: HeroScrollContentProps) {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  if (reducedMotion || !progress) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ScrollDrivenContent progress={progress} className={className}>
      {children}
    </ScrollDrivenContent>
  );
}
