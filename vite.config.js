import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/se_project_react/" : "/", // ← only use base path in production
  server: {
    port: 3000,
  },
}));
