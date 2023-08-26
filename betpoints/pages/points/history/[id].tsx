import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Avatar from '../../../components/💎Atoms/Avatar/Avatar';
import Breadcrumbs, {
  breadcrumbList,
  sbrSite
} from '../../../components/💠Molecules/Breadcrumbs/Breadcrumbs';
import PrimaryLayout from '../../../components/📐Layouts/Primary/PrimaryLayout';
import HeroSection from '../../../components/🔷Organisms/Hero/Hero';
import HistoryTable from '../../../components/🔷Organisms/HistoryTable/HistoryTable';
import TopPlayers from '../../../components/🔷Organisms/Sidebar/TopPlayers/TopPlayers';
import { getLeaderboard, getPointBalance } from '../../../lib/points';
import { getRegion } from '../../../lib/region';
import FOOTBALL from '../../../public/background-images/football-field.png';
import { IPointBalance } from '../../../types/point-balance';
import { NextPageWithLayout } from '../../page';

interface IHistoryProps {
  userInfo: IPointBalance;
  leaders: IPointBalance[];
}

const History: NextPageWithLayout<IHistoryProps> = ({ userInfo, leaders }) => {

  const pTitle = (
    <>
      <h1>Activity History</h1>
      <h3>See all your Betpoints activity in one place</h3>
    </>
  );

  const userAPI = userInfo?.account.slug;

  const { data: session } = useSession();

  const percentage = (num: number, per: number) => {
    return (num * 100) / per;
  };
  return (
    <>
      <NextSeo
        title={`${userInfo?.account.userName} transaction history`}
        noindex={true}
      />
      <>
        <HeroSection
          className="bg-dark bg-center bg-cover"
          size="md"
          cntClassName="content-section h2-alt text-center"
          content="12/2"
          col1={pTitle}
          image={FOOTBALL.src}
        />
        {userInfo ? (
          <>
            <div className="container mt-n5">
              <div className="row align-items-center justify-content-center">
                <div className="col-4 text-center d-flex flex-column align-items-center">
                  <Avatar
                    text={userInfo.account.userName}
                    dClassName="rounded-circle bg-white"
                    className="rounded-circle border border-4 border-white"
                    src={userInfo.account.avatar}
                    alt={`${userInfo.account.userName} avatar image`}
                    size="xl"
                    icon=""
                  />
                  <h2>{userInfo.account.userName}</h2>
                </div>
              </div>
            </div>

            <Breadcrumbs
              className="mt-0 mt-md-n8 mt-lg-n8 mt-xl-n8 mb-0 mb-lg-6 mb-xl-6"
              breadcrumbs={[
                ...breadcrumbList.slice(0, 2),
                {
                  position: 3,
                  name: 'History',
                  item: `${sbrSite}/history/${userInfo?.account.slug}/`,
                },
              ]}
            />

            <div className="container mt-0 mb-6">
              <div className="row">
                <div className="col-12 col-lg-4 mt-4 mt-md-7 mt-lg-7 mt-xl-7">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="h4">Betpoints</h3>
                      <p className="h3">
                        {userInfo.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </p>
                    </div>
                    {session?.user.id === userInfo?.account.id ? (
                      <div>
                        <Link href="/points/account/transfer/" legacyBehavior>
                          <a className="btn btn-light btn-sm d-flex justify-content-center align-items-center">
                            Transfer
                            <span className="ms-2 mat-icon-settings-ethernet mat-icon-size-16"></span>
                          </a>
                        </Link>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  {/* {leaders.length > 0 && userInfo.total ? (
                    <div className="progress-user">
                      <div className="progress mt-4">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-label="Progress Bar"
                          style={{
                            width: `${percentage(
                              userInfo.total,
                              leaders[0].total
                            )}%`,
                          }}
                          aria-valuenow={percentage(
                            userInfo.total,
                            leaders[0].total
                          )}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <small className="text-end d-block mt-2">Top #1</small>
                    </div>
                  ) : (
                    ''
                  )} */}
                </div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 mb-3 mb-lg-8 mb-xl-8">
              <HistoryTable userAPI={userAPI} />
            </div>
              {leaders ? <TopPlayers leaders={leaders} /> : ''}
            </div>      
        </div>
        
      </>
    </>
  );
};

export default History;

export const getServerSideProps: GetServerSideProps<IHistoryProps> = async ({
  req,
  params,
}) => {
  const userInfo = await getPointBalance(params?.id?.toString());

  if (!userInfo) {
    return {
      notFound: true,
    };
  }

  const region = await getRegion(req);
  const leaders = await getLeaderboard();

  return {
    props: { userInfo, leaders, region },
  };
};

History.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};
