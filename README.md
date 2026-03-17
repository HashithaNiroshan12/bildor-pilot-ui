# @hashithaniroshan12/bildor-pilot-ui

> Internal UI component library for the **Bildor Pilot** project.
> Built on PrimeReact, styled with design tokens, documented in Storybook, and published to GitHub Packages.

---

## What is this?

This is a private npm package that wraps [PrimeReact](https://primereact.org) components with Bildor Pilot's design defaults — consistent border radii, sizing, brand colors, and dark mode support. Any Bildor Pilot app installs this package and imports components from one place instead of styling PrimeReact from scratch every time.

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Language | TypeScript | ~5.9 |
| UI Framework | React | ^19 |
| Component Base | PrimeReact | ^10 |
| Build Tool | Vite (library mode) | ^7 |
| Visual Testing | Storybook | ^10 |
| Publishing | GitHub Packages | — |
| CI / Automation | GitHub Actions | — |

---

## Components

| Component | Description |
|---|---|
| `Button` | Action button — defaults to large size, 20px radius |
| `InputText` | Single-line text input |
| `Dropdown` | Single-select dropdown |
| `MultiSelect` | Multi-select dropdown |
| `Checkbox` | True/false checkbox |
| `RadioButton` | Single-option radio button |
| `InputSwitch` | On/off toggle switch |
| `Card` | Content container with title and footer |
| `Dialog` | Modal dialog overlay |
| `DataTable` | Sortable, filterable data table |
| `TabView` + `TabPanel` | Tab navigation |
| `Menu` | Dropdown navigation menu |
| `Toast` | Notification popup |
| `Message` | Inline alert message |
| `ProgressBar` | Progress indicator |
| `Slider` | Range / value slider |
| `Calendar` | Date picker |
| `Chips` | Tag / chip input |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run

```bash
npm install
npm run storybook     # → http://localhost:6006
```

---

## Commands

| Command | Description |
|---|---|
| `npm run storybook` | Start Storybook visual gallery on localhost:6006 |
| `npm run build` | Build `dist/` — JS bundles + TypeScript declarations |
| `npm run typecheck` | TypeScript type check without building |
| `npm run lint` | ESLint code style check |
| `npm run build-storybook` | Build a static Storybook for deployment |
| `npm run build:watch` | Auto-rebuild `dist/` on every file save |

---

## Project Structure

```
src/
├── ui/               ← Component wrappers (one file per component)
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── index.ts      ← Barrel export
├── theme/
│   ├── tokens.css              ← CSS design tokens (light + dark)
│   ├── primereact-overrides.css
│   └── index.ts                ← setTheme() / initTheme()
└── index.ts          ← Main library entry point

.storybook/
├── main.ts           ← Storybook config (addons, story paths)
└── preview.ts        ← Global CSS imports, background presets

.github/workflows/
└── publish.yml       ← Auto-publish to GitHub Packages on git tag

docs/                 ← Beginner Q&A documentation (read docs/README.md)
dist/                 ← Build output (never edit manually)
```

---

## Theme & Design Tokens

All visual decisions are controlled by CSS variables in `src/theme/tokens.css`:

```css
:root {
  --brand:      #2196f3;   /* primary brand color */
  --bg:         #ffffff;   /* page background */
  --text:       #111827;   /* body text */
  --radius:     14px;      /* default border radius */
  --control-h:  42px;      /* input / button height */
}
```

Dark mode is toggled by setting `data-theme="dark"` on `<html>`. Use the exported helpers:

```typescript
import { initTheme, setTheme } from "@hashithaniroshan12/bildor-pilot-ui";

initTheme();          // call once at app start — reads OS / saved preference
setTheme("dark");     // switch to dark
setTheme("light");    // switch to light
```

---

## Using in a Consumer App

### 1. Add `.npmrc` to the consumer app root

```
@hashithaniroshan12:registry=https://npm.pkg.github.com
```

### 2. Authenticate once (requires a GitHub PAT with `read:packages`)

```bash
npm login --registry=https://npm.pkg.github.com --scope=@hashithaniroshan12
```

### 3. Install

```bash
npm install @hashithaniroshan12/bildor-pilot-ui
```

### 4. Import styles once in `main.tsx`

```typescript
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@hashithaniroshan12/bildor-pilot-ui/styles";
```

### 5. Use components

```typescript
import { Button, Card, Dropdown } from "@hashithaniroshan12/bildor-pilot-ui";

function MyPage() {
  return (
    <Card title="Welcome">
      <Button label="Get Started" />
    </Card>
  );
}
```

---

## Publishing a New Version

```bash
# Bump version + create git tag automatically
npm version patch      # bug fix:   0.1.0 → 0.1.1
npm version minor      # new feature: 0.1.0 → 0.2.0
npm version major      # breaking change: 0.1.0 → 1.0.0

# Push code + tag — GitHub Actions publishes automatically
git push origin main --follow-tags
```

The workflow at `.github/workflows/publish.yml` triggers on any `v*` tag and runs `npm publish` to GitHub Packages.

---

## Documentation

Full beginner Q&A documentation is in the [`docs/`](./docs/README.md) folder:

| File | Topic |
|---|---|
| [00-overview.md](./docs/00-overview.md) | Project structure and concepts |
| [01-getting-started.md](./docs/01-getting-started.md) | Setup and daily commands |
| [02-vite-config.md](./docs/02-vite-config.md) | Vite library mode explained |
| [03-package-json.md](./docs/03-package-json.md) | Every package.json field explained |
| [04-components.md](./docs/04-components.md) | How to add and update components |
| [05-theme.md](./docs/05-theme.md) | Design tokens and dark mode |
| [06-storybook.md](./docs/06-storybook.md) | Writing stories for components |
| [07-typescript.md](./docs/07-typescript.md) | TypeScript configuration |
| [08-publishing.md](./docs/08-publishing.md) | Publishing to GitHub Packages |
| [09-workflow.md](./docs/09-workflow.md) | Day-to-day development recipes |

---

## License

Private — internal use only for the Bildor Pilot project.
