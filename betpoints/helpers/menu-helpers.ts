import { ATHENTICATED_LOGIN_MENU } from '../lib/template/menu';
import { IMenu } from '../types/layout/menu';

export function authenticatedDropdown(handleLogout: Function, slug?: string) {
  const logout: IMenu = {
    text: 'Sign out',
    href: '#',
    className: 'btn btn-primary w-100 mt-3',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
    action: handleLogout,
  };
  const history: IMenu = {
    text: 'History',
    href: `/points/history/${slug}/`,
    className: 'dropdown-item px-0 py-2',
    aaTracker: '',
    target: '_self',
    rel: '',
    icon: '',
  };

  return [history, ...ATHENTICATED_LOGIN_MENU, logout];
}
