import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
