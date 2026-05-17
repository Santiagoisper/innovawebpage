import { Vector3 } from "three";
import { getTunnelPhase } from "./journeyPhases";

const CAM_START = new Vector3(0, 0.04, 6.05);
const CAM_END = new Vector3(0, 0, -0.55);
const LOOK_START = new Vector3(0, 0, 0);
const LOOK_END = new Vector3(0, 0, -2.4);

/**
 * Straight dive through the helix opening (+Z → core), with a subtle inner spiral
 * only once inside the cylinder.
 */
export function getTunnelCameraState(scrollProgress: number) {
  const t = getTunnelPhase(scrollProgress);

  const position = CAM_START.clone().lerp(CAM_END, t);
  const lookAt = LOOK_START.clone().lerp(LOOK_END, t);

  const innerSpiral = t * t;
  position.x += Math.sin(t * Math.PI * 2.2) * 0.14 * innerSpiral;
  position.y += Math.cos(t * Math.PI * 1.6) * 0.1 * innerSpiral;
  lookAt.x += Math.sin(t * Math.PI * 1.8) * 0.08 * innerSpiral;

  return { position, lookAt };
}
