"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import WebGLHeroFallback from "./WebGLHeroFallback";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => <WebGLHeroFallback />,
});

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function WebGLHero() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <WebGLHeroFallback />;
  }

  return (
    <SceneErrorBoundary fallback={<WebGLHeroFallback />}>
      <SceneCanvas />
    </SceneErrorBoundary>
  );
}
