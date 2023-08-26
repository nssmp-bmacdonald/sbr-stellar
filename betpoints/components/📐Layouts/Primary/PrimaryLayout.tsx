import Head from 'next/head';
import { IRegion } from '../../../types/region';
import Footer from '../../🔷Organisms/Footer/Footer';
import Header from '../../🔷Organisms/Header/Header';
import {
  Header as StellarHeader,
  Footer as StellarFooter,
} from '@nssmp-bmacdonald/sbr-stellar-components';

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
      <Footer region={region} />
      <StellarFooter
        label="Footer Prop"
        link="http://localhost:3000/betting-odds"
      />
    </>
  );
};

export default PrimaryLayout;
