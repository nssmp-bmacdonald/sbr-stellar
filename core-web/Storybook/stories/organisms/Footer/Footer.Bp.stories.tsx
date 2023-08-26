// Footer.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../../../../components/🔷Organisms/Footer/Footer';
import { ON } from '../../molecules/DisclaimerMessage/regionObject';

const meta: Meta<typeof Footer> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '🔷Organisms/Footer/Betpoint Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const WithoutDisclaimer: Story = {};

export const WithDisclaimer: Story = {
  args: {
    region: ON,
  },
};
