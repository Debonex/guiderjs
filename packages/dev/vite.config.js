import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": resolve(__dirname, "../core/src"),
      "@react": resolve(__dirname, "../react/src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        vanilla: resolve(__dirname, "vanilla/index.html"),
        react: resolve(__dirname, "react/index.html"),
      },
    },
  },
});
