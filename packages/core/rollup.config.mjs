import json from "@rollup/plugin-json";
import { createRequire } from "module";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig([
  {
    input: "src/index.ts",
    plugins: [esbuild(), json()],
    output: [{ file: pkg.main, format: "es" }],
  },
  {
    input: "src/index.ts",
    plugins: [dts(), json()],
    output: [{ file: pkg.typings, format: "es" }],
  },
]);
