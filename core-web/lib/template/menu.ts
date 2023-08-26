import { IMenu } from '../../types/layout/menu';

export const MAIN_MENU: IMenu[] = [
  {
    text: 'Points',
    href: '/points/',
    className: 'nav-link',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Movers & Shakers',
    href: '/points/movers-and-shakers/',
    className: 'nav-link',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Contests',
    href: process.env.CONTESTS_URL ?? 'https://contests.sportsbookreview.com',
    className: 'nav-link',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Forum',
    href: process.env.FORUM_URL ?? 'https://www.sportsbookreview.com/forum/',
    className: 'nav-link',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const SPORTSBOOK_MENU: IMenu[] = [
  {
    text: 'About us',
    href: '#',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - About Us',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Picks',
    href: 'https://www.sportsbookreview.com/picks/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - Picks',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'News',
    href: 'https://www.sportsbookreview.com/news/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - News',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Contact Us',
    href: 'https://www.sportsbookreview.com/contact-us/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - Contact Us',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const RESOURCES_MENU: IMenu[] = [
  {
    text: 'How to Bet',
    href: 'https://www.sportsbookreview.com/how-to-bet-on-sports/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - How to Bet',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Betting Calculator',
    href: 'https://www.sportsbookreview.com/betting-calculators/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - Betting Calculator',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const COMMUNITY_MENU: IMenu[] = [
  {
    text: 'Contest',
    href: process.env.CONTESTS_URL ?? 'https://contests.sportsbookreview.com',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - Contests',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Forum',
    href: process.env.FORUM_URL ?? 'https://www.sportsbookreview.com/forum/',
    className: 'nav-link px-0 py-1',
    aaTracker: 'Footer - Forum',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const SOCIAL_MENU: IMenu[] = [
  {
    text: 'YouTube link',
    href: 'https://www.youtube.com/user/SBRForum/',
    className: 'nav-link',
    aaTracker: 'Footer - Icons - Social Media - YouTube link',
    target: '_blank',
    rel: 'nofollow',
    icon: 'sbr-icon-video',
  },
  {
    text: 'Twitter Link',
    href: 'https://twitter.com/sbrsportspicks',
    className: 'nav-link',
    aaTracker: 'Footer - Icons - Social Media - Twitter Link',
    target: '_blank',
    rel: 'nofollow',
    icon: 'sbr-icon-twitter-simple',
  },
  {
    text: 'Facebook Link',
    href: 'https://www.facebook.com/Sportsbookreview.SBR/',
    className: 'nav-link',
    aaTracker: 'Footer - Icons - Social Media - Facebook Link',
    target: '_blank',
    rel: 'nofollow',
    icon: 'sbr-icon-facebook-simple',
  },
  {
    text: 'Instagram link',
    href: 'https://www.instagram.com/sbrsportspicks/',
    className: 'nav-link',
    aaTracker: 'Footer - Icons - Social Media - Instagram link',
    target: '_blank',
    rel: 'nofollow',
    icon: 'sbr-icon-instagram-inline',
  },
];

export const COMPLIANCE_MENU: IMenu[] = [
  {
    text: 'Privacy Policy',
    href: 'https://www.sportsbookreview.com/privacy-policy/',
    className: 'nav-link',
    aaTracker: 'Footer - Privacy Policy',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Terms of Use',
    href: 'https://www.sportsbookreview.com/terms-of-use/',
    className: 'nav-link',
    aaTracker: 'Footer - Terms of Use',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'DMCA',
    href: 'https://www.sportsbookreview.com/dmca/',
    className: 'nav-link',
    aaTracker: 'Footer - DMCA',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const UNATHENTICATED_LOGIN_MENU: IMenu = {
  text: 'Sign in',
  href: '/login/',
  className: 'btn btn-outline-secondary btn-sm mb-2',
  aaTracker: '',
  target: '_self',
  rel: '',
  icon: '',
};

export const ATHENTICATED_LOGIN_MENU: IMenu[] = [
  {
    text: 'Account Profile',
    href: '/points/account/',
    className: 'dropdown-item px-0 py-2',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Best Sportsbooks',
    href: '/points/best-sportsbooks/',
    className: 'dropdown-item px-0 py-2',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Transfer Betpoints',
    href: '/points/account/transfer/',
    className: 'dropdown-item px-0 py-2',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const MAIN_FOOTER_TOP_MENU: IMenu[] = [
  {
    text: 'Blacklist',
    href: 'https://www.sportsbookreview.com/blacklist/',
    className: 'nav-link',
    aaTracker: 'Footer - Blacklist',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Betting Calculators',
    href: 'https://www.sportsbookreview.com/betting-calculators/',
    className: 'nav-link',
    aaTracker: 'Footer - Betting Calculators',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Betting Sites',
    href: 'https://www.sportsbookreview.com/betting-sites/',
    className: 'nav-link',
    aaTracker: 'Footer - Betting Sites',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const MAIN_FOOTER_BOTTOM_MENU: IMenu[] = [
  {
    text: 'Blacklist',
    href: 'https://www.sportsbookreview.com/blacklist/',
    className: 'nav-link',
    aaTracker: 'Footer - Blacklist',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Betting Calculators',
    href: 'https://www.sportsbookreview.com/betting-calculators/',
    className: 'nav-link',
    aaTracker: 'Footer - Betting Calculators',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Betting Sites',
    href: 'https://www.sportsbookreview.com/betting-sites/',
    className: 'nav-link',
    aaTracker: 'Footer - Betting Sites',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export const ACCOUNT_PAGE_MENU: IMenu[] = [
  {
    text: 'Profile Overview',
    href: '#profile-overview',
    className: 'nav-link mb-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Your Bettor Roadmap',
    href: '#bettor-roadmap',
    className: 'nav-link mb-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Contests',
    href: '#contests',
    className: 'nav-link mb-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Handbooks and Guides',
    href: '#handbooks-guides',
    className: 'nav-link mb-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
  {
    text: 'Communication Preferences',
    href: '#communication-preferences',
    className: 'nav-link mb-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  },
];

export async function getMenu(): Promise<any> {
  const url = `${process.env.API}/menu`;

  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch(() => {
      return null;
    });
}
