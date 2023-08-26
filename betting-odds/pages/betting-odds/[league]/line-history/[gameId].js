import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

import parse from 'html-react-parser';

import MediaQuery from '/components/MediaQuery';

import { buildLineHistory } from '/helpers/model-helpers/general-helpers';
import getTimeHelpers from '/helpers/get-time-helpers';
import { breadcrumbObject } from '/helpers/data-structure-helpers';

import { getLeagueData } from '/data/parameter-data';
import leagueData from '/data/parameter-data';

import { getGameView } from '/services/games';
import { getOddsViews } from '/services/odds';
import { getSportsbooks } from '/services/sportsbooks';

import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';
import GameLineHistory from '/components/matchup-and-linehistory/GameLineHistory';
import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import PageTitle from '/components/page-controls/PageTitle.js';
import TabList from '/components/matchup-and-linehistory/partials/TabList';

import { SBR_SITE } from '/constants/seo';

const LineHistory = ( props ) => {
  const { asPath } = useRouter();
  const [breakpoint, setBreakpoint] = useState(null);

  const isBreakpoint = MediaQuery(768);
  if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

  return (
    <>
    { (props.lineHistoryModel === null) ?
        <div className='noOdds'><h2>No matchup information available at this time for this game.</h2></div>
      :
        <>
          <Head>
            <title>{props.lineHistoryModel.lineHistory.gameView.awayTeam.fullName} vs {props.lineHistoryModel.lineHistory.gameView.homeTeam.fullName} Line History - {getTimeHelpers.getGameDate(props.lineHistoryModel.lineHistory.gameView.startDate)}</title>
            <meta name="description" content="" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${props.lineHistoryModel.lineHistory.gameView.awayTeam.fullName} vs ${props.lineHistoryModel.lineHistory.gameView.homeTeam.fullName} Line History - ${getTimeHelpers.getGameDate(props.lineHistoryModel.lineHistory.gameView.startDate)}`} />
            <meta property="og:description" content="" />
            <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
            <meta property="og:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />
            <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
            <meta property="og:site_name" content="Sportsbook Review" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@SBRreview" />
            <meta name="twitter:title" content={`${props.lineHistoryModel.lineHistory.gameView.awayTeam.fullName} vs ${props.lineHistoryModel.lineHistory.gameView.homeTeam.fullName} Line History - ${getTimeHelpers.getGameDate(props.lineHistoryModel.lineHistory.gameView.startDate)}`} />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />

            {(getTimeHelpers.noIndexPage(props.lineHistoryModel.lineHistory.gameView.startDate)) ?
                <meta name="robots" content="noindex" />
              : <link rel="canonical" href={`${SBR_SITE}${asPath.split('?')[0]}`} /> }
            {(props.breadcrumbListObject !== "") ? parse('<script type="application/ld+json">' + JSON.stringify(props.breadcrumbListObject) + '</script>'): ''}
          </Head>
          {getTimeHelpers.isBeforeToday(props.lineHistoryModel.lineHistory.gameView.startDate)}
          <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
          <div id={props.header} className="container content bckg-white">
              <div className='padding-container'>
                <Breadcrumbs breadcrumbList={props.breadcrumbListObject} />
              </div>
              <PageTitle pageName={`${props.lineHistoryModel.lineHistory.gameView.awayTeam.fullName} vs ${props.lineHistoryModel.lineHistory.gameView.homeTeam.fullName} Line History`} />
              <div className='padding-container'>
                <span className='league-date'>{getTimeHelpers.getGameDate(props.lineHistoryModel.lineHistory.gameView.startDate)}</span>
                <TabList path={asPath} />
                <GameLineHistory leagueCode={props.league} isBreakpoint={breakpoint} lineHistoryModel={props.lineHistoryModel} asPath={asPath} />
              </div>
          </div>
          {
            isBreakpoint ?
            <FooterFlyoutMobile /> :
            null
          }
          <Footer region={props.header} />
        </>
      }
      </>
  );
}
export default LineHistory;


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
  var oddsView = 'SportsbookGameOddsHistoryDataView';
  var oddsScope = 'Competition';

  // Retrieve gameIds for today and associated gameviews and oddsviews
  const gameId = parseInt(context.params.gameId);
  const gameView = await getGameView(gameId);

  // If its not a valid game 404
  if(gameView === null){
    return {
      notFound: true,
    }
  }

  const spreadOddsViews = await getOddsViews([gameId], oddsView, oddsScope);
  const sportBooksInSpread = spreadOddsViews.map(spreadOddsView => spreadOddsView.sportsbook);

  const sportsbooks = (await getSportsbooks(context.res)).filter(book => sportBooksInSpread.includes(book.machineName));

  // Create 'models' for the odds tables so its easier to pass around
  const lineHistoryModel = buildLineHistory(spreadOddsViews, gameView, sportsbooks)

  const leagueInfo = leagueData.find(leagues => leagues.leaguename === league);
  const gameInfo = `${lineHistoryModel.lineHistory.gameView.awayTeam.displayName} vs ${lineHistoryModel.lineHistory.gameView.homeTeam.displayName}`;
  const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo, gameInfo);

  const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

   return {
    props: {header, lineHistoryModel, league, breadcrumbListObject},
 }
}
