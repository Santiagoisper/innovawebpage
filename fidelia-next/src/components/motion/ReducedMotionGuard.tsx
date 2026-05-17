"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ReducedMotionContextValue = {
  reducedMotion: boolean;
};

const ReducedMotionContext = createContext<ReducedMotionContextValue>({ reducedMotion: false });

export function useReducedMotion() {
  return useContext(ReducedMotionContext).reducedMotion;
}

type ReducedMotionGuardProps = {
  children: ReactNode;
};

export default function ReducedMotionGuard({ children }: ReducedMotionGuardProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion }}>{children}</ReducedMotionContext.Provider>
  );
}
