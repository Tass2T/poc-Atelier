import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    glsl({
      compress: false,
    }),
  ],
});
