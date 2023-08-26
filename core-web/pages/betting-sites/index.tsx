import { GetServerSideProps } from 'next';
import PrimaryLayout from '../../components/📐Layouts/Primary/PrimaryLayout';
import { getSportsbooks } from '../../lib/sportsbooks';
import { ISportsbook } from '../../types/sportsbook';
import { NextPageWithLayout } from '../page';

export interface IResults {
  sportsbooks: ISportsbook[];
}

export const getServerSideProps: GetServerSideProps<IResults> = async ({
  req,
}) => {
  const sportsbooks = await getSportsbooks(req, '/betting-sites');

  return {
    props: {
      // Will be passed to the page component as props
      sportsbooks,
    },
  };
};

const Results: NextPageWithLayout<IResults> = ({ sportsbooks }) => {
  const hasResults = sportsbooks?.length > 0;

  return (
    <>
      <section className="flex flex-col items-center gap-y-5">
        {hasResults ? (
          sportsbooks.map((result, idx) => (
            <div key={idx} className={`flex flex-col space-y-8`}>
              {result.name}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </section>
    </>
  );
};

export default Results;

Results.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};
