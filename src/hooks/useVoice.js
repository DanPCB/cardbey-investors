// src/hooks/useVoice.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * STT-only Web Speech hook (safe for iOS/Safari)
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

  // Keep the latest callbacks without re-binding the recognizer
  const onPartialRef = useRef(onPartial);
  const onFinalRef = useRef(onFinal);
  useEffect(() => { onPartialRef.current = onPartial; }, [onPartial]);
  useEffect(() => { onFinalRef.current = onFinal; }, [onFinal]);

  const SpeechRec = useMemo(() => {
    if (!hasWindow) return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }, [hasWindow]);

  const supportsSTT = Boolean(SpeechRec);
  const bcp47 = lang === "vi" ? "vi-VN" : "en-US";

  // Refs/state
  const recognitionRef = useRef(null);
  const shouldContinueRef = useRef(false);     // controls auto-restart
  const mountedRef = useRef(true);             // prevents setState after unmount
  const [ready, setReady] = useState(false);
  const [listening, setListening] = useState(false);
  const [partialTranscript, setPartialTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [sttError, setSttError] = useState(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Build or rebuild recognition instance when support/lang flags change.
  useEffect(() => {
    // Clean up any previous instance
    try { recognitionRef.current?.abort?.(); } catch {}
    recognitionRef.current = null;
    if (!supportsSTT) {
      if (mountedRef.current) setReady(false);
      return;
    }

    let rec = null;
    try {
      rec = new SpeechRec(); // Safari can throw here
    } catch (err) {
      if (mountedRef.current) {
        setReady(false);
        setSttError(String(err?.message || err) || "speech-constructor-error");
      }
      return;
    }

    rec.lang = bcp47;
    rec.continuous = Boolean(continuous);
    rec.interimResults = Boolean(interim);
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      if (!mountedRef.current) return;
      setListening(true);
      setSttError(null);
    };

    rec.onresult = (e) => {
      if (!mountedRef.current) return;
      let interimText = "";
      let finalText = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = (res?.[0]?.transcript || "").trim();
        if (res.isFinal) {
          finalText += (finalText ? " " : "") + text;
        } else {
          interimText += (interimText ? " " : "") + text;
        }
      }

      if (interim) {
        setPartialTranscript(interimText);
        if (interimText && onPartialRef.current) onPartialRef.current(interimText);
      }

      if (finalText) {
        setFinalTranscript(finalText);
        setPartialTranscript("");
        if (onFinalRef.current) onFinalRef.current(finalText);
      }
    };

    rec.onerror = (e) => {
      if (!mountedRef.current) return;
      const code = e?.error || "stt_error";
      setSttError(code);
      setListening(false);
      // Most common: "not-allowed", "no-speech". We do not auto-retry here.
    };

    rec.onend = () => {
      if (!mountedRef.current) return;
      setListening(false);

      // In continuous mode, try to restart gently unless explicitly stopped.
      if (shouldContinueRef.current) {
        // Avoid tight loops or InvalidStateError
        setTimeout(() => {
          try { rec.start(); } catch { /* swallow */ }
        }, 120);
      }
    };

    recognitionRef.current = rec;
    if (mountedRef.current) setReady(true);

    // Cleanup on unmount or rebuild
    return () => {
      try { rec.abort(); } catch {}
      if (mountedRef.current) setReady(false);
      recognitionRef.current = null;
    };
  }, [SpeechRec, supportsSTT, bcp47, continuous, interim]);

  const startListening = useCallback(() => {
    if (!supportsSTT || !recognitionRef.current) return;
    if (!mountedRef.current) return;

    // Fresh session
    setFinalTranscript("");
    setPartialTranscript("");
    setSttError(null);

    shouldContinueRef.current = true;

    try {
      recognitionRef.current.start();
    } catch (err) {
      // Safari throws InvalidStateError if start() called twice or without user gesture
      // We ignore; UI state will remain consistent via onstart/onerror.
    }
  }, [supportsSTT]);

  const stopListening = useCallback(() => {
    shouldContinueRef.current = false;
    try { recognitionRef.current?.stop?.(); } catch {}
  }, []);

  const toggleListening = useCallback(() => {
    if (listening) stopListening();
    else startListening();
  }, [listening, startListening, stopListening]);

  // If language changes while actively listening, do a gentle restart to apply BCP-47
  useEffect(() => {
    if (!listening) return;
    try { recognitionRef.current?.stop?.(); } catch {}
    // onend will see shouldContinueRef.current === true and restart
  }, [bcp47, listening]);

  return {
    // Capabilities
    supportsSTT,
    supportsTTS: false,

    // State
    ready,
    listening,
    partialTranscript,
    lastTranscript: finalTranscript, // backward-compat
    finalTranscript,
    sttError,

    // Controls
    startListening,
    stopListening,
    toggleListening,
  };
}
