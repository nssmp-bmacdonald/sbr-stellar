import React from "react";
import Nav from "../atoms/Nav";

import "./Footer.css";
import "bootstrap/dist/css/bootstrap.css";
import { IMenu } from "../../../constants";

interface FooterProps {
  SPORTSBOOK_MENU: IMenu[];
  RESOURCES_MENU: IMenu[];
  COMMUNITY_MENU: IMenu[];
  COMPLIANCE_MENU: IMenu[];
  SOCIAL_MENU: IMenu[];
}

const Footer: React.FC<FooterProps> = ({
  SPORTSBOOK_MENU,
  RESOURCES_MENU,
  COMMUNITY_MENU,
  COMPLIANCE_MENU,
  SOCIAL_MENU,
}) => {
  return (
    <footer className={`bg-dark py-6`}>
      <h2 className="text-white text-center p-3">Stellar SBR</h2>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-3 mb-4 mb-lg-0 mb-xl-0 px-3">
            <a href="https://www.sportsbookreview.com/">
              <a className="d-block mb-3" data-aatracker="Footer - SBR logo">
                <img
                  alt="Sportsbook Review logo"
                  src="https://img.sportsbookreview.com/images/sbr-logo.svg"
                  width={173}
                  height={32}
                />
              </a>
            </a>
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
        </div>

        <div className="row justify-content-between">
          <div className="text-start col-6 mt-2 px-3">
            <small>All Rights Reserved.</small>
          </div>
          <Nav className="nav justify-content-end social-media col-6" menu={SOCIAL_MENU} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
