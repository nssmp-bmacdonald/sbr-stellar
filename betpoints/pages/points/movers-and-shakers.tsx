import { createColumnHelper } from '@tanstack/react-table';
import { GetServerSideProps } from 'next';
import { NextSeo, WebPageJsonLd } from 'next-seo';

import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import CellInfo from '../../components/💠Molecules/Tables/CellInfo/CellInfo';
import UserAvatarLink from '../../components/💠Molecules/UserAvatarLink/UserAvatarLink';
import PrimaryLayout from '../../components/📐Layouts/Primary/PrimaryLayout';
import BasicTable from '../../components/🔷Organisms/BasicTable/BasicTable';
import HeroSection from '../../components/🔷Organisms/Hero/Hero';
import { toLocaleFullDate, toLocaleTime } from '../../helpers/date-helpers';
import { getLeaderboard, getPointHistory } from '../../lib/points';

import Breadcrumbs, {
  breadcrumbList,
} from '../../components/💠Molecules/Breadcrumbs/Breadcrumbs';
import TopPlayers from '../../components/🔷Organisms/Sidebar/TopPlayers/TopPlayers';
import { getRegion } from '../../lib/region';
import PITCHER from '../../public/background-images/baseball-pitcher.png';
import { IAvatar } from '../../types/layout/avatar';
import { MoversShakers } from '../../types/layout/tables/table-shakers';
import { IPoint } from '../../types/point';
import { IPointBalance } from '../../types/point-balance';
import { NextPageWithLayout } from '../page';

interface IMoversAndShakersProps {
  moversShakers: IPoint[];
  leaders: IPointBalance[];
}

const colHelper = createColumnHelper<MoversShakers>();

export const Columns = [
  colHelper.accessor('from', {
    id: 'from',
    header: () => 'From',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('to', {
    id: 'to',
    header: () => 'To',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('transaction', {
    id: 'transaction',
    header: () => 'Transaction',
    cell: (info) => info.getValue(),
  }),
  colHelper.accessor('points', {
    id: 'points',
    header: () => parse('<div className="text-end">Points') as string,
    cell: (info) => info.getValue(),
  }),
];

const avatarSBR: IAvatar = {
  text: 'SBR',
  src: 'https://www.sportsbookreview.com/forum/image.php?u=414048&dateline=1637244494',
  size: 'sm',
  alt: 'SBR avatar',
  icon: '',
  className: 'me-3 rounded-circle',
  dClassName: 'me-md-3',
};

const MoversAndShakers: NextPageWithLayout<IMoversAndShakersProps> = ({
  moversShakers,
  leaders,
}) => {
  const [_moveShake, setmoveShake] = useState<MoversShakers[]>([]);
  const [updateDate, setUpdateDate] = useState<String>();
  const pTitle = (
    <>
      <h1>Movers and Shakers</h1>
      <h3 className="text-uppercase">Live Points exchange</h3>
    </>
  );

  useEffect(() => {
    setUpdateDate(toLocaleFullDate(new Date(Date.now())));

    const _data: MoversShakers[] = moversShakers?.map((row: IPoint) => {
      let withdraw;
      if (
        row.transaction === 'Forum Contribution' ||
        row.withdrawAccount === undefined
      ) {
        withdraw = (
          <UserAvatarLink
            text="SBR"
            avatar={avatarSBR}
            aClassName="flex-column flex-md-row text-center text-md-left"
          />
        );
      } else {
        const avatarWidthdraw: IAvatar = {
          text: row.withdrawAccount?.userName,
          src: row.withdrawAccount?.avatar,
          size: 'sm',
          alt: `${row.withdrawAccount?.userName} avatar`,
          icon: '',
          className: 'me-3 rounded-circle',
          dClassName: 'me-md-3',
        };
        withdraw = (
          <UserAvatarLink
            text={row.withdrawAccount?.userName}
            href={`/points/history/${row.withdrawAccount?.slug}/`}
            avatar={avatarWidthdraw}
            aClassName="flex-column flex-md-row text-center text-md-left"
          />
        );
      }
      let deposit;
      if (row.depositAccount === undefined) {
        deposit = (
          <UserAvatarLink
            text="SBR"
            avatar={avatarSBR}
            aClassName="flex-column flex-md-row text-center text-md-left"
          />
        );
      } else {
        const avatarDeposit: IAvatar = {
          text: row.depositAccount.userName,
          src: row.depositAccount.avatar,
          size: 'sm',
          alt: `${row.depositAccount.userName} avatar`,
          icon: '',
          className: 'me-3 rounded-circle',
          dClassName: 'me-md-3',
        };
        deposit = (
          <UserAvatarLink
            text={row.depositAccount.userName}
            href={`/points/history/${row.depositAccount.slug}/`}
            avatar={avatarDeposit}
            aClassName="flex-column flex-md-row text-center text-md-left"
          />
        );
      }
      const info = (
        <CellInfo
          description={row.description}
          url={row.postUrl ?? ''}
          times={toLocaleTime(new Date(row.timestamp))}
          transaction={
            row.transaction + (row.status === 'Pending' ? ' (Pending)' : '')
          }
        />
      );
      const val: MoversShakers = {
        from: withdraw,
        to: deposit,
        transaction: info,
        points: <div className="text-end">{row.amount}</div>,
      };
      return val;
    });
    setmoveShake(_data);
  }, [moversShakers]);

  return (
    <>
      <NextSeo
        title={`Movers and Shakers`}
        nofollow={true}
        noindex={process.env.NOINDEX === 'true'}
      />
      <WebPageJsonLd
        id="https://www.sportsbookreview.com/points/movers-and-shakers/#webpage"
        {...{
          name: 'Movers and Shakers',
          inLanguage: 'en-US',
        }}
      ></WebPageJsonLd>
      <>
        <HeroSection
          className="bg-dark bg-center bg-cover"
          size="md"
          cntClassName="content-section h2-alt"
          content="6/2"
          col1={pTitle}
          image={PITCHER.src}
        />
        <Breadcrumbs
          className="mb-3 mb-md-6 mb-lg-6 mb-xl-6"
          breadcrumbs={breadcrumbList.slice(0, 3)}
        />
        <div className="container">
          <div className="row">
            {_moveShake && _moveShake?.length > 0 ? (
              <>
                <div className="col-12 col-md-9">
                  <p>
                    <b>Last updated:</b> {updateDate}
                  </p>
                </div>
                <div className="col-12 col-md-9 table-responsive mb-3 mb-lg-8 mb-xl-8">
                  <BasicTable
                    className={`table table-borderless align-middle table-bp mt-1 table-shakers`}
                    rows={_moveShake}
                    columns={Columns}
                    pagination={false}
                  />
                </div>
              </>
            ) : (
              <div className="col-12 col-md-9 mb-3 mb-lg-8 mb-xl-8">
                <p>No history available</p>
              </div>
            )}
            {leaders ? <TopPlayers leaders={leaders} /> : ''}
          </div>
        </div>
      </>
    </>
  );
};

export default MoversAndShakers;

export const getServerSideProps: GetServerSideProps<
  IMoversAndShakersProps
> = async ({ req }) => {
  const moversShakers = await getPointHistory();
  const leaders = await getLeaderboard();
  const region = await getRegion(req);

  return {
    props: { moversShakers, leaders, region },
  };
};

MoversAndShakers.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};
