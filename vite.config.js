// investors/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local dev server
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
      // Remote Render server (keeps the /api/caya path)
      "/remote": {
        target: "https://cardbey-backend1.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/remote/, ""), // so /remote/... -> /...
      },
    },
  },
  resolve: {
  alias: { "@": path.resolve(__dirname, "src") },
  dedupe: ["react", "react-dom"],
},

});
