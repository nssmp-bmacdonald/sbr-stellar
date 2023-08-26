import type { Meta, StoryObj } from "@storybook/react";

import Footer from "./Footer";
import {
  COMMUNITY_MENU,
  COMPLIANCE_MENU,
  RESOURCES_MENU,
  SOCIAL_MENU,
  SPORTSBOOK_MENU,
} from "../../../constants";

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

export const BettingOdds: Story = {
  args: {
    label: "betting-odds",
    link: "http://localhost:3000/betting-odds",
  },
};

export const Betpoints: Story = {
  args: {
    SPORTSBOOK_MENU: SPORTSBOOK_MENU,
    RESOURCES_MENU: RESOURCES_MENU,
    COMMUNITY_MENU: COMMUNITY_MENU,
    COMPLIANCE_MENU: COMPLIANCE_MENU,
    SOCIAL_MENU: SOCIAL_MENU,
  },
};
