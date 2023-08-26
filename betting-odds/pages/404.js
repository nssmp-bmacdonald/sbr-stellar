import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getFavoriteData } from '/data/favorite-data';
import MediaQuery from '/components/MediaQuery';

import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';

import { SBR_SITE, ODDS_URL } from '/constants/seo';

const Custom404 = () => {
  const { asPath } = useRouter();
  const favoriteCount = getFavoriteData().length;

  const [breakpoint, setBreakpoint] = useState(null);
  const isBreakpoint = MediaQuery(1024);
  if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

  return (
    <>
      <Head>
        <title>Page not found | Sportsbook Review</title>
        <meta name="description" content="" />
        <meta name="robots" content="follow, noarchive, noindex" />
      </Head>

      <Header league='Betting' isBreakpoint={breakpoint} asPath={asPath} favoriteCount={favoriteCount}  />
      <div id="error404" className="container content bckg-white">
          <div className='noOdds padding-container'>
                <h1 className='mbottom-5'>Oh no, page not found!</h1>
                <Image src='https://img.sportsbookreview.com/images/asset-pages/404.png'
                    alt="404 error Page not found error"
                    width={243}
                    height={154} />
                <Link href={`${SBR_SITE}${ODDS_URL}`}>
                    <a className='btn btn-solid mtop-5 mbottom-4'>Go back Home <i className="sbr-icon-home"></i></a>
                </Link>
          </div>
      </div>
      {
        isBreakpoint ?
          <FooterFlyoutMobile favoriteCount={favoriteCount} /> :
          null
      }
      <Footer />
    </>
  )
}

export default Custom404;
