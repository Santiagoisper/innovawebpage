"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useMotionValue, useTransform } from "motion/react";
import { getSceneDissolve } from "@/lib/scene/journeyPhases";
import { useHeroScrollProgress } from "./HeroScrollContext";
import CameraRig from "./CameraRig";
import CosmicDustField from "./CosmicDustField";
import DnaHelix from "./DnaHelix";
import HelixCoreGlow from "./HelixCoreGlow";
import HeroSceneOverlay from "./HeroSceneOverlay";
import InternalParticleField from "./InternalParticleField";
import ParticleField from "./ParticleField";
import SceneLights from "./SceneLights";

export default function SceneCanvas() {
  const progress = useHeroScrollProgress();
  const staticProgress = useMotionValue(0);
  const active = progress ?? staticProgress;
  const layerOpacity = useTransform(active, (v) => 1 - getSceneDissolve(v) * 0.98);

  return (
    <motion.div
      className="absolute inset-0 z-[1]"
      style={{ opacity: progress ? layerOpacity : 1 }}
      aria-hidden
      data-phase="webgl-dna"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.04, 6.05], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <CameraRig />
        <CosmicDustField />
        <SceneLights />
        <HelixCoreGlow />
        <DnaHelix />
        <InternalParticleField />
        <ParticleField />
      </Canvas>
      <HeroSceneOverlay />
    </motion.div>
  );
}
