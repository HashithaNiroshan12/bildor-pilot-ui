# 03 — package.json Explained

> Every field in `package.json` explained as Q&A. This file controls your package identity,
> how other tools find your code, what gets published, and how scripts run.

---

## Q: Why does the package name start with `@hashithaniroshan12/`?

```json
"name": "@hashithaniroshan12/bildor-pilot-ui"
```

The `@hashithaniroshan12/` prefix is called a **scope**. It serves two purposes:

1. **Namespacing** — prevents name collisions with other packages. `bildor-pilot-ui` might already exist on npm, but `@hashithaniroshan12/bildor-pilot-ui` is unique to your account.
2. **GitHub Packages requirement** — GitHub Packages only accepts scoped packages, and the scope must match your GitHub username or organization name.

Rule: the scope must exactly match your GitHub username (case-insensitive).

---

## Q: What does `"type": "module"` mean?

```json
"type": "module"
```

This tells Node.js to treat all `.js` files in this project as **ES modules** (using `import/export`) rather than CommonJS (using `require()`).

Without this, Node.js would try to `require()` your `.js` files and fail on `import` statements.

---

## Q: What are `"main"`, `"module"`, and `"types"` and why do we have all three?

```json
"main":   "./dist/index.cjs.js",
"module": "./dist/index.es.js",
"types":  "./dist/index.d.ts"
```

These are **three different entry points** for three different kinds of consumers:

| Field | Used by | Format |
|---|---|---|
| `"main"` | Node.js, older bundlers, Jest | CommonJS (`require()`) |
| `"module"` | Webpack 5, Vite, Rollup, modern bundlers | ES module (`import`) |
| `"types"` | TypeScript compiler | Declaration file (`.d.ts`) |

A modern app using Vite will use `"module"`. An older Node.js script will use `"main"`. TypeScript always uses `"types"` for autocomplete and type checking.

---

## Q: What is the `"exports"` field and why does it come after `"main"` / `"module"`?

```json
"exports": {
  ".": {
    "types":   "./dist/index.d.ts",
    "import":  "./dist/index.es.js",
    "require": "./dist/index.cjs.js"
  },
  "./styles": "./dist/index.css"
}
```

`"exports"` is the **modern, authoritative** way to declare entry points. It overrides `"main"` and `"module"` for any tool that supports it (Node.js 12+, Vite, Webpack 5).

**Order matters inside the object:**
- `"types"` must come FIRST — TypeScript checks this before anything else
- `"import"` is used for `import` statements
- `"require"` is used for `require()` calls

**The `"./styles"` sub-path** allows consumers to import CSS separately:
```typescript
import "@hashithaniroshan12/bildor-pilot-ui/styles";
```

---

## Q: What does `"files": ["dist"]` do?

```json
"files": ["dist"]
```

When you run `npm publish`, npm uploads the entire project folder by default — including `src/`, `node_modules/`, `docs/`, etc.

`"files"` is a whitelist: "only publish the `dist/` folder". This keeps your published package small and clean. Consumers never see your source code, only the compiled output.

---

## Q: What is `"publishConfig"` and why is it there?

```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

By default, `npm publish` sends packages to the public registry at `https://registry.npmjs.org` (npmjs.com).

This setting redirects all publish commands to **GitHub Packages** instead. It only affects publishing — installing still works normally.

---

## Q: What is the difference between `dependencies`, `devDependencies`, and `peerDependencies`?

| Section | Purpose | Installed when? | Example |
|---|---|---|---|
| `dependencies` | Required at **runtime** — must be present when the library runs | Always | `primereact`, `primeicons` |
| `devDependencies` | Only needed during **development/build** — not shipped to consumers | Only locally | `vite`, `typescript`, `storybook` |
| `peerDependencies` | Must be provided by the **consumer app** — not installed by the library | Only in consuming app | `react`, `react-dom` |

**Why is React in `peerDependencies` and NOT in `dependencies`?**

Because every app that uses your library already has React installed. If React were in `dependencies`, npm would install a second copy of React inside your library's `node_modules`. Two copies of React in one app causes a well-known error: *"Hooks can only be called inside a function component"*. React literally breaks if two copies exist at the same time.

`peerDependencies` says: "React must exist somewhere in the host app's `node_modules`, not in ours."

---

## Q: What does `"prepublishOnly": "npm run build"` do?

```json
"prepublishOnly": "npm run build"
```

`prepublishOnly` is a **lifecycle hook** — npm automatically runs it right before `npm publish`.

This guarantees you can never accidentally publish an outdated `dist/` folder. Even if you forget to build, npm builds it for you before uploading.

The lifecycle order is:
```
npm publish
  → runs "prepublishOnly"  (npm run build)
  → builds dist/
  → uploads dist/ to GitHub Packages
```

---

## Q: Why is React listed in BOTH `peerDependencies` AND `devDependencies`?

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
},
"devDependencies": {
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  ...
}
```

- `peerDependencies` declares what the consumer app needs to provide
- `devDependencies` installs React locally so Storybook and TypeScript work during development

This is the correct pattern for library packages. When your library is installed in an app, npm ignores the `devDependencies` entirely and only checks that the app satisfies `peerDependencies`.

---

## Q: How do I bump the version before publishing a new release?

Edit `package.json` manually, OR use npm's built-in version command:

```bash
npm version patch   # 0.1.0 → 0.1.1  (bug fixes)
npm version minor   # 0.1.0 → 0.2.0  (new features, backwards-compatible)
npm version major   # 0.1.0 → 1.0.0  (breaking changes)
```

These commands:
1. Update `"version"` in `package.json`
2. Create a git commit with the message `v0.1.1`
3. Create a git tag `v0.1.1`

Then you push the tag to trigger the GitHub Actions publish:
```bash
git push origin v0.1.1
```
