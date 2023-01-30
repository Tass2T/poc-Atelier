import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  root: ".",
  server: {
    host: true,
    open: true, // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    glsl({
      compress: false,
    }),
  ],
});
