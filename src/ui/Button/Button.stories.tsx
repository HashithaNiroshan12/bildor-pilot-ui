import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/**
 * Button wraps PrimeReact's Button with a variant abstraction:
 * - `variant="solid"` (default) — filled brand button
 * - `variant="outlined"` — border-only button
 * - `variant="ghost"` — text-only button
 *
 * Size defaults to "large". All PrimeReact ButtonProps except `outlined`/`text` are supported.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["solid", "outlined", "ghost"],
    },
    severity: {
      control: "select",
      options: ["secondary", "success", "info", "warning", "danger", "help", "contrast"],
    },
    size: {
      control: "select",
      options: ["small", "large"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: { label: "Save Changes" },
};

export const Outlined: Story = {
  args: { label: "Export", variant: "outlined" },
};

export const Ghost: Story = {
  args: { label: "Cancel", variant: "ghost" },
};

export const WithIcon: Story = {
  args: { label: "Upload", icon: "pi pi-upload" },
};

export const Loading: Story = {
  args: { label: "Saving...", loading: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button label="Solid" variant="solid" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Ghost" variant="ghost" />
    </div>
  ),
};

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Danger" severity="danger" />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button label="Solid" size="small" />
      <Button label="Outlined" size="small" variant="outlined" />
      <Button label="Ghost" size="small" variant="ghost" />
    </div>
  ),
};
