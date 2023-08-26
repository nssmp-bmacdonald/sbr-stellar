import FutureCells from '/components/futures/partials/FutureCells';
import FutureOpenerCells from '/components/futures/partials/FutureOpenerCells';

import styles from '/styles/odds-table/GameRows.module.scss';

function TeamRows({ rows, oddsFormat }) {
  let index = 0;

  //Find the first sportsbook with odds
  for(let i=0; i<rows[0].oddsViews.length; i++){
    if(rows[0].oddsViews[i]?.viewdata.CurrentLine.Odds){
      index = i
      break;
    }
  } 

  //Sort based off that sportsbook
  rows.sort((a,b) => {
    return a.oddsViews[index]?.viewdata.CurrentLine.Odds - b.oddsViews[index]?.viewdata.CurrentLine.Odds
  });

  return(
    <>
    {
      rows.map((row, index) =>
        <div
          key={index}
          className={`${styles.eventMarketGridContainer} ${styles.neverWrap} ${styles.compact} ${LightRowOrDarkRow(index)}`}>
          <div className={styles.compactBettingOptionContainer} data-horizontal-eid={row.team.TeamId}>
            <div className={`${styles.threeColumns} ${styles.fit}`}>
              <div className={styles.bettingOptionContainer}>
                <div className={styles.participants}>
                  <div className={styles.participantContainer}>
                    <div className={styles.gradientContainer}>
                      <span className={`${styles.participantBox} py-2 pl-2`}>{row.team.TeamFullName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.containerTable}>
            <div className={`${styles.consensusAndoddsContainer} ${styles.flex} ${styles.compact}`}>
              <FutureOpenerCells openingLineViews={row.openingLineViews} oddsFormat={oddsFormat} />
              <div className={`${styles.oddsContainer} ${styles.compact}`}>
                <div className={styles.innerOddsContainer}>
                  {/* <div className={styles.slider}> */}
                    <div className={styles.inlineBlock}>
                      <div className={styles.columnsContainer}>
                        <FutureCells data={row.oddsViews} isOdds={true} oddsFormat={oddsFormat} />
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

export default TeamRows;

function LightRowOrDarkRow(index){
  if(index % 2 != 0){
    return 'bckg-dark';
  }
}
