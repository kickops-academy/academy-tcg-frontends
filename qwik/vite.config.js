import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { resolve } from "path";

const CURRENT_WORKING_DIRECTORY = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      csr: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(CURRENT_WORKING_DIRECTORY, "src"),
    },
  },
});
