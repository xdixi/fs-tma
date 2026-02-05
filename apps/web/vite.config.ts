import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite конфигурация для Telegram Mini App
 */
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true, // 👈 ключевой момент
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
