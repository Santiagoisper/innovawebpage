"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FADE_STEPS = 30;
const FADE_INTERVAL_MS = 40;
const TARGET_VOLUME = 0.18;

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
    audio.addEventListener("error", () => setReady(false));
    audio.src = src;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  const fade = useCallback((toVolume: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    const from = audio.volume;
    const delta = (toVolume - from) / FADE_STEPS;
    let step = 0;
    fadeRef.current = setInterval(() => {
      step++;
      audio.volume = Math.max(0, Math.min(1, from + delta * step));
      if (step >= FADE_STEPS) {
        clearInterval(fadeRef.current!);
        onDone?.();
      }
    }, FADE_INTERVAL_MS);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fade(0, () => audio.pause());
      setPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        setPlaying(true);
        fade(TARGET_VOLUME);
      }).catch(() => {});
    }
  }, [playing, fade]);

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-3.5 py-2.5 border border-[rgba(85,162,210,0.25)] bg-[rgba(2,8,18,0.75)] backdrop-blur-md hover:border-[rgba(85,162,210,0.6)] hover:bg-[rgba(2,8,18,0.9)] transition-all duration-300 group"
      style={{ clipPath: "polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)" }}
      aria-label={playing ? "Silence background music" : "Play background music"}
      title={playing ? "Silence" : "Ambient sound"}
    >
      {/* Sound bars */}
      <span className="flex items-end gap-[2.5px]" style={{ height: 14 }} aria-hidden>
        {[0.55, 1, 0.38, 0.75, 0.5].map((h, i) => (
          <span
            key={i}
            className="w-[2px] bg-[#55A2D2] rounded-full transition-all duration-300"
            style={{
              height: playing ? `${h * 14}px` : "3px",
              opacity: playing ? 0.9 : 0.35,
              animationName: playing ? "hudbar" : "none",
              animationDuration: `${0.6 + i * 0.12}s`,
              animationDelay: `${i * 0.08}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
            }}
          />
        ))}
      </span>
      <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase text-[#55A2D2] opacity-70 group-hover:opacity-100 transition-opacity">
        {playing ? "SND·ON" : "SND·OFF"}
      </span>
    </button>
  );
}
