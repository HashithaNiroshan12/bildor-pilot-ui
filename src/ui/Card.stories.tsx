import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Button } from "./Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subTitle: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    subTitle: "Card subtitle",
    children: <p style={{ margin: 0 }}>This is the card body content.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: "Project Summary",
    subTitle: "Last updated 2 hours ago",
    children: <p style={{ margin: 0 }}>Your project is on track. All systems operational.</p>,
    footer: (
      <div style={{ display: "flex", gap: 8 }}>
        <Button label="View Details" size="small" />
        <Button label="Dismiss" size="small" severity="secondary" outlined />
      </div>
    ),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <p style={{ margin: 0, color: "var(--muted)" }}>
        A minimal card with no title or subtitle.
      </p>
    ),
  },
};
