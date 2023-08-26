// .storybook/sbr-theme.js
// https://storybook.js.org/docs/react/configure/theming

import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  colorPrimary: '#19B959',
  colorSecondary: '#025BFF',

  // UI
  appBg: '#21252d',
  appContentBg: '#14161c',
  appBorderColor: '#ced2db',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Barlow", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#025bff',

  // Toolbar default and active colors
  barTextColor: '#21252d',
  barSelectedColor: '#025bff',
  barBg: '#eef1f4',

  // Form colors
  inputBg: 'white',
  inputBorder: '#ced2db',
  inputTextColor: '#21252d',
  inputBorderRadius: 4,

  brandTitle: 'Stellar Design',
  brandUrl: 'https://www.sportsbookreview.com/',
  brandImage:
    'https://img.sportsbookreview.com/images/storybook/stellar-design-logo.svg',
  brandTarget: '_self',
});
