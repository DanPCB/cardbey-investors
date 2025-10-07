// src/hooks/useVoice.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function useVoice({ lang = "en", autoRead = true, ttsRate = 1, ttsPitch = 1.15, ttsVolume = 1, preferredVoiceName, gender = "female", voiceHints } = {}) {
  const hasWindow = typeof window !== "undefined";
  const [supportsSTT, supportsTTS] = useMemo(() => {
    if (!hasWindow) return [false, false];
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    return [Boolean(SR), "speechSynthesis" in window];
  }, [hasWindow]);

  const bcp47 = useMemo(() => (lang === "vi" ? "vi-VN" : "en-US"), [lang]);

  // =====================
//        STT
// =====================
// =====================
//        STT
// =====================
const recognitionRef = useRef(null);
const [listening, setListening] = useState(false);
const [lastTranscript, setLastTranscript] = useState("");
const [sttError, setSttError] = useState("");
const guardTimerRef = useRef(null);
const retryCountRef = useRef(0);

// Quick mic level probe using WebAudio
async function checkInputLevel(stream, ms = 700) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return true; // if no WebAudio, skip
    const ctx = new AC();
    const src = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    src.connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    const start = performance.now();
    let peak = 0;
    while (performance.now() - start < ms) {
      analyser.getByteTimeDomainData(data);
      // compute peak deviation from 128 (silence)
      for (let i = 0; i < data.length; i++) {
        const v = Math.abs(data[i] - 128);
        if (v > peak) peak = v;
      }
      await new Promise(r => setTimeout(r, 50));
    }
    ctx.close();
    // Heuristic: < 3 = basically flatline (muted / wrong device)
    return peak >= 3;
  } catch {
    return true; // don’t block if analyser fails
  }
}

useEffect(() => {
  if (!supportsSTT) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = bcp47;
  rec.continuous = true;        // better in Chrome/Edge
  rec.interimResults = true;    // capture partials; improves detection
  rec.maxAlternatives = 1;

  rec.onstart = () => console.log("[STT] start");
  rec.onaudiostart = () => console.log("[STT] audio start");
  rec.onsoundstart = () => console.log("[STT] sound start");
  rec.onspeechstart = () => console.log("[STT] speech start");
  rec.onspeechend = () => console.log("[STT] speech end");

  rec.onresult = (e) => {
    if (guardTimerRef.current) { clearTimeout(guardTimerRef.current); guardTimerRef.current = null; }
    // Prefer the latest final result; otherwise show interim
    let text = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      text += res[0].transcript;
      if (res.isFinal) break;
    }
    text = text.trim();
    console.log("[STT] result:", text);
    if (text) setLastTranscript(text);
    setListening(false);
    retryCountRef.current = 0;
  };

  rec.onerror = (e) => {
    if (guardTimerRef.current) { clearTimeout(guardTimerRef.current); guardTimerRef.current = null; }
    const code = e?.error || "stt_error";
    console.warn("[STT] error:", code, e?.message || "");
    // Smart retries for 'no-speech'
    if (code === "no-speech" && retryCountRef.current < 2) {
      retryCountRef.current += 1;
      try { rec.stop(); } catch {}
      // 1st retry: keep continuous; 2nd retry: turn it off
      if (retryCountRef.current === 2) rec.continuous = false;
      setTimeout(() => {
        try { rec.start(); setListening(true); } catch {}
      }, 250);
      return;
    }
    setSttError(code);
    setListening(false);
    retryCountRef.current = 0;
  };

  rec.onend = () => {
    if (guardTimerRef.current) { clearTimeout(guardTimerRef.current); guardTimerRef.current = null; }
    console.log("[STT] end");
    setListening(false);
  };

  recognitionRef.current = rec;
  return () => {
    try { rec.abort(); } catch {}
    recognitionRef.current = null;
    if (guardTimerRef.current) { clearTimeout(guardTimerRef.current); guardTimerRef.current = null; }
  };
}, [supportsSTT, bcp47]);

const startListening = useCallback(async () => {
  if (!supportsSTT || listening) return;
  setLastTranscript("");
  setSttError("");
  retryCountRef.current = 0;
  let stream;
  try {
    // Open the mic and verify there is actual input level
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    });
    const hasLevel = await checkInputLevel(stream, 700);
    // Always stop the probe stream, SpeechRecognition opens its own
    stream.getTracks().forEach(t => t.stop());
    if (!hasLevel) {
      setSttError("no-input-level"); // clear, actionable reason
      console.warn("[STT] no-input-level: mic is silent (muted/wrong device).");
      return;
    }

    recognitionRef.current?.start();
    setListening(true);

    // Guard: stop after 8s to force result/end (some engines hang)
    guardTimerRef.current = setTimeout(() => {
      try { recognitionRef.current?.stop(); } catch {}
    }, 8000);
  } catch (e) {
    if (stream) stream.getTracks().forEach(t => t.stop());
    console.warn("[STT] getUserMedia failed:", e);
    setSttError(e?.name || e?.message || "microphone_denied");
    setListening(false);
  }
}, [supportsSTT, listening]);

const stopListening = useCallback(() => {
  try { recognitionRef.current?.stop(); } catch {}
  if (guardTimerRef.current) { clearTimeout(guardTimerRef.current); guardTimerRef.current = null; }
}, []);


  // ===== TTS (unchanged) =====
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef(null);
  const selectedVoiceRef = useRef(null);

  const normalizedHints = useMemo(() => {
    if (!voiceHints || !Array.isArray(voiceHints)) {
      return lang === "vi"
        ? [/Hoai.*My/i, /Female/i, /Vietnam/i, /vi-?VN/i]
        : [/Jenny/i, /Samantha/i, /Aria/i, /Female/i, /Google US/i, /en-?US/i];
    }
    return voiceHints.map((h) =>
      h instanceof RegExp ? h : new RegExp(String(h).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
    );
  }, [voiceHints, lang]);

  useEffect(() => {
    if (!supportsTTS) return;
    const load = () => setVoices(window.speechSynthesis.getVoices() || []);
    load();
    const prev = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = () => { load(); };
    return () => { window.speechSynthesis.onvoiceschanged = prev || null; };
  }, [supportsTTS]);

  const chooseVoice = useCallback(() => {
    if (!voices?.length) return null;
    if (preferredVoiceName) {
      const exact = voices.find(v => v?.name === preferredVoiceName);
      if (exact) return exact;
    }
    const strictPool = voices.filter(v => (v.lang || "").toLowerCase() === bcp47.toLowerCase());
    for (const hint of normalizedHints) {
      const hit = strictPool.find(v => hint.test(v.name || ""));
      if (hit) return hit;
    }
    if (gender === "female") {
      const fem = strictPool.find(v => /female|woman|samantha|aria|jenny|hoai|my/i.test(v.name || ""));
      if (fem) return fem;
    } else if (gender === "male") {
      const mal = strictPool.find(v => /male|man|matthew|guy|daniel|john/i.test(v.name || ""));
      if (mal) return mal;
    }
    const famPrefix = bcp47.split("-")[0].toLowerCase();
    const famPool = voices.filter(v => (v.lang || "").toLowerCase().startsWith(famPrefix));
    for (const hint of normalizedHints) {
      const hit = famPool.find(v => hint.test(v.name || ""));
      if (hit) return hit;
    }
    if (gender === "female") {
      const femFam = famPool.find(v => /female|woman|samantha|aria|jenny|hoai|my/i.test(v.name || ""));
      if (femFam) return femFam;
    } else if (gender === "male") {
      const malFam = famPool.find(v => /male|man|matthew|guy|daniel|john/i.test(v.name || ""));
      if (malFam) return malFam;
    }
    return strictPool[0] || famPool[0] || voices[0] || null;
  }, [voices, preferredVoiceName, bcp47, normalizedHints, gender]);

  useEffect(() => { selectedVoiceRef.current = chooseVoice(); }, [chooseVoice]);

  const speak = useCallback((text, opts = {}) => {
    if (!supportsTTS || !text) return;
    try { window.speechSynthesis.cancel(); } catch {}
    const utter = new SpeechSynthesisUtterance(String(text));
    const v = selectedVoiceRef.current || chooseVoice();
    utter.lang = v?.lang || bcp47;
    utter.voice = v || null;
    utter.rate = opts.rate ?? ttsRate;
    utter.pitch = opts.pitch ?? ttsPitch;
    utter.volume = opts.volume ?? ttsVolume;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    try { window.speechSynthesis.speak(utter); } catch {}
  }, [supportsTTS, bcp47, chooseVoice, ttsRate, ttsPitch, ttsVolume]);

  const pause = useCallback(() => { try { window.speechSynthesis.pause(); } catch {} }, []);
  const resume = useCallback(() => { try { window.speechSynthesis.resume(); } catch {} }, []);
  const stop = useCallback(() => { try { window.speechSynthesis.cancel(); setSpeaking(false); } catch {} }, []);

  return {
  supportsSTT, supportsTTS, sttError,
  listening, lastTranscript,
  startListening, stopListening,
  speaking, speak, pause, resume, stop,
  availableVoices: voices,
};


}
