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
  apiPath = "", // leave empty; env-based URLs below handle everything
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
     const [talkOn, setTalkOn] = useState(false);
     const [open, setOpen] = useState(true);
  const [uiLang, setUiLang] = useState(() => {
    const pageLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return pageLang.startsWith("vi") ? "vi" : "en";
  });

  useEffect(() => {
  if (!open && talkOn) stopTalk();
}, [open]); // add near your other effects

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

  /* =========================
     API base & helpers
     ========================= */
  const RAW_API_BASE =
  (import.meta.env.VITE_API_BASE ||
    import.meta.env.VITE_CAYA_API ||  
    "").trim();


const API_BASE = (import.meta.env.VITE_CAYA_API_BASE || apiPath || "").replace(/\/$/, "");
if (!API_BASE) console.warn("[Caya] VITE_CAYA_API_BASE is empty; set it to your backend /api/caya");


const CAYA_KEY = (import.meta.env.VITE_CAYA_KEY || "").trim();


const build = (p = "") => `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
const ASK_URL = build("/ask");
const ASK_STREAM_URL = build("/ask/stream");
const STREAM_URLS = ["/api/caya/ask/stream", "/caya/ask/stream"].map(build);
const NONSTREAM_URLS = ["/api/caya/ask", "/caya/ask"].map(build);
const TTS_URL  = (import.meta.env.VITE_TTS_URL || "/api/tts-openai").trim();

  /* =========================
     Language, UI, sound, refs
     ========================= */
  const effectiveLang = useMemo(() => uiLang, [uiLang]);
const audienceForLang = effectiveLang === "vi" ? "store-owner" : "investor";

const recognitionRef = useRef(null);   // Web Speech API
const mediaStreamRef = useRef(null)
const VOICE_BY_LANG = {
  en: import.meta.env.VITE_TTS_VOICE_EN || "alloy",
  vi: import.meta.env.VITE_TTS_VOICE_VI || "aria",
};
const TTS_MODEL = import.meta.env.VITE_TTS_MODEL || "gpt-4o-mini-tts";

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

  const { play } = useSound();
  const { playTyping, playSend, playReceive, stopAll } = useSound({ enabled: true });
  const lastChimedForAssistantId = useRef(null);
  const lastKeySoundAt = useRef(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPopRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const mediaRecRef = useRef(null);
  const recChunksRef = useRef([]);
  
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return (localStorage.getItem("caya:sound") ?? "on") === "on";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("caya:sound", soundEnabled ? "on" : "off");
    } catch {}
  }, [soundEnabled]);
  const toggleSound = useCallback(() => setSoundEnabled((v) => !v), []);

  // Keyboard shortcut: M to mute/unmute
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "m" || e.key === "M") && (e.ctrlKey || e.metaKey || !e.shiftKey)) toggleSound();
    };
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
  const effectiveLangFinal = forced ?? effectiveLang;

  /* =========================
     State
     ========================= */
  const [handsFree] = useState(true);

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
    effectiveLangFinal === "vi"
      ? investorPackUrlVi || investorPackUrlEn
      : investorPackUrlEn || investorPackUrlVi;
  const safeUrl =
    effectiveLangFinal === "vi" ? safeNoteUrlVi || safeNoteUrlEn : safeNoteUrlEn || safeNoteUrlVi;

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
    if (!enableVoice) return;
    // hook updates lastTranscript when speaking stops
  }, [enableVoice]);

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
async function startTalk() {
  // prefer browser STT if available and not forced to server
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRec && STT_MODE !== "server") {
    try {
      const rec = new SpeechRec();
      recognitionRef.current = rec;
      rec.lang = sttLangCode();
      rec.continuous = true;
      rec.interimResults = false;

      rec.onresult = (ev) => {
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          if (res.isFinal) {
            const text = (res[0]?.transcript || "").trim();
            if (text) sendMessage(undefined, text);
          }
        }
      };
      rec.onerror = (e) => {
        console.warn("[STT:browser] error:", e?.error || e);
        // fallback to server if permission/blocked
        try { rec.stop(); } catch {}
        recognitionRef.current = null;
        startTalkServer();
      };
      rec.onend = () => {
        // keep listening while toggled on
        if (talkOn && recognitionRef.current) {
          try { rec.start(); } catch {}
        }
      };

      rec.start();
      setTalkOn(true);
      return;
    } catch (e) {
      console.warn("[STT:browser] failed; using server fallback:", e);
    }
  }

  // fallback immediately if no browser STT
  await startTalkServer();
}

async function startTalkServer() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const rec = new MediaRecorder(stream);
    mediaRecRef.current = rec;

    // Send rolling chunks every 2.5s
    rec.ondataavailable = async (e) => {
      if (!talkOn) return;
      if (!e.data || !e.data.size) return;
      try {
        const text = await transcribeWithServer(e.data, { language: effectiveLangFinal });
        if (text && text.trim()) sendMessage(undefined, text.trim());
      } catch (err) {
        console.warn("[STT:server] chunk failed:", err?.message || err);
      }
    };

    rec.onstop = () => {
      // cleanup
      stream.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      mediaRecRef.current = null;
    };

    rec.start(2500); // ms per chunk
    setTalkOn(true);
  } catch (e) {
    console.warn("[STT] microphone start failed:", e?.message || e);
    setTalkOn(false);
  }
}

function stopTalk() {
  setTalkOn(false);
  // stop browser STT
  try { recognitionRef.current?.stop(); } catch {}
  recognitionRef.current = null;

  // stop server STT
  try { mediaRecRef.current?.stop(); } catch {}
  try { mediaStreamRef.current?.getTracks()?.forEach((t) => t.stop()); } catch {}
  mediaRecRef.current = null;
  mediaStreamRef.current = null;
}


function sttLangCode() {
  return effectiveLangFinal === "vi" ? "vi-VN" : "en-US";
}

  function emojiSvgUrl(ch) {
    try {
      const code = twemoji.convert.toCodePoint(ch);
      return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`;
    } catch {
      return null;
    }
  }

  function onEmojiClick(emoji) {
    if (!input.trim()) {
      sendMessage(null, emoji);
    } else {
      insertAtCursor(emoji);
    }
    setShowEmoji(false);
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

  async function speakOut(text) {
    if (!text || !enableVoice || !autoRead) return;
    const voice = VOICE_BY_LANG[effectiveLangFinal] || VOICE_BY_LANG.en;
    try {
      const r = await fetch(TTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, model: TTS_MODEL }),
      });
      if (!r.ok) throw new Error(`TTS HTTP ${r.status} ${r.statusText}`);
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => console.warn("Autoplay blocked—will play after user interaction."));
      audio.addEventListener("ended", () => URL.revokeObjectURL(url), { once: true });
    } catch (e) {
      console.warn("[TTS] playback failed:", e);
    }
  }

  
 /* =========================
   Networking
   ========================= */
async function postJSON(url, payload) {
  const headers = { "Content-Type": "application/json" };
  if (CAYA_KEY) headers["x-caya-key"] = CAYA_KEY;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${url} → ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}


// Optional: streaming (SSE). If unsupported, it will throw and we’ll fall back.
async function tryStream(url, body, onToken) {
  const headers = { "Content-Type": "application/json" };
  if (CAYA_KEY) headers["x-caya-key"] = CAYA_KEY;

  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  const ct = (res.headers.get("content-type") || "").toLowerCase();

  if (!res.ok || !ct.includes("text/event-stream")) {
    throw new Error(`No SSE (${res.status})`);
  }

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = dec.decode(value, { stream: true });
    const lines = chunk.split("\n\n");

    for (const line of lines) {
      if (!line || !line.startsWith("data:")) continue;
      const raw = line.slice(5).trim();
      if (!raw) continue;

      let payload;
      try { payload = JSON.parse(raw); } catch { continue; }

      if (payload.token) {
        full += payload.token;
        if (typeof onToken === "function") onToken(payload.token);
      }
    }
  }

  return full; // <- return the complete streamed text
}


// Non-stream fallback (single JSON)
async function askOnce(body) {
  return postJSON(ASK_URL, body);
}

async function sendMessage(e, overrideText) {
  e?.preventDefault?.();
  const text = (overrideText ?? input).trim();
  if (!text || loading) return;

  play("send");

  const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
  const prior = [...msgs, userMsg];

  // live assistant bubble
  const liveId = crypto.randomUUID();
  setMsgs([...prior, { id: liveId, role: "assistant", content: "" }]);
  setInput("");
  setLoading(true);

  // compact history
  const history = prior.slice(-8).map((m) => ({ role: m.role, content: m.content }));

  const body = {
  q: text,
  audience: audienceForLang,
  k: 4,
  history,
  rag: false,          // keep training off
  allowWeb: true       // let backend pull general web info
};


    try {
    // Try streaming first
    const finalText = await tryStream(ASK_STREAM_URL, body, (tok) => {
      setMsgs((m) =>
        m.map((x) => (x.id === liveId ? { ...x, content: (x.content || "") + tok } : x))
      );
    });

    const toSpeak = (finalText || "").trim();
    if (toSpeak) await speakOut(toSpeak);

  } catch {
    // Fallback to non-stream JSON
    try {
      const data = await askOnce(body);
      const reply =
        (data.reply ?? data.answer ?? data.content ?? data.message ?? "").toString().trim() ||
        "(no reply)";
      setMsgs((m) => m.map((x) => (x.id === liveId ? { ...x, content: reply } : x)));
      if (reply && reply !== "(no reply)") await speakOut(reply);
    } catch (nonStreamErr) {
      const msg = `Request failed: ${nonStreamErr?.message || nonStreamErr}`;
      setMsgs((m) => m.map((x) => (x.id === liveId ? { ...x, content: msg } : x)));
    }
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
        const text = await transcribeWithServer(blob, { language: effectiveLangFinal });
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

  .caya-fab{
    position:fixed;
    right: clamp(12px, 4vw, 24px);
    bottom: calc(env(safe-area-inset-bottom, 0px) + clamp(12px, 4vw, 24px));
    width: clamp(56px, 14vw, 72px);
    height: clamp(56px, 14vw, 72px);
    padding:0; border:0; background:transparent; border-radius:9999px;
    overflow:visible; z-index:10000; isolation:isolate;
  }
  .caya-fab-inner{ position:relative; z-index:1; display:block; width:100%; height:100%; overflow:hidden; border-radius:9999px; border:1px solid rgba(0,0,0,.12); box-shadow:0 10px 30px rgba(0,0,0,.25); background:#fff; }
  .caya-fab-inner img{ width:100%; height:100%; object-fit:cover; display:block; }
  .caya-fab-pill{ position:absolute; right:-10px; bottom:-6px; display:inline-flex; gap:6px; align-items:center; padding:6px 10px; border-radius:9999px; background:#fff; box-shadow:0 8px 24px rgba(0,0,0,.22); z-index:5; pointer-events:none; }
  .caya-fab-pill i{ width:8px; height:8px; border-radius:9999px; background:var(--caya-accent); animation:caya-bounce 1s infinite; }
  .caya-fab-pill i:nth-child(2){ animation-delay:.12s } .caya-fab-pill i:nth-child(3){ animation-delay:.24s }
  @keyframes caya-bounce { 0%,80%,100%{ transform:translateY(0) } 40%{ transform:translateY(-4px) } }

  .caya-panel{
    position:fixed;
    right: clamp(8px, 4vw, 20px);
    bottom: calc(env(safe-area-inset-bottom, 0px) + clamp(76px, 18vw, 88px));
    width: min(92vw, 420px);
    max-height: calc(80vh - env(safe-area-inset-bottom, 0px));
    background:var(--caya-bg); color:var(--caya-fg);
    border-radius:16px; overflow:hidden;
    box-shadow:0 20px 60px rgba(0,0,0,.35);
    border:1px solid rgba(0,0,0,.06);
    display:flex; flex-direction:column;
    z-index:9999;
  }

  @media (min-width: 768px){
    .caya-panel{
      width: min(420px, 36vw);
      max-height: min(78vh, 720px);
      border-radius:20px;
    }
  }

  .caya-lang{
    display:inline-flex;
    border:1px solid rgba(0,0,0,.12);
    border-radius:9999px;
    overflow:hidden;
    background:rgba(255,255,255,.75);
  }
  @media (prefers-color-scheme: dark){
    .caya-lang{ border-color:rgba(255,255,255,.16); background:rgba(12,16,28,.7); }
  }
  .caya-lang-btn{
    height:28px;
    padding:0 10px;
    font-size:12px;
    line-height:28px;
    border:0;
    background:transparent;
    color:inherit;
    cursor:pointer;
  }
  .caya-lang-btn.on{
    background: var(--caya-accent);
    color:#fff;
  }

  .caya-head{
    min-height: 52px;
    display:flex; align-items:center; justify-content:space-between;
    padding: 0 12px;
    border-bottom:1px solid rgba(0,0,0,.08);
    background:linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.70));
    backdrop-filter:saturate(120%) blur(8px);
  }
  @media (prefers-color-scheme: dark){
    .caya-head{ background:linear-gradient(180deg, rgba(7,11,22,.85), rgba(7,11,22,.70)); border-bottom-color:rgba(255,255,255,.08) }
  }
  .caya-title{ font-weight:700; font-size:14px; }

  .caya-panel[hidden]{ display:none !important; }

  .caya-quick{ display:flex; gap:8px; padding:8px 10px 0 10px; }
  .caya-chip{
    border:1px solid rgba(0,0,0,.1); background:#fff; color:#111827;
    border-radius:9999px; padding:6px 10px; font-size:12px; cursor:pointer;
  }
  @media (prefers-color-scheme: dark){
    .caya-chip{ background:#0b1220; color:#e6edf7; border-color:rgba(255,255,255,.12) }
  }

  .caya-list{
    flex:1;
    overflow:auto;
    padding:12px 12px 10px;
    min-height: 140px;
    -webkit-overflow-scrolling: touch;
  }

  .caya-row{ display:flex; margin:8px 0 }
  .me{ justify-content:flex-end }
  .caya-bubble{
    max-width: 88%;
    padding:10px 12px; border-radius:12px;
    background:#f3f4f6; color:#0f172a; box-shadow:0 6px 20px rgba(0,0,0,.06);
    font-size:14px; line-height:1.45;
    word-wrap:break-word; overflow-wrap:anywhere;
  }
  .me .caya-bubble{ background:var(--caya-accent); color:#fff; box-shadow:0 6px 24px rgba(124,58,237,.35); }
  @media (prefers-color-scheme: dark){ .caya-bubble{ background:rgba(255,255,255,.06); color:#e6edf7; } }

  .caya-emoji-row{ display:flex; gap:6px; padding:6px 10px 0 10px; overflow-x:auto; -webkit-overflow-scrolling: touch; }
  .caya-emoji-chip{ border:1px solid rgba(0,0,0,.1); background:#fff; border-radius:9999px; padding:4px 8px; font-size:16px; cursor:pointer; flex:0 0 auto; }
  @media (prefers-color-scheme: dark){ .caya-emoji-chip{ background:#0b1220; border-color:rgba(255,255,255,.12) } }

  .caya-input{
    display:flex; align-items:center; gap:8px;
    padding:8px 10px;
    border-top:1px solid rgba(0,0,0,.08);
    background: rgba(0,0,0,.02);
  }
  .caya-emoji-btn, .caya-mic-btn{
    width:40px; height:40px; border-radius:9999px;
    border:1px solid rgba(0,0,0,.1); background:#fff; cursor:pointer; font-size:18px; line-height:1; flex:0 0 auto;
  }
  .caya-mic-btn[aria-pressed="true"]{ outline:2px solid var(--caya-accent); }
  .caya-input input{
    flex:1; height:40px; border-radius:9999px; border:1px solid rgba(0,0,0,.1);
    padding:0 14px; outline:none; background:#fff; color:#0f172a; font-size:14px;
  }
  .caya-send{
    height:40px; padding:0 14px; border-radius:9999px; border:0; cursor:pointer;
    background:var(--caya-accent); color:#fff; font-weight:700; box-shadow:0 10px 30px rgba(124,58,237,.35);
  }
  .caya-send:disabled{ opacity:.55; cursor:default; box-shadow:none }
  @media (prefers-color-scheme: dark){
    .caya-input{ border-top-color:rgba(255,255,255,.08) }
    .caya-input input{ background:#0b1220; color:#e6edf7; border-color:rgba(255,255,255,.12) }
    .caya-emoji-btn, .caya-mic-btn{ background:#0b1220; border-color:rgba(255,255,255,.12); color:#e6edf7; }
  }

  .caya-emoji-pop{
    position:absolute; bottom:56px; left:12px; z-index:50; background:#fff;
    border:1px solid rgba(0,0,0,.1); border-radius:12px; box-shadow:0 16px 40px rgba(0,0,0,.18);
    padding:8px; display:grid; grid-template-columns: repeat(8, 28px); gap:6px;
  }
  @media (max-width:480px){ .caya-emoji-pop{ grid-template-columns:repeat(6, 28px); left:auto; right:12px; } }
  .caya-emoji-cell{ width:28px; height:28px; border-radius:8px; border:0; background:transparent; cursor:pointer; font-size:18px; line-height:1; }
  .caya-emoji-cell:hover{ background:rgba(0,0,0,.06) }

  @media (max-width: 360px){
    .caya-title{ font-size:13px; }
    .caya-chip{ padding:5px 8px; font-size:11px; }
    .caya-bubble{ font-size:13px; }
  }
  @media (max-height: 520px){
    .caya-panel{ max-height: calc(72vh - env(safe-area-inset-bottom, 0px)); }
  }
  `;

  /* =========================
     Render
     ========================= */
  return (
    <>
      <style>{css}</style>

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
              <div className="caya-lang" role="group" aria-label="Language">
                <button
                  type="button"
                  className={`caya-lang-btn ${effectiveLangFinal === "vi" ? "on" : ""}`}
                  onClick={() => document.documentElement.setAttribute("lang", "vi")}
                >
                  VI
                </button>
                <button
                  type="button"
                  className={`caya-lang-btn ${effectiveLangFinal === "en" ? "on" : ""}`}
                  onClick={() => document.documentElement.setAttribute("lang", "en")}
                >
                  EN
                </button>
              </div>

              <button
  type="button"
  className="caya-lang-btn"
  onClick={() => (talkOn ? stopTalk() : startTalk())}
  title={talkOn ? "Stop voice chat" : "Start voice chat"}
  aria-pressed={talkOn ? "true" : "false"}
>
  {talkOn ? "Stop" : "Talk"} <span aria-hidden>🎙️</span>
</button>


              <button
                type="button"
                aria-label="Minimize"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  e.currentTarget.disabled = true;
                  setTimeout(() => {
                    e.currentTarget.disabled = false;
                  }, 500);
                }}
                style={{ marginLeft: 4, cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          </div>

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
                  "😀","🙂","🤝","🚀","💼","📊","🧾","💡","🤖","📈","🛠️","✅","❓","📣","🧠","⏱️","💰","📄","🔗",
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

      {createPortal(
        <button
          className="caya-fab"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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

  /* =========================
     Inner helpers used above
     ========================= */
  function openOrAsk(url, prompt) {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setInput(prompt);
      setTimeout(() => sendMessage({ preventDefault() {} }), 0);
    }
  }
  function onEmojiClick(emoji) {
    if (!input.trim()) {
      sendMessage(null, emoji);
    } else {
      insertAtCursor(emoji);
    }
    setShowEmoji(false);
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
