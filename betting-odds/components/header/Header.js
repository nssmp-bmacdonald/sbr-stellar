import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import ExploreBrandsMenu from "./partials/ExploreBrandsMenu";
import MainNavigation from "./partials/MainNavigation";
import OurBrandMenu from "./partials/OurBrandMenu";

import { SBR_SITE } from "/constants/seo";
import "/styles/layout/Header.module.scss";

import { Header as StellarHeader } from "@nssmp-bmacdonald/sbr-stellar-components";

const Header = ({ league, isBreakpoint, asPath, favoriteCount }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pointValue = isBreakpoint;

  const expandMobileMenu = () => {
    pointValue ? setIsMobileOpen(!isMobileOpen) : setIsMobileOpen(false);
  };

  return (
    <>
      <StellarHeader label="Betting Odds" />
      <header className={`${isMobileOpen && pointValue ? "header open" : "header"} bckg-blue`}>
        {pointValue ? (
          <>
            <div className="menu-mobile">
              <Link href={SBR_SITE}>
                <a className="logo" data-aatracker="Header - Sportsbook Review Logo">
                  <Image
                    alt="Sports Book Review Mobile logo"
                    src="https://img.sportsbookreview.com/images/sbr-logo.svg"
                    width={173}
                    height={32}
                  />
                </a>
              </Link>
              <button
                className={isMobileOpen ? "menu-mobile_button checked" : "menu-mobile_button"}
                type="button"
                data-cy="hamburguer-menu-button"
                onClick={expandMobileMenu}
                aria-label="Expand menu button"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <OurBrandMenu isMobile={pointValue} expand={isMobileOpen} />
            <ExploreBrandsMenu isMobile={pointValue} expand={isMobileOpen} />
          </>
        ) : (
          <>
            <ExploreBrandsMenu isMobile={pointValue} expand={isMobileOpen} />
            <OurBrandMenu isMobile={pointValue} expand={isMobileOpen} />
          </>
        )}
        <MainNavigation
          isMobile={pointValue}
          expand={isMobileOpen}
          league={league}
          urlPath={asPath}
          favoriteCount={favoriteCount}
        />
      </header>
    </>
  );
};

export default Header;
