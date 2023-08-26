import Image from 'next/image';
import Link from 'next/link';

import { SBR_SITE, ODDS_URL } from '/constants/seo';

const OurBrandMenu = ({ isMobile, expand }) => {
   return(
      <div className={`${expand && isMobile ? "family expanded" : "family"}`}>
         <nav aria-label="Other Sportsbook Review sites">
            <ul className="row" role="menubar">
               <li role="menuitem">
               {
                  !isMobile ?
                     <a
                        data-aatracker={`Header - Sportsbook Review Logo`}
                        className="logo"
                        href={SBR_SITE}>
                        <div>
                           <Image
                              src='https://img.sportsbookreview.com/images/sbr-logo.svg'
                              alt="Sportsbook Review logo"
                              width={144}
                              height={48} />
                        </div>
                     </a>
                     :
                     null
               }
               </li>
               <li role="menuitem">
                <Link
                    href={SBR_SITE}
                    passHref>
                   <a className="link"
                     data-aatracker="Menu - Sportsbook Review"
                     target="_self"
                     rel=""
                     data-cy="header-sportsbookreview">
                        <div className="item">Sportsbook Review</div></a>
                </Link>
                </li>
                <li role="menuitem"><div className="line"></div></li>
                <li role="menuitem">
                  <a className="link"
                     data-aatracker="Menu - Odds"
                     href={`${SBR_SITE}${ODDS_URL}`}
                     target="_self"
                     rel=""
                     data-cy="header-odds">
                     <div className="item selected">
                        <span className="">ODDS</span>
                        <div className="arrow"></div>
                     </div>
                  </a>
                </li>
                <li role="menuitem">
                  <Link
                     href={`${SBR_SITE}/picks/`}
                     passHref>
                     <a className="link"
                        data-aatracker="Menu - Picks"
                        target="_self"
                        rel=""
                        data-cy="header-picks">
                           <div className="item">PICKS</div></a>
                  </Link>
               </li>
               <li role="menuitem">
                  <Link
                     href={`${SBR_SITE}/forum/`}
                     passHref>
                     <a className="link"
                        data-aatracker="Menu - Forum"
                        target="_self"
                        rel=""
                        data-cy="header-forum">
                           <div className="item">FORUM</div></a>
                  </Link>
                </li>
             </ul>
          </nav>
       </div>
   );
}

export default OurBrandMenu;
