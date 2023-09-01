import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "SBR/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "SBR",
    className: "px-6 pt-10 pb-8 shadow-xl underline",
  },
};

export const Secondary: Story = {
  args: {
    label: "Covers",
    className: "underline",
  },
};
