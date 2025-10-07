// Simple switch for speech-to-text strategy.
// VITE_STT_MODE can be: "browser" | "server"
export const STT_MODE = (import.meta.env.VITE_STT_MODE || "browser").toLowerCase();

// Hook form (so you can call it inside components)
export function useServerSTT() {
  return STT_MODE === "server";
}
