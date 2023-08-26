import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Router from 'next/router';
import { useEffect } from 'react';
import PrimaryLayout from '../../../components/📐Layouts/Primary/PrimaryLayout';
import { getRegion } from '../../../lib/region';
import { NextPageWithLayout } from '../../page';

const Account: NextPageWithLayout = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'unauthenticated') {
      console.log('well this failed');
      Router.replace('/login?from=account');
    }
  }, [status]);

  return (
    <>
      <NextSeo noindex={true} />
      <div className="container mt-4">
        <h1>hello {session?.user?.name}</h1>
        <p>email: {session?.user?.email} </p>
      </div>
    </>
  );
};

export default Account;

Account.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const refreshToken = req.cookies.sbrtoken;
  if (!refreshToken) {
    console.log('it was the server side cookie!');
    return {
      redirect: {
        statusCode: 302,
        destination: '/login?from=account',
      },
    };
  }

  const region = await getRegion(req);

  return {
    props: { region },
  };
};
