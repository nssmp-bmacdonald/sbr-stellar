import { useEffect } from 'react';

import { useRouter } from 'next/router'

import Link from 'next/link';

import { ODDS_URL } from '/constants/seo';
import { LEAGUE_HEADER } from '/constants/menu';
import getTimeHelpers from '/helpers/get-time-helpers';
import leagueData, { getLeaguePath } from '/data/parameter-data';
import { formatDateParameter } from '/helpers/date-helpers';

import GameRows from '/components/odds-table/partials/GameRows';
import GameRowsMobile from '/components/odds-table/mobile/GameRowsMobile';
import Sportsbooks from '/components/odds-table/partials/Sportsbooks';

import styles from '/styles/odds-table/OddsTable.module.scss';
import styleBooks from '/styles/odds-table/Sportsbooks.module.scss';

function OddsTable({league, oddsTableModel, isBreakpoint, oddsFormat, showBoxScore, header, updateOddsTables, todayPage, displayFootballHeader}) {
  const displayDate = getTimeHelpers.getGameDate(oddsTableModel.gameRows[0].gameView.startDate).split('-')[0];
  const router = useRouter();
  const dateQueryString = formatDateParameter(router.query.date);

  const isBigSix = leagueData.filter(x => x.leaguename === league).length !== 0

  const getSticky = () => {
      if (header === league.toLowerCase()) {
        const header = document.querySelector('#thead-' + league.toLowerCase());
        const scrollTop = window.scrollY;
        const element = document.querySelector('#leagues');
        if (scrollTop >= (element.getBoundingClientRect().top + scrollTop) + 30 && scrollTop <= (element.getBoundingClientRect().bottom + scrollTop) + 10 ) {
          header.classList.add('stick');
        }else {
          header.classList.remove('stick');
        }
      }
  };

  useEffect(() => {
      if (header === league.toLowerCase() && !isBreakpoint) {
        window.addEventListener('scroll', getSticky);
        return () => {
            window.removeEventListener('scroll', getSticky);
        };
      }
  });

  return (
      <>
      {
        displayFootballHeader ? <h2 className='league-title h3'>{LEAGUE_HEADER[league] ?? league} Odds</h2> : <div style={{'marginTop': '2rem'}}></div>
      }
        {
          isBreakpoint ?
            <GameRowsMobile date={(displayDate !== undefined) ?  displayDate : getTimeHelpers.now('option')} table={oddsTableModel} oddsFormat={oddsFormat} showBoxScore={showBoxScore} updateOddsTables={updateOddsTables} isBigSix={isBigSix}/>
        :
          <>
            <div className={styles.timeContainer}>
              <p className={styles.timeText}>{(displayDate !== undefined) ? displayDate : getTimeHelpers.now('titleOption')}</p>
            </div>
            {
              (header === league.toLowerCase()) ?
                  <div id={`thead-${league.toLowerCase()}`}
                    className={`bckg-gray border-all ${styles.compactViewHeader}`}>
                    <div className={` ${styles.timeContainer} border-right`}>
                      <div className={styles.sortingControlsContainer}>
                        <div className={styles.timeContainerInside}>
                            <span>Time</span>
                        </div>
                        <div className={styles.rotContainer}>Rot</div>
                      </div>
                      { !isBreakpoint ?
                        (header !== null) ?
                          <span className={styles.firstTimeText}>
                              Teams
                          </span>
                          : null
                      : null }
                    </div>
                    <div className={`${styleBooks.sportbooks}`}>
                        <div className={styleBooks.consensusAndOpener}>
                            <span className={styleBooks.consensus}>WAGERS</span>
                            <span className={styleBooks.opener}>OPENER</span>
                        </div>
                        <div className={styles.inlineBlock}>
                            <div className={styles.columnsContainer}>
                                <Sportsbooks sportsbooks={oddsTableModel.sportsbooks}/>
                            </div>
                        </div>
                    </div>
                </div>
              : null }
            <div id={`tbody-${league.toLowerCase()}`}>
              { todayPage ?
              // If on today page, and over 10 games, slice last game and display the More odds button
              <GameRows rows={oddsTableModel.gameRows.length > 10 ? oddsTableModel.gameRows.slice(0,-1) : oddsTableModel.gameRows} oddsFormat={oddsFormat} showBoxScore={showBoxScore} updateOddsTables={updateOddsTables} isBigSix={isBigSix}/>
              :
              <GameRows rows={oddsTableModel.gameRows} oddsFormat={oddsFormat} showBoxScore={showBoxScore} updateOddsTables={updateOddsTables} isBigSix={isBigSix}/>
              }
            </div>
          </>
        }

        {
          checkTotalGames(todayPage, oddsTableModel.gameRows) ?

          <Link href={`${ODDS_URL+ getLeaguePath(league) + getMoreOddsLink(dateQueryString) }`}>
            <a>
                <button style={{'display': 'flex'}} className='btn btn-solid mtop-1'>More {league} odds</button>
            </a>
          </Link>

          : undefined
        }

    </>
  );
}

export default OddsTable;

function checkTotalGames(todayPage, rows) {
  return todayPage && rows.length > 10 ? true : false;
}

function getMoreOddsLink(date) {
  return getTimeHelpers.isBeforeToday(date) ? '/?date=' + date.split(" ")[0] : '';
}