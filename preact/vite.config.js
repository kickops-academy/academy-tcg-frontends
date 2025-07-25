import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
