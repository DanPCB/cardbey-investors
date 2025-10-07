export async function speakOpenAI({ text, voice = "alloy", lang = "en", mute = false } = {}) {
  if (mute) return;
  if (!text) return; 
  const res = await fetch("/api/tts-openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice, model, format: "mp3" }),
  });
  if (!res.ok) throw new Error(await res.text());
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
    audio.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    audio.play();
  });
}