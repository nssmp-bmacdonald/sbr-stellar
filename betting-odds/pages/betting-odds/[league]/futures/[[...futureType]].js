import Head from 'next/head';
import { useRouter } from 'next/router';

import parse from 'html-react-parser';

import { useState } from 'react';

import { buildFutureRows } from '/helpers/model-helpers/general-helpers';
import { formatDateParameter } from '/helpers/date-helpers';
import * as query from '/helpers/query-helpers';
import { breadcrumbObject, faqList } from '/helpers/data-structure-helpers';

import { getLeagueData } from '/data/parameter-data';
import leagueData from '/data/parameter-data';

import { getSportsbooks } from '/services/sportsbooks';
import { getBettingArticle } from '/services/betting-article';

import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';
import TeamRows from '/components/futures/partials/TeamRows';
import TeamRowsMobile from '/components/futures/mobile/TeamRowsMobile';
import MediaQuery from '/components/MediaQuery';
import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import PageTitle from '/components/page-controls/PageTitle.js';
import Sportsbooks from '/components/odds-table/partials/Sportsbooks';
import OddsFormatDropDown from '/components/page-controls/OddsFormatDropDown.js';
import GameMarketSelector from '/components/matchup-and-linehistory/partials/GameMarketSelector';
import CMSContent from '/components/cms/Content'

import styles from '/styles/odds-table/OddsTable.module.scss';
import styleBooks from '/styles/odds-table/Sportsbooks.module.scss';
import ddStyle from '/styles/components/Dropdown.module.scss';

import { SBR_SITE } from '/constants/seo';

const Futures = ( props ) => {
  const { asPath } = useRouter();
  const [breakpoint, setBreakpoint] = useState(null);
  const [oddsFormat, setOddsFormat] = useState('American');
  const [gameMarket, setGameMarket] = useState(props.oddsList[0].url);

  const isBreakpoint = MediaQuery(768);
  if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

  const league = props.league;
  const futuresById = props.futures?.filter(event => event.eventid == gameMarket);

  return (
    <>
      <Head>
        <title>{props.bettingArticle ? props.bettingArticle.metaTitle : 'Futures'}</title>
        <meta name="description" content={props.bettingArticle ? props.bettingArticle.metaDescription : ''}/>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.league} />
        <meta property="og:description" content="" />
        <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
        <meta property="og:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />
        <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
        <meta property="og:site_name" content="Sportsbook Review" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SBRreview" />
        <meta name="twitter:title" content={props.league} />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />

        <link rel="canonical" href={`${SBR_SITE}${asPath}`} />
        {(props.breadcrumbListObject !== "") ? parse('<script type="application/ld+json">' + JSON.stringify(props.breadcrumbListObject) + '</script>') : ''}
        {parse(props.schemaFAQ)}
      </Head>
      <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
      <div id={props.header} className="container content bckg-white">
        <>
          <div className="controls padding-container">
            <Breadcrumbs breadcrumbList={props.breadcrumbListObject} />
          </div>
          <PageTitle pageName={props.bettingArticle ? props.bettingArticle.headlineH1 : 'Futures'} />
            <div className={`${breakpoint ? 'controls-mobile' : 'controls'} padding-container`}>
              <div className={`${ddStyle.DropDownContainer} ${ddStyle.largerMobileContainer}`}>
                <span className="label">Select Division</span>
                <GameMarketSelector list={props.oddsList} market={gameMarket} setMarketSelector={setGameMarket} isBreakpoint={true} />
              </div>
              <OddsFormatDropDown oddsFormat={oddsFormat} handler={setOddsFormat} />
            </div>
        </>
         { (futuresById.length > 0) ?
              <>
                <div id='futures'>
                <>
                {
                  futuresById.map((future, index) =>
                    <section key={index} id={`section-${index}-${future.eventid}`} className="padding-container">
                      <h2 className='league-title h3'>{league} {future.eventname}</h2>
                      {
                        isBreakpoint ?
                          <TeamRowsMobile rows={future.teams} oddsFormat={oddsFormat} sportsbooks={props.sportsbooks} />
                        :
                          <>
                            <div id={`thead-${index}-${future.eventid}`}
                                className={`bckg-gray border-all ${styles.compactViewHeader}`}>
                              <div className={` ${styles.timeContainer} border-right`}></div>
                              <div className={`${styleBooks.sportbooks} ${styleBooks.future}`}>
                                <div className={styleBooks.consensusAndOpener}>
                                  <span className={styleBooks.opener}>OPENER</span>
                                </div>
                                <div className={styles.inlineBlock}>
                                  <div className={styles.columnsContainer}>
                                    <Sportsbooks sportsbooks={props.sportsbooks}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div id={`tbody-${index}-${future.eventid}`}>
                              <TeamRows rows={future.teams} oddsFormat={oddsFormat} />
                            </div>
                          </>
                        }
                    </section>
                  )
                }
                </>
                </div>
              </>
            :
              <div className='noOdds'><h2>No future odds available at this time for this league.</h2></div>
          }
          <CMSContent bettingArticle={props.bettingArticle} />
      </div>
      {
        isBreakpoint ?
        <FooterFlyoutMobile /> :
        null
      }
      <Footer region={props.header} />
    </>
  );
}
export default Futures;


export async function getServerSideProps(context) {
  // Get the league param and map it to its DB friendly name
  const leagueObject = getLeagueData(context.params.league);
  // If its not a valid league 404
  if(leagueObject === null){
    return {
      notFound: true,
    }
  }
  const league = leagueObject.leaguename;
  const oddsEvents = await query.getOddsEventsByLeague(league);

  var oddsView = 'OpeningAndLatestTeamFutureOddsDataView';
  const oddsViews = await query.getTeamFutureOddsViews(oddsEvents.map(event => event.oddseventid), oddsView);
  const sportsbooks = await getSportsbooks(context.res);

  const futures = buildFutureRows(oddsEvents, oddsViews, sportsbooks);
  const oddsList = oddsEvents.map(event => {
    return {
      title: event.oddseventname,
      url: parseInt(event.oddseventid)
    }
  });

  const leagueInfo = leagueData.find(leagues => leagues.leaguename === league);
  const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo);

  const pathnameArr = context.resolvedUrl.substring(1).split('/');
  const slug = (pathnameArr.length > 1 ? pathnameArr[pathnameArr.length - 2] : pathnameArr[0]).split('?')[0];
  const urlPath = pathnameArr.length > 1 ? pathnameArr[0] : null;
  const bettingArticle = await getBettingArticle(slug, urlPath, leagueObject.leaguename, context.res);
  const schemaFAQ =  (bettingArticle?.faqs?.questions && bettingArticle.faqs.questions.length > 0) ? await faqList( bettingArticle.faqs) : '';

  const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

   return {
    props: {header, league, futures, sportsbooks, oddsList, breadcrumbListObject, bettingArticle, schemaFAQ},
 }
}
