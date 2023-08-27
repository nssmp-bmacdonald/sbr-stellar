import Head from 'next/head';
import { IRegion } from '../../../types/region';
import FooterMain from '../../🔷Organisms/Footer/FooterMain';
import HeaderMain from '../../🔷Organisms/Header/HeaderMain';

import {
  Header as StellarHeader,
  Footer as StellarFooter,
} from '@nssmp-bmacdonald/sbr-stellar-components';
import {
  COMMUNITY_MENU,
  COMPLIANCE_MENU,
  RESOURCES_MENU,
  SOCIAL_MENU,
  SPORTSBOOK_MENU,
} from '../../../lib/template/menu';

export interface IMainSiteLayout {
  children: any;
  menu: any;
  region: IRegion;
}

const MainSiteLayout: React.FC<IMainSiteLayout> = ({
  children,
  menu,
  region,
}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <HeaderMain dataMenu={menu} region={region} />
      <main>{children}</main>
      <StellarFooter
        label="Core-Web Stellar Footer"
        SPORTSBOOK_MENU={SPORTSBOOK_MENU}
        SOCIAL_MENU={SOCIAL_MENU}
        RESOURCES_MENU={RESOURCES_MENU}
        COMPLIANCE_MENU={COMPLIANCE_MENU}
        COMMUNITY_MENU={COMMUNITY_MENU}
      />
      {/* <FooterMain region={region} /> */}
    </>
  );
};

export default MainSiteLayout;
