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

export const BettingOdds: Story = {
  args: {
    label: "betting-odds",
    link: "http://localhost:3000/betting-odds",
  },
};

export const Betpoints: Story = {
  args: {
    label: "betpoints",
    link: "http://localhost:3001/points",
  },
};
