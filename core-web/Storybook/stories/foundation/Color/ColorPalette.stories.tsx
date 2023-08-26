// ColorPalette.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { ColorPalette } from './ColorPalette';

const meta: Meta<typeof ColorPalette> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Foundation/Tokens/Color',
  component: ColorPalette,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Blue', 'Neutral', 'Green', 'Yellow', 'Red'],
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
type Story = StoryObj<typeof ColorPalette>;

export const Blue: Story = {
  args: {
    type: 'Blue',
  },
};

export const Neutral: Story = {
  args: {
    type: 'Neutral',
  },
};

export const Green: Story = {
  args: {
    type: 'Green',
  },
};

export const Yellow: Story = {
  args: {
    type: 'Yellow',
  },
};

export const Red: Story = {
  args: {
    type: 'Red',
  },
};
