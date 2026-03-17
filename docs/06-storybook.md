# 06 — Storybook

> What Storybook is, how the configuration works,
> and how to write stories for your components.

---

## Q: What is Storybook and why does this project use it?

Storybook is a **standalone browser application** that renders your components in isolation — without needing to build a full app.

**Without Storybook:**
- You'd have to create a test app, import your Button, write some JSX, run the app, and navigate to the page where Button appears — just to see it
- Every time you change Button, you repeat this

**With Storybook:**
- Run `npm run storybook`
- Open localhost:6006
- Every component appears in a sidebar, pre-rendered in multiple variants
- Change a prop using the controls panel and see it update live
- Check accessibility issues automatically

---

## Q: What is a "story"?

A story is a **single rendered example of a component**. Think of it as a use case.

For `Button`, the stories are:
- `Primary` — a standard primary button
- `Secondary` — a secondary severity button
- `Danger` — a red destructive action button
- `Outlined` — a bordered, non-filled variant
- `WithIcon` — a button with an icon
- `Loading` — a button in the loading spinner state

Each story = one pre-configured set of props.

---

## Q: What are the two Storybook config files and what does each do?

**`.storybook/main.ts`** — tells Storybook the structure of the project:

```typescript
const config: StorybookConfig = {
  // Where to look for story files
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  // Installed addons (extra features)
  addons: [
    "@storybook/addon-docs",        // Generates component documentation
    "@storybook/addon-a11y",        // Checks accessibility (WCAG)
    "@storybook/addon-vitest",      // Run stories as unit tests
    "@chromatic-com/storybook",     // Chromatic visual regression service
    "@storybook/addon-onboarding",  // First-time user guide
  ],

  // Uses Vite as the underlying bundler (matches our project)
  framework: "@storybook/react-vite",
};
```

**`.storybook/preview.ts`** — global setup that applies to ALL stories:

```typescript
// These CSS imports run before every story renders.
// Without them, components would look unstyled.
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../src/theme/tokens.css";
import "../src/theme/primereact-overrides.css";

const preview: Preview = {
  parameters: {
    // Auto-detect color and date fields in the Controls panel
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },

    // Background switcher in Storybook toolbar
    backgrounds: {
      default: "light",
      values: [
        { name: "light",   value: "#ffffff" },
        { name: "surface", value: "#f6f7fb" },
        { name: "dark",    value: "#0b1220" },
      ],
    },
  },
};
```

---

## Q: How is a story file structured?

Here is the complete anatomy of `Button.stories.tsx`:

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

// === META (one per file) ===
// Describes the component and configures the controls panel
const meta: Meta<typeof Button> = {
  title: "Components/Button",    // Sidebar path: Components > Button
  component: Button,              // The component being documented
  tags: ["autodocs"],             // Generate a docs page automatically
  argTypes: {
    // Controls panel: each prop gets a specific UI control
    label:    { control: "text" },
    severity: { control: "select", options: ["secondary", "success", "danger"] },
    disabled: { control: "boolean" },
    loading:  { control: "boolean" },
  },
};
export default meta;

// === STORY TYPE ===
type Story = StoryObj<typeof Button>;

// === STORIES (one per use case) ===

// "args" = the props for this story
export const Primary: Story = {
  args: { label: "Save Changes" },
};

export const Danger: Story = {
  args: { label: "Delete", severity: "danger" },
};

// Custom "render" function when args alone aren't enough
// (e.g. when the component needs local state)
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Danger" severity="danger" />
    </div>
  ),
};
```

---

## Q: When do I use `args` vs `render` in a story?

**Use `args`** when the story is a simple set of props:
```typescript
export const Outlined: Story = {
  args: { label: "Export", outlined: true },
};
```

**Use `render`** when:
- The component needs internal state (like a toggle switch)
- You need to show multiple components together
- The component requires a wrapper or context provider

```typescript
// InputSwitch needs useState — use render
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <InputSwitch
        checked={checked}
        onChange={(e) => setChecked(e.value)}
      />
    );
  },
};
```

---

## Q: What does `tags: ["autodocs"]` do?

It tells Storybook to automatically generate a **documentation page** for the component.

This docs page shows:
- A description of the component (from JSDoc comments in the component file)
- A props table with all accepted props, their types, defaults, and descriptions
- All exported stories rendered on the same page

You get this for free just by adding `tags: ["autodocs"]`.

---

## Q: What is the `title` field in `meta` and how does it affect the sidebar?

```typescript
title: "Components/Button"
```

The `/` creates a **folder hierarchy** in the Storybook sidebar:

```
Components/         ← folder
  Button            ← component
  Card
  Dropdown
Form Controls/      ← you could use a different group
  Checkbox
  InputText
```

You can choose any grouping you want. The convention in this project is to put everything under `Components/`.

---

## Q: How do I add Storybook for a newly created component?

1. Create `src/ui/MyComponent.stories.tsx` (alongside `MyComponent.tsx`)
2. Copy the structure from any existing story file
3. Change `component: MyComponent` and set appropriate `argTypes`
4. Export at least 2–3 stories showing different states

Storybook hot-reloads — you don't need to restart it. The new component will appear in the sidebar within seconds.

---

## Q: What is the `a11y` addon and what does it check?

`@storybook/addon-a11y` runs **accessibility checks** on every rendered story.

It checks for:
- Missing alt text on images
- Color contrast ratio below WCAG AA (4.5:1 for normal text)
- Form inputs without labels
- Keyboard-unfocusable interactive elements
- Missing ARIA attributes

Results appear in the "Accessibility" tab at the bottom of Storybook.

In our config `a11y: { test: "todo" }` means violations are shown as warnings, not failures. Change to `"error"` to fail CI builds on accessibility issues.
