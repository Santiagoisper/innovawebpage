import WebGLFallback from "@/components/ui/WebGLFallback";

/** Static hero backdrop when WebGL is unavailable or reduced motion is preferred. */
export default function WebGLHeroFallback() {
  return <WebGLFallback />;
}
