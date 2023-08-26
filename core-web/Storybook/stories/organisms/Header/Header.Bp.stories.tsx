// Header.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import Header from '../../../../components/🔷Organisms/Header/Header';

const meta: Meta<typeof Header> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '🔷Organisms/Header/Betpoint Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  render: (args) => (
    <SessionProvider>
      <Header {...args} />
    </SessionProvider>
  ),
};
