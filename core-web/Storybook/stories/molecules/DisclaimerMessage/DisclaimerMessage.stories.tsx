// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import DisclaimerMessage, {
  Disclaimer,
} from '../../../../components/💠Molecules/DisclaimerMessage/DisclaimerMessage';
import { MA, ON, UK } from './regionObject';

const meta: Meta<typeof DisclaimerMessage> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '💠Molecules/Compliance/Disclaimer Message',
  component: DisclaimerMessage,
  argTypes: {
    width: {
      control: { type: 'inline-radio' },
      options: ['100', '50', 'auto'],
    },
    rounded: {
      control: { type: 'boolean' },
    },
    theme: {
      control: {
        type: 'select',
        labels: {
          dark: 'Dark',
          darker: 'Darker',
          light: 'Light',
          white: 'White',
        },
      },
      values: ['dark', 'darker', 'light', 'white'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ marginTop: '3em', marginBottom: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DisclaimerMessage>;

export const Ontario: Story = {
  args: {
    theme: 'dark',
    width: '100',
    region: ON,
  },
  render: (args) => <Disclaimer {...args} />,
};

export const UnitedKingdom: Story = {
  args: {
    theme: 'dark',
    region: UK,
  },
  render: (args) => <Disclaimer {...args} />,
};

export const Massachusetts: Story = {
  args: {
    theme: 'dark',
    region: MA,
  },
  render: (args) => <Disclaimer {...args} />,
};
