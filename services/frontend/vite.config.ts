import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    host: "0.0.0.0",
    proxy: { "/api": "http://backend:5000" },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
