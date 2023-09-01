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
    classNames: "btn-primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Covers",
    classNames: "btn-secondary",
  },
};
