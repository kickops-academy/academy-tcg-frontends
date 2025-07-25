import { defineConfig } from "vite";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src")
    }
  }
});
