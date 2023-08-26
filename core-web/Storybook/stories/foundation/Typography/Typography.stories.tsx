// TypeStyle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Foundation/Tokens/Typography',
  component: Typography,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Heading', 'Paragraph', 'Quote'],
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
type Story = StoryObj<typeof Typography>;

export const Heading: Story = {
  args: {
    type: 'Heading',
  },
};

export const Paragraph: Story = {
  args: {
    type: 'Paragraph',
  },
};

export const Quote: Story = {
  args: {
    type: 'Quote',
  },
};
