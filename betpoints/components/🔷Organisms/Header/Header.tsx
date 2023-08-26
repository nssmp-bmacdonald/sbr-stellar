import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authenticatedDropdown } from '../../../helpers/menu-helpers';
import { userLogout } from '../../../lib/auth';
import { getClientBalanceId } from '../../../lib/points';
import {
  MAIN_MENU,
  UNATHENTICATED_LOGIN_MENU
} from '../../../lib/template/menu';
import NavItem from '../../💎Atoms/NavItem/NavItem';
import DropdownMenu from '../../💠Molecules/DropdownMenu/DropdownMenu';
import Nav from '../../💠Molecules/Nav/Nav';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}
const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  const [balance, setBalance] = useState<number>(0);

  const { data: session, status } = useSession();

  const isLoading = status == 'loading';
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (isAuthenticated) {
      getClientBalanceId(session?.user?.id).then((pointBalance) => {
        if (pointBalance) {
          setBalance(pointBalance.total);
        }
      });
    }
  }, [status, session]);

  async function handleLogout() {
    await userLogout();
    await signOut({ redirect: false });
  }

  const authenticatedMenu = authenticatedDropdown(
    handleLogout,
    session?.user.slug
  );

  return (
    <header {...headerProps} className={`bp-header ${className}`}>
      <nav className="navbar navbar-expand-lg bg-dark pb-0">
        <div className="container">
          <Link href="https://www.sportsbookreview.com/" legacyBehavior>
            <a
              className="d-block mb-3 mt-2"
              data-aatracker="Header - Sportsbook Review Logo"
            >
              <Image
                alt="Sportsbook Review logo"
                src="https://img.sportsbookreview.com/images/sbr-logo.svg"
                width={173}
                height={32}
              />
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav-bar"
            aria-controls="main-nav-bar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-dark navbar-collapse col-12 col-lg-11"
            id="main-nav-bar"
          >
            <Nav
              className="left-navbar-nav navbar-nav navbar-nav-dark col-12 col-lg-10 justify-content-center"
              menu={MAIN_MENU}
            />

            {isLoading ? (
              <></>
            ) : (
              <>
                {isAuthenticated ? (
                  <DropdownMenu
                    text="User Menu"
                    icon={session?.user.avatar}
                    itemId="navbarDropdownMenuLink"
                    className="navbar-nav col-12 col-lg-2 justify-content-start"
                    aClassName={isAuthenticated ? '' : 'dropdown-toggle'}
                    ddClasses="dropdown-menu rounded p-3 bg-darker col-12 col-lg-3 dropdown-menu-end"
                    menu={authenticatedMenu}
                    header={`${balance.toLocaleString()} POINTS`}
                  />
                ) : (
                  <NavItem active={false} {...UNATHENTICATED_LOGIN_MENU} />
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
