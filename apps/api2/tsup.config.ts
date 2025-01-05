import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  splitting: true,
  sourcemap: true,
  clean: true, // Clean the output directory before building
  dts: true,
  external: ["prisma", "@prisma/client"],
  esbuildOptions(options) {
    options.plugins = options.plugins || [];
    // Add specific plugins here if needed
  },
  treeshake: true,
  bundle: true,
  target: "node20", // Node.js target version
  platform: "node", // Target Node.js runtime

  // IMPORTANT!  This config is what forces `@repo/schemas`, etc. to be bundled
  // https://github.com/egoist/tsup/issues/619
  // noExternal: [/(.*)/],
});
