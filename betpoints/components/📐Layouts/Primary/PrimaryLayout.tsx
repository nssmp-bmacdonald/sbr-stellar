import Head from 'next/head';
import { IRegion } from '../../../types/region';
import Footer from '../../🔷Organisms/Footer/Footer';
import Header from '../../🔷Organisms/Header/Header';

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
      <Header />
      <main>{children}</main>
      <Footer region={region} />
    </>
  );
};

export default PrimaryLayout;
