import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const meta: Meta = {
  title: "SBR/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstName: Story = {
  args: {
    label: "Brady",
  },
};

export const LastName: Story = {
  args: {
    label: "MacDonald",
  },
};
