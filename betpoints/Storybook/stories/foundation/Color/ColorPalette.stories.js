import { ColorPalette } from './ColorPalette';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Foundation/Tokens/Colour',
  component: ColorPalette,
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    Palette: {
      control: { type: 'select' },
      options: ['Blue', 'Neutral', 'Green', 'Yellow', 'Red'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = ({ ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  return ColorPalette({ ...args });
};

export const Blue = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Blue.args = {
  Palette: 'Blue',
};

export const Neutral = Template.bind({});
Neutral.args = {
  Palette: 'Neutral',
};

export const Green = Template.bind({});
Green.args = {
  Palette: 'Green',
};

export const Yellow = Template.bind({});
Yellow.args = {
  Palette: 'Yellow',
};

export const Red = Template.bind({});
Red.args = {
  Palette: 'Red',
};
