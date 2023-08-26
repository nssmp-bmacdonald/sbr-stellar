import 'aos/dist/aos.css';
import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import { NextSeo, WebPageJsonLd } from 'next-seo';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Breadcrumbs, {
  breadcrumbList,
} from '../../components/💠Molecules/Breadcrumbs/Breadcrumbs';
import Faq from '../../components/💠Molecules/FAQ/Faq';
import PrimaryLayout from '../../components/📐Layouts/Primary/PrimaryLayout';
import BaseTemplate from '../../components/📰Templates/Base/BaseTemplate';
import TwoColTemplate from '../../components/📰Templates/TwoColumns/TwoColTemplate';
import HeroSection from '../../components/🔷Organisms/Hero/Hero';
import { getBetPoints } from '../../lib/betpoints';
import { getRegion } from '../../lib/region';
import { REGISTER } from '../../lib/template/constants';
import BULL from '../../public/background-images/bull-sbr.svg';
import { IBetPoints } from '../../types/betpoints';
import { IRegion } from '../../types/region';
import { NextPageWithLayout } from '../page';

import { Header, Footer } from '@nssmp-bmacdonald/sbr-stellar-components';

interface IBetPointsProps {
  betpoints: IBetPoints;
  region: IRegion;
}

const column1 = (
  <div className="bg-light rounded p-4 h-100 content-section">
    <Header label="Brady" />
    <Footer label="Feet" />
    <p className="text-center h3">🚀</p>
    <h3 className="text-center h4 mb-3">
      Contribute quality content to the Forum
    </h3>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">✅ 6 Betpoints daily for logging in</li>
      <li className="list-group-item">✅ 10 Betpoints for a popular post</li>
      <li className="list-group-item">
        ✅ 5 Betpoints for helping police the forum
      </li>
      <li className="list-group-item">
        ✅ 2 Betpoints for posting in state subforums
      </li>
    </ul>
  </div>
);
const column2 = (
  <div className="bg-light rounded p-4 h-100 content-section">
    <p className="text-center h3">💰</p>
    <h3 className="text-center h4 mb-3">
      Participate in free sports betting contests with a chance to win
    </h3>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">✅ Betpoints</li>
      <li className="list-group-item">✅ Gift Cards</li>
      <li className="list-group-item">✅ Cash Prizes</li>
    </ul>
  </div>
);
const footer = (
  <div className="p-3 content-section">
    <h2 className="text-center">Become a SBR Pro to increase your rewards</h2>
    <p className="text-center">
      Once you reach 1,500 Betpoints, you can level up your membership. Some of
      the benefits of being a SBR Pro are doubling up your Betpoints (12 points
      daily for logging in) and gaining exclusive access to cash contests, SBR
      giveaways, and more!
    </p>
  </div>
);
const Points: NextPageWithLayout<IBetPointsProps> = ({ betpoints, region }) => {
  return (
    <>
      <NextSeo
        title={betpoints?.metaTitle ? betpoints.metaTitle : ''}
        description={
          betpoints?.metaDescription ? betpoints.metaDescription : ''
        }
        nofollow={true}
        noindex={process.env.NOINDEX === 'true'}
      />
      <WebPageJsonLd
        id="https://www.sportsbookreview.com/points/#webpage"
        description={
          betpoints?.metaDescription ? betpoints.metaDescription : ''
        }
        {...{
          name: betpoints?.metaTitle ? betpoints.metaTitle : '',
          inLanguage: 'en-US',
          datePublished: betpoints?.dateCreated,
          dateModified: betpoints?.dateUpdated,
        }}
      ></WebPageJsonLd>
      <section>
        {betpoints ? (
          <>
            <HeroSection
              className="bg-dark bg-center-right"
              cntClassName="content-section h2-alt offset-0 offset-md-1 col-md-8 offset-lg-2 offset-xl-2"
              size="md"
              content="7/2"
              image={BULL.src}
              col1={parse(betpoints.intro) as string}
            />
            <Breadcrumbs
              className="mb-3 mb-md-6 mb-lg-6 mb-xl-6"
              breadcrumbs={breadcrumbList.slice(0, 2)}
            />
            <BaseTemplate
              content={parse(betpoints.content) as string}
              className="container mt-4 mb-7"
              rowClassName="row justify-content-center"
              cntClassName="col-8 content-section"
            />
            <TwoColTemplate
              content="4/4"
              col1={column1}
              col2={column2}
              footer={footer}
              className="container mt-4 pb-5"
              c1ClassName="mb-3 mb-lg-0 mb-xl-0"
              c2ClassName="mb-3 mb-lg-0 mb-xl-0"
              rowClassName="row justify-content-center d-flex align-items-stretch"
            />
            <HomeAnimation className="bg-darker pt-6 pb-8" />
            <section className="container my-6">
              <div className="row">
                <Faq
                  faq={betpoints.faq.questions}
                  header={betpoints.faq.header}
                />
              </div>
            </section>
          </>
        ) : (
          <BaseTemplate
            content={
              parse(
                `<h1>Something went wrong</h1><p>No content found</p>`
              ) as string
            }
            className="container mt-4 mb-7"
            rowClassName="row justify-content-center"
            cntClassName="col-12 content-section"
          />
        )}
      </section>
    </>
  );
};

export default Points;

export const getServerSideProps: GetServerSideProps<IBetPointsProps> = async ({
  req,
}) => {
  const betpoints = await getBetPoints(req, 'points');
  const region = await getRegion(req);

  return {
    props: {
      betpoints,
      region,
    },
  };
};

Points.getLayout = (page, region) => {
  return <PrimaryLayout region={region}>{page}</PrimaryLayout>;
};

interface IHomeAnimation {
  className?: string;
}
const HomeAnimation: React.FC<IHomeAnimation> = ({ className }) => {
  const [state, setState] = useState('DEFAULT');
  let flag = useRef(true);

  useEffect(() => {
    const AOS = require('aos/dist/aos.js');
    AOS.init();
    AOS.refresh();

    const animatePath = () => {
      const pathContainer = document.querySelector('#containerPath');
      if (pathContainer) {
        if (
          window.scrollY > pathContainer?.getBoundingClientRect().y &&
          window.scrollY <
            pathContainer?.getBoundingClientRect().y +
              pathContainer?.getBoundingClientRect().height +
              200 &&
          flag
        ) {
          // const path = document.querySelector('#arrowPath svg path');
          setState('ACTIVE');
          flag.current = false;
        } else if (
          window.scrollY >
          pathContainer?.getBoundingClientRect().y +
            pathContainer?.getBoundingClientRect().height +
            200
        ) {
          setState('SUCCESS');
        }
      }
    };

    window.addEventListener('scroll', animatePath);
  }, []);

  return (
    <div className={className ? className : ''}>
      <div className="container">
        <div className="row">
          <div className="col content-section text-center pb-3">
            <h2 className="h1">Here is how it works</h2>
            <p>
              Start earning Betpoints faster and enjoy our exclusive benefits
            </p>
          </div>
        </div>
        <div id="containerPath" className="row position-relative">
          <div
            className={`offset-0 offset-md-1 offset-lg-1 col-12 col-md-6 col-lg-8 mt-5 mb-5  content-section position-relative ${
              state !== 'SUCCESS' ? 'aos-init aos-animate' : ''
            }`}
            data-aos={`${state !== 'SUCCESS' ? 'fade-up' : ''}`}
          >
            <div className="row align-items-start">
              <div className="col-2 col-md-2 col-lg-1">
                <h4 className="display-2 text-primary">1</h4>
              </div>
              <div className="col-9 col-md-10 col-lg-7">
                <h3>Join SBR Forum</h3>
                <p>Register your account and select a username</p>
                <Link href={REGISTER} legacyBehavior>
                  <a className="btn btn-primary">Join Now</a>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`offset-0 offset-md-1 offset-lg-1 col-12 col-md-6 col-lg-8 mt-5 mb-5  content-section position-relative ${
              state !== 'SUCCESS' ? 'aos-init aos-animate' : ''
            }`}
            data-aos={`${state !== 'SUCCESS' ? 'fade-right' : ''}`}
          >
            <div className="row align-items-start">
              <div className="col-2 col-md-2 col-lg-1">
                <h4 className="display-2 text-primary">2</h4>
              </div>
              <div className="col-9 col-md-10 col-lg-7">
                <h3>Participate daily in forum and contests</h3>
                <p>
                  Earn points with quality forum contributions and contest
                  participation
                </p>
              </div>
            </div>
          </div>
          <div
            className={`offset-0 offset-md-1 offset-lg-1 col-12 col-md-6 col-lg-8 mt-7 mb-7  content-section position-relative ${
              state !== 'SUCCESS' ? 'aos-init aos-animate' : ''
            }`}
            data-aos={`${state !== 'SUCCESS' ? 'fade-right' : ''}`}
          >
            <div className="row align-items-start">
              <div className="col-2 col-md-2 col-lg-1">
                <h4 className="display-2 text-primary">3</h4>
              </div>
              <div className="col-10 col-md-6 col-md-4 mb-3">
                <h3>Become a SBR Pro</h3>
                <p>Level up your membership with 1,500 Betpoints</p>
                <Link
                  href="https://www.sportsbookreview.com/forum/sbr-pro/"
                  legacyBehavior
                >
                  <a className="btn btn-primary">Go Pro Now</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="offset-0 offset-md-1 offset-lg-1 col-12 col-md-7 col-lg-6 mt-4 mb-8  content-section">
            <div
              className={`row align-items-center mb-2 ${
                state !== 'SUCCESS' ? 'aos-init aos-animate' : ''
              }`}
              data-aos={`${state !== 'SUCCESS' ? 'fade-right' : ''}`}
            >
              <div className="col-2 col-md-2 col-lg-1">
                <h4 className="display-2 text-primary">4</h4>
              </div>
              <div className="col-10 col-md-7 col-lg-8">
                <h3>Earn Rewards</h3>
                <p>
                  Get access to exclusive cash contests and entry into SBR
                  giveaways
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
