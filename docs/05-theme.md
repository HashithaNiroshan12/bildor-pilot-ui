# 05 — Theme & Design Tokens

> How the design token system works, how dark mode is implemented,
> and how to change the brand colors for your product.

---

## Q: What is a "design token"?

A design token is a **named variable for a visual decision**.

Instead of writing `color: #2196f3` in 50 different places, you write `color: var(--brand)` everywhere. The token `--brand` holds the actual value. When the designer says "change our blue to purple", you change one line and the entire product updates.

```css
/* Without tokens — fragile */
.button { background: #2196f3; }
.link   { color: #2196f3; }
.badge  { border-color: #2196f3; }

/* With tokens — maintainable */
:root { --brand: #2196f3; }
.button { background: var(--brand); }
.link   { color: var(--brand); }
.badge  { border-color: var(--brand); }
```

Change `--brand` once → everything updates.

---

## Q: What tokens are defined in `src/theme/tokens.css`?

| Token | Default value | What it controls |
|---|---|---|
| `--brand` | `#2196f3` | Primary brand color (buttons, links, focus) |
| `--brand-contrast` | `#ffffff` | Text on top of brand-colored backgrounds |
| `--bg` | `#ffffff` | Page background |
| `--surface` | `#ffffff` | Card / panel background |
| `--surface-2` | `#f6f7fb` | Slightly off-white surface (sidebars, rows) |
| `--text` | `#111827` | Primary body text |
| `--muted` | `#6b7280` | Secondary / placeholder text |
| `--border` | `#e5e7eb` | Lines, dividers, input borders |
| `--radius` | `14px` | Default border radius for cards/panels |
| `--control-h` | `42px` | Height of inputs, dropdowns, buttons |
| `--control-font` | `14px` | Font size inside form controls |
| `--control-px` | `0.9rem` | Horizontal padding inside form controls |
| `--focus` | `box-shadow (brand + 30%)` | Focus ring for keyboard navigation |

---

## Q: How does dark mode work?

The theme uses a `data-theme` attribute on the `<html>` element:

```css
/* tokens.css */
:root {
  --brand: #2196f3;   /* light mode default */
  --bg:    #ffffff;
}

:root[data-theme="dark"] {
  --brand: #818cf8;   /* dark mode override */
  --bg:    #0b1220;
}
```

When `data-theme="dark"` is set on `<html>`, every element in the page picks up the dark overrides automatically because CSS variables cascade down.

---

## Q: What do `setTheme()` and `initTheme()` do?

Both functions are in `src/theme/index.ts`:

```typescript
// setTheme("dark") → adds data-theme="dark" to <html> and saves to localStorage
export function setTheme(theme: AppTheme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

// initTheme() → reads saved preference or falls back to OS preference
export function initTheme() {
  const saved = localStorage.getItem("theme") as AppTheme | null;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(saved ?? (prefersDark ? "dark" : "light"));
}
```

**How to use in a consumer app:**

```typescript
// Call once at app startup (e.g. in main.tsx)
import { initTheme } from "@hashithaniroshan12/bildor-pilot-ui";
initTheme();

// Call when user clicks a theme toggle button
import { setTheme } from "@hashithaniroshan12/bildor-pilot-ui";
setTheme("dark");
setTheme("light");
```

---

## Q: How do I change the brand color to match a new design?

Open `src/theme/tokens.css` and change the `--brand` variable:

```css
:root {
  --brand: #7c3aed;          /* change from blue → purple */
  --brand-contrast: #ffffff; /* keep white text on purple */
}

:root[data-theme="dark"] {
  --brand: #a78bfa;          /* lighter purple for dark backgrounds */
}
```

That's it. All buttons, focus rings, switches, and anything using `var(--brand)` will update.

---

## Q: What is `primereact-overrides.css` for?

PrimeReact components have their own internal CSS that comes from its theme file (e.g. `lara-light-blue`). Sometimes that CSS conflicts with your design tokens or sets colors you don't want.

`primereact-overrides.css` is where you write CSS to **override PrimeReact's own styles**. Since it's imported after PrimeReact's theme in `preview.ts` and in the consumer app, it wins the specificity battle.

**Example use cases:**
- Remove PrimeReact's default box-shadow on inputs
- Change the hover color of dropdown items
- Override the font family on all PrimeReact components

```css
/* primereact-overrides.css example */
.p-button {
  font-family: var(--font-family);
}

.p-inputtext:focus {
  box-shadow: var(--focus);
}
```

---

## Q: How does PrimeReact know to use my `--brand` color?

The magic is in these lines in `tokens.css`:

```css
:root {
  /* These are PrimeReact's internal variable names for its primary color */
  --primary-color:      var(--brand);
  --primary-color-text: var(--brand-contrast);

  /* PrimeReact's scale variables, generated from --brand */
  --primary-50:  color-mix(in srgb, var(--brand) 10%, white);
  --primary-100: color-mix(in srgb, var(--brand) 20%, white);
  /* ... up to --primary-900 */
}
```

PrimeReact uses `--primary-color` and `--primary-500` through `--primary-900` internally for things like button backgrounds and hover states. By pointing them to `var(--brand)`, you tell PrimeReact: "use my brand color as your primary color."

`color-mix()` is a modern CSS function that generates lighter/darker shades automatically. `color-mix(in srgb, blue 20%, white)` produces a 20% blue tint.

---

## Q: How does the consumer app load the theme CSS?

The consumer app must import the styles once. There are two ways:

**Option 1: Import the built CSS file (recommended for apps)**
```typescript
// In the app's main.tsx, BEFORE importing any library components
import "@hashithaniroshan12/bildor-pilot-ui/styles";
```

**Option 2: Import the CSS directly during development (for local linking)**
```typescript
import "@hashithaniroshan12/bildor-pilot-ui/dist/index.css";
```

The consumer must also import PrimeReact's own theme CSS:
```typescript
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```
