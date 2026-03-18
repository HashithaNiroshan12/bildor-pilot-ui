import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputSwitch } from "./InputSwitch";

const meta: Meta<typeof InputSwitch> = {
  title: "Components/InputSwitch",
  component: InputSwitch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputSwitch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <InputSwitch {...args} checked={checked} onChange={(e) => setChecked(e.value)} />
        <span style={{ fontSize: 14 }}>{checked ? "Enabled" : "Disabled"}</span>
      </div>
    );
  },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};
