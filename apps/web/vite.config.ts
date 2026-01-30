import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite конфигурация для Telegram Mini App
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
