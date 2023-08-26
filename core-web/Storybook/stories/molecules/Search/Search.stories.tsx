// Search.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import Search from '../../../../components/💠Molecules/Search/Search';
import { ON } from '../../molecules/DisclaimerMessage/regionObject';

const meta: Meta<typeof Search> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '🔷Organisms/Header/Search',
  component: Search,
};

export default meta;
type Story = StoryObj<typeof Search>;

export const SearchWithDropdown: Story = {
  args: {
    region: ON,
  },
};
