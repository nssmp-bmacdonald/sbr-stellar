import Link from 'next/link';

import BoxScore from '/components/odds-table/partials/BoxScore';
import OddsCells from '/components/odds-table/partials/OddsCells';
import WagersAndOpeners from '/components/odds-table/partials/WagersAndOpeners';
import FavoriteGame from '/components/odds-table/partials/FavoriteGame';
import getUrlHelpers from '/helpers/get-url-helpers';
import getTimeHelpers from '/helpers/get-time-helpers';
import { getRank } from '/helpers/model-helpers/general-helpers';

import styles from '/styles/odds-table/GameRows.module.scss';

function GameRows({ rows, oddsFormat, showBoxScore, updateOddsTables, isBigSix }) {
  const isMLB = rows[0]?.gameView.leagueName == "MLB" ? true : false;
  const isThreeWay = rows[0]?.openingLineViews[0]?.viewType === "ThreeWayDataOpeningAndLatestOddsDataView"
  return(
    <>
    {
      rows.map((row, index) =>
        <div
          key={index}
          className={`${styles.eventMarketGridContainer} ${styles.neverWrap} ${styles.compact} ${LightRowOrDarkRow(index)}`}>
          <div className={styles.compactBettingOptionContainer} data-horizontal-eid={row.gameView.gameId}>
            <div className={styles.compactBettingOption} data-vertical-sbid="time">
              <div className={styles.favoriteContainer}>
                <FavoriteGame gameId={row.gameView.gameId} league={row.gameView.leagueName} date={row.gameView.startDate} updateOddsTables={updateOddsTables} />
              </div>
              <div className={styles.timeContainer}>
                <span>{getTimeHelpers.getTime(row.gameView.startDate)}</span>
                {
                  isBigSix ?
                    <div>
                      <Link
                        href={getUrlHelpers.getMatchupUrl(row.gameView.gameId, row.gameView.leagueName)}
                        passHref>
                          <a rel="" className={styles.h2h} >H2H</a>
                      </Link>
                      <span className={styles.spacer}>|</span>
                      <Link
                        href={getUrlHelpers.getLineHistoryUrl(row.gameView.gameId, row.gameView.leagueName)}
                        passHref>
                        <a rel="" className={styles.icon} data-cy="button-grid-linehistory" >
                          <i className="sbr-icon-rating-guide"></i> <span className='sr-only'>Icon for rating guide</span>
                        </a>
                      </Link>
                    </div> : <></>
                }
              </div>
            </div>
            <div className={styles.threeColumns}>
              <div className={styles.bettingOptionContainer}>
                <div className={styles.participants}>
                  <div className={styles.participantContainer}>
                    <div className={styles.rotContainer}>
                      <span className={styles.smallNumber}>{row.gameView.awayTeamRotationNumber}</span>
                    </div>
                    {isBigSix ?
                      <Link
                        href={getUrlHelpers.getOddsUrl(row.gameView.gameId, row.gameView.leagueName, isBigSix)}
                        passHref>
                        <a rel="" className={styles.gradientContainer}>
                          {
                            (!!row.gameView.awayStarter) ?
                              <>
                                <div>{row.gameView.awayTeam.shortName}</div>
                                <span className={styles.pitcher}>&nbsp;-&nbsp;</span>
                                <div className={`${styles.container} ${styles.pitcherText}`}>
                                <div>{row.gameView.awayStarter.firstInital ? row.gameView.awayStarter.firstInital + '.' : ''} {row.gameView.awayStarter.lastName}{(row.gameView.awayStarter.throwsShort != null && isMLB)? ' (' + row.gameView.awayStarter.throwsShort + ')' : ''}</div>
                                </div>
                              </> :
                              <span className={styles.participantBox}>
                                {getRank(row.gameView.awayTeam.rank,row.gameView.leagueName)}
                                {row.gameView.awayTeam.displayName}
                              </span>
                          }
                        </a>
                      </Link> :
                      <div className={styles.gradientContainerNoHover}>
                          {
                            (!!row.gameView.awayStarter) ?
                              <>
                                <div>{row.gameView.awayTeam.shortName}</div>
                                <span className={styles.pitcher}>&nbsp;-&nbsp;</span>
                                <div className={`${styles.container} ${styles.pitcherText}`}>
                                <div>{row.gameView.awayStarter.firstInital ? row.gameView.awayStarter.firstInital + '.' : ''} {row.gameView.awayStarter.lastName}{(row.gameView.awayStarter.throwsShort != null && isMLB)? ' (' + row.gameView.awayStarter.throwsShort + ')' : ''}</div>
                                </div>
                              </> :
                              <span className={styles.participantBox}>
                                {getRank(row.gameView.awayTeam.rank,row.gameView.leagueName)}
                                {row.gameView.awayTeam.displayName}
                              </span>
                          }
                        </div>
                    }
                    <span className={`${styles.actionIconContainer} ${styles.actionIconCollapsedScore}`}>
                      <i className={`${styles.actionIcon} ${styles.smallFont}`}></i>
                    </span>
                    <div className={`${styles.scores} ${showBoxScore || getTimeHelpers.isBeforeNow(row.gameView.startDate) ? 'hide' : ''}`}>
                      <div>{row.gameView.awayTeamScore}</div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.participants} ${styles.nonBorderBottom}`}>
                  <div className={styles.participantContainer}>
                    <div className={styles.rotContainer}>
                      <span className={styles.smallNumber}>{row.gameView.homeTeamRotationNumber}</span>
                    </div>
                    {
                      isBigSix ?
                        <Link
                        href={getUrlHelpers.getOddsUrl(row.gameView.gameId, row.gameView.leagueName, isBigSix)}
                          passHref>
                          <a rel="" className={styles.gradientContainer}>
                          {
                              (!!row.gameView.homeStarter) ?
                              <>
                                <div>{row.gameView.homeTeam.shortName}</div>
                                <span className={styles.pitcher}>&nbsp;-&nbsp;</span>
                                <div className={`${styles.container} ${styles.pitcherText}`}>
                                  <div>{row.gameView.homeStarter.firstInital ? row.gameView.homeStarter.firstInital + '.' : ''} {row.gameView.homeStarter.lastName}{(row.gameView.homeStarter.throwsShort != null && isMLB)? ' (' + row.gameView.homeStarter.throwsShort + ')' : ''}</div>
                                </div>
                              </> :
                              <span className={styles.participantBox}>
                                {getRank(row.gameView.homeTeam.rank,row.gameView.leagueName)}
                                {row.gameView.homeTeam.displayName}
                              </span>
                            }
                          </a>
                        </Link> :
                        <div className={styles.gradientContainerNoHover}>
                          {
                            (!!row.gameView.awayStarter) ?
                              <>
                                <div>{row.gameView.awayTeam.shortName}</div>
                                <span className={styles.pitcher}>&nbsp;-&nbsp;</span>
                                <div className={`${styles.container} ${styles.pitcherText}`}>
                                  <div>{row.gameView.awayStarter.firstInital ? row.gameView.awayStarter.firstInital + '.' : ''} {row.gameView.awayStarter.lastName}{(row.gameView.awayStarter.throwsShort != null && isMLB)? ' (' + row.gameView.awayStarter.throwsShort + ')' : ''}</div>
                                </div>
                              </> :
                              <span className={styles.participantBox}>
                                {getRank(row.gameView.awayTeam.rank,row.gameView.leagueName)}
                                {row.gameView.homeTeam.displayName}
                              </span>
                          }
                        </div>
                      }
                    <span className={`${styles.actionIconContainer} ${styles.actionIconCollapsedScore}`}>
                      <i className={`${styles.actionIcon} ${styles.smallFont}`}></i>
                    </span>
                    <div className={`${styles.scores} ${showBoxScore || getTimeHelpers.isBeforeNow(row.gameView.startDate) ? 'hide' : ''}`}>
                      <div>{row.gameView.homeTeamScore}</div>
                    </div>
                  </div>
                </div>
                {
                  isThreeWay ?
                  <div className={`${styles.participants} ${styles.nonBorderBottom}`}>
                    <div className={styles.participantContainer}>
                      <div className={styles.rotContainer}>
                        <span className={styles.smallNumber}></span>
                      </div>
                      <span className={styles.gradientContainerNoHover}>Draw</span>
                    </div>
                    <span className={`${styles.actionIconContainer} ${styles.actionIconCollapsedScore}`}>
                      <i className={`${styles.actionIcon} ${styles.smallFont}`}></i>
                    </span>
                  </div> : <></>
                }
              </div>
            </div>
          </div>
          <BoxScore boxScore={showBoxScore} scoreDataList={row.liveScoreViews.viewdata?.GameTeamScoreDataList} gameView={row.gameView} />
          <div className={styles.containerTable}>
            <div className={`${styles.consensusAndoddsContainer} ${styles.flex} ${styles.compact}`}>
              <WagersAndOpeners openingLineViews={row.openingLineViews} gameView={row.gameView} oddsFormat={oddsFormat} isThreeWay={isThreeWay}/>
              <div className={`${styles.oddsContainer} ${styles.compact}`}>
                <div className={styles.innerOddsContainer}>
                  {/* <div className={styles.slider}> */}
                    <div className={styles.inlineBlock}>
                      <div className={styles.columnsContainer}>
                        <OddsCells data={row.oddsViews} isOdds={true} oddsFormat={oddsFormat} lineHistoryUrl={getUrlHelpers.getLineHistoryUrl(row.gameView.gameId, row.gameView.leagueName)} isBigSix={isBigSix} isThreeWay={isThreeWay}/>
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  </>
  );
}

export default GameRows;

function LightRowOrDarkRow(index){
  if(index % 2 != 0){
    return 'bckg-dark';
  }
}
