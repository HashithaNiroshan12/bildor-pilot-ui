# 04 — Components

> How the component wrappers work, why we wrap PrimeReact, and how to create a new one.

---

## Q: Why do we wrap PrimeReact components instead of using them directly?

If you use `primereact/button` directly in every app, you have these problems:

1. **No consistent defaults** — every developer sets their own border-radius, size, and colors
2. **No central control** — to change the button style across 10 apps, you edit 10 apps
3. **No design system** — the apps don't look like a unified product

By wrapping PrimeReact, you:
- Set Bildor Pilot defaults once (size=large, border-radius=20px)
- Let developers override when needed (via props)
- Add a CSS class (`my-ui-button`) to every button for future global targeting
- Expose the full PrimeReact API — no features are removed

---

## Q: What is the pattern every component follows?

Every component in this library follows the same 4-part pattern. Here is `Button.tsx` as the example:

```typescript
// PART 1: Import the PrimeReact component and its props type
import { Button as PrimeButton, type ButtonProps as PrimeButtonProps } from "primereact/button";

// PART 2: Re-export the props type so consumers can import it from our library
export type ButtonProps = PrimeButtonProps;

// PART 3: Define Bildor Pilot defaults as named constants at the top
const DEFAULT_SIZE = "large" as const;
const DEFAULT_RADIUS = 20;

// PART 4: The wrapper component — destructure what you override, spread the rest
export function Button(props: ButtonProps) {
  const { className, size = DEFAULT_SIZE, style, ...rest } = props;
  return (
    <PrimeButton
      {...rest}                                        // Pass all props through
      size={size}                                     // Apply the default size
      style={{ borderRadius: DEFAULT_RADIUS, ...style }} // Default radius, but consumer can override
      className={`my-ui-button ${className ?? ""}`.trim() || undefined}  // Add BUI class
    />
  );
}
```

**The key insight:** `{...rest}` passes ALL PrimeReact props through. You only destructure the ones you want to set defaults for.

---

## Q: What is `...rest` and why is it important?

`...rest` is the **spread operator** collecting all props that were NOT explicitly destructured.

```typescript
const { className, size = DEFAULT_SIZE, style, ...rest } = props;
//      ↑ extracted      ↑ extracted          ↑ extracted
//                                                          ↑ everything else
```

If a consumer passes `label="Save"`, `disabled={true}`, `onClick={handleSave}`, `icon="pi pi-check"` — all of those end up in `rest` and get passed down to PrimeReact's Button via `{...rest}`.

Without `...rest`, you would have to manually list every possible prop. That defeats the purpose of wrapping — you'd break every PrimeReact feature you didn't explicitly pass.

---

## Q: How do I create a brand new component?

Follow these 5 steps. We'll use `Badge` as an example.

**Step 1: Find the PrimeReact component name**

Browse [primereact.org/badge](https://primereact.org/badge/) to see the component and its props.

**Step 2: Create the wrapper file**

Create `src/ui/Badge.tsx`:

```typescript
import { Badge as PrimeBadge, type BadgeProps as PrimeBadgeProps } from "primereact/badge";

export type BadgeProps = PrimeBadgeProps;

export function Badge(props: BadgeProps) {
  const { className, ...rest } = props;
  return (
    <PrimeBadge
      {...rest}
      className={`my-ui-badge ${className ?? ""}`.trim() || undefined}
    />
  );
}
```

**Step 3: Export it from the barrel file**

Open `src/ui/index.ts` and add:
```typescript
export { Badge } from "./Badge";
```

**Step 4: Create a story file**

Create `src/ui/Badge.stories.tsx`:

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { value: "4" },
};

export const Success: Story = {
  args: { value: "New", severity: "success" },
};
```

**Step 5: Check it in Storybook**

```bash
npm run storybook
```

Your Badge component will appear in the sidebar under `Components/Badge`.

---

## Q: What does the CSS class `my-ui-button` do and why is it added to every component?

```typescript
className={`my-ui-button ${className ?? ""}`.trim() || undefined}
```

This adds a consistent CSS class to every rendered element. It gives you a "hook" for:

1. **Global overrides in the consumer app** — if the app wants to target all buttons:
   ```css
   .my-ui-button { font-weight: 600; }
   ```

2. **Testing selectors** — automated tests can find elements by `my-ui-button`

3. **Debug visibility** — in DevTools, you can immediately see which elements are library components

The pattern also preserves any `className` the consumer passes:
- If consumer passes `className="my-custom-class"` → element gets `"my-ui-button my-custom-class"`
- If consumer passes nothing → element gets just `"my-ui-button"`

---

## Q: What is the `pt` prop and when should I use it?

`pt` stands for **PassThrough**. It is a PrimeReact feature that lets you apply styles directly to internal elements of a component that you can't target with a regular `className`.

Example from `InputSwitch.tsx`:

```typescript
pt={{
  root: { style: { width: 44, height: 24 } },  // The outer div
  slider: { style: { borderRadius: 10 } },       // The sliding circle
}}
```

Without `pt`, there is no other way to style the inner parts of PrimeReact components. Each component has different `pt` keys — check the PrimeReact documentation's "Pass Through" section for each component.

**When to use `pt`:**
- When you need to style something inside the component that isn't exposed as a prop
- For sizing, border-radius, or spacing on internal elements

**When NOT to use `pt`:**
- For simple things like colors (use CSS variables / `primereact-overrides.css` instead)
- For layout of the whole component (use `style` or `className`)

---

## Q: What is the barrel file (`src/ui/index.ts`) and why does it exist?

```typescript
// src/ui/index.ts
export { Button } from "./Button";
export { Card } from "./Card";
// ...
```

A barrel file is a **single file that re-exports everything** from a folder. Without it:

```typescript
// Consumer would have to write:
import { Button } from "@hashithaniroshan12/bildor-pilot-ui/dist/ui/Button";
import { Card } from "@hashithaniroshan12/bildor-pilot-ui/dist/ui/Card";
```

With the barrel:
```typescript
// Consumer writes:
import { Button, Card } from "@hashithaniroshan12/bildor-pilot-ui";
```

**Rule:** Every time you add a new component file, you MUST add it to `src/ui/index.ts` or it will not be accessible to consumers.

---

## Q: Why are `Column` and `TabPanel` exported from `src/ui/index.ts` directly from PrimeReact?

```typescript
export { Column } from "primereact/column";
export { TabPanel } from "primereact/tabview";
```

`Column` and `TabPanel` are **child components** that only make sense inside `DataTable` and `TabView`. They have no Bildor-specific defaults to apply, so wrapping them would add no value.

But consumers still need to import them from one consistent place. By re-exporting them here, consumers can write:
```typescript
import { DataTable, Column } from "@hashithaniroshan12/bildor-pilot-ui";
```

Instead of mixing imports:
```typescript
import { DataTable } from "@hashithaniroshan12/bildor-pilot-ui";
import { Column } from "primereact/column"; // ← inconsistent
```
