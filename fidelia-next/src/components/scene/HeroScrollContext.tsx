"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";
import { useScroll, type MotionValue } from "motion/react";

type HeroScrollContextValue = MotionValue<number> | null;

const HeroScrollContext = createContext<HeroScrollContextValue>(null);

type HeroScrollProviderProps = {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

/** Scroll progress (0→1) while the hero section crosses the viewport. */
export function HeroScrollProvider({ targetRef, children }: HeroScrollProviderProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  /* Raw progress for dissolve/Curie — spring delayed the crossfade past the sticky zone. */
  return <HeroScrollContext.Provider value={scrollYProgress}>{children}</HeroScrollContext.Provider>;
}

export function useHeroScrollProgress() {
  return useContext(HeroScrollContext);
}
