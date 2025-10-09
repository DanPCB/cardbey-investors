import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

/* ---- tiny WebAudio synth (no files) ---- */
function makeBeep(ctx, { freq = 600, dur = 0.08, type = "sine", gain = 0.12 }) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g).connect(ctx.destination);
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.01);
  g.gain.linearRampToValueAtTime(0.0001, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}
function chord(ctx, notes, base = {}) { notes.forEach(n => makeBeep(ctx, { ...base, ...n })); }

/* ---- context ---- */
const SoundCtx = createContext({
  play: () => {},
  muted: false,
  setMuted: () => {},
  toggleMuted: () => {},
});



export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(() => {
    try { return (localStorage.getItem(STORAGE_KEY) ?? "on") !== "on"; }
    catch { return false; }
  });

  // keep preference
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, muted ? "off" : "on"); } catch {}
  }, [muted]);

  const toggleMuted = () => setMuted(m => !m);

  const ctxRef = useRef(null);
  function ensureCtx() {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }

  const play = (name) => {
    if (muted) return;
    const ctx = ensureCtx();
    if (!ctx) return;

    switch (name) {
      case "key": // typing tick
        makeBeep(ctx, { freq: 2100, dur: 0.025, gain: 0.05, type: "square" });
        break;
      case "send": // user sent
        chord(ctx, [
          { freq: 420, dur: 0.06, type: "sine", gain: 0.10 },
          { freq: 640, dur: 0.10, type: "sine", gain: 0.08 },
        ]);
        break;
      case "receive": // assistant reply
        chord(ctx, [
          { freq: 700, dur: 0.08, type: "triangle", gain: 0.10 },
          { freq: 520, dur: 0.12, type: "triangle", gain: 0.08 },
        ]);
        break;
      case "sttStart": // mic on
        chord(ctx, [
          { freq: 900, dur: 0.05, type: "sine", gain: 0.08 },
          { freq: 1200, dur: 0.05, type: "sine", gain: 0.06 },
        ]);
        break;
      case "sttStop": // mic off
        chord(ctx, [
          { freq: 500, dur: 0.06, type: "triangle", gain: 0.08 },
          { freq: 300, dur: 0.09, type: "triangle", gain: 0.06 },
        ]);
        break;
      default:
        makeBeep(ctx, { freq: 900, dur: 0.04, gain: 0.07, type: "triangle" });
    }
  };

  // unlock after first user gesture
  useEffect(() => {
    const unlock = () => { try { ensureCtx(); } catch {} window.removeEventListener("click", unlock); };
    window.addEventListener("click", unlock, { once: true });
    return () => window.removeEventListener("click", unlock);
  }, []);

  // auto-resume when tab becomes active (some browsers suspend)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && ctxRef.current && ctxRef.current.state === "suspended") {
        ctxRef.current.resume().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // keyboard shortcut: Ctrl/⌘ + M
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "m" || e.key === "M") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleMuted();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ play, muted, setMuted, toggleMuted }), [muted]);
  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  return useContext(SoundCtx);
}
