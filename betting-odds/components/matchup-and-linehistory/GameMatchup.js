import Image from 'next/image';
import Link from 'next/link';

import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';

import Weather from '/components/matchup-and-linehistory/partials/Weather';
import BaseballStats from '/components/matchup-and-linehistory/partials/matchup-statistics/BaseballStats';
import FootballStats from '/components/matchup-and-linehistory/partials/matchup-statistics/FootballStats';
import HockeyStats from '/components/matchup-and-linehistory/partials/matchup-statistics/HockeyStats';
import BasketballStats from '/components/matchup-and-linehistory/partials/matchup-statistics/BasketballStats';

import { LOGOS_URL } from '/constants/seo';
import { numberToString } from '/helpers/string-helpers';
import { getBestBet } from '/helpers/odds-helpers'

const GameMatchup = ({ matchupModel, league }) =>{
  let consensus = matchupModel.matchup.gameView.consensus;
  let oddsView = matchupModel.matchup.oddsViews.spreadOddsViews.filter(item => !!item)[0];

  let homeBestSpreadBet = null;
  let awayBestSpreadBet = null;
  let homeBestMoneylineBet = null;
  let awayBestMoneylineBet = null;
  let overBestTotalBet = null;
  let underBestTotalBet = null;

  homeBestSpreadBet = getBestBet(matchupModel.matchup.oddsViews.spreadOddsViews, true, 'American');
  awayBestSpreadBet = getBestBet(matchupModel.matchup.oddsViews.spreadOddsViews, false, 'American');
  homeBestMoneylineBet = getBestBet(matchupModel.matchup.oddsViews.moneylineOddsViews, true, 'American');
  awayBestMoneylineBet = getBestBet(matchupModel.matchup.oddsViews.moneylineOddsViews, false, 'American');
  underBestTotalBet = getBestBet(matchupModel.matchup.oddsViews.totalOddsViews, true, 'American');
  overBestTotalBet = getBestBet(matchupModel.matchup.oddsViews.totalOddsViews, false, 'American');

  return (
      <>
        <div className={style.mainColumn}>
            <aside className={style.leftColumn}>
                <div className={cardStyle.Card}>
                    <h3 className={cardStyle.CardTitle}>Betting Consensus</h3>
                    <div className={style.TeamInfo}>
                        <div className={style.TeamName}>
                            <p className={style.TeamAway}>
                                {matchupModel.matchup.gameView.awayTeam.displayName}<br />
                                {matchupModel.matchup.gameView.awayTeam.nickname}
                            </p>
                            <span className={style.Odds}>{!!oddsView ? numberToString(oddsView.currentLine.awaySpread) : '-'}</span>
                        </div>
                        <div className={style.TagCircle}>vs</div>
                        <div className={style.TeamName}>
                            <p className={style.TeamHome}>
                                {matchupModel.matchup.gameView.homeTeam.displayName}<br />
                                {matchupModel.matchup.gameView.homeTeam.nickname}
                            </p>
                            <span className={style.Odds}>{!!oddsView ? numberToString(oddsView.currentLine.homeSpread) : '-'}</span>
                        </div>
                    </div>
                    <div className={`${style.TeamStatistics} ${rowStyle.Rows}`}>
                        <div className={rowStyle.Row}>
                            <div className={rowStyle.RowData}>{!!consensus?.awaySpreadPickPercent && !!consensus ? Math.round(consensus.awaySpreadPickPercent) + "%" : '-'}</div>
                            <div className={rowStyle.RowLabel}>Spread</div>
                            <div className={rowStyle.RowData}>{!!consensus?.homeSpreadPickPercent && !!consensus ? Math.round(consensus.homeSpreadPickPercent) + "%": '-'}</div>
                        </div>
                        <div className={rowStyle.Row}>
                            <div className={rowStyle.RowData}>{!!consensus?.overPickPercent && !!consensus ? Math.round(consensus.overPickPercent) + "% O"  : '-'}</div>
                            <div className={rowStyle.RowLabel}>Total</div>
                            <div className={rowStyle.RowData}>{!!consensus?.underPickPercent && !!consensus ? Math.round(consensus.underPickPercent) + "% U"  : '-'}</div>
                        </div>
                        <div className={rowStyle.Row}>
                            <div className={rowStyle.RowData}>{!!consensus?.awayMoneyLinePickPercent && !!consensus ? Math.round(consensus.awayMoneyLinePickPercent) + "%"  : '-'}</div>
                            <div className={rowStyle.RowLabel}>Moneyline</div>
                            <div className={rowStyle.RowData}>{!!consensus?.homeMoneyLinePickPercent && !!consensus ? Math.round(consensus.homeMoneyLinePickPercent) + "%"  : '-'}</div>
                        </div>
                    </div>
                </div>



                <div className={cardStyle.Card}>
                    <h3 className={cardStyle.CardTitle}>Game Detail</h3>
                    <div className={`${style.GameRow}`}>
                        {matchupModel.matchup.gameView.venueName}, {matchupModel.matchup.gameView.city}, {matchupModel.matchup.gameView.state}, {matchupModel.matchup.gameView.country}
                    </div>
                    <div className={`${style.GameRow} ${style.stackCenter}`}>
                        <Weather data={matchupModel.matchup.weather} date={matchupModel.matchup.gameView.startDate} />
                    </div>

                </div>
            </aside>

            {renderMatchupStatistics(matchupModel, league)}

            <aside className={style.rightColumn}>
                { awayBestSpreadBet || homeBestSpreadBet ?
                    <>
                    <div className={cardStyle.Card}>
                        <h3 className={`${cardStyle.CardTitle} h4`}>Best Spread Odds</h3>
                        {bestOddsCard(matchupModel.matchup.gameView.awayTeam.fullName, awayBestSpreadBet, matchupModel.matchup.sportsbooks)}
                        {bestOddsCard(matchupModel.matchup.gameView.homeTeam.fullName, homeBestSpreadBet, matchupModel.matchup.sportsbooks)}
                    </div>
                    </> : null
                }
                { overBestTotalBet || underBestTotalBet ?
                    <>
                    <div className={cardStyle.Card}>
                        <h3 className={`${cardStyle.CardTitle} h4`}>Best Total Odds</h3>
                        {bestOddsCard('Over', overBestTotalBet, matchupModel.matchup.sportsbooks)}
                        {bestOddsCard('Under', underBestTotalBet, matchupModel.matchup.sportsbooks)}
                    </div>
                    </> : null
                }
                { awayBestMoneylineBet || homeBestMoneylineBet ?
                    <>
                    <div className={cardStyle.Card}>
                        <h3 className={`${cardStyle.CardTitle} h4`}>Best Moneyline Odds</h3>
                        {bestOddsCard(matchupModel.matchup.gameView.awayTeam.fullName, awayBestMoneylineBet, matchupModel.matchup.sportsbooks)}
                        {bestOddsCard(matchupModel.matchup.gameView.homeTeam.fullName, homeBestMoneylineBet, matchupModel.matchup.sportsbooks)}
                    </div>
                    </> : null
                }
            </aside>
        </div>
      </>
  )
}

export default GameMatchup;

function renderMatchupStatistics(matchupModel, league){
  switch (league)
    {
        case 'NHL': return <HockeyStats matchupModel={matchupModel}/>;
        case 'NFL':
        case 'NCAAF': return <FootballStats matchupModel={matchupModel}/>;
        case 'MLB': return <BaseballStats matchupModel={matchupModel}/>;
        case 'NBA':
        case 'NCAAB': return <BasketballStats matchupModel={matchupModel}/>;

        default: return null;
    }
}

function bestOddsCard(team, oddsObject, sportsbooks){
  const sportsbook = sportsbooks.find(sportsbook => sportsbook.machineName === oddsObject.sportsbook.toLowerCase());

  return(
    <div className={style.OddsRow}>
        <div className={style.OddsWrapper}>
            <div className={style.LeftSide}>
                <h4>{team}</h4>
                <Link href={sportsbook.affiliateLink}>
                    <a target="_blank"
                    data-aatracker={`Matchup Right Sidebar - Visit Site CTA - ${sportsbook.name}`}
                    rel="nofollow">
                        <Image
                        alt={sportsbook.name}
                        src={LOGOS_URL + sportsbook.iconColor.fileName}
                        width={75}
                        height={45} />
                    </a>
                </Link>
            </div>
            <div className={style.RightSide}>
                <span className={style.OddText}>{!!oddsObject.spreadOrTotal ? oddsObject.spreadOrTotal : oddsObject.odds}<br />
                <small>{oddsObject.spreadOrTotal ? oddsObject.odds : ''}</small></span>
            </div>
        </div>
    </div>
  )
}
