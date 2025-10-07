// src/lib/useChime.js
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * useChime(messages, { open })
 * - messages: array [{ id, role, content, ... }]
 * - open: whether the chat panel is visible (optional; affects which sound we play)
 */
export default function useChime(messages, { open = true } = {}) {
  const [muted, setMuted] = useState(() => localStorage.getItem("caya-muted")==="1");
  const lastAssistantId = useRef(null);

  // Preload players once
  const players = useMemo(() => {
    const send = new Audio("/sfx/send.mp3");
    const recv = new Audio("/sfx/receive.mp3");
    // Lower default volumes; browsers clamp >1 anyway
    send.volume = 0.4;
    recv.volume = 0.4;
    return { send, recv };
  }, []);

  // Persist mute
  useEffect(() => {
    localStorage.setItem("caya-muted", muted ? "1" : "0");
  }, [muted]);

  // Call this when user clicks “Send”
  const chimeSend = () => {
    if (!muted) safePlay(players.send);
  };

  // Auto-play when a brand-new assistant message lands
  useEffect(() => {
    if (!messages?.length) return;
    const last = messages[messages.length - 1];
    if (last?.role !== "assistant") return;

    if (lastAssistantId.current !== last.id) {
      lastAssistantId.current = last.id;
      if (!muted) {
        // If chat is closed or tab not focused, slightly louder
        if (!open || document.hidden) players.recv.volume = 0.55;
        else players.recv.volume = 0.4;
        safePlay(players.recv);
      }
    }
  }, [messages, muted, open, players]);

  return { muted, setMuted, chimeSend };
}

// Helper handles autoplay rejections gracefully
function safePlay(audioEl) {
  try {
    const p = audioEl.play();
    if (p && typeof p.then === "function") {
      p.catch(() => { /* ignore autoplay policy errors */ });
    }
  } catch {}
}
