"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "./ReducedMotionGuard";

type ScrollStageProviderProps = {
  children: ReactNode;
};

/**
 * Optional smooth scroll via Lenis. Disabled when prefers-reduced-motion is on.
 * Does not hijack scroll — native touch and keyboard remain available.
 */
export default function ScrollStageProvider({ children }: ScrollStageProviderProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis-active");

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-active");
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
