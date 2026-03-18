import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

/**
 * Badge is a pure display component for status labels and tags.
 * Uses semantic color tokens for each variant.
 */
const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { value: "Default" },
};

export const Success: Story = {
  args: { value: "Active", variant: "success" },
};

export const Warning: Story = {
  args: { value: "Pending", variant: "warning" },
};

export const Danger: Story = {
  args: { value: "Failed", variant: "danger" },
};

export const Info: Story = {
  args: { value: "In Review", variant: "info" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Badge value="Default" />
      <Badge value="Active" variant="success" />
      <Badge value="Pending" variant="warning" />
      <Badge value="Failed" variant="danger" />
      <Badge value="In Review" variant="info" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "Payment processed", status: "Active", variant: "success" as const },
        { name: "Awaiting approval", status: "Pending", variant: "warning" as const },
        { name: "Connection lost", status: "Failed", variant: "danger" as const },
        { name: "Under review", status: "In Review", variant: "info" as const },
        { name: "Archived record", status: "Archived", variant: "default" as const },
      ].map(({ name, status, variant }) => (
        <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>
          <span style={{ fontSize: 14 }}>{name}</span>
          <Badge value={status} variant={variant} />
        </div>
      ))}
    </div>
  ),
};
