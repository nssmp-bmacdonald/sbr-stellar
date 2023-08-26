import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import parse from 'html-react-parser';

import { useState } from 'react';

import MediaQuery from '/components/MediaQuery';
import Header from '/components/header/Header';
import Footer from '/components/footer/Footer';
import FooterFlyoutMobile from '/components/footer/mobile/FooterFlyoutMobile';
import Breadcrumbs from '/components/page-controls/Breadcrumbs';
import DateControls from '/components/page-controls/DateControls.js';
import PageTitle from '/components/page-controls/PageTitle.js';
import CMSContent from '/components/cms/Content';

import { buildOddsTable } from '/helpers/model-helpers/general-helpers';
import { formatDateParameter } from '/helpers/date-helpers';
import { oddsValue } from '/helpers/odds-helpers';
import { getOddsValue } from '/helpers/odds-helpers';
import * as query from '/helpers/query-helpers';
import getTimeHelpers from '/helpers/get-time-helpers';
import getUrlHelpers from '/helpers/get-url-helpers';
import { numberToString } from '/helpers/string-helpers';

import { getLeagueData } from '/data/parameter-data';
import leagueData from '/data/parameter-data';
import { breadcrumbObject, sportsListEvent, faqList } from '/helpers/data-structure-helpers';

import { getBettingArticle } from '/services/betting-article';
import { getGameIds, getGameViews } from '/services/games';
import { getOddsViews } from '/services/odds';
import { getSportsbooks } from '/services/sportsbooks';

import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';
import style from '/styles/pages/matchup-and-linehistory/Matchups.module.scss';

import { SBR_SITE, LOGOS_URL } from '/constants/seo';

const currentTime = new Date();
const contextHeader =  {
  "MLB" : [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'H' ],
  "NBA" : [ '1', '2', '3', '4', 'H' ],
  "NCAAB" : [ '1', '2', 'H' ],
  "NFL" : [ '1', '2', '3', '4', 'H' ],
  "NCAAF" : [ '1', '2', '3', '4', 'H' ],
  "NHL" : [ '1', '2', '3', 'H' ],
}

const Matchups = ( props ) => {
    const [breakpoint, setBreakpoint] = useState(null);
    const [season] = useState(getTimeHelpers.getYearRange(currentTime));
    const firstSportsbook = props.oddsTables[0] && props.oddsTables[0].oddsTableModel.sportsbooks.length > 0 ? props.oddsTables[0].oddsTableModel.sportsbooks[0] : '';
    const {asPath,query} = useRouter();

    const isBreakpoint = MediaQuery(1024);
    if ( isBreakpoint !== breakpoint) setBreakpoint(isBreakpoint);

    const displayDate = props.oddsTables.length > 0 ? getTimeHelpers.getGameDate(props.oddsTables[0].oddsTableModel.gameRows[0].gameView.startDate).split('-')[0] : query.date;

    return (
        <>
        <Head>
            <title>{props.bettingArticle ? props.bettingArticle.metaTitle : props.league + " Scores and Matchups"}</title>
            <meta name="description" content={`${props.league} matchups info for ${displayDate} including previews, scores, schedule, stats, results, and betting trends from SBR.`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.bettingArticle ? props.bettingArticle.metaTitle : props.league + " Scores and Matchups"}/>
            <meta property="og:description" content="" />
            <meta property="og:url" content={`${SBR_SITE}${asPath.split('?')[0]}`} />
            <meta property="og:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />
            <meta property="og:image:alt" content="The SBR logo with the bull at the top of the SBR letters" />
            <meta property="og:site_name" content="Sportsbook Review" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@SBRreview" />
            <meta name="twitter:title" content={`${season} ${props.league} Scores and Matchups`} />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content='https://img.sportsbookreview.com/images/sbr-open-graph.png' />

            {(query.date == null || query.date == undefined) ?
              <link rel="canonical" href={`${SBR_SITE}${asPath.split('?')[0]}`} /> : ''
            }

            {parse(props.sportListObject)}
            {(props.breadcrumbListObject !== "") ? parse('<script type="application/ld+json">' + JSON.stringify(props.breadcrumbListObject) + '</script>'): ''}
            {parse(props.schemaFAQ)}
        </Head>
        <Header league={props.league} isBreakpoint={breakpoint} asPath={asPath} />
        <div id={props.header} className="container content bckg-white">
          <div className="controls padding-container">
              <Breadcrumbs breadcrumbList={props.breadcrumbListObject} />
              <DateControls />
          </div>
          <PageTitle pageName={`${props.league} Scores and Matchups`} />
            <br />
            <h2 className={`padding-container`}>{(displayDate !== undefined) ? getTimeHelpers.getDate(displayDate, 'longOptions') : getTimeHelpers.now('longOptions')}</h2>
            {
              (props.oddsTables.length === 0 || (props.oddsTables.length === 1 && props.oddsTables[0].oddsTableModel.gameRows.length == 0)) ?
                <div className='noOdds'><h2>There are no scheduled games for this league with odds</h2></div>
              :
                <>
                  <div className={`${style.gamesCards} padding-container`}>
                      { props.oddsTables.map(row =>
                          row.oddsTableModel.gameRows.map((item, index) =>
                              <div key={index} id={item.gameView.gameId} className={`${cardStyle.Card} ${style.gameCard}`}>
                                <div className={cardStyle.CardTitle}>
                                    <h4>{item.gameView.awayTeam.displayName} vs {item.gameView.homeTeam.displayName}<br />
                                    <small>{item.gameView.venueName}, {item.gameView.city}, {item.gameView.state}, {item.gameView.country}<br />
                                    {getTimeHelpers.getGameDate(item.gameView.startDate, 'matchupOption')}</small></h4>
                                </div>
                                <div className={`${rowStyle.Rows} ${rowStyle.RowsMatchup}`}>
                                    {(breakpoint) ?
                                        <>
                                          <div className={`${rowStyle.Row} ${rowStyle.RowMobile}`}>
                                            <div className={rowStyle.Banner}>{item.gameView.awayTeam.displayName}</div>
                                            <div className={rowStyle.Banner}>{item.gameView.homeTeam.displayName}</div>
                                          </div>
                                          <MatchupMobileWagerAndOpener item={item} style={rowStyle} league={props.league} firstSportsbook={firstSportsbook}/>
                                        </>
                                      : null
                                    }
                                    <div className={`${rowStyle.Row} ${rowStyle.RowHeader}`}>
                                        {
                                          // this needs to be replaced with the game status (the if statement using the index logic)
                                          (item.gameView.gameStatusText == 'Final' || item.gameView.gameStatusText == 'Postponed') ?
                                            <div className={`${rowStyle.Banner} ${style.complete}`}>{item.gameView.gameStatusText}</div>
                                          :
                                            (item.gameView.gameStatusText == 'In Progress') ?
                                              <div className={`${rowStyle.Banner} ${style.inProgress}`}>4th Q: 11:07</div>
                                            :
                                              <div className={`${rowStyle.Banner}`}></div>
                                        }
                                        <div className={rowStyle.ScoreBoard}>
                                          { contextHeader[props.league].map((x, index) =>
                                            <span key={index}>{x}</span>
                                          )}
                                        </div>
                                        {(!breakpoint) ?
                                            <>
                                                <div className={rowStyle.Stats}>Wagers</div>
                                                <div className={rowStyle.Stats}>Opener</div>
                                                <div className={rowStyle.Stats}>
                                                  <Link href={firstSportsbook.affiliateLink}>
                                                      <a target="_blank"
                                                      data-aatracker={`Matchup Right Sidebar - Visit Site CTA - ${firstSportsbook.name}`}
                                                      rel="nofollow">
                                                          <Image
                                                          alt={firstSportsbook.name}
                                                          src={LOGOS_URL + firstSportsbook.iconColor.fileName}
                                                          width={75}
                                                          height={45} />
                                                      </a>
                                                  </Link>
                                                </div>
                                            </>
                                          : null
                                        }

                                    </div>
                                    <div className={rowStyle.Row}>
                                        <MatchupScore item={item} periods={contextHeader[props.league]} style={rowStyle} isHome={false} isBreakpoint={breakpoint} league={props.league}/>
                                    </div>
                                    <div className={rowStyle.Row}>
                                        <MatchupScore item={item} periods={contextHeader[props.league]} style={rowStyle} isHome={true} isBreakpoint={breakpoint} league={props.league}/>
                                    </div>
                                    <div className={`${rowStyle.Row} ${rowStyle.RowButtons}`}>
                                      <Link
                                        href={ getUrlHelpers.getMatchupUrl(item.gameView.gameId, props.league) }>
                                        <a><i className="sbr-icon-versus icon-2-5Wx"></i> Matchup</a>
                                      </Link>
                                      <Link
                                        href={getUrlHelpers.getLineHistoryUrl(item.gameView.gameId, props.league)}>
                                        <a><i className="sbr-icon-rating-guide icon-2-5Wx"></i> Line History</a>
                                      </Link>
                                    </div>
                                </div>
                              </div>
                          )
                      )}
                      <CMSContent bettingArticle={props.bettingArticle} />
                  </div>
                </>
            }
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

const MatchupMobileWagerAndOpener = ({ item, style, league, firstSportsbook }) => {
  const consensus = item.gameView.consensus;
  const oddsView = item.oddsViews.filter(item => !!item)[0];
  const awayOddsValue = getOddsValue(oddsView, false, false);
  const homeOddsValue = getOddsValue(oddsView, true, false);
  return (
     <>
      <div className={`${style.Row} ${style.RowMobile}`}>
        <div className={style.Stats}>{getPickPercent(consensus, false, league)}</div>
        <div className={style.Stats}>Wagers</div>
        <div className={style.Stats}>{getPickPercent(consensus, true, league)}</div>
      </div>
      <div className={`${style.Row} ${style.RowMobile}`}>
        <div className={style.Stats}>{getOpener(oddsView, false)} {oddsValue(awayOddsValue, undefined)}</div>
        <div className={style.Stats}>Opener</div>
        <div className={style.Stats}>{getOpener(oddsView, true)} {oddsValue(homeOddsValue, undefined)}</div>
      </div>
      <div className={`${style.Row} ${style.RowMobile}`}>
        <div className={style.Stats}>{getFirstOdds(oddsView, false, league)}</div>
        <div className={style.Stats}>
          <Link href={firstSportsbook.affiliateLink}>
              <a target="_blank"
              data-aatracker={`Matchup Right Sidebar - Visit Site CTA - ${firstSportsbook.name}`}
              rel="nofollow">
                  <Image
                  alt={firstSportsbook.name}
                  src={LOGOS_URL + firstSportsbook.iconColor.fileName}
                  width={75}
                  height={45} />
              </a>
          </Link>
        </div>
        <div className={style.Stats}>{getFirstOdds(oddsView, true,league)}</div>
      </div>
     </>
  )
}

const MatchupScore = ({ item, periods, style, isHome, isBreakpoint, league}) => {
  const gameScores = groupBy( item.liveScoreViews.viewdata?.GameTeamScoreDataList, i => i.Period)
                ?.flat()
                .filter(period => period.isHomeTeam === isHome);
  const scores = periods.filter(x => x !== 'H').map(x =>
                  {
                    return gameScores?.find(score => x == score.Period)?.Points ??
                      ((item.gameView.gameStatusText === 'Postponed' || item.gameView.gameStatusText === 'Final') ? 0 : '-');
                  }

              )
  const consensus = item.gameView.consensus;
  const oddsView = item.oddsViews.filter(item => !!item)[0];

  const openerValue = oddsValue(getOddsValue(oddsView, isHome, false), undefined);
  var openerDisplay;

  if (league.toLowerCase() === 'mlb' || league.toLowerCase() === 'nhl') {
    openerDisplay = openerValue;
  }
  else {
    openerDisplay = getOpener(oddsView, isHome) + ' ' + openerValue;
  }

  return (
     <>
      <div className={style.Banner}>{isHome ? item.gameView.homeTeam.displayName : item.gameView.awayTeam.displayName}</div>
      <div className={style.ScoreBoard}>
        {
            scores.map((score, indexPeriod) =>
                <span key={indexPeriod}>{score}</span>
            )
        }
        <span>{isHome ? item.gameView.homeTeamScore : item.gameView.awayTeamScore}</span>
      </div>

      {(!isBreakpoint) ?
          <>
              <div className={style.Stats}>{getPickPercent(consensus, isHome, league)}</div>
              <div className={style.Stats}>{openerDisplay}</div>
              <div className={style.Stats}>{getFirstOdds(oddsView, isHome, league)}</div>
          </>
        : null
      }
     </>
  )
}

export default Matchups;

export async function getServerSideProps(context) {
  // Get the date string for querying the games
  const date = formatDateParameter(context.query.date);
  // Get the league param and map it to its DB friendly name
  const leagueObject = getLeagueData(context.params?.league);

  // If we have objects parse the values
  const spreadOddsViews = 'PointspreadDataOpeningAndLatestOddsDataView';
  const moneylineOddsViews = 'MoneyLineDataOpeningAndLatestOddsDataView';

  const oddsScope = 'Competition';
  const league = leagueObject?.leaguename ?? 'Betting';
  const sportsbooks = await getSportsbooks(context.res);

  var oddsView = spreadOddsViews;

  let leagueDataArr = leagueData;
  // filter by league if query is available
  if (league !== 'Betting') {
    if (league.toLowerCase() === 'mlb' || league.toLowerCase() === 'nhl') {
      oddsView = moneylineOddsViews;
    }
    leagueDataArr = leagueDataArr.filter(item => item.leaguename === league);
  }

  // we only want to allow league specific odds pages to fallback to the past
  // for data (if date isn't selected)
  var pastFallback = false;
  if(!!context.query.league && !context.query.date)
    pastFallback = true;

  let oddsTables = await Promise.all(leagueDataArr.map(async item =>
    {
      // Retrieve gameIds for today and associated gameviews and oddsviews
      const gameIds = await getGameIds(item.leaguename, date, pastFallback);
      if (gameIds === null)
        return {
          league: item.leaguename,
          oddsTableModel: null
        }

      const gameViews = await getGameViews(gameIds);
      const liveScoreViews = await query.getLiveScoreViews(gameIds, getLiveViewType(item.leaguename));
      const oddsViews = await getOddsViews(gameIds, oddsView, oddsScope);

      const oddsTableModel = buildOddsTable(oddsViews, gameViews, sportsbooks, liveScoreViews);

      return {
        league: item.leaguename,
        oddsTableModel: oddsTableModel
      }
    }
  ));
  oddsTables = oddsTables.filter(odds => !!odds.oddsTableModel && odds.oddsTableModel.gameRows.length > 0);

  const leagueInfo = leagueData.find(leagues => leagues.leaguename === league);
  const breadcrumbListObject = breadcrumbObject(league, context.req, context.resolvedUrl, leagueInfo);

  const sportListObject = (getTimeHelpers.isBeforeToday(context.query.date)) ? '' : sportsListEvent(oddsTables);

  const pathnameArr = context.resolvedUrl.substring(1).split('/');
  const slug = league != 'Betting' && pathnameArr.length > 1 ? pathnameArr[2].split('?')[0] : pathnameArr[0];
  const urlPath = league != 'Betting' && pathnameArr.length > 1 ? pathnameArr[0] : null;
  const bettingArticle = await getBettingArticle(slug, urlPath, leagueObject?.leaguename, context.res);
  const schemaFAQ =  (bettingArticle?.faqs?.questions && bettingArticle.faqs.questions.length > 0) ? await faqList( bettingArticle.faqs) : '';

  const header = context.res.getHeader(process.env.REGION_CODE_HEADER).toLowerCase();

  return {
  props: {header, oddsTables, league, breadcrumbListObject, sportListObject, schemaFAQ, bettingArticle},
  }
}

function getLiveViewType(value){
  switch (value)
    {
        case 'NHL': return 'HockeyLivescoreDetailsDataView';
        case 'NFL':
        case 'NCAAF': return 'FootballLivescoreDetailsDataView';
        case 'MLB': return 'BaseballLivescoreDetailsDataView';
        case 'NBA':
        case 'NCAAB': return 'BasketballLivescoreDetailsDataView';

        default: return null;
    }
}

var groupBy = function (list, getKey) {
  return list?.reduce(function (previous, currentItem) {
      var group = getKey(currentItem);
      if (!previous[group])
          previous[group] = [];
      previous[group].push(currentItem);
      return previous;
  }, []);
};

function getPickPercent(consensus, isHome, league){
  if(league.toLowerCase() === 'mlb' || league.toLowerCase() === 'nhl') {
    if(!consensus || !consensus.homeMoneyLinePickPercent || !consensus.awayMoneyLinePickPercent)
      return '-';
    else if(isHome)
      return Math.round(consensus.homeMoneyLinePickPercent) + "%";
    else
      return Math.round(consensus.awayMoneyLinePickPercent) + "%";
  }
  else {
    if(!consensus || !consensus.homeSpreadPickPercent || !consensus.awaySpreadPickPercent)
      return '-';
    else if(isHome)
      return Math.round(consensus.homeSpreadPickPercent) + "%";
    else
      return Math.round(consensus.awaySpreadPickPercent) + "%";
  }
}

function getOpener(item, isHome) {
  if(!item)
    return '';
  else if(isHome)
    return numberToString(item.openingLine.homeSpread);
  else
    return numberToString(item.openingLine.awaySpread);
}

function getFirstOdds(item, isHome, league) {
  if(league.toLowerCase() === 'mlb' || league.toLowerCase() === 'nhl') {
    if(!item)
      return '-';
    else if(isHome)
      return numberToString(item.currentLine.homeOdds);
    else
      return numberToString(item.currentLine.awayOdds);
  }
  else {
    if(!item)
      return '-';
    else if(isHome)
      return numberToString(item.currentLine.homeSpread) + ' ' + numberToString(item.currentLine.homeOdds);
    else
      return numberToString(item.currentLine.awaySpread) + ' ' + numberToString(item.currentLine.awayOdds);
  }
}
