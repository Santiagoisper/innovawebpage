"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  type Points,
} from "three";
import { getJourneyPhase } from "@/lib/scene/journeyPhases";
import { useReducedMotion } from "@/components/motion/ReducedMotionGuard";
import { useHeroScrollProgress } from "./HeroScrollContext";

const DESKTOP_COUNT = 72;
const MOBILE_COUNT = 32;
const MOBILE_QUERY = "(max-width: 768px)";

const BLUE = new Color("#55A2D2");
const WHITE = new Color("#c8dce8");

function useParticleCount() {
  const [count, setCount] = useState(DESKTOP_COUNT);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setCount(mq.matches ? MOBILE_COUNT : DESKTOP_COUNT);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return count;
}

function buildParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const y = (Math.random() - 0.5) * 2.5;
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.2 + Math.random() * 0.95;

    positions[i3] = radius * Math.cos(angle);
    positions[i3 + 1] = y;
    positions[i3 + 2] = radius * Math.sin(angle);

    const tint = BLUE.clone().lerp(WHITE, Math.random() * 0.55);
    colors[i3] = tint.r;
    colors[i3 + 1] = tint.g;
    colors[i3 + 2] = tint.b;

    seeds[i3] = Math.random() * Math.PI * 2;
    seeds[i3 + 1] = 0.12 + Math.random() * 0.18;
    seeds[i3 + 2] = 0.015 + Math.random() * 0.028;
  }

  return { positions, colors, seeds };
}

export default function ParticleField() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const count = useParticleCount();
  const pointsRef = useRef<Points>(null);

  const particleData = useMemo(() => buildParticles(count), [count]);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(particleData.positions.slice(), 3));
    geo.setAttribute("color", new BufferAttribute(particleData.colors, 3));
    return geo;
  }, [particleData]);

  const basePositions = useRef(particleData.positions);
  const seeds = useRef(particleData.seeds);

  useEffect(() => {
    basePositions.current = particleData.positions;
    seeds.current = particleData.seeds;
  }, [particleData]);

  useFrame(({ clock }) => {
    if (reducedMotion) return;

    const points = pointsRef.current;
    if (!points) return;

    const positionAttr = points.geometry.attributes.position as BufferAttribute;
    const arr = positionAttr.array as Float32Array;
    const base = basePositions.current;
    const motion = seeds.current;
    const time = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = motion[i3];
      const speed = motion[i3 + 1];
      const amp = motion[i3 + 2];
      const driftX = Math.sin(time * speed + phase) * amp;
      const driftY = Math.cos(time * speed * 0.85 + phase * 1.1) * amp * 0.45;
      const driftZ = Math.sin(time * speed * 0.65 + phase * 0.7) * amp * 0.75;

      arr[i3] = base[i3] + driftX;
      arr[i3 + 1] = base[i3 + 1] + driftY;
      arr[i3 + 2] = base[i3 + 2] + driftZ;
    }

    positionAttr.needsUpdate = true;

    const p = progress?.get() ?? 0;
    const phase = getJourneyPhase(p);
    const material = points.material as { opacity: number };
    if (phase === "galaxy") {
      material.opacity = 0.18;
    } else if (phase === "tunnel") {
      material.opacity = 0.12 * (1 - (p - 0.22) / 0.5);
    } else {
      material.opacity = 0;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.026}
        vertexColors
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
        blending={NormalBlending}
      />
    </points>
  );
}
