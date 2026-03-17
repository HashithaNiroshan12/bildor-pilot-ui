# 07 — TypeScript Configuration

> Why there are three tsconfig files, what each one does,
> and how TypeScript generates the `.d.ts` declaration files.

---

## Q: Why are there THREE tsconfig files?

```
tsconfig.json          ← master file (references the others)
tsconfig.app.json      ← config for your source code during development
tsconfig.build.json    ← config for generating .d.ts type declaration files
```

Each serves a different purpose:

| File | When it's used | What it produces |
|---|---|---|
| `tsconfig.json` | Base reference | Nothing directly |
| `tsconfig.app.json` | IDE autocomplete + `tsc -b` type checking | Nothing (noEmit: true) |
| `tsconfig.build.json` | `npm run build` | `.d.ts` declaration files in `dist/` |

---

## Q: What does `tsconfig.json` do?

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" }
  ]
}
```

This is a **project references** file. It is the entry point that IDEs and `tsc -b` read. It delegates to `tsconfig.app.json` for the actual configuration. This pattern is standard in Vite projects.

---

## Q: What does `tsconfig.app.json` do?

```json
{
  "compilerOptions": {
    "target": "ES2023",          // Compile to modern JavaScript
    "module": "ESNext",          // Use ES module syntax
    "moduleResolution": "bundler",  // Vite's module resolution mode
    "jsx": "react-jsx",          // Transform JSX using React 17+ transform
    "strict": true,              // Enable ALL strict checks
    "noEmit": true,              // TYPE CHECK ONLY — don't write any files
    "allowImportingTsExtensions": true,  // Allow import "./Button.tsx" (Vite handles this)
    "noUnusedLocals": true,      // Error on unused variables
    "noUnusedParameters": true,  // Error on unused function parameters
  },
  "include": ["src"]
}
```

**The critical setting is `"noEmit": true`.**

This means TypeScript will check your types (find errors, provide autocomplete) but will NOT write any `.js` or `.d.ts` files. Vite handles the JavaScript compilation. TypeScript is only the type-checker here.

---

## Q: What does `tsconfig.build.json` do and why is it separate?

`tsconfig.build.json` overrides `tsconfig.app.json` specifically for the `dist/` build step:

```json
{
  "extends": "./tsconfig.app.json",   // Inherits all settings from app config
  "compilerOptions": {
    "noEmit": false,                  // OVERRIDE: actually emit files this time
    "declaration": true,              // Generate .d.ts files
    "declarationDir": "./dist",       // Put them in dist/
    "emitDeclarationOnly": true,      // Only .d.ts — no .js (Vite handles .js)
    "outDir": "./dist"
  },
  "exclude": [
    "src/**/*.stories.tsx",           // Stories are dev-only, not part of the package
    "src/**/*.test.tsx"               // Tests are dev-only, not part of the package
  ]
}
```

**Why not just use one tsconfig?**

Because `tsconfig.app.json` has `noEmit: true` which prevents any file output. If you tried to generate declarations with it, TypeScript would do nothing. The build config exists purely to flip that off and enable declaration output.

---

## Q: What is a `.d.ts` file and why do consumers need it?

A `.d.ts` file is a **TypeScript declaration file**. It describes the types of your exported code without containing any actual JavaScript.

Example: when you import `Button` from this library, TypeScript reads `dist/ui/Button.d.ts`:

```typescript
// dist/ui/Button.d.ts (generated — never edit)
import { ButtonProps as PrimeButtonProps } from "primereact/button";
export type ButtonProps = PrimeButtonProps;
export declare function Button(props: ButtonProps): JSX.Element;
```

This is what gives consumers:
- **Autocomplete** — press `.` after `<Button ` and see all available props
- **Type errors** — if you write `<Button size="huge" />`, TypeScript tells you immediately that `"huge"` is not a valid size
- **IntelliSense docs** — hover over a prop to see its description

Without `.d.ts` files, the library works at runtime but TypeScript users would see `Button has type any` and lose all type safety.

---

## Q: What does `"moduleResolution": "bundler"` mean?

This is a TypeScript setting that matches how Vite resolves modules.

In older TypeScript, `moduleResolution: "node"` was used — it mimicked how Node.js finds packages. But Node.js has some quirks that bundlers like Vite don't follow.

`"bundler"` mode tells TypeScript:
- You can import `./Button.tsx` with the `.tsx` extension (bundlers allow this)
- `package.json`'s `"exports"` field is respected
- Bare module imports like `import { useState } from "react"` work correctly

---

## Q: What does `"strict": true` actually turn on?

`strict: true` enables a set of the most valuable checks:

| Check | What it catches |
|---|---|
| `strictNullChecks` | Using `null` or `undefined` where a value is required |
| `strictFunctionTypes` | Wrong function argument types in callbacks |
| `noImplicitAny` | Variables that TypeScript can't infer a type for |
| `strictPropertyInitialization` | Class properties used before being set |

For a UI library, `strictNullChecks` is the most important. It catches bugs like:
```typescript
const element = document.querySelector(".my-div");
element.style.color = "red"; // ← ERROR: element could be null
```

---

## Q: What does `"erasableSyntaxOnly": true` mean?

This is a newer TypeScript setting (5.5+). It disallows TypeScript syntax that cannot be stripped by a simple erase operation — meaning syntax that requires actual transformation.

In practice, it disallows:
- `enum` declarations (use `const enum` or plain objects)
- `namespace` declarations
- `module` augmentations

Vite's TypeScript handling only erases types — it doesn't transform complex TypeScript syntax. This setting makes TypeScript warn you when you accidentally use syntax that Vite can't handle.
