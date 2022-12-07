import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { main } from "./package.json";

export default defineConfig([
  {
    input: "src/index.ts",
    plugins: [json(), typescript({ declaration: true, outDir: "dist" })],
    output: [
      {
        file: main,
        format: "es",
      },
    ],
  },
]);
