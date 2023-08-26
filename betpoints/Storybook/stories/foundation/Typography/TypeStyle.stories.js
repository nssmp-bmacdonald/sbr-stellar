import { TypeStyle } from './TypeStyle';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Foundation/Tokens/Typography',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['Heading', 'Paragraph'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  return TypeStyle({ ...args });
};

export const Headings = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Headings.args = {
  type: 'Heading'
};

export const Paragraph = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Paragraph.args = {
  type: 'Paragraph'
};