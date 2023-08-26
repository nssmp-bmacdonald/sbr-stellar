/*
    data includes both the odds data and the openner data

    id is being passed in the mobile view table: when the value is undefined, it shows the desktop view.
    Opener should always have the id = 0. This way it will be render in the first if statement

    isOdds boolean variable defined the data type (odds vs openner)
*/
import styles from '/styles/odds-table/OddsCells.module.scss';
import style from '/styles/odds-table/OddsTableMobile.module.scss';

import { numberToString } from '/helpers/string-helpers';
import { oddsValue } from '/helpers/odds-helpers';

function Futures({data, id, isOdds, oddsFormat}){
  let index = parseInt(id);
  const openLineHistory = () => {}

  let bestBet = GetBestBet(data, true, oddsFormat);

  return(
    (id !== undefined) ?
      <FuturesMobile item={data[index]} isOdds={isOdds} oddsFormat={oddsFormat} bestBet={bestBet} openLineHistory={openLineHistory} />
    :
        data.slice(0, 7).map((item, index) => {
          const odds = oddsValue(GetFutureOddsValue(item, isOdds), oddsFormat);

          return (
            <div key={index} className={styles.numbersContainer}>
              <div className={styles.compact}>
                <div className={`${styles.oddsNumber} ${styles.oddsNumberFuture} ${styles.compact}`}>
                  <span className={`${styles.pointer} ${styles.margin} ${isOdds && odds == bestBet ? styles.bestOdd : ''}`}>
                    <span>{odds}</span>
                  </span>
                </div>
              </div>
            </div>
          )
        })
  );
}

const FuturesMobile = ({item, isOdds, oddsFormat, bestBet, openLineHistory}) => {
  const odds = oddsValue(GetFutureOddsValue(item, isOdds), oddsFormat);

  return (
    <div className={`${style.containerNumbers}`}>
      <div className={`${isOdds ? style.odds : style.opener} ${isOdds && odds == bestBet ? styles.bestOdd : ''}`}
          onClick={(isOdds) ? openLineHistory() : null}>
            <span>{odds}</span>
      </div>
    </div>
  )
}

export default Futures;

function GetFutureOddsValue(item, isOdds){
  return isOdds ? item?.viewdata.CurrentLine.Odds : item?.viewdata.OpeningLine.Odds;
}

function GetBestBet(data, isHome, oddsFormat) {
  const odds = data.filter(item => !!item)
                    .map(item => Number(oddsValue(GetFutureOddsValue(item, true), oddsFormat)))
                    .filter(item => !!item);
  const maxOdds = odds.length > 0 ? Math.max(...odds) : null;

  if (!maxOdds)
    return null;

  return numberToString(maxOdds);
}
