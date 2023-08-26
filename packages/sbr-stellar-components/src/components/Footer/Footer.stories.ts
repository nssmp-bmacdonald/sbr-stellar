import type { Meta, StoryObj } from "@storybook/react";

import Footer from "./Footer";

const meta: Meta = {
  title: "SBR/Footer",
  component: Footer,
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
