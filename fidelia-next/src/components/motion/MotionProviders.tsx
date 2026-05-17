"use client";

import type { ReactNode } from "react";
import ReducedMotionGuard from "./ReducedMotionGuard";
import ScrollProgress from "./ScrollProgress";
import ScrollStageProvider from "./ScrollStageProvider";

type MotionProvidersProps = {
  children: ReactNode;
};

export default function MotionProviders({ children }: MotionProvidersProps) {
  return (
    <ReducedMotionGuard>
      <ScrollStageProvider>
        <ScrollProgress />
        {children}
      </ScrollStageProvider>
    </ReducedMotionGuard>
  );
}
