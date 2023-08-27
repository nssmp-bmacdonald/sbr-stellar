import Head from 'next/head';
import { IRegion } from '../../../types/region';
import Footer from '../../🔷Organisms/Footer/Footer';
import Header from '../../🔷Organisms/Header/Header';
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

export interface IPrimaryLayout {
  children: any;
  region: IRegion;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, region }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <StellarHeader
        label="Betting-Odds"
        link="http://localhost:3000/betting-odds"
      />
      <Header />
      <main>{children}</main>
      <StellarFooter
        label="Betpoints Stellar Footer"
        SPORTSBOOK_MENU={SPORTSBOOK_MENU}
        SOCIAL_MENU={SOCIAL_MENU}
        RESOURCES_MENU={RESOURCES_MENU}
        COMPLIANCE_MENU={COMPLIANCE_MENU}
        COMMUNITY_MENU={COMMUNITY_MENU}
      />
      {/* <Footer region={region} /> */}
    </>
  );
};

export default PrimaryLayout;
