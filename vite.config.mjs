import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const USE_LOCAL_PROXY = true; // toggle: true = local server on 8787, false = Render

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: USE_LOCAL_PROXY
      ? {
          // Dev → your local Node proxy (which exposes /api/caya)
          "/api/caya": {
            target: "http://localhost:8787",
            changeOrigin: true,
          },
        }
      : {
          // Dev → Render backend (which expects /api/chat)
          "/api/caya": {
            target: "https://cardbey-backend1.onrender.com",
            changeOrigin: true,
            secure: true,
            rewrite: (p) => p.replace(/^\/api\/caya/, "/api/chat"),
          },
        },
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
});
