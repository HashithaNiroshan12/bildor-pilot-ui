import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "./TextInput";

/**
 * TextInput is a compound field component that wraps PrimeReact InputText with:
 * - Accessible label + required indicator
 * - Helper text below the input
 * - Error state with red border and error message
 * - Automatic `id` generation via `useId()`
 */
const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    helperText: "Must be 3–20 characters, letters and numbers only.",
    placeholder: "john_doe",
  },
};

export const WithError: Story = {
  args: {
    label: "Email address",
    error: "Please enter a valid email address.",
    value: "not-an-email",
    placeholder: "you@example.com",
  },
};

export const Required: Story = {
  args: {
    label: "Full name",
    required: true,
    placeholder: "Jane Smith",
  },
};

export const Disabled: Story = {
  args: {
    label: "Account ID",
    value: "usr_1234567890",
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 360 }}>
      <TextInput label="Default" placeholder="Enter value" />
      <TextInput label="With helper" helperText="This is helper text." placeholder="Enter value" />
      <TextInput label="Required" required placeholder="Enter value" />
      <TextInput label="Error state" error="This field is required." placeholder="Enter value" />
      <TextInput label="Disabled" value="Locked value" disabled />
    </div>
  ),
};
