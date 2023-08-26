// Header.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import HeaderMain from '../../../../components/🔷Organisms/Header/HeaderMain';

const meta: Meta<typeof HeaderMain> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '🔷Organisms/Header/SBR Header',
  component: HeaderMain,
};

export default meta;
type Story = StoryObj<typeof HeaderMain>;

export const LoggedOut: Story = {
  render: (args) => (
    <SessionProvider>
      <HeaderMain {...args} />
    </SessionProvider>
  ),
};
