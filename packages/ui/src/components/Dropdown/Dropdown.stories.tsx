import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";

const cities = [
  { label: "New York", value: "ny" },
  { label: "Rome", value: "rm" },
  { label: "London", value: "ldn" },
  { label: "Istanbul", value: "ist" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    options: cities,
    optionLabel: "label",
    placeholder: "Select a city",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    showClear: { control: "boolean" },
    filter: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};

export const WithFilter: Story = {
  args: { filter: true, placeholder: "Search cities..." },
};

export const WithClear: Story = {
  args: { showClear: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: "ny" },
};
