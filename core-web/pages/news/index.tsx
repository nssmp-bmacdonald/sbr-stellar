import { GetServerSideProps } from 'next';
import MainSiteLayout from '../../components/📐Layouts/MainSiteLayout/MainSiteLayout';
import { getRegion } from '../../lib/region';
import { getMenu } from '../../lib/template/menu';
import { IRegion } from '../../types/region';
import { NextPageWithLayout } from '../page';

interface IHomeProps {
  menu: any;
  region: IRegion;
}

const News: NextPageWithLayout<IHomeProps> = ({ menu, region }) => {
  return <>News page</>;
};

export default News;

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({
  req,
}) => {
  const menu = await getMenu();
  const region = await getRegion(req);

  return {
    props: {
      menu,
      region,
    },
  };
};

News.getLayout = (page, menu, region) => {
  return (
    <MainSiteLayout menu={menu} region={region}>
      {page}
    </MainSiteLayout>
  );
};
