import Image from "next/image";
import Link from "next/link";

import { SBR_SITE } from "/constants/seo";

import { Footer as StellarFooter } from "@nssmp-bmacdonald/sbr-stellar-components";

function Footer({ region }) {
  return (
    <>
      <StellarFooter label="Betting-Odds Footer" />
      <footer id="footer" className="footer bckg-light_blue">
        <div className="container layout-column">
          <div className="logo">
            <Image
              src="https://img.sportsbookreview.com/images/sbr-logo.svg"
              alt="Sportsbook Review logo"
              width={173}
              height={32}
            />
          </div>
          {region === "on" ? (
            <div className="logo-ontario">
              <Link href="https://igamingontario.ca/en">
                <a id="ontario-igaming-logo" target="_blank" rel="nofollow">
                  <Image
                    src="https://img.sportsbookreview.com/images/logo-igaming-ontario-en.png"
                    alt="Ontario iGaming logo"
                    width={200}
                    height={63}
                  />
                </a>
              </Link>
            </div>
          ) : (
            ""
          )}
          <nav className="nav-container" aria-label="Footer menu">
            <ul className="half" role="menu">
              {region === "on" ? (
                ""
              ) : (
                <li role="menuitem">
                  <Link href={`${SBR_SITE}/bonuses/`} passHref>
                    <a className="link" data-aatracker="Footer - Bonuses" target="_self" rel="">
                      Bonuses
                    </a>
                  </Link>
                </li>
              )}
              <li role="menuitem">
                <Link href={`${SBR_SITE}/blacklist/`}>
                  <a className="link" data-aatracker="Footer - Blacklist" target="_self" rel="">
                    Blacklist
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/betting-calculators`}>
                  <a className="link" data-aatracker="Footer - Betting Tools" target="_self" rel="">
                    Betting Tools
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/betting-sites/`}>
                  <a className="link" data-aatracker="Footer - Betting Sites" target="_self" rel="">
                    Betting Sites
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/usa-sports-betting/`}>
                  <a
                    className="link"
                    data-aatracker="Footer - USA Sports Betting"
                    target="_self"
                    rel=""
                  >
                    USA Sports Betting
                  </a>
                </Link>
              </li>
            </ul>
            <hr />
            <ul className="half" role="menu">
              <li role="menuitem">
                <Link href={`${SBR_SITE}/terms-of-use/`}>
                  <a className="link" data-aatracker="Footer - Terms of Use" target="_self" rel="">
                    Terms of use
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/contact-us/`}>
                  <a className="link" data-aatracker="Footer - Contact Us" target="_self" rel="">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/privacy-policy/`}>
                  <a
                    className="link"
                    data-aatracker="Footer - Privacy Policy"
                    target="_self"
                    rel=""
                  >
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/dmca/`}>
                  <a className="link" data-aatracker="Footer - DMCA" target="_self" rel="">
                    DMCA
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href={`${SBR_SITE}/about-sbr/`}>
                  <a className="link" data-aatracker="Footer - About SBR" target="_self" rel="">
                    About SBR
                  </a>
                </Link>
              </li>
              <li role="menuitem">
                <Link href="https://www.begambleaware.org/">
                  <a
                    className="link"
                    data-aatracker="Footer - 18+ Gamble Responsibly"
                    target="_self"
                    rel="nofollow"
                  >
                    18+ Gamble Responsibly
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bckg-light_blue">
          <div className="container copyright">
            <p>{new Date().getFullYear()} © Sportsbook Review. All Rights Reserved.</p>
            <div className="social-media">
              <Link href="https://www.youtube.com/user/SBRForum/">
                <a
                  className="link"
                  data-aatracker="Footer - YouTube Link"
                  target="_blank"
                  rel="nofollow"
                >
                  <i className="sbr-icon-video"></i>
                  <span className="sr-only">YouTube link</span>
                </a>
              </Link>
              <Link href="https://twitter.com/sbrsportspicks">
                <a
                  className="link"
                  data-aatracker="Footer - Twitter Link"
                  target="_blank"
                  rel="nofollow"
                >
                  <i className="sbr-icon-twitter-simple"></i>
                  <span className="sr-only">Twitter link</span>
                </a>
              </Link>
              <Link href="https://www.facebook.com/Sportsbookreview.SBR/">
                <a
                  className="link"
                  data-aatracker="Footer - Facebook Link"
                  target="_blank"
                  rel="nofollow"
                >
                  <i className="sbr-icon-facebook-simple"></i>
                  <span className="sr-only">Facebook link</span>
                </a>
              </Link>
              <Link href="https://www.instagram.com/sbrsportspicks/">
                <a
                  className="link"
                  data-aatracker="Footer - Instagram Link"
                  target="_blank"
                  rel="nofollow"
                >
                  <i className="sbr-icon-instagram-inline"></i>
                  <span className="sr-only">Instagram link</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
