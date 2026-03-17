import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // "lib" mode tells Vite: build a reusable package, not a website
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BildorPilotUI",
      // Build both ESM (modern imports) and CJS (older require()) formats
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Mark these as "external" — don't bundle them into the library output.
      // The consumer app already has React and PrimeReact installed.
      external: ["react", "react-dom", "react/jsx-runtime", "primereact", "primeicons"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // Keep CSS in a separate file so consumers can import it
        assetFileNames: "index.css",
      },
    },
  },
});
