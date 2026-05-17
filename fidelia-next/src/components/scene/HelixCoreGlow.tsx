"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";

/** Soft volumetric core — supports strand glass, not a light source. */
export default function HelixCoreGlow() {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || reducedMotion) return;
    const material = mesh.material as { opacity: number };
    material.opacity = 0.018 + Math.sin(clock.elapsedTime * 0.26) * 0.005;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.58, 18, 18]} />
      <meshBasicMaterial
        color="#4a8fb5"
        transparent
        opacity={0.02}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
