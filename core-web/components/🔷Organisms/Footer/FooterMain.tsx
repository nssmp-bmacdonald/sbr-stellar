import Image from 'next/image';
import Link from 'next/link';
import {
  MAIN_FOOTER_BOTTOM_MENU,
  MAIN_FOOTER_TOP_MENU,
  SOCIAL_MENU,
} from '../../../lib/template/menu';
import { IRegion } from '../../../types/region';
import Disclaimer from '../../💠Molecules/DisclaimerMessage/DisclaimerMessage';
import Nav from '../../💠Molecules/Nav/Nav';

export interface IFooterMain extends React.ComponentPropsWithoutRef<'footer'> {
  region: IRegion;
}
const year = new Date().getFullYear();

const FooterMain: React.FC<IFooterMain> = ({
  className,
  region,
  ...footerProps
}) => {
  return (
    <footer
      {...footerProps}
      className={`sbr-footer bg-dark pt-6 py-8 ${className ? className : ''}`}
    >
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between">
            <Link href="https://www.sportsbookreview.com/" legacyBehavior>
              <a className="d-block mb-3" data-aatracker="Footer - SBR logo">
                <Image
                  alt="Sportsbook Review logo"
                  src="https://img.sportsbookreview.com/images/sbr-logo.svg"
                  width={173}
                  height={32}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="row">
          <nav className="nav-container" aria-label="Footer menu top">
            <Nav
              className="nav flex-row border-bottom border-light pb-3 mb-3"
              menu={MAIN_FOOTER_TOP_MENU}
            />
          </nav>
        </div>
        <div className="row">
          <nav className="nav-container" aria-label="Footer menu bottom">
            <Nav className="nav flex-row" menu={MAIN_FOOTER_BOTTOM_MENU} />
          </nav>
        </div>
        <Disclaimer theme="darker" region={region} className="mt-4" />
        <div id="copyright" className="row justify-content-between mt-4">
          <p className="col-lg-6">
            {year} &copy; Sportsbook Review. All Rights Reserved.
          </p>
          <div className="col-lg-3 social-links">
            <Nav
              className="nav justify-content-end social-media"
              menu={SOCIAL_MENU}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
