// https://github.com/storybookjs/storybook/blob/next/MIGRATION.md
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-webpack5)
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../../public'],
  addons: [
    '@storybook/blocks',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: 'tag',
    defaultName: 'Overview',
  },
  // refs: {
  //   'design-system': {
  //     title: 'Stellar Design Kit',
  //     url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
  //   },
  // },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
