// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../../../components/💎Atoms/Button/Button';
import { arrowBack } from '../Icon/iconObjects';

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '💎Atoms/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'Primary Button',
        'Dark Button',
        'Ghost Button',
        'Grey Ghost Button',
        'Button With Icon',
      ],
    },
    size: {
      control: {
        type: 'inline-radio',
        labels: {
          none: 'Default',
          sm: 'Small',
          lg: 'Large',
        },
      },
      values: ['none', 'sm', 'lg'],
    },
    circle: {
      control: { type: 'boolean' },
    },
    position: {
      control: {
        type: 'inline-radio',
        labels: {
          // 'labels' maps option values to string labels
          left: 'Icon on the Left',
          right: 'Icon on the Right',
        },
      },
      values: ['left', 'right'],
    },
    clasName: {
      control: 'text',
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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    type: 'Primary Button',
    label: 'Button',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
export const DarkButton: Story = {
  args: {
    type: 'Dark Button',
    label: 'Button',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
export const GhostButton: Story = {
  args: {
    type: 'Ghost Button',
    label: 'Button',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
export const GreyGhostButton: Story = {
  args: {
    type: 'Grey Ghost Button',
    label: 'Button',
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const ButtonWithIcon: Story = {
  args: {
    type: 'Button With Icon',
    label: '',
    icons: arrowBack,
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: (args) => <Button {...args} />,
};
