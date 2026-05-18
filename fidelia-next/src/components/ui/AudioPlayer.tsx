"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TARGET_VOL = 0.22;
const FADE_MS = 1800;
const STEPS = 60;

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none";
    audio.addEventListener("canplay", () => setReady(true));
    audio.src = src;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, [src]);

  const fade = useCallback((to: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const from = audio.volume;
    const delta = (to - from) / STEPS;
    let i = 0;
    fadeRef.current = setInterval(() => {
      i++;
      audio.volume = Math.max(0, Math.min(1, from + delta * i));
      if (i >= STEPS) { clearInterval(fadeRef.current!); onDone?.(); }
    }, FADE_MS / STEPS);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fade(0, () => audio.pause());
      setPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => { setPlaying(true); fade(TARGET_VOL); }).catch(() => {});
    }
  }, [playing, fade]);

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Silenciar música" : "Activar música ambient"}
      className="fixed bottom-7 right-7 z-50 group flex items-center gap-2 px-3 py-2 transition-all duration-500"
      style={{
        background: "rgba(2,8,18,0.55)",
        backdropFilter: "blur(12px)",
        border: `1px solid rgba(85,162,210,${playing ? "0.45" : "0.2"})`,
        clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)",
      }}
    >
      {/* bars */}
      <span className="flex items-end gap-[2px]" style={{ height: 13 }} aria-hidden>
        {[0.5, 1, 0.65, 0.85, 0.45].map((h, i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-[#55A2D2] transition-all duration-700"
            style={{
              height: playing ? `${h * 13}px` : "2px",
              opacity: playing ? 0.85 : 0.3,
              animation: playing ? `hudbar ${0.55 + i * 0.1}s ease-in-out ${i * 0.07}s infinite alternate` : "none",
            }}
          />
        ))}
      </span>
      {/* label */}
      <span
        className="font-mono text-[7px] tracking-[0.3em] uppercase transition-all duration-500"
        style={{ color: `rgba(85,162,210,${playing ? "0.9" : "0.45"})` }}
      >
        {playing ? "ON" : "OFF"}
      </span>
    </button>
  );
}
