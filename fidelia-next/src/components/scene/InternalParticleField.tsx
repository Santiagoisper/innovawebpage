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

const DESKTOP_COUNT = 36;
const MOBILE_COUNT = 16;
const MOBILE_QUERY = "(max-width: 768px)";

const CLINICAL = new Color("#55A2D2");
const WHITE = new Color("#ffffff");

function useInternalCount() {
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

/** Particles seeded inside the helix core; drift outward like evidence dispersal. */
function buildInternalParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const i4 = i * 4;
    const y = (Math.random() - 0.5) * 2.2;
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.04 + Math.random() * 0.22;

    positions[i3] = radius * Math.cos(angle);
    positions[i3 + 1] = y;
    positions[i3 + 2] = radius * Math.sin(angle);

    const tint = CLINICAL.clone().lerp(WHITE, 0.35 + Math.random() * 0.45);
    colors[i3] = tint.r;
    colors[i3 + 1] = tint.g;
    colors[i3 + 2] = tint.b;

    seeds[i4] = angle;
    seeds[i4 + 1] = 0.08 + Math.random() * 0.12;
    seeds[i4 + 2] = 0.12 + Math.random() * 0.22;
    seeds[i4 + 3] = Math.random() * Math.PI * 2;
  }

  return { positions, colors, seeds };
}

export default function InternalParticleField() {
  const reducedMotion = useReducedMotion();
  const progress = useHeroScrollProgress();
  const count = useInternalCount();
  const pointsRef = useRef<Points>(null);

  const particleData = useMemo(() => buildInternalParticles(count), [count]);

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
      const i4 = i * 4;
      const angle = motion[i4];
      const speed = motion[i4 + 1];
      const spread = motion[i4 + 2];
      const phase = motion[i4 + 3];

      const pulse = (Math.sin(time * speed + phase) * 0.5 + 0.5) * spread;
      const rise = Math.sin(time * speed * 0.7 + phase) * 0.012;
      const driftX = time * speed * 0.35;

      arr[i3] = base[i3] + Math.cos(angle) * pulse + driftX;
      arr[i3 + 1] = base[i3 + 1] + rise;
      arr[i3 + 2] = base[i3 + 2] + Math.sin(angle) * pulse;
    }

    positionAttr.needsUpdate = true;

    const p = progress?.get() ?? 0;
    const phase = getJourneyPhase(p);
    const material = points.material as { opacity: number };
    if (phase === "tunnel") {
      material.opacity = 0.22 + ((p - 0.22) / 0.56) * 0.12;
    } else {
      material.opacity = 0;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
        blending={NormalBlending}
      />
    </points>
  );
}
