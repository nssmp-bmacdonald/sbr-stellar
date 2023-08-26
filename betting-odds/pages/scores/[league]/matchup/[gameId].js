import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

import { parse } from 'next-useragent'

import MediaQuery from '/components/MediaQuery';
import { buildMatchup } from '/helpers/model-helpers/general-helpers';
import getTimeHelpers from '/helpers/get-time-helpers';
import { breadcrumbObject, sportsEventObject } from '/helpers/data-structure-helpers';

import { getLeagueData } from '/data/parameter-data';
import leagueData from '/data/parameter-data';

import { getGameView } from '/services/games';
import { getOddsViews } from '/services/odds';
import { getSportsbooks } from '/services/sportsbooks';

import * as query from '/helpers/query-helpers';
import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';

import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import PageTitle from '/components/page-controls/PageTitle.js';
import TabList from '/components/matchup-and-linehistory/partials/TabList';
import GameMatchup from '/components/matchup-and-linehistory/GameMatchup';

import { SBR_SITE } from '/constants/seo';
let ua =  (typeof window === "undefined") ? null : parse(window.navigator.userAgent)
const Matchup = ( props ) => {
  const { asPath } = useRouter();
  const [breakpoint, setBreakpoint] = useState(null);

  const isBreakpoint = MediaQuery(768);
  if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

  return (
    <>
    { (props.matchupModel === null) ?
        <div className='noOdds'><h2>No matchup information available at this time for this game</h2></div>
      :
        <>
          <Head>
            <title>{props.matchupModel.matchup.gameView.awayTeam.fullName} vs {props.matchupModel.matchup.gameView.homeTeam.fullName} Matchup - {getTimeHelpers.getGameDate(props.matchupModel.matchup.gameView.startDate)}</title>
            <meta name="description" content={`Compare ${props.matchupModel.matchup.gameView.awayTeam.fullName} vs ${props.matchupModel.matchup.gameView.homeTeam.fullName} matchups. Up-to-date betting odds of over 30+ sportsbooks available including money lines, point spreads, totals and futures.`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${props.matchupModel.matchup.gameView.awayTeam.fullName} vs ${props.matchupModel.matchup.gameView.homeTeam.fullName} Matchup - ${getTimeHelpers.getGameDate(props.matchupModel.matchup.gameView.startDate)}`} />
            <meta property="og:description" content="" />
            <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
            <meta property="og:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />
            <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
            <meta property="og:site_name" content="Sportsbook Review" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@SBRreview" />
            <meta name="twitter:title" content={`${props.matchupModel.matchup.gameView.awayTeam.fullName} vs ${props.matchupModel.matchup.gameView.homeTeam.fullName} Matchup - ${getTimeHelpers.getGameDate(props.matchupModel.matchup.gameView.startDate)}`} />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />

            {(getTimeHelpers.noIndexPage(props.matchupModel.matchup.gameView.startDate)) ?
                <meta name="robots" content="noindex" />
              :
              (
                <script type='application/ld+json' dangerouslySetInnerHTML={ { __html: JSON.stringify(props.sportListObject)}} />,
                <link rel="canonical" href={`${SBR_SITE}${asPath.split('?')[0]}`} />
              )
            }
            {(props.breadcrumbListObject !== "") ?
                <script type='application/ld+json' dangerouslySetInnerHTML={ { __html: JSON.stringify(props.breadcrumbListObject)}} />
              : ''}

          </Head>
          {getTimeHelpers.isBeforeToday(props.matchupModel.matchup.gameView.startDate)}
          <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
          <div id={props.header} className="container content bckg-white">
              <div className='padding-container'>
                  <Breadcrumbs breadcrumbList={props.breadcrumbListObject} />
              </div>
              <PageTitle pageName={`${props.matchupModel.matchup.gameView.awayTeam.fullName} vs ${props.matchupModel.matchup.gameView.homeTeam.fullName} Matchup`} />
              <div className='padding-container'>
                <span className='league-date'>{getTimeHelpers.getGameDate(props.matchupModel.matchup.gameView.startDate)}</span>
                <TabList path={asPath} />
                <GameMatchup matchupModel={props.matchupModel} league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
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
export default Matchup;


export async function getServerSideProps(context) {
  // Get the league param and map it to its DB friendly name
  const leagueObject = getLeagueData(context.params.league);
  const gameId = Number(context.params.gameId);
  const gameIds = [gameId];

  // If its not a valid league 404
  if(leagueObject === null){
    return {
      notFound: true,
    }
  }
  const league = leagueObject.leaguename;
  const matchupViewType = leagueObject.matchupviewtype;
  const gameView = await getGameView(gameId);
  const spreadOddsViews = await getOddsViews(gameIds, 'PointspreadDataOpeningAndLatestOddsDataView', 'Competition');
  const totalOddsViews = await getOddsViews(gameIds, 'TotalDataOpeningAndLatestOddsDataView', 'Competition');
  const moneylineOddsViews = await getOddsViews(gameIds, 'MoneyLineDataOpeningAndLatestOddsDataView', 'Competition');
  const matchupView = await query.getMatchupView(gameId, matchupViewType)
  // If its not a valid matchup 404
  if(matchupView === null){
    return {
      notFound: true,
    }
  }

  const sportsbooks = await getSportsbooks(context.res);

  // Generate weather object from external API
  const weather = await getWeatherData(gameView.startDate, `${gameView.city}, ${gameView.state}, ${gameView.country}`);
  // Create 'models' for the odds tables so its easier to pass around
  const matchupModel = buildMatchup(spreadOddsViews, totalOddsViews, moneylineOddsViews, gameView, matchupView, weather, sportsbooks);

  // If we cannot find an oddsview for the gameid and league then 404
  if(matchupModel === null || matchupModel === undefined){
    return {
      notFound: true,
    }
  }

  // SEO Schema.org 1. Breadcrumb and SportsEvent
  const leagueInfo = leagueData.find(leagues => leagues.leaguename === league);
  const gameInfo = `${matchupModel.matchup.gameView.awayTeam.displayName} vs ${matchupModel.matchup.gameView.homeTeam.displayName}`;
  const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo, gameInfo);

  const sportListObject = (getTimeHelpers.isBeforeToday(matchupModel.matchup.gameView.startDate)) ? null : sportsEventObject(matchupModel.matchup.gameView, league);

  const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

  return {
     props: {header, matchupModel, league, breadcrumbListObject:breadcrumbListObject, sportListObject:sportListObject},
  }
}

async function getWeatherData(date, city) {
  const theDate = new Date(date);
  const yourDate =  (ua !== null) ? (ua.browser.includes('Safari')) ? theDate.toISOString().split('T')[0].replace(/-/g, '/') : theDate.toISOString().split('T')[0] : theDate.toISOString().split('T')[0];

  const weatherUrlSelected = getTimeHelpers.isBeforeToday(date) ? 'past-weather.ashx' : 'weather.ashx';
  const key = process.env.WEATHER_KEY;

  const url = `http://api.worldweatheronline.com/premium/v1/${weatherUrlSelected}?key=${key}&q=${city}&date=${yourDate}&num_of_days=1&tp=1&extra=utcDateTime&format=json`;
  const res = await fetch(url);

  const weatherData = await res.json();

  return weatherData.data;
}
