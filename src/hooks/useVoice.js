// src/hooks/useVoice.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * STT-only Web Speech hook
 *
 * Options:
 * - lang: "en" | "vi" (default "en")
 * - continuous: boolean (default: false)  -> if true, auto-restarts onend while 'listening'
 * - interim: boolean (default: true)      -> if true, emits partial transcripts
 * - onPartial: (text: string) => void
 * - onFinal:   (text: string) => void
 */
export default function useVoice({
  lang = "en",
  continuous = false,
  interim = true,
  onPartial,
  onFinal,
} = {}) {
  const hasWindow = typeof window !== "undefined";

  const SpeechRec = useMemo(() => {
    if (!hasWindow) return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }, [hasWindow]);

  const supportsSTT = Boolean(SpeechRec);

  // Map short code to BCP-47
  const bcp47 = lang === "vi" ? "vi-VN" : "en-US";

  const recognitionRef = useRef(null);
  const shouldContinueRef = useRef(false); // for continuous auto-restart
  const [ready, setReady] = useState(false);
  const [listening, setListening] = useState(false);
  const [partialTranscript, setPartialTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [sttError, setSttError] = useState(null);

  // Build or rebuild recognition instance when language/support flags change
  useEffect(() => {
    if (!supportsSTT) {
      setReady(false);
      return;
    }

    const rec = new SpeechRec();
    rec.lang = bcp47;
    rec.continuous = Boolean(continuous);        // we still manually guard restarts
    rec.interimResults = Boolean(interim);
    rec.maxAlternatives = 1;

    // Handlers
    rec.onstart = () => {
      setListening(true);
      setSttError(null);
    };

    rec.onresult = (e) => {
      // Aggregate last result chunk
      let interimText = "";
      let finalText = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = (res[0] && res[0].transcript ? res[0].transcript : "").trim();
        if (res.isFinal) {
          finalText += (finalText ? " " : "") + text;
        } else {
          interimText += (interimText ? " " : "") + text;
        }
      }

      if (interim) {
        setPartialTranscript(interimText);
        if (onPartial && interimText) onPartial(interimText);
      }

      if (finalText) {
        setFinalTranscript(finalText);
        setPartialTranscript("");
        if (onFinal) onFinal(finalText);
      }
    };

    rec.onerror = (e) => {
      // Common error names: 'no-speech', 'audio-capture', 'not-allowed', 'aborted', 'network'
      const code = e?.error || "stt_error";
      setSttError(code);
      // If a one-shot session fails, ensure we reflect stopped state
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
      // If continuous mode is desired and we didn't explicitly stop, restart
      if (shouldContinueRef.current && supportsSTT) {
        // Small delay avoids rapid onend loops
        setTimeout(() => {
          try { rec.start(); } catch { /* swallow */ }
        }, 120);
      }
    };

    recognitionRef.current = rec;
    setReady(true);

    // Cleanup on unmount or rebuild
    return () => {
      try { rec.abort(); } catch {}
      recognitionRef.current = null;
      setReady(false);
    };
  }, [SpeechRec, supportsSTT, bcp47, continuous, interim, onPartial, onFinal]);

  const startListening = useCallback(() => {
    if (!supportsSTT || !recognitionRef.current) return;
    // Reset last transcripts for a fresh session
    setFinalTranscript("");
    setPartialTranscript("");
    setSttError(null);

    shouldContinueRef.current = true; // allow auto-restarts when continuous
    try {
      recognitionRef.current.start();
    } catch {
      // Some browsers throw if called twice; ignore
    }
  }, [supportsSTT]);

  const stopListening = useCallback(() => {
    shouldContinueRef.current = false;
    try { recognitionRef.current?.stop(); } catch {}
  }, []);

  const toggleListening = useCallback(() => {
    if (listening) stopListening();
    else startListening();
  }, [listening, startListening, stopListening]);

  // If language changes while listening, restart to apply new BCP-47
  useEffect(() => {
    if (!listening) return;
    // Gentle restart to apply new lang
    try { recognitionRef.current?.stop(); } catch {}
    // onend handler will auto-restart due to shouldContinueRef
  }, [bcp47]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    // Capabilities
    supportsSTT,
    supportsTTS: false, // explicit: no TTS here
    ready,

    // State
    listening,
    partialTranscript,
    lastTranscript: finalTranscript, // keep backward-compat name
    finalTranscript,
    sttError,

    // Controls
    startListening,
    stopListening,
    toggleListening,
  };
}
