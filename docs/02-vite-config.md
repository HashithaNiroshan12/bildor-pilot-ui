# 02 — Vite Configuration

> Why `vite.config.ts` is set up the way it is, explained line by line.

---

## Q: What does Vite normally do vs what it does for a library?

**Normal Vite (app mode):**
- Takes `index.html` as entry point
- Outputs `dist/index.html` + many JS chunks + CSS files
- The result runs in a browser

**Vite in library mode (this project):**
- Takes `src/index.ts` as entry point
- Outputs `dist/index.es.js` + `dist/index.cjs.js` + type files
- The result is imported by other apps, not run directly

The single setting that switches Vite into library mode is `build.lib`.

---

## Q: Can you explain the full `vite.config.ts` line by line?

```typescript
import { defineConfig } from "vite";        // Vite's config helper
import react from "@vitejs/plugin-react";   // Adds JSX/React support
import { resolve } from "path";             // Node.js path utility
```

```typescript
export default defineConfig({
  plugins: [react()],   // Enables React JSX transformation
```

```typescript
  build: {
    lib: {
      // The single file that exports everything from the library.
      // Vite starts here and bundles everything it imports.
      entry: resolve(__dirname, "src/index.ts"),

      // The global variable name used when loaded via <script> tag (UMD).
      // Not important for npm packages but required by Vite.
      name: "BildorPilotUI",

      // Build two formats:
      //   "es"  → index.es.js  (used by Webpack, Vite, Rollup)
      //   "cjs" → index.cjs.js (used by older tools, Jest, Node.js)
      formats: ["es", "cjs"],

      // Name the output files as index.es.js and index.cjs.js
      fileName: (format) => `index.${format}.js`,
    },
```

```typescript
    rollupOptions: {
      // "external" means: do NOT include these packages in our output bundle.
      // The app that installs our library already has React and PrimeReact.
      // If we bundled them, consumers would get duplicates → bugs.
      external: ["react", "react-dom", "react/jsx-runtime", "primereact", "primeicons"],

      output: {
        // These globals only matter for UMD/IIFE builds (browser <script> tags).
        // For npm packages, they are ignored but required by Vite to be present.
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },

        // Rename all CSS output to a single index.css file in dist/
        assetFileNames: "index.css",
      },
    },
  },
});
```

---

## Q: What does "external" mean and why is it important?

When Vite bundles your library, it normally includes ALL imports into the output file.

Without `external`, your `dist/index.es.js` would contain:
- Your 18 components (~50 KB)
- **All of PrimeReact** (~800 KB)
- **All of React** (~150 KB)

That's nearly 1 MB that every consumer app downloads twice — once for your library, once for their own React/PrimeReact install.

With `external: ["react", "react-dom", "primereact", "primeicons"]`, Vite leaves those imports as-is:
```js
// dist/index.es.js
import { Button } from "primereact/button";  // ← stays as an import, not inlined
```

So the consuming app resolves `primereact/button` from its own `node_modules`, not from your bundle.

---

## Q: What is the difference between "es" and "cjs" formats?

| Format | File | Who uses it |
|---|---|---|
| `es` (ESM) | `index.es.js` | Vite, Webpack 5, Rollup, modern tools. Uses `import/export` syntax. |
| `cjs` (CommonJS) | `index.cjs.js` | Older tools, Jest, Node.js scripts. Uses `require()` / `module.exports`. |

You build both so any tool can install your library regardless of which module system it uses.

---

## Q: Why is `src/index.ts` the entry point and not `src/main.tsx`?

`src/main.tsx` is the convention for **apps** — it's the file that mounts React into the DOM.

For a **library**, `src/index.ts` is the convention — it's the file that says "here is everything this package exports". It has no DOM mounting, no `ReactDOM.createRoot()`, just pure exports.

```typescript
// src/index.ts — library entry. Only exports.
export * from "./ui";
export * from "./theme";
```

---

## Q: Why are there no changes to `vite.config.ts` for Storybook?

Storybook runs its own internal Vite server completely separately from `vite build`. It reads `vite.config.ts` for plugin settings (like the React plugin) but ignores `build.lib` entirely.

This means:
- `npm run storybook` → Storybook's Vite server, no library build
- `npm run build` → Vite's library build, no Storybook

They are completely independent processes.

---

## Q: What happened to `vite-plugin-dts`? I see it in `devDependencies` but not in the config.

During setup we discovered that `vite-plugin-dts` v4 has a compatibility issue with Vite 8 (which uses rolldown internally). The plugin would say "declaration files built" but produce no output files.

The solution was to use TypeScript's own compiler (`tsc`) to generate declaration files. This is done via a separate build step:

```json
// package.json
"build": "vite build && tsc -p tsconfig.build.json"
```

`tsconfig.build.json` is a special TypeScript config that:
1. Has `emitDeclarationOnly: true` (only outputs `.d.ts`, no `.js`)
2. Excludes `*.stories.tsx` files (stories are dev-only, not part of the library)
3. Outputs to `dist/`

You can safely leave `vite-plugin-dts` in `devDependencies` or remove it — it is not being used.
