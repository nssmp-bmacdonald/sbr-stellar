import { IImage } from '../../types/layout/image';

interface IDisclaimerImage extends IImage {
  link?: string;
  nImages: number;
}

export const DISCLAIMER_IMAGES: IDisclaimerImage[] = [
  {
    type: '.png',
    title: 'iGaming Ontario white',
    filename:
      'https://img.sportsbookreview.com/images/compliance/iGaming-on-logo-white.png',
    alt: 'iGaming Ontario logo',
    caption: 'ON',
    width: 112,
    height: 32,
    link: 'https://igamingontario.ca/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'iGaming Ontario',
    filename:
      'https://img.sportsbookreview.com/images/compliance/iGaming-on-logo.png?auto=compress&auto=format&w=112&h=32',
    alt: 'iGaming Ontario logo',
    caption: 'ON',
    width: 112,
    height: 32,
    link: 'https://igamingontario.ca/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'Connex Ontario white',
    filename:
      'https://img.sportsbookreview.com/images/compliance/connex-on-logo-white.png?auto=compress&auto=format&w=162&h=32',
    alt: 'Connex Ontario logo',
    caption: 'ON',
    width: 162,
    height: 32,
    link: 'https://www.connexontario.ca/en-ca/',
    nImages: 2,
  },
  {
    type: '.pmg',
    title: 'Connex Ontario',
    filename:
      'https://img.sportsbookreview.com/images/compliance/connex-on-logo.png?auto=compress&auto=format&w=162&h=32',
    alt: 'Connecx Ontario logo',
    caption: 'ON',
    width: 162,
    height: 32,
    link: 'https://www.connexontario.ca/en-ca/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'BeGambleAware',
    filename:
      'https://img.sportsbookreview.com/images/compliance/be-gamble-aware-logo-dark.png?auto=compress&auto=format&w=236&h=32',
    alt: 'BeGambleAware logo',
    caption: 'GB',
    width: 236,
    height: 32,
    link: 'https://www.begambleaware.org/',
    nImages: 1,
  },
  {
    type: '.png',
    title: 'BeGambleAware white',
    filename:
      'https://img.sportsbookreview.com/images/compliance/be-gamble-aware-logo-white.png?auto=compress&auto=format&w=236&h=32',
    alt: 'BeGambleAware logo',
    caption: 'GB',
    width: 236,
    height: 32,
    link: 'https://www.begambleaware.org/',
    nImages: 1,
  },
  {
    type: '.png',
    title: 'GameSense',
    filename:
      'https://img.sportsbookreview.com/images/compliance/game-sense.png?auto=compress&auto=format',
    alt: 'GameSense logo',
    caption: 'MA',
    width: 142,
    height: 32,
    link: 'https://gamesensema.com/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'GameSense white',
    filename:
      'https://img.sportsbookreview.com/images/compliance/game-sense.png?auto=compress&auto=format',
    alt: 'GameSense logo',
    caption: 'MA',
    width: 142,
    height: 32,
    link: 'https://gamesensema.com/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'Gambling Help Line white',
    filename:
      'https://img.sportsbookreview.com/images/compliance/dph-helpline-white.png?auto=compress&auto=format&w=127&h=32',
    alt: 'Gambling Help Line',
    caption: 'MA',
    width: 127,
    height: 32,
    link: 'https://gamblinghelplinema.org/',
    nImages: 2,
  },
  {
    type: '.png',
    title: 'Gambling Help Line',
    filename:
      'https://img.sportsbookreview.com/images/compliance/dph-helpline.png?auto=compress&auto=format&w=127&h=32',
    alt: 'Gambling Help Line',
    caption: 'MA',
    width: 127,
    height: 32,
    link: 'https://gamblinghelplinema.org/',
    nImages: 2,
  },
];
