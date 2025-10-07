// src/components/CayaChatWidget.jsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import cayaAvatar from "../assets/caya-avatar.png";
import useVoice from "../hooks/useVoice"; // STT only
import { STT_MODE } from "@/lib/sttMode";
import { transcribeWithServer } from "@/lib/voiceClient";
import twemoji from "twemoji";
import { useSound } from "@/lib/sound";
import { speakOpenAI } from "@/lib/ttsClient";

export default function CayaChatWidget({
  // kept for compat; UI is controlled by page lang / global setter instead
  lang: _deprecatedLangProp = "en",
 apiPath = "http://localhost:8787/api/caya",
  titleEn = "Caya — Investor Relations",
  titleVi = "Caya — Quan hệ Nhà đầu tư",
  placeholderEn = "Ask about the investor pack, SAFE, terms…",
  placeholderVi = "Hỏi về pack, SAFE, điều khoản…",
  investorPackUrlEn,
  investorPackUrlVi,
  safeNoteUrlEn,
  safeNoteUrlVi,
  founderEmail = "",
  calendlyUrl = "",
  accentColor = "#7C3AED",
  enableVoice = true,
  autoRead = true,
} = {}) {
  /* =========================
     Page language + external control
     ========================= */
  const [uiLang, setUiLang] = useState(() => {
    const pageLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return pageLang.startsWith("vi") ? "vi" : "en";
  });
  // Optional: watch <html lang> changes
  useEffect(() => {
    const el = document.documentElement;
    const read = () => {
      const v = (el.getAttribute("lang") || "").toLowerCase();
      setUiLang(v.startsWith("vi") ? "vi" : "en");
    };
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["lang"] });
    window.addEventListener("languagechange", read);
    return () => {
      mo.disconnect();
      window.removeEventListener("languagechange", read);
    };
  }, []);


const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
const API_KEY = import.meta.env.VITE_CAYA_KEY || "dev-secret";

  // Sound preference (typing SFX + TTS)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return (localStorage.getItem("caya:sound") ?? "on") === "on";
    } catch { return true; }
  });
  useEffect(() => {
    try { localStorage.setItem("caya:sound", soundEnabled ? "on" : "off"); } catch {}
  }, [soundEnabled]);
  const toggleSound = useCallback(() => setSoundEnabled(v => !v), []);

  // Keyboard shortcut: M to mute/unmute
  useEffect(() => {
    const onKey = e => { if ((e.key === "m" || e.key === "M") && (e.ctrlKey || e.metaKey || !e.shiftKey)) toggleSound(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSound]);



  // Global imperative control: window.CayaChat.setLang('vi'|'en'|null)
  const [forced, setForced] = useState(null); // 'vi' | 'en' | null
  useEffect(() => {
    window.CayaChat = window.CayaChat || {};
    window.CayaChat.setLang = (code) => {
      setForced(code === "vi" ? "vi" : code === "en" ? "en" : null);
    };
    return () => {
      if (window.CayaChat?.setLang) delete window.CayaChat.setLang;
    };
  }, []);

  const effectiveLang = forced ?? uiLang; // ← use this everywhere
const audienceForLang = effectiveLang === "vi" ? "store-owner" : "investor";
  /* =========================
     TTS configuration (auto-switch per language)
     ========================= */
  const VOICE_BY_LANG = {
    en: import.meta.env.VITE_TTS_VOICE_EN || "alloy",
    vi: import.meta.env.VITE_TTS_VOICE_VI || "aria",
  };
  const TTS_MODEL = import.meta.env.VITE_TTS_MODEL || "tts-1";

  /* =========================
     UI dictionary driven by effectiveLang
     ========================= */
  const UI = useMemo(
    () =>
      effectiveLang === "vi"
        ? {
            title: titleVi,
            placeholder: placeholderVi,
            hello:
              "Xin chào! Mình là Caya — trợ lý Quan hệ Nhà đầu tư của Cardbey. Bạn muốn xem nội dung nào trước?",
            chips: { pack: "Investor Pack", safe: "SAFE Terms", contact: "Liên hệ Founder" },
            prompts: {
              pack:
                "Hãy tóm tắt ngắn gọn nội dung chính của Investor Pack (điểm nổi bật, mô hình, thị trường, kế hoạch).",
              safe: "Giải thích điều khoản SAFE (mức trần, chiết khấu) và cách ký nhanh nhất.",
              contact: "Cho tôi cách liên hệ founder để đặt lịch gọi.",
            },
            send: "Gửi",
            emojiLabel: "Chèn emoji",
            micHold: "Nhấn và giữ để nói",
            listening: "Đang nghe…",
            sttUnsupported:
              "Trình duyệt không hỗ trợ nhận dạng giọng nói (dùng Chrome/Edge) hoặc bật STT server.",
            sttServerHold: "Nhấn và giữ để ghi âm (STT qua server)",
            sttUnsupportedShort: "Trình duyệt không hỗ trợ STT.",
          }
        : {
            title: titleEn,
            placeholder: placeholderEn,
            hello:
              "Hi! I’m Caya — Cardbey’s Investor Relations assistant. What would you like to review first?",
            chips: { pack: "Investor Pack", safe: "SAFE Terms", contact: "Contact Founder" },
            prompts: {
              pack: "Summarize the Investor Pack highlights (business model, market, plan).",
              safe: "Explain the SAFE terms (valuation cap, discount) and how to sign quickly.",
              contact: "Share how to contact the founder to book a call.",
            },
            send: "Send",
            emojiLabel: "Insert emoji",
            micHold: "Hold to talk",
            listening: "Listening…",
            sttUnsupported:
              "SpeechRecognition not supported (use Chrome/Edge) or enable server STT.",
            sttServerHold: "Hold to record (server-side speech-to-text)",
            sttUnsupportedShort: "Browser lacks STT.",
          },
    [effectiveLang, titleEn, titleVi, placeholderEn, placeholderVi]
  );

  /* =========================
     Sound + refs
     ========================= */
  const { play } = useSound();
  const { playTyping, playSend, playReceive, stopAll } = useSound({ enabled: soundEnabled });
  const lastChimedForAssistantId = useRef(null);
  const lastKeySoundAt = useRef(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPopRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const mediaRecRef = useRef(null);
  const recChunksRef = useRef([]);
   /* =========================
     State
     ========================= */
  const [handsFree] = useState(true);
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(() => [{ id: "hello", role: "assistant", content: UI.hello }]);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [recOn, setRecOn] = useState(false);

  /* =========================
     Derived / config
     ========================= */
  const KEY_INTERVAL = 70;
  const serverSTT = useMemo(() => STT_MODE === "server", []);
  const packUrl =
    effectiveLang === "vi"
      ? investorPackUrlVi || investorPackUrlEn
      : investorPackUrlEn || investorPackUrlVi;
  const safeUrl =
    effectiveLang === "vi" ? safeNoteUrlVi || safeNoteUrlEn : safeNoteUrlEn || safeNoteUrlVi;

  const base = (import.meta.env.VITE_CAYA_API_BASE || "").replace(/\/$/, "");
  const envEndpoint = import.meta.env.VITE_CHAT_ENDPOINT || (base ? `${base}/api/caya` : "");
  const endpoint = apiPath.startsWith("http") ? apiPath : envEndpoint || apiPath;

  /* =========================
     Voice (STT) — bound to effectiveLang
     ========================= */
  const { supportsSTT, listening, lastTranscript, startListening, stopListening } = useVoice({
    lang: effectiveLang === "vi" ? "vi" : "en",
    continuous: false,
    interim: true,
  });

  /* =========================
     Effects
     ========================= */
  useEffect(() => {
    if (!msgs.length) return;
    const last = msgs[msgs.length - 1];
    if (last.role !== "assistant") return;
    if (lastChimedForAssistantId.current !== last.id) {
      lastChimedForAssistantId.current = last.id;
      play("receive");
    }
  }, [msgs, play]);

  useEffect(() => {
    if (!enableVoice || !lastTranscript) return;
    sendMessage(undefined, lastTranscript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTranscript]);

  // reset greeting if language flips (and only the greeting is present)
  useEffect(() => {
    setInput("");
    setMsgs((m) =>
      m.length === 1 && m[0]?.role === "assistant"
        ? [{ id: "hello", role: "assistant", content: UI.hello }]
        : m
    );
  }, [UI.hello]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    if (!showEmoji) return;
    function onDocClick(e) {
      if (emojiPopRef.current?.contains(e.target) || emojiBtnRef.current?.contains(e.target)) return;
      setShowEmoji(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [showEmoji]);

  /* =========================
     Helpers
     ========================= */
  const onInputChange = useCallback(
    (e) => {
      const v = e.target.value;
      setInput(v);
      const now = Date.now();
      if (now - lastKeySoundAt.current > KEY_INTERVAL && v) {
        lastKeySoundAt.current = now;
        play("key");
      }
    },
    [play]
  );

  function systemMsg() {
    const language = effectiveLang === "vi" ? "Vietnamese" : "English";
    const forbid =
      effectiveLang === "vi"
        ? "Respond ONLY in Vietnamese. Do not use English."
        : "Respond ONLY in English. Do not use Vietnamese.";
    return {
      role: "system",
      content:
        `You are Caya, Cardbey's Investor Relations assistant. Always reply in ${language}. ${forbid} ` +
        `Be concise and professional. Use short bullets when helpful.\n` +
        `- Investor Pack: ${packUrl || "(not provided)"}\n` +
        `- SAFE Note: ${safeUrl || "(not provided)"}\n` +
        `- Book a call: ${calendlyUrl || "(not provided)"}; Founder email: ${founderEmail || "(not provided)"}\n` +
        `Typical topics: traction, unit economics, pricing, use of funds, team, roadmap, competition.`,
    };
  }

  function pickAssistantText(data) {
    if (data?.choices?.[0]?.message?.content) return data.choices[0].message.content;
    if (data?.content) return data.content;
    if (data?.message) return data.message;
    return typeof data === "string" ? data : JSON.stringify(data);
  }

  function emojiSvgUrl(ch) {
    try {
      const code = twemoji.convert.toCodePoint(ch);
      return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`;
    } catch {
      return null;
    }
  }

  function insertAtCursor(str) {
    const el = inputRef.current;
    if (!el) {
      setInput((v) => (v || "") + str);
      return;
    }
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, start) + str + el.value.slice(end);
    setInput(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + str.length;
    });
  }

  function onEmojiClick(emoji) {
    if (!input.trim()) {
      sendMessage(null, emoji);
    } else {
      insertAtCursor(emoji);
    }
    setShowEmoji(false);
  }

  function openOrAsk(url, prompt) {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setInput(prompt);
      setTimeout(() => sendMessage({ preventDefault() {} }), 0);
    }
  }

  async function speakOut(text) {
  if (!text || !enableVoice || !autoRead) return;
  const voice = VOICE_BY_LANG[effectiveLang] || VOICE_BY_LANG.en;

  try {
    const r = await fetch("/api/tts-openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voice,
        model: TTS_MODEL, // e.g., "gpt-4o-mini-tts"
      }),
    });
    if (!r.ok) throw new Error(`TTS HTTP ${r.status} ${r.statusText}`);

    const blob = await r.blob();              // audio/*
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    // autoplay might be blocked until first user gesture
    audio.play().catch(() => console.warn("Autoplay blocked—will play after user interaction."));
    audio.addEventListener("ended", () => URL.revokeObjectURL(url), { once: true });
  } catch (e) {
    console.warn("[TTS] playback failed:", e);
  }
}


async function sendMessage(e, overrideText) {
  e?.preventDefault?.();
  const text = (overrideText ?? input).trim();
  if (!text || loading) return;

  play("send");

  const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
  const next = [...msgs, userMsg];

  // live assistant bubble
  const liveId = crypto.randomUUID();
  setMsgs([...next, { id: liveId, role: "assistant", content: "" }]);
  setInput("");
  setLoading(true);

  // recent history for context
  const history = next.slice(-8).map(m => ({ role: m.role, content: m.content }));

  // endpoints
  const base = (endpoint || "").replace(/\/+$/, "");
  const askBase = base.endsWith("/ask") ? base : `${base}/ask`;
  const streamUrl = `${askBase}/stream`;
  const nonStreamUrl = askBase;

  const body = { q: text, message: text, audience: audienceForLang, k: 4, history };

  // helper: append tokens to live bubble
  const pushToken = (tok) => {
    if (!tok) return;
    setMsgs(m => m.map(x => (x.id === liveId ? { ...x, content: (x.content || "") + tok } : x)));
  };

  // local accumulator used for TTS
  let streamedText = "";

  try {
    // --- 1) Try streaming first ---
    const streamRes = await fetch(streamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-caya-key": API_KEY },
      body: JSON.stringify(body),
    });

    if (streamRes.ok && (streamRes.headers.get("content-type") || "").includes("text/event-stream")) {
      const reader = streamRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";

        for (const frame of frames) {
          const lines = frame.split("\n");
          if (lines.some(l => l.startsWith("event: done"))) { buffer = ""; break; }
          const dataLine = lines.find(l => l.startsWith("data: "));
          if (!dataLine) continue;

          try {
            const payload = JSON.parse(dataLine.slice(6));
            const tok = payload.token ?? payload.delta ?? "";
            if (tok) {
              streamedText += tok;
              pushToken(tok);
            }
          } catch {
            // ignore malformed frame
          }
        }
      }

      if (streamedText.trim()) await speakOut(streamedText.trim());
      setLoading(false);
      inputRef.current?.focus();
      return; // streaming path done
    }

    // --- 2) Fallback to non-streaming route ---
    const res = await fetch(nonStreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-caya-key": API_KEY },
      body: JSON.stringify(body),
    });

    const ct = (res.headers.get("content-type") || "").toLowerCase();
    let data;
    if (ct.includes("application/json")) {
      data = await res.json();
    } else {
      const t = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}\n${t.slice(0, 300)}`);
      data = { reply: t };
    }

    const reply =
      (data?.reply ?? data?.answer ?? data?.content ?? data?.message ?? "").toString().trim() ||
      "(no reply)";

    setMsgs(m => m.map(x => (x.id === liveId ? { ...x, content: reply } : x)));
    if (reply && reply !== "(no reply)") await speakOut(reply);
  } catch (err) {
    setMsgs(m => m.map(x => (x.id === liveId ? { ...x, content: `Request failed: ${err?.message || err}` } : x)));
  } finally {
    setLoading(false);
    inputRef.current?.focus();
  }
}


  // Server-side STT fallback (only when supportsSTT=false and STT_MODE==='server')
  async function startRecordFallback() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    recChunksRef.current = [];
    rec.ondataavailable = (e) => e.data && recChunksRef.current.push(e.data);
    rec.onstop = async () => {
      const blob = new Blob(recChunksRef.current, { type: rec.mimeType || "audio/webm" });
      try {
        // Pass language hint to your server STT if supported
        const text = await transcribeWithServer(blob, { language: effectiveLang });
        if (text?.trim()) sendMessage(undefined, text.trim());
      } catch (e) {
        setMsgs((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "assistant", content: e?.message || "STT failed" },
        ]);
      }
      stream.getTracks().forEach((t) => t.stop());
      setRecOn(false);
    };
    mediaRecRef.current = rec;
    rec.start();
    setRecOn(true);
  }
  function stopRecordFallback() {
    try {
      mediaRecRef.current?.stop();
    } catch {}
  }

  /* =========================
     Styles
     ========================= */
  const css = `
  :root { --caya-accent:${accentColor}; --caya-bg:#ffffff; --caya-fg:#0f172a; }
  @media (prefers-color-scheme: dark){ :root { --caya-bg:rgba(3,8,22,0.98); --caya-fg:#e6edf7; } }
  .caya-fab{ position:fixed; right:24px; bottom:24px; width:72px; height:72px; padding:0; border:0; background:transparent; border-radius:9999px; overflow:visible; z-index:10000; isolation:isolate; }
  .caya-fab-inner{ position:relative; z-index:1; display:block; width:100%; height:100%; overflow:hidden; border-radius:9999px; border:1px solid rgba(0,0,0,.12); box-shadow:0 10px 30px rgba(0,0,0,.25); background:#fff; }
  .caya-fab-inner img{ width:100%; height:100%; object-fit:cover; display:block; }
  .caya-fab-pill{ position:absolute; right:-10px; bottom:-6px; display:inline-flex; gap:6px; align-items:center; padding:6px 10px; border-radius:9999px; background:#fff; box-shadow:0 8px 24px rgba(0,0,0,.22); z-index:5; pointer-events:none; }
  .caya-fab-pill i{ width:8px; height:8px; border-radius:9999px; background:var(--caya-accent); animation:caya-bounce 1s infinite; }
  .caya-fab-pill i:nth-child(2){ animation-delay:.12s } .caya-fab-pill i:nth-child(3){ animation-delay:.24s }
  @keyframes caya-bounce { 0%,80%,100%{ transform:translateY(0) } 40%{ transform:translateY(-4px) } }

  .caya-panel{ position:fixed; right:20px; bottom:110px; z-index:9999; width:420px; max-width:calc(100vw - 32px); height:560px; background:var(--caya-bg); color:var(--caya-fg); border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.35); border:1px solid rgba(0,0,0,.06); display:flex; flex-direction:column; }

  .caya-head{ height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 14px; border-bottom:1px solid rgba(0,0,0,.08); background:linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.70)); backdrop-filter:saturate(120%) blur(8px); }
  @media (prefers-color-scheme: dark){ .caya-head{ background:linear-gradient(180deg, rgba(7,11,22,.85), rgba(7,11,22,.70)); border-bottom-color:rgba(255,255,255,.08) } }
  .caya-title{ font-weight:700 }

  /* hide whole panel when closed */
  .caya-panel[hidden]{ display:none !important; }

  .caya-quick{ display:flex; gap:10px; padding:8px 12px 0 12px; }
  .caya-chip{ border:1px solid rgba(0,0,0,.1); background:#fff; color:#111827; border-radius:9999px; padding:6px 10px; font-size:12px; cursor:pointer; }
  @media (prefers-color-scheme: dark){ .caya-chip{ background:#0b1220; color:#e6edf7; border-color:rgba(255,255,255,.12) } }

  .caya-list{ flex:1; overflow:auto; padding:14px }
  .caya-row{ display:flex; margin:10px 0 }
  .me{ justify-content:flex-end }
  .caya-bubble{ max-width:78%; padding:12px 14px; border-radius:14px; background:#f3f4f6; color:#0f172a; box-shadow:0 6px 20px rgba(0,0,0,.06); }
  .me .caya-bubble{ background:var(--caya-accent); color:#fff; box-shadow:0 6px 24px rgba(124,58,237,.35); }
  @media (prefers-color-scheme: dark){ .caya-bubble{ background:rgba(255,255,255,.06); color:#e6edf7; } }

  .caya-emoji-row{ display:flex; gap:6px; padding:6px 12px 0 12px; overflow-x:auto; }
  .caya-emoji-chip{ border:1px solid rgba(0,0,0,.1); background:#fff; border-radius:9999px; padding:4px 8px; font-size:16px; cursor:pointer; flex:0 0 auto; }
  @media (prefers-color-scheme: dark){ .caya-emoji-chip{ background:#0b1220; border-color:rgba(255,255,255,.12) } }

  .caya-input{ position:relative; display:flex; align-items:center; gap:10px; padding:12px; border-top:1px solid rgba(0,0,0,.08) }
  .caya-emoji-btn{ width:44px; height:44px; border-radius:9999px; border:1px solid rgba(0,0,0,.1); background:#fff; cursor:pointer; font-size:18px; line-height:1; flex:0 0 auto; }
  .caya-mic-btn{ width:44px; height:44px; border-radius:9999px; border:1px solid rgba(0,0,0,.1); background:#fff; cursor:pointer; font-size:18px; line-height:1; flex:0 0 auto; }
  .caya-mic-btn[aria-pressed="true"]{ outline:2px solid var(--caya-accent); }
  .caya-input input{ flex:1; height:44px; border-radius:9999px; border:1px solid rgba(0,0,0,.1); padding:0 16px; outline:none; background:#fff; color:#0f172a; }
  @media (prefers-color-scheme: dark){ .caya-input{ border-top-color:rgba(255,255,255,.08) } .caya-input input{ background:#0b1220; color:#e6edf7; border-color:rgba(255,255,255,.12) } }

  .caya-send{ height:44px; padding:0 18px; border-radius:9999px; border:0; cursor:pointer; background:var(--caya-accent); color:#fff; font-weight:700; box-shadow:0 10px 30px rgba(124,58,237,.35); }
  .caya-send:disabled{ opacity:.55; cursor:default; box-shadow:none }

  .caya-emoji-pop{ position:absolute; bottom:56px; left:12px; z-index:50; background:#fff; border:1px solid rgba(0,0,0,.1); border-radius:12px; box-shadow:0 16px 40px rgba(0,0,0,.18); padding:8px; display:grid; grid-template-columns: repeat(8, 28px); gap:6px; }
  @media (max-width:480px){ .caya-emoji-pop{ grid-template-columns:repeat(6, 28px); left:auto; right:12px; } }
  .caya-emoji-cell{ width:28px; height:28px; border-radius:8px; border:0; background:transparent; cursor:pointer; font-size:18px; line-height:1; }
  .caya-emoji-cell:hover{ background:rgba(0,0,0,.06) }
  `;

  /* =========================
     Render
     ========================= */
  return (
    <>
      <style>{css}</style>

      {/* Panel */}
      {createPortal(
        <div
          className="caya-panel"
          role="dialog"
          aria-label={UI.title}
          hidden={!open}
          data-open={open ? "true" : "false"}
        >
          <div className="caya-head" style={{ position: "relative" }}>
            <div className="caya-title">{UI.title}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => (listening ? stopListening() : startListening())}
                disabled={!supportsSTT}
                title={supportsSTT ? (listening ? UI.listening : UI.micHold) : UI.sttUnsupported}
              >
                {listening ? "Stop 🎙️" : "Talk 🎙️"}
              </button>
              <button
                type="button"
                aria-label="Minimize"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                }}
                style={{ marginLeft: 4 }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Quick IR actions */}
          <div className="caya-quick">
            <button className="caya-chip" onClick={() => openOrAsk(packUrl, UI.prompts.pack)}>
              {UI.chips.pack}
            </button>
            <button className="caya-chip" onClick={() => openOrAsk(safeUrl, UI.prompts.safe)}>
              {UI.chips.safe}
            </button>
            <button
              className="caya-chip"
              onClick={() =>
                founderEmail
                  ? (window.location.href = `mailto:${founderEmail}`)
                  : openOrAsk(null, UI.prompts.contact)
              }
            >
              {UI.chips.contact}
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="caya-list">
            {msgs.map((m) => (
              <div key={m.id} className={`caya-row ${m.role === "user" ? "me" : ""}`}>
                <div className="caya-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="caya-row">
                <div className="caya-typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Small favorites row */}
          <div className="caya-emoji-row" role="group" aria-label="Quick emojis">
            {["😀", "🙂", "🤝", "🚀", "💼", "📊", "🧾", "💡", "🤖"].map((e, i) => (
              <button
                type="button"
                key={i}
                className="caya-emoji-chip"
                onClick={() => onEmojiClick(e)}
                aria-label={`emoji ${e}`}
                title={e}
              >
                <img
                  src={emojiSvgUrl(e)}
                  alt={e}
                  onError={(ev) => {
                    ev.currentTarget.replaceWith(document.createTextNode(e));
                  }}
                  className="caya-emoji-img"
                />
              </button>
            ))}
          </div>

          {/* Input line */}
          <form className="caya-input" onSubmit={sendMessage}>
            <button
              type="button"
              ref={emojiBtnRef}
              className="caya-emoji-btn"
              aria-label={UI.emojiLabel}
              onClick={() => setShowEmoji((v) => !v)}
            >
              😊
            </button>

            {/* Tiny mic button (press & hold). If no browser STT, only works when server STT enabled. */}
            {enableVoice && (
              <button
                type="button"
                className="caya-mic-btn"
                aria-label={listening ? UI.listening : UI.micHold}
                aria-pressed={listening ? "true" : "false"}
                onMouseDown={() =>
                  supportsSTT ? startListening() : serverSTT ? startRecordFallback() : null
                }
                onMouseUp={() =>
                  supportsSTT ? stopListening() : serverSTT ? stopRecordFallback() : null
                }
                onTouchStart={() => (supportsSTT ? startListening() : undefined)}
                onTouchEnd={() => (supportsSTT ? stopListening() : undefined)}
                title={
                  supportsSTT ? undefined : serverSTT ? UI.sttServerHold : UI.sttUnsupportedShort
                }
              >
                {listening || recOn ? "🎙️" : "🎤"}
              </button>
            )}

            <input
              ref={inputRef}
              value={input}
              onChange={onInputChange}
              placeholder={UI.placeholder}
              aria-label="Message Caya"
            />

            <button className="caya-send" disabled={loading || !input.trim()}>
              {UI.send}
            </button>

            {showEmoji && (
              <div ref={emojiPopRef} className="caya-emoji-pop" role="dialog" aria-label="Emoji picker">
                {[
                  "😀",
                  "🙂",
                  "🤝",
                  "🚀",
                  "💼",
                  "📊",
                  "🧾",
                  "💡",
                  "🤖",
                  "📈",
                  "🛠️",
                  "✅",
                  "❓",
                  "📣",
                  "🧠",
                  "⏱️",
                  "💰",
                  "📄",
                  "🔗",
                ].map((e, i) => (
                  <button
                    key={i}
                    type="button"
                    className="caya-emoji-cell"
                    onClick={() => onEmojiClick(e)}
                    aria-label={`emoji ${e}`}
                    title={e}
                  >
                    <img
                      src={emojiSvgUrl(e)}
                      alt={e}
                      onError={(ev) => {
                        ev.currentTarget.replaceWith(document.createTextNode(e));
                      }}
                      className="caya-emoji-img"
                    />
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>,
        document.body
      )}

      {/* Floating avatar — only toggles chat; never touches language */}
      {createPortal(
        <button
          className="caya-fab"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // block any global click handlers
            setOpen((v) => !v);
          }}
          aria-label={open ? "Minimize chat" : "Open chat"}
        >
          <span className="caya-fab-inner">
            <img src={cayaAvatar} alt="Caya" />
          </span>
          {!open && (
            <span className="caya-fab-pill" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
        </button>,
        document.body
      )}
    </>
  );
}

/* ---------------------------
   Stub to simulate assistant (unused if you have a backend)
   --------------------------- */
async function fetchAssistant(text) {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ id: crypto.randomUUID(), text: "Here’s the assistant reply to: " + text }),
      300
    )
  );
}
