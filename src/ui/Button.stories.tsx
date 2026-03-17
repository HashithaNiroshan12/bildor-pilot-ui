import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/**
 * The Button wraps PrimeReact's Button with Bildor Pilot defaults:
 * - Size defaults to "large"
 * - Border radius defaults to 20px
 *
 * All PrimeReact ButtonProps are supported.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    severity: {
      control: "select",
      options: ["secondary", "success", "info", "warning", "danger", "help", "contrast"],
    },
    size: {
      control: "select",
      options: ["small", "large"],
    },
    outlined: { control: "boolean" },
    text: { control: "boolean" },
    raised: { control: "boolean" },
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    icon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { label: "Save Changes" },
};

export const Secondary: Story = {
  args: { label: "Cancel", severity: "secondary" },
};

export const Danger: Story = {
  args: { label: "Delete", severity: "danger" },
};

export const Outlined: Story = {
  args: { label: "Export", outlined: true },
};

export const WithIcon: Story = {
  args: { label: "Upload", icon: "pi pi-upload" },
};

export const Loading: Story = {
  args: { label: "Saving...", loading: true },
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
