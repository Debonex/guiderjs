import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      "@vanilla": resolve(__dirname, "../../packages/vanilla/src"),
      "@core": resolve(__dirname, "../../packages/core/src"),
    },
  },
});
