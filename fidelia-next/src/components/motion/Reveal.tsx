"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { revealFade, revealUp } from "@/lib/motion/presets";
import { useReducedMotion } from "./ReducedMotionGuard";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade";
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "variants">;

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <motion.div className={className}>{children}</motion.div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      variants={variant === "fade" ? revealFade : revealUp}
      custom={delay}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
