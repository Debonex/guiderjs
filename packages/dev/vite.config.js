import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [react(), vue()],
  resolve: {
    alias: {
      "@core": resolve(__dirname, "../core/src"),
      "@vanilla": resolve(__dirname, "../vanilla/src"),
      "@react": resolve(__dirname, "../react/src"),
      "@vue3": resolve(__dirname, "../vue3/src"),
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
