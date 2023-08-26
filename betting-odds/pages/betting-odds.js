import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'
import Head from 'next/head'

import Switch from 'react-switch';
import parse from 'html-react-parser';

import { buildOddsTable, getWeeklyLeagueArray } from '/helpers/model-helpers/general-helpers';
import { formatDateParameter } from '/helpers/date-helpers';
import * as query from '/helpers/query-helpers';
import getTimeHelpers from '/helpers/get-time-helpers';

import { getMarketData, getMenuList } from '/data/market-data';
import { getFavoriteData, getFavoriteLeagueAndDates, getFavoriteGameIds, getFavoriteByGameIds } from '/data/favorite-data';
import { getOddsViewData, getOddsScopeData, getLeagueData } from '/data/parameter-data';
import leagueData, { allLeagueData, isSoccerLeague } from '/data/parameter-data';

import MediaQuery from '/components/MediaQuery';
import Header from '/components/header/Header';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';
import PageControls from '/components/page-controls/PageControls';
import OddsTable from '/components/odds-table/OddsTable'
import Footer from '/components/footer/Footer'
import CMSContent from '/components/cms/Content'

import { breadcrumbObject, sportsListEvent, faqList } from '/helpers/data-structure-helpers';

import { getBettingArticle } from '/services/betting-article';

import { getGameIds, getGameViews } from '/services/games';
import { getOddsViews } from '/services/odds';
import { getSportsbooks } from '/services/sportsbooks';

import { SBR_SITE } from '/constants/seo';

import styleFavorite from '/styles/odds-table/partials/FavoriteGame.module.scss';

function OddsHome( props ) {

  const { asPath, query } = useRouter();
  const [breakpoint, setBreakpoint] = useState(null);
  const [oddsFormat, setOddsFormat] = useState('American');
  const [favorites, setFavorites] = useState(props.isFavorites ? props.oddsTables : null);
  const [favoriteCount, setFavoriteCount] = useState(getFavoriteData().length);

  const isBreakpoint = MediaQuery(1024);
  if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

  // set the toggle state for the Box Score button
  const [ boxScore, setToggleBoxScore ] = useState(false);
  const toggleBoxScore = nextChecked => setToggleBoxScore(nextChecked);

  const updateOddsTables = (gameId, action) => {
    if (props.isFavorites && action === 'delete'){
      let output = oddsTables.map(item => {
        return {
          league: item.league,
          oddsTableModel: {
            gameRows: item.oddsTableModel.gameRows
                      .filter(row => row.gameView.gameId != gameId),
            sportsbooks: item.oddsTableModel.sportsbooks
          }
        }
      })
      .filter(item => item.oddsTableModel.gameRows.length > 0)

      setFavorites(output)
    }

    setFavoriteCount(getFavoriteData().length);
  };

  useEffect(() => {
    if (props.isFavorites)
      setFavorites(props.oddsTables)
  },[props.isFavorites, props.oddsTables]); //this code will run when the value of 'props.oddsTables' changes

  let oddsTables = props.isFavorites && favorites ? favorites : props.oddsTables;

  let headerSet = false;
  let pageTitle = `${props.league.replace("-", " ")} Odds, Lines and Spreads ${(props.stringScope !== "") ? '-' : '' } ${props.stringScope}${(query.date !== undefined) ? ` for ${getTimeHelpers.getDate(query.date, 'titleOption')}` : '' }`;
  if (props.isFavorites)
    pageTitle = 'Favorites'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={props.bettingArticle?.metaDescription ?? "Free Betting Odds and line movements in realtime at Sportsbookreview.com. Check out SBR's live odds for all major sports."} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${props.bettingArticle?.metaTitle ?? 'Betting Odds, Lines and Spreads'}`} />
        <meta property="og:description" content={props.bettingArticle?.metaDescription ?? "Free Betting Odds and line movements in realtime at Sportsbookreview.com. Check out SBR's live odds for all major sports."} />
        <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
        <meta property="og:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />
        <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
        <meta property="og:site_name" content="Sportsbook Review" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SBRreview" />
        <meta name="twitter:title" content={`${props.bettingArticle?.metaTitle ?? 'Betting Odds, Lines and Spreads'}`} />
        <meta name="twitter:description" content={props.bettingArticle?.metaDescription ?? "Free Betting Odds and line movements in realtime at Sportsbookreview.com. Check out SBR's live odds for all major sports."} />
        <meta name="twitter:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />

        {query.date == undefined || query.date == null ?
            <link rel="canonical" href={`${SBR_SITE}${asPath.split('?')[0]}`} /> : ''
        }

        {parse(props.sportListObject)}
        {(props.breadcrumbListObject !== "") ?
              parse('<script type="application/ld+json">' + JSON.stringify(props.breadcrumbListObject) + '</script>')
          : ''}
        {parse(props.schemaFAQ)}
      </Head>

      <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} favoriteCount={favoriteCount}  />
      <div id={props.header} className="container content bckg-white">
          <PageControls league={props.league} oddsFormat={oddsFormat} handler={setOddsFormat} isBreakpoint={breakpoint} scopes={query} breadcrumbObject={props.breadcrumbListObject} pageName={props.isFavorites ? 'Favorite Events' : undefined }  />
          {
            (oddsTables.length === 0 || (oddsTables.length === 1 && oddsTables[0].oddsTableModel.gameRows.length == 0)) ?
              props.isFavorites ?
                <div className='noOdds'>
                  <h2>No Favorites Yet!</h2>
                  <p className='flex-centered'>Click on the button <span className={`flex-centered ${styleFavorite.iconFavorite}`}><i className="sbr-icon-star-icon flex-centered"></i></span> on any game page to add a favorite.</p>
                </div>
              :
                <div className='noOdds'><h2>No odds available at this time for this league</h2></div>
            :
              <>
                <div className='boxScore-container'>
                  <label className="boxScore">
                    <span>Box Scores</span>
                    <Switch
                      className="react-switch"
                      onChange={toggleBoxScore}
                      checked={boxScore}
                      onColor="#ff0000"
                      height={20}
                      width={40}
                      handleDiameter={15}
                      />
                  </label>
                </div>
                <div id='leagues'>
                  {
                      oddsTables.map((row, index) =>
                        (row.oddsTableModel.gameRows.length > 0) ?
                            <section key={index} id={`section-${row.league.toLowerCase()}`} className="padding-container">
                              <OddsTable
                                league={row.league}
                                oddsTableModel={row.oddsTableModel}
                                isBreakpoint={breakpoint}
                                oddsFormat={oddsFormat}
                                showBoxScore={boxScore}
                                header={headerSet ? null: row.league.toLowerCase()}
                                updateOddsTables={updateOddsTables}
                                todayPage={props.league == 'Betting' ? true : false}
                                displayFootballHeader={props.footballLeaugeLanding ? index === 0 ? true : false : true}
                              />
                              {
                                headerSet = true
                              }
                            </section>
                            :
                            null
                        )
                  }
                </div>
              </>
          }
          <CMSContent bettingArticle={props.bettingArticle} />

      </div>
      {
        isBreakpoint ?
          <FooterFlyoutMobile favoriteCount={favoriteCount} /> :
          null
      }

      <Footer region={props.header} />
    </>
  );
}

export default OddsHome;

export async function getServerSideProps(context) {
  // Get the date string for querying the games
  const date = formatDateParameter(context.query.date);
  // Get the league param and map it to its DB friendly name
  const leagueObject = getLeagueData(context.params?.league);

  // If its not a valid league 404
  if(context.params?.league && leagueObject === null || context.params?.oddsType != null && context.params?.oddsScope === undefined ){
    return {
      notFound: true,
    }
  }

  // Get the URL params and map them to their proper names
  const oddsViewObject = getOddsViewData(context.params?.oddsType);
  const oddsScopeObject = getOddsScopeData(context.params?.oddsScope);

  let stringScope = "";

  if(oddsViewObject !== null && oddsScopeObject !== null){
    getMarketData('default').map( itemLeague => {
        if (itemLeague.name === context.params.oddsScope[0]) {
          stringScope = itemLeague.pagename
        }
      })
      getMenuList().map( item  => {
        if (item.url === context.params.oddsType) {
          stringScope = stringScope + " " + item.title;
        }
      })
  }

  // If we have objects parse the values
  const oddsScope = oddsScopeObject?.oddsscope ?? 'Competition';
  const league = leagueObject?.leaguename ?? 'Betting';
  var sportsbooks = await getSportsbooks(context.res, league);

  let leagueDataArr;
  // filter by league if query is available
  if (league !== 'Betting')
    leagueDataArr = allLeagueData.filter(item => item.leaguename === league);
  else
    leagueDataArr = leagueData;

  // we only want to allow league specific odds pages to fallback to the past
  // for data (if date isn't selected)
  var pastFallback = false;
  if(!!context.query.league && !context.query.date)
    pastFallback = true;

  const isFavorites = context.resolvedUrl.includes('favorites');
  const hasDateQuery = context.resolvedUrl.includes('?date=');
  var footballLeaugeLanding = false;

  if (isFavorites)
    leagueDataArr = getFavoriteLeagueAndDates({ req: context.req, res:context.res});
  // Show games within the next seven days for football leagues ONLY on the league landing page
  else if (league !== 'Betting' && (league.toLowerCase() === 'ncaaf' || league.toLowerCase() == 'nfl') && !hasDateQuery) {
    leagueDataArr = getWeeklyLeagueArray(league, date);
    footballLeaugeLanding = true;
  }
  else
    leagueDataArr = leagueDataArr.map(item => {
      return {
        league: item.leaguename,
        date: date
      }
    })

  let oddsTables = await Promise.all(leagueDataArr.map(async item =>
    {
      var oddsViewDefault = 'PointspreadDataOpeningAndLatestOddsDataView'
      if(!isFavorites) {
        // Default MLB, NHL and Soccer to moneyline if not on favorites page
        if (item.league === 'MLB' || item.league === 'NHL') oddsViewDefault = 'MoneyLineDataOpeningAndLatestOddsDataView'
        if (isSoccerLeague(item.league)) oddsViewDefault = 'ThreeWayDataOpeningAndLatestOddsDataView'
      }
      var oddsView = oddsViewObject?.viewtype ?? oddsViewDefault;

      if(isFavorites && isSoccerLeague(item.league) && oddsView === 'MoneyLineDataOpeningAndLatestOddsDataView') {
        oddsView = 'ThreeWayDataOpeningAndLatestOddsDataView';
      }

      // Retrieve gameIds for today and associated gameviews and oddsviews
      var gameIds;
      if (isFavorites) {
        gameIds = getFavoriteGameIds(item.league, item.date, { req: context.req, res:context.res});
      }
      // Only show games from exact dates when there is one present, or if we are on a football league page
      else if (footballLeaugeLanding || hasDateQuery) {
        gameIds = await getGameIds(item.league, item.date, false, true);
      }
      else {
        gameIds = await getGameIds(item.league, item.date, pastFallback);
      }

      if (gameIds === null)
        return {
          league: item.league,
          oddsTableModel: null
        }
      if (league === 'Betting')
        gameIds = gameIds.slice(0, 11);

      var gameViews = await getGameViews(gameIds);

      // Limit Today Page to 30 day search range, if the datepicker is used then ignore this
      if (league === 'Betting' && !hasDateQuery && gameViews !== null && !isFavorites) {
        gameViews = gameViews.filter(g => {
          const curretDate = new Date();
          const startDate = new Date(g.startDate);

          // One day in ms
          const oneDay = 1000*60*60*24;
          // Time difference between the dates
          const diffInTime = startDate.getTime() - curretDate.getTime();
          // Number of days between the dates
          const diffInDays = Math.round(diffInTime / oneDay);
          // Return if within 30 days of today
          return diffInDays < 30;
        });
      }

      const liveScoreViews = await query.getLiveScoreViews(gameIds, getLiveViewType(item.league));
      const oddsViews = await getOddsViews(gameIds, oddsView, oddsScope);
      const favoriteViews = getFavoriteByGameIds(gameIds, { req: context.req, res:context.res});

      const oddsTableModel = buildOddsTable(oddsViews, gameViews, sportsbooks, liveScoreViews, favoriteViews);

      return {
        league: item.league,
        oddsTableModel: oddsTableModel
      }
    }
  ));

  oddsTables = oddsTables.filter(odds => !!odds.oddsTableModel && odds.oddsTableModel.gameRows.length > 0);
  const leagueInfo = allLeagueData.find(leagues => leagues.leaguename === league);
  const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo);

  const sportListObject = (getTimeHelpers.isBeforeToday(context.query.date)) ? '' : sportsListEvent(oddsTables);

  const pathnameArr = context.resolvedUrl.substring(1).split('/');
  const slug = (league != 'Betting' && pathnameArr.length > 1 ? pathnameArr[1] : pathnameArr[0]).split('?')[0];
  const urlPath = league != 'Betting' && pathnameArr.length > 1 ? pathnameArr[0] : null;
  const bettingArticle = !isFavorites ? await getBettingArticle(slug, urlPath, leagueObject?.leaguename, context.res) : '';
  const schemaFAQ =  (bettingArticle?.faqs?.questions && bettingArticle.faqs.questions.length > 0) ? await faqList( bettingArticle.faqs) : '';

  const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

  return {
    props: {header, oddsTables, league, stringScope, isFavorites, breadcrumbListObject, sportListObject, bettingArticle, schemaFAQ, footballLeaugeLanding},
  }
}

function getLiveViewType(value){
  var league;
  if(isSoccerLeague(value)){
    league = 'Soccer';
  } else {
    league = value;
  }
  switch (league)
    {
        case 'NHL': return 'HockeyLivescoreDetailsDataView';
        case 'NFL':
        case 'CFL':
        case 'NCAAF': return 'FootballLivescoreDetailsDataView';
        case 'MLB': return 'BaseballLivescoreDetailsDataView';
        case 'NBA':
        case 'WNBA':
        case 'NCAAB': return 'BasketballLivescoreDetailsDataView';
        case 'Soccer': return 'SoccerLivescoreDetailsDataView';

        default: return null;
    }
}