/**
 * Placeholder for the future signature DNA WebGL scene (Phase 3+).
 * Phase 1: static gradient panel — no Three.js, no video dependency.
 */
export default function WebGLFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#020812]"
      aria-hidden
      data-phase="webgl-placeholder"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/Variant__Translucent_Blue_Helix.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 40%, rgba(85,162,210,0.14) 0%, transparent 55%), linear-gradient(180deg, #020812 0%, #041018 45%, #020812 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020812] to-transparent" />
    </div>
  );
}
