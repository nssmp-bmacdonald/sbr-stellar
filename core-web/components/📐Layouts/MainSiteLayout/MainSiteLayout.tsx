import Head from 'next/head';
import { IRegion } from '../../../types/region';
import FooterMain from '../../🔷Organisms/Footer/FooterMain';
import HeaderMain from '../../🔷Organisms/Header/HeaderMain';

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
      <FooterMain region={region} />
    </>
  );
};

export default MainSiteLayout;
