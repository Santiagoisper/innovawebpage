"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { DirectionalLight, PointLight } from "three";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";

const NAVY_AMBIENT = "#060e18";
const SKY = "#1a3a52";
const GROUND = "#020812";
const CLINICAL_BLUE = "#55A2D2";
const CREAM = "#F8E8C7";
const FOG_COLOR = "#020812";

function BreathingRimLight() {
  const lightRef = useRef<DirectionalLight>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const light = lightRef.current;
    if (!light || reducedMotion) return;
    light.intensity = 0.72 + Math.sin(clock.elapsedTime * 0.24) * 0.05;
  });

  return (
    <directionalLight
      ref={lightRef}
      color={CLINICAL_BLUE}
      position={[3.8, 1.6, -4.2]}
      intensity={0.72}
    />
  );
}

function BreathingKeyLight() {
  const lightRef = useRef<DirectionalLight>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const light = lightRef.current;
    if (!light || reducedMotion) return;
    light.intensity = 0.38 + Math.sin(clock.elapsedTime * 0.19 + 1.1) * 0.04;
  });

  return (
    <directionalLight
      ref={lightRef}
      color={CREAM}
      position={[-4.5, 2.4, 3.6]}
      intensity={0.38}
    />
  );
}

function SpecularAccent() {
  return (
    <directionalLight
      color="#a8d4ec"
      position={[0.5, -1.2, 5.2]}
      intensity={0.16}
    />
  );
}

function BreathingCoreLight() {
  const lightRef = useRef<PointLight>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    const light = lightRef.current;
    if (!light || reducedMotion) return;
    light.intensity = 0.1 + Math.sin(clock.elapsedTime * 0.21) * 0.025;
  });

  return (
    <pointLight
      ref={lightRef}
      color={CLINICAL_BLUE}
      position={[0, 0.15, 0.35]}
      intensity={0.1}
      distance={3.8}
      decay={2}
    />
  );
}

export default function SceneLights() {
  return (
    <>
      <hemisphereLight color={SKY} groundColor={GROUND} intensity={0.22} />
      <ambientLight color={NAVY_AMBIENT} intensity={0.2} />
      <BreathingRimLight />
      <BreathingKeyLight />
      <SpecularAccent />
      <BreathingCoreLight />
      <fogExp2 attach="fog" args={[FOG_COLOR, 0.038]} />
    </>
  );
}
