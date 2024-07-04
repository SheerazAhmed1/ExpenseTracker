import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dir, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
  server: {
    open: true,
    cors: true,

    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
