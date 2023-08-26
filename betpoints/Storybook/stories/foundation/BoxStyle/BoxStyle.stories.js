import { BoxStyle } from './BoxStyle';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Foundation/Tokens/Box Style',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Shadow', 'Border', 'Corner Radius'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  return BoxStyle({ ...args });
};

export const Shadow = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Shadow.args = {
  type: 'Shadow'
};

export const Border = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Border.args = {
  type: 'Border'
};

export const CornerRadius = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
CornerRadius.args = {
  type: 'Corner Radius'
};