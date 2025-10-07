import { useServerSTT } from "@/lib/sttMode";

export async function transcribeWithServer(blob) {
  if (!useServerSTT) {
    // In browser mode we do NOT call the server; let useVoice handle STT.
    return null;
  }
  const form = new FormData();
  form.append("audio", blob, "clip.webm");
  const res = await fetch("/api/stt", { method: "POST", body: form });
  if (!res.ok) throw new Error(`STT server error ${res.status}`);
  const json = await res.json();
  return json.text;
}
