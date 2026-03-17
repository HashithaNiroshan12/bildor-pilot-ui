# 00 — Project Overview

> **What is this?**
> This is the beginner Q&A documentation for `@hashithaniroshan12/bildor-pilot-ui`.
> Every file in `docs/` covers one topic as a series of questions and answers.
> Read them in order (00 → 09) for the full picture, or jump to any topic you need.

---

## Q: What exactly is this project?

**A:** It is an **internal UI component library** for the Bildor Pilot product.

Instead of writing raw HTML buttons, inputs, and cards in every app, you build them once here — styled, typed, and tested — then install them as a package in any app.

Think of it like your own private version of Material UI or Ant Design, but made specifically for your product.

---

## Q: What tech stack does it use?

| Layer | Tool | Why |
|---|---|---|
| Language | TypeScript | Catch bugs at write-time, not run-time |
| UI framework | React 19 | Component model |
| Component base | PrimeReact 10 | 80+ pre-built accessible components |
| Build tool | Vite 8 | Fast bundler, native ESM, library mode |
| Visual testing | Storybook 10 | See every component in a browser gallery |
| Publishing | GitHub Packages | Private npm registry tied to your GitHub |
| CI / Automation | GitHub Actions | Auto-publish when you push a version tag |

---

## Q: What is the folder structure and what does each folder do?

```
bildor-pilot-ui/
│
├── src/                        ← All source code lives here
│   ├── ui/                     ← One file per component
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx  ← Storybook visual test for Button
│   │   ├── Card.tsx
│   │   ├── Card.stories.tsx
│   │   └── index.ts            ← Barrel: re-exports all components
│   │
│   ├── theme/                  ← Design tokens + theme utilities
│   │   ├── tokens.css          ← CSS variables (--brand, --bg, --text, etc.)
│   │   ├── primereact-overrides.css  ← CSS that overrides PrimeReact defaults
│   │   └── index.ts            ← setTheme() and initTheme() functions
│   │
│   └── index.ts                ← MAIN ENTRY POINT — exports everything
│
├── .storybook/                 ← Storybook configuration
│   ├── main.ts                 ← Which story files to load, which addons
│   └── preview.ts              ← Global CSS imports, background colors
│
├── .github/
│   └── workflows/
│       └── publish.yml         ← GitHub Actions: auto-publish on git tag
│
├── dist/                       ← BUILD OUTPUT (never edit manually)
│   ├── index.es.js             ← ES module format
│   ├── index.cjs.js            ← CommonJS format
│   ├── index.css               ← Bundled CSS
│   └── ui/ theme/              ← TypeScript .d.ts declaration files
│
├── docs/                       ← You are here — beginner Q&A documentation
│
├── package.json                ← Project config, scripts, dependencies
├── vite.config.ts              ← Build configuration (library mode)
├── tsconfig.json               ← TypeScript base config
├── tsconfig.app.json           ← TypeScript config for source code
├── tsconfig.build.json         ← TypeScript config for generating .d.ts files
└── .npmrc                      ← npm registry config (GitHub Packages scope)
```

---

## Q: What is the difference between this library and a regular React app?

| Regular React App | This UI Library |
|---|---|
| Builds `index.html` + JS chunks | Builds `index.js` + type files |
| Has a `main.tsx` entry point | Has `src/index.ts` as library entry |
| Runs in a browser directly | Gets installed by other apps |
| React is in `dependencies` | React is in `peerDependencies` |
| `vite build` → website | `vite build` → npm package |

The key difference is **who uses the output**. An app is used by end users in a browser. A library is used by developers in their code.

---

## Q: What are the 18 components currently in this library?

| Component | What it wraps | Common use |
|---|---|---|
| `Button` | `primereact/button` | Actions, form submits |
| `InputText` | `primereact/inputtext` | Single-line text input |
| `Dropdown` | `primereact/dropdown` | Single-select from a list |
| `MultiSelect` | `primereact/multiselect` | Multi-select from a list |
| `Checkbox` | `primereact/checkbox` | True/false toggle (box) |
| `RadioButton` | `primereact/radiobutton` | One-of-many selection |
| `InputSwitch` | `primereact/inputswitch` | On/off toggle (slider) |
| `Card` | `primereact/card` | Content container with title |
| `Dialog` | `primereact/dialog` | Modal popup |
| `DataTable` | `primereact/datatable` | Sortable / filterable table |
| `TabView` | `primereact/tabview` | Tab navigation |
| `Menu` | `primereact/menu` | Dropdown navigation menu |
| `Toast` | `primereact/toast` | Notification popups |
| `Message` | `primereact/message` | Inline alert messages |
| `ProgressBar` | `primereact/progressbar` | Progress indicator |
| `Slider` | `primereact/slider` | Range / value slider |
| `Calendar` | `primereact/calendar` | Date picker |
| `Chips` | `primereact/chips` | Tag/chip input |

---

## Q: What is the relationship between this library and a consumer app?

```
bildor-pilot-ui/         (this repo — the library)
    ↓  npm publish
GitHub Packages          (the registry — like a postal service)
    ↓  npm install @hashithaniroshan12/bildor-pilot-ui
example-app/             (the consumer — any Bildor Pilot app)
    ↓  import
import { Button } from "@hashithaniroshan12/bildor-pilot-ui"
```

The library is **never run directly**. It exists to be consumed by apps.

---

## Q: What should I read next?

- **New here?** → Start with `01-getting-started.md`
- **Why does `package.json` look complex?** → `03-package-json.md`
- **How do I add a new component?** → `04-components.md`
- **How do I change colors / branding?** → `05-theme.md`
- **How do I publish a new version?** → `08-publishing.md`
