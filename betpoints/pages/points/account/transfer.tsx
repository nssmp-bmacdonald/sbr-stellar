import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Breadcrumbs, { breadcrumbList, sbrSite } from '../../../components/💠Molecules/Breadcrumbs/Breadcrumbs';
import PrimaryLayout from '../../../components/📐Layouts/Primary/PrimaryLayout';
import BaseTemplate from '../../../components/📰Templates/Base/BaseTemplate';
import HeroSection from '../../../components/🔷Organisms/Hero/Hero';
import Transaction from '../../../components/🔷Organisms/Transaction/Transaction';
import TransferTable from '../../../components/🔷Organisms/TransferTable/TransferTable';
import { getBetPoints } from '../../../lib/betpoints';
import { getClientBalanceId } from '../../../lib/points';
import { getRegion } from '../../../lib/region';
import { getLoyaltyBalance } from '../../../lib/transfer';
import BASKETBALL from '../../../public/background-images/basketball.png';
import { IBetPoints } from '../../../types/betpoints';
import { NextPageWithLayout } from '../../page';

interface ITransferProps {
  transfer: IBetPoints;
}

const Transfer: NextPageWithLayout<ITransferProps> = ({ transfer }) => {
  const [betpoints, setBetpoints] = useState<number>(0);
  const [chalkline, setChalkline] = useState<number>(0);

  const { data: session, status } = useSession();

  const pTitle = (
    <>
      <h1>Betpoints Wallet</h1>
      <h3>Transfer points between your Betpoints Wallet and Contests</h3>
    </>
  );

  useEffect(() => {
    if (status == 'unauthenticated') {
      Router.replace('/login?from=account/transfer');
    }

    if (session?.user) {
      getClientBalanceId(session.user.id).then((betpointBalance) => {
        if (betpointBalance) {
          setBetpoints(betpointBalance.total);
        }
      });

      getLoyaltyBalance(session.user.jwtToken).then((chalklineBalance) => {
        if (chalklineBalance) {
          setChalkline(chalklineBalance.totalPoints);
        }
      });
    }
  }, [status, session]);

  return (
    <>
      <NextSeo noindex={true} />
      <section>
        {transfer ? (
          <>
            <HeroSection
              className="bg-dark bg-center bg-cover"
              size="md"
              cntClassName="content-section h2-alt text-center"
              content="12/2"
              col1={pTitle}
              image={BASKETBALL.src}
            />
            <Transaction
              className="container mt-n7"
              betpointsBalance={betpoints}
              contestsBalance={chalkline}
              jwtToken={session?.user.jwtToken}
            />
            <Breadcrumbs
              className="mt-0 mb-0 mb-0 mb-lg-2 mb-xl-2"
              breadcrumbs={[
                ...breadcrumbList.slice(0, 2),
                {
                  position: 3,
                  name: 'Transfer',
                  item: `${sbrSite}/account/transfer/`,
                },
              ]}
            />
            <div className="container">
              <BaseTemplate
                content={parse(transfer.content) as string}
                className="container mt-2 mb-7"
                rowClassName="row justify-content-center"
                cntClassName="col-lg-8 content-section text-center"
              />
              {session?.user.slug ? (
                <TransferTable userAPI={session?.user.slug} />
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <p>No content found</p>
        )}
      </section>
    </>
  );
};

export default Transfer;

Transfer.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const region = await getRegion(req);
  const transfer = await getBetPoints(req, 'transfer');

  return {
    props: { region, transfer },
  };
};
