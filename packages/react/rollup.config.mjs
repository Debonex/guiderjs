import { createRequire } from "module";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import typescript from "@rollup/plugin-typescript";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig([
  {
    input: "src/index.ts",
    plugins: [typescriptPaths(), esbuild({ include: ["@core/index"] })],
    output: [{ file: pkg.main, format: "es" }],
    external: ["react", "react/jsx-runtime"],
  },
  {
    input: "src/index.ts",
    plugins: [dts()],
    output: [{ file: pkg.typings, format: "es" }],
  },
]);
