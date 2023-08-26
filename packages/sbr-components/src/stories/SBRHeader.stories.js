import { Header } from "../components/SBRHeader.jsx";

export default {
  title: "Example/SBRHeader",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const LoggedOut = {};

export const LoggedIn = {
  args: {
    user: {
      name: "Brady",
    },
  },
};
