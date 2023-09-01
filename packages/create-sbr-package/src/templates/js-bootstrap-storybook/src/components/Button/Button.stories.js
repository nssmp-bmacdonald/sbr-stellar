import Button from "./Button";

export default {
  title: "SBR/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export const Primary = {
  args: {
    label: "SBR",
    classNames: "btn-primary",
  },
};

export const Secondary = {
  args: {
    label: "Covers",
    classNames: "btn-secondary",
  },
};
