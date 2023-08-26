// BoxStyle.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { BoxStyle } from './BoxStyle';

const meta: Meta<typeof BoxStyle> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Foundation/Tokens/Box Style',
  component: BoxStyle,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Shadow', 'Border', 'Corner Radius'],
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
type Story = StoryObj<typeof BoxStyle>;

export const Border: Story = {
  args: {
    type: 'Border',
  },
};

export const Shadow: Story = {
  args: {
    type: 'Shadow',
  },
};

export const CornerRadius: Story = {
  args: {
    type: 'Corner Radius',
  },
};
