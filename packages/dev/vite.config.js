import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@core": resolve(__dirname, "../core/src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        vanilla: resolve(__dirname, "vanilla/index.html"),
      },
    },
  },
});
