// Icon.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../../../components/💎Atoms/Icon/Icon';

const meta: Meta<typeof Icon> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '💎Atoms/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      values: ['', 'mat-icon-arrow-back', 'mat-icon-arrow-forward'],
    },
    size: {
      control: {
        type: 'inline-radio',
        labels: {
          16: '16px',
          20: '20px',
          24: '24px',
          32: '32px',
          48: '48px',
          64: '64px',
        },
      },
      values: ['16', '20', '24', '32', '48', '64'],
    },
    color: {
      control: {
        type: 'inline-radio',
        labels: {
          white: 'White Color',
          green: 'Green Color',
          red: 'Red Color',
        },
      },
      values: ['white', 'green', 'red'],
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
type Story = StoryObj<typeof Icon>;

export const Icons: Story = {
  args: {
    text: 'describe the icon',
  },
};
