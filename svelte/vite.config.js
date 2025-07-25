import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
