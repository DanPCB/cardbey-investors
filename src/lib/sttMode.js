export const STT_MODE = (import.meta.env.VITE_STT_MODE || "browser").toLowerCase();
export const useServerSTT = STT_MODE === "server";
