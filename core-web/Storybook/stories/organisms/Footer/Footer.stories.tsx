// Footer.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import FooterMain from '../../../../components/🔷Organisms/Footer/FooterMain';
import { ON } from '../../molecules/DisclaimerMessage/regionObject';

const meta: Meta<typeof FooterMain> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '🔷Organisms/Footer/SBR Footer',
  component: FooterMain,
};

export default meta;
type Story = StoryObj<typeof FooterMain>;

export const WithoutDisclaimer: Story = {};

export const WithDisclaimer: Story = {
  args: {
    region: ON,
  },
};
