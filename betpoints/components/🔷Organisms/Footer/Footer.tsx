import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import {
  COMMUNITY_MENU,
  COMPLIANCE_MENU,
  RESOURCES_MENU,
  SOCIAL_MENU,
  SPORTSBOOK_MENU,
} from '../../../lib/template/menu';
import { IRegion } from '../../../types/region';
import Nav from '../../💠Molecules/Nav/Nav';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {
  region: IRegion;
}

const Footer: React.FC<IFooter> = ({ className, region, ...footerProps }) => {
  return (
    <footer {...footerProps} className={`bg-dark py-6 ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 mb-4 mb-lg-0 mb-xl-0 px-3">
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
            <p>
              <small>{new Date().getFullYear()} © Sportsbook Review.</small>
            </p>
          </div>

          <div className="col-6 col-md-4 col-lg-3 mb-3 px-3">
            <nav className="nav-container" aria-label="Footer menu">
              <h5>Sportsbook Review</h5>
              <Nav className="nav flex-column" menu={SPORTSBOOK_MENU} />
            </nav>
          </div>
          <div className="col-6 col-md-4 col-lg-3 mb-3 px-3">
            <nav className="nav-container pb-2" aria-label="Footer menu">
              <h5>Resources</h5>
              <Nav className="nav flex-column" menu={RESOURCES_MENU} />
            </nav>
          </div>
          <div className="col-6 col-md-4 col-lg-3 mb-3 px-3">
            <nav className="nav-container" aria-label="Footer menu">
              <h5>SBR Community</h5>
              <Nav className="nav flex-column" menu={COMMUNITY_MENU} />
            </nav>
          </div>

          <div className="col-12 mb-3 px-2">
            <Nav className="nav" menu={COMPLIANCE_MENU} />
          </div>

          {region?.disclaimer || region?.authority ?
            <div className="col-12">
              <div className="logos w-100 bg-darker shadow rounded-1 p-3 mb-3 border-secondary d-flex flex-column-reverse flex-lg-row justify-content-between">            

              <div>
                {region?.disclaimer ? <p><span className="fw-bold">Affiliate Disclosure: </span>{region.disclaimer}</p> : ''}
                {region?.authority ? parse(region.authority) as string : ''}
              </div>

                {region?.xRegionCode?.toLowerCase() === 'on' ? (
                  <Link href="https://igamingontario.ca/en" legacyBehavior>
                    <a
                      id="ontario-igaming-logo"
                      data-aa-tracker="Footer | Ontario Gaming Logo"
                      target="_blank"
                      rel="nofollow"
                      className="py-3"
                    >
                      <Image
                        src="https://img.sportsbookreview.com/images/compliance/iGaming-on-logo-white.png"
                        alt="Ontario iGaming logo"
                        width={112}
                        height={32}
                      />
                    </a>
                  </Link>
                ) : region?.xRegionCode.toLowerCase() === 'gb' ? (
                  <Link href="https://www.begambleaware.org/" legacyBehavior>
                    <a
                      id="be-gamble-aware-logo-logo"
                      data-aa-tracker="Footer | BeGambleAware Logo"
                      target="_blank"
                      rel="nofollow"
                      className="py-3"
                    >
                      <Image
                        src="https://img.sportsbookreview.com/images/compliance/be-gamble-aware-logo-white.png"
                        alt="BeGambleAware Logo"
                        width={236}
                        height={32}
                      />
                    </a>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          : '' }
        </div>

        <div className="row justify-content-between">
          <div className="text-start col-6 mt-2 px-3">
            <small>All Rights Reserved.</small>
          </div>
          <Nav
            className="nav justify-content-end social-media col-6"
            menu={SOCIAL_MENU}
          />
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
