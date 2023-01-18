import { build } from "esbuild";
import rawCssPlugin from "esbuild-plugin-raw-css";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/index.js",
  loader: {
    ".css": "text",
  },
  plugins: [rawCssPlugin()],
});
