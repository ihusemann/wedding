import type { Options } from "tsup";

export const tsup: Options = {
  splitting: true,
  clean: true,
  dts: true, // generate dts file for main module
  format: ["cjs", "esm"], // generate cjs and esm files
  skipNodeModulesBundle: true,
  target: "es2020",
  outDir: "dist",
  entry: ["src/index.ts"],
};
