import { defineConfig } from "vite";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
