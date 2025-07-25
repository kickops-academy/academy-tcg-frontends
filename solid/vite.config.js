import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
