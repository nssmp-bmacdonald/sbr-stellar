import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Banner from '../../components/🐱‍🏍_Hackathon/Account/Banner/Banner';
import FactChecker from '../../components/🐱‍🏍_Hackathon/💠Molecules/FactChecker/FactChecker';
import QuickLinks from '../../components/🐱‍🏍_Hackathon/💠Molecules/Sidebar/QuickLinks/QuickLinks';
import ReadMoreTemplate from '../../components/🐱‍🏍_Hackathon/📰Templates/ReadMore/ReadMore';
import NewsCardView from '../../components/🐱‍🏍_Hackathon/🔷Organisms/News/CardView/NewsCardView';
import SportsbooksCardView from '../../components/🐱‍🏍_Hackathon/🔷Organisms/Sportsbook/CardView/SportsbooksCardView';
import SportsbooksListView from '../../components/🐱‍🏍_Hackathon/🔷Organisms/Sportsbook/ListView/SportsbooksListView';
import Disclaimer from '../../components/💠Molecules/DisclaimerMessage/DisclaimerMessage';
import Faq from '../../components/💠Molecules/FAQ/Faq';
import MainSiteLayout from '../../components/📐Layouts/MainSiteLayout/MainSiteLayout';
import {
  extractFavouriteSportsbooks,
  extractPersonalizationNews,
} from '../../helpers/sportsbooks-helpers';
import { getBestSportsbooks } from '../../lib/best-sportsbooks';
import { getRegion } from '../../lib/region';
import { getMenu } from '../../lib/template/menu';
import { IRegion } from '../../types/region';
import { NextPageWithLayout } from '../page';

interface IBestSportsbooks {
  headlineH1: string;
  subheading: string;
  listingHeading: string;
  intro: string;
  introMore: string;
  author: any;
  content: string;
  sportsbooks: any[];
  sponsoredSportsbooks: any[];
  sections: any[];
  slug: string;
  updatedDate: string;
  faqsHeading: string;
  faqs: any;
  relatedArticles: any[];
}

interface IBestSPsProps {
  menu: any;
  region: IRegion;
  bestSportsbooks: IBestSportsbooks;
}

const BestSPs: NextPageWithLayout<IBestSPsProps> = ({
  menu,
  region,
  bestSportsbooks,
}) => {
  const { data: session, status } = useSession();

  const { userBooks, bestBooks } = extractFavouriteSportsbooks(
    bestSportsbooks?.sportsbooks,
    session?.hubspot.favorite_sportsbooks
  );

  const recomNews: any[] = [];
  session
    ? bestSportsbooks.relatedArticles
      ? recomNews.push(
          extractPersonalizationNews(
            bestSportsbooks?.relatedArticles,
            session?.hubspot.favorite_leagues
          )
        )
      : []
    : [];

  return (
    <>
      <div className="bg-dark position-relative w-100">
        <div className="bg-noise position-absolute w-100 h-100"></div>
        <div className="position-relative bg-noise-gradient"></div>
        <div className="container py-3 position-relative">
          <div className="row">
            <div className="col col-lg-8">
              {bestSportsbooks.subheading ? (
                <h1 className="mb-2">{parse(bestSportsbooks.headlineH1)}</h1>
              ) : (
                ''
              )}
              {bestSportsbooks.subheading ? (
                <p>{parse(bestSportsbooks.subheading)}</p>
              ) : (
                ''
              )}
              {bestSportsbooks.author ? (
                <FactChecker
                  author={bestSportsbooks.author}
                  className="author-avatar d-flex align-items-center align-content-center justify-content-center me-3"
                  updatedDate={bestSportsbooks.updatedDate}
                />
              ) : (
                ''
              )}

              <ReadMoreTemplate
                cntVisible={bestSportsbooks.intro}
                cntHidden={bestSportsbooks.introMore}
                btnclassName="no-button text-link-bold text-interactive sbr-introParagraph-readToggle ms-1"
                rmId="introReadMore"
              />
            </div>
            <div className="d-none d-lg-flex col-lg-4 justify-content-center align-items-start">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}images/banner-images/best-sportsbooks-trophy.svg`}
                alt=""
                width="250"
                height="250"
              />
            </div>
            <Disclaimer theme="darker" region={region} className="mt-4" />
          </div>
        </div>
        {bestSportsbooks.sponsoredSportsbooks?.length > 0 ? (
          <div style={{ height: '200px' }}></div>
        ) : (
          ''
        )}
      </div>
      <div
        className="position-relative"
        style={{
          marginTop: `${
            bestSportsbooks.sponsoredSportsbooks?.length > 0 ? '-225px' : '0'
          }`,
        }}
      >
        <div
          data-region={`${region.xRegionCode.toLowerCase()}`}
          id="best-sportsbooks"
          className="best-sportsbooks"
        >
          <SportsbooksListView
            sportsbooksList={bestSportsbooks.sponsoredSportsbooks}
            isSponsor={true}
            theme="white"
            logoWidth={193}
            logoHeight={89}
            logoType={'colorBackground'}
            visibleItems={10}
            favoriteTheme={false}
          />

          <div
            className={`py-3 ${
              bestSportsbooks.listingHeading &&
              bestSportsbooks.sponsoredSportsbooks?.length < 2
                ? 'bg-white'
                : ''
            }`}
            style={{ minHeight: '64px' }}
          >
            <div id="top-sportsbook" className="top-sportsbook-list">
              <SportsbooksListView
                sportsbooksList={bestBooks}
                heading={bestSportsbooks.listingHeading}
                isSponsor={false}
                theme="light"
                logoWidth={208}
                logoHeight={96}
                logoType={'colorBackground'}
                viewType="toplist"
                visibleItems={5}
                favoriteTheme={true}
              />
            </div>

            <div className="container pt-3">
              <div className="row">
                <div className="col-12 p-0">
                  <SportsbooksCardView
                    personalization={true}
                    sportsbookList={userBooks}
                    logoType="monochrome"
                    theme="light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="content-section py-4">
              {parse(bestSportsbooks.content) as string}
              {bestSportsbooks.sections
                ? bestSportsbooks.sections.map((cnt: any, keyCnt: number) => (
                    <div key={keyCnt}>
                      <h2
                        className="jumpTarget"
                        id={`${cnt.sectionHeading
                          .toLowerCase()
                          .replaceAll(' ', '-')}`}
                      >
                        {parse(cnt.sectionHeading) as string}
                      </h2>
                      {parse(cnt.content) as string}
                    </div>
                  ))
                : ''}
              <div
                id={`#${bestSportsbooks.faqsHeading
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
                className="col-12 mt-6"
              >
                <Faq
                  header={bestSportsbooks.faqs.header}
                  faq={bestSportsbooks.faqs.questions}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            {bestSportsbooks.sections ? (
              <QuickLinks
                objectList={bestSportsbooks.sections}
                faqLink={bestSportsbooks.faqsHeading}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="container pb-4 pt-3">
        {session ? (
          ''
        ) : (
          <div className="row mt-3 mb-4">
            <Banner />
          </div>
        )}
        {recomNews ? (
          <NewsCardView
            heading={session ? 'Recommended news for you' : 'Recent News'}
            articles={
              session ? recomNews[0].recomNews : bestSportsbooks.relatedArticles
            }
            layout="slider"
            className="mt-3 mb-4 pt-2 pt-lg-5 pb-6"
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default BestSPs;

export const getServerSideProps: GetServerSideProps<IBestSPsProps> = async ({
  req,
}) => {
  const menu = await getMenu();
  const region = await getRegion(req);
  const bestSportsbooks = await getBestSportsbooks();

  return {
    props: {
      menu,
      region,
      bestSportsbooks,
    },
  };
};

BestSPs.getLayout = (page, menu, region) => {
  return (
    <MainSiteLayout menu={menu} region={region}>
      {page}
    </MainSiteLayout>
  );
};
