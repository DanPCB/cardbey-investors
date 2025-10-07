import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type PlayOpts = { volume?: number, rate?: number };
type SoundMap = { [key: string]: string };

const defaultSounds: SoundMap = {
  send: "/sfx/send.mp3",
  receive: "/sfx/receive.mp3",
  attention: "/sfx/attention.mp3"
};

type Ctx = {
  muted: boolean;
  setMuted: (b: boolean) => void;
  play: (name: keyof typeof defaultSounds, opts?: PlayOpts) => void;
};

const SoundCtx = createContext<Ctx | null>(null);

export function SoundProvider({ children, sounds = defaultSounds as SoundMap }) {
  const [muted, setMuted] = useState(false);
  const unlockedRef = useRef(false);
  const buffersRef = useRef<Record<string, AudioBuffer | null>>({});
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Lazy init on first user gesture (autoplay policy)
  const unlock = useCallback(async () => {
    if (unlockedRef.current) return;
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtxRef.current!;
    // Preload small files
    await Promise.all(Object.entries(sounds).map(async ([k, url]) => {
      const res = await fetch(url);
      const arr = await res.arrayBuffer();
      buffersRef.current[k] = await ctx.decodeAudioData(arr);
    }));
    unlockedRef.current = true;
    window.removeEventListener("pointerdown", unlock, true);
    window.removeEventListener("keydown", unlock, true);
  }, [sounds]);

  useEffect(() => {
    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    return () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };
  }, [unlock]);

  const play = useCallback((name: keyof typeof defaultSounds, opts?: PlayOpts) => {
    if (muted || !unlockedRef.current) return;
    const ctx = audioCtxRef.current;
    const buf = buffersRef.current[name as string];
    if (!ctx || !buf) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    if (opts?.rate) src.playbackRate.value = opts.rate;
    const gain = ctx.createGain();
    gain.gain.value = opts?.volume ?? 0.4;
    src.connect(gain).connect(ctx.destination);
    src.start();
  }, [muted]);

  return (
    <SoundCtx.Provider value={{ muted, setMuted, play }}>
      {children}
    </SoundCtx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>");
  return ctx;
}
