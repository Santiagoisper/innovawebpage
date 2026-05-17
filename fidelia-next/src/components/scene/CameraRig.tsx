"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { getTunnelCameraState } from "@/lib/scene/cameraTunnel";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";

const CAM_OUTSIDE = new Vector3(0, 0.04, 6.05);
const LOOK_OUTSIDE = new Vector3(0, 0, 0);
const LERP_SPEED = 0.055;

const targetPosition = new Vector3();
const targetLookAt = new Vector3();

/**
 * Scroll-driven helical tunnel entry. Fixed roll — only position + lookAt interpolate.
 */
export default function CameraRig() {
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();
  const scrollProgress = useHeroScrollProgress();
  const targetT = useRef(0);
  const currentT = useRef(0);
  const currentLookAt = useRef(LOOK_OUTSIDE.clone());

  useEffect(() => {
    if (reducedMotion || !scrollProgress) return;

    const unsubscribe = scrollProgress.on("change", (value) => {
      targetT.current = Math.min(1, Math.max(0, value));
    });

    return () => unsubscribe();
  }, [scrollProgress, reducedMotion]);

  useFrame(() => {
    if (reducedMotion) {
      camera.position.copy(CAM_OUTSIDE);
      camera.lookAt(LOOK_OUTSIDE);
      return;
    }

    currentT.current += (targetT.current - currentT.current) * LERP_SPEED;

    const { position, lookAt } = getTunnelCameraState(currentT.current);
    targetPosition.copy(position);
    targetLookAt.copy(lookAt);

    camera.position.lerp(targetPosition, 0.14);
    currentLookAt.current.lerp(targetLookAt, 0.12);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
