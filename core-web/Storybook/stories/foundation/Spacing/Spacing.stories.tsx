// TypeStyle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Spacing from './Spacing';

const meta: Meta<typeof Spacing> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Foundation/Tokens/Spacing',
  component: Spacing,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['outset', 'inset'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Spacing>;

export const outset: Story = {
  args: {
    type: 'outset',
  },
};

export const inset: Story = {
  args: {
    type: 'inset',
  },
};
