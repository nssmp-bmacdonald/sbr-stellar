/*
    data includes both the odds data and the openner data

    id is being passed in the mobile view table: when the value is undefined, it shows the desktop view.
    Opener should always have the id = 0. This way it will be render in the first if statement

    isOdds boolean variable defined the data type (odds vs openner)
*/
import styles from '/styles/odds-table/OddsCells.module.scss';
import style from '/styles/odds-table/OddsTableMobile.module.scss';

import { numberToString } from '/helpers/string-helpers';
import { getBestBet } from '/helpers/odds-helpers';
import { oddsValue } from '/helpers/odds-helpers';
import { getOddsValue} from '/helpers/odds-helpers';
import { getDrawOddsValue} from '/helpers/odds-helpers';

import { useRouter } from 'next/router'

function Odds({data, id, isOdds, oddsFormat, lineHistoryUrl, isBigSix, isThreeWay}){
  let index = parseInt(id);

  const router = useRouter();
  const openLineHistory = () => router.push(lineHistoryUrl);

  let homeBestBet = null;
  let awayBestBet = null;

  if (isOdds) {
    homeBestBet = getBestBet(data, true, oddsFormat);
    awayBestBet = getBestBet(data, false, oddsFormat);
  }

  return(
    (id !== undefined) ?
      <OddsMobile item={data[index]} isOdds={isOdds} oddsFormat={oddsFormat} homeBestBet={homeBestBet} awayBestBet={awayBestBet} lineHistoryUrl={lineHistoryUrl} isThreeWay={isThreeWay} />
    :
        data.slice(0, 7).map((item, index) => {
          const awaySpread = AwaySpread(item, isOdds);
          const awayOdds = oddsValue(getOddsValue(item, false, isOdds), oddsFormat);
          const homeSpread = HomeSpread(item, isOdds);
          const homeOdds = oddsValue(getOddsValue(item, true, isOdds), oddsFormat);
          const drawOdds = oddsValue(getDrawOddsValue(item, true), oddsFormat);
          return (
            <div key={index} className={styles.numbersContainer} onClick={checkOdds(awayOdds, homeOdds, isBigSix) ? openLineHistory : null}>
              <div className={`${styles.compact} border-left`}>
                <div className={`${styles.oddsNumber} ${styles.compact}`}>
                  <span className={`${styles.pointer} ${styles.margin} ${isOdds && awayBestBet?.spreadOrTotal == awaySpread && awayBestBet.odds == awayOdds ? styles.bestOdd : ''}`}>
                    <span className={styles.adjust}>{awaySpread}</span>
                    <span>{awayOdds}</span>
                  </span>
                </div>
                <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
                  <span className={`${styles.pointer} ${styles.margin} ${isOdds && homeBestBet?.spreadOrTotal == homeSpread && homeBestBet.odds == homeOdds ? styles.bestOdd : ''}`}>
                    <span className={styles.adjust}>{homeSpread}</span>
                    <span>{homeOdds}</span>
                  </span>
                </div>
                {
                  isThreeWay ?
                    <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
                      <span className={`${styles.pointer} ${styles.margin} ${isOdds && homeBestBet?.spreadOrTotal == homeSpread && homeBestBet.odds == homeOdds ? styles.bestOdd : ''}`}>
                        <span>{drawOdds}</span>
                      </span>
                    </div> : <></>
                }
              </div>
            </div>
          )
        })
  );
}

const OddsMobile = ({item, isOdds, oddsFormat, homeBestBet, awayBestBet, lineHistoryUrl, isThreeWay}) => {
  const awaySpread = AwaySpread(item, isOdds);
  const awayOdds = oddsValue(getOddsValue(item, false, isOdds), oddsFormat);

  const homeSpread = HomeSpread(item, isOdds);
  const homeOdds = oddsValue(getOddsValue(item, true, isOdds), oddsFormat);

  const drawOdds = oddsValue(getDrawOddsValue(item, true), oddsFormat);

  const router = useRouter();
  const openLineHistory = () => router.push(lineHistoryUrl);

  return (
    <section className={`${style.containerNumbers}`}>
    <div className={`${isOdds ? style.odds : style.opener} ${isOdds && awayBestBet?.odds == awayOdds && awayBestBet?.spreadOrTotal == awaySpread ? styles.bestOdd : ''}`}
         onClick={checkOdds(awayOdds, homeOdds) ? openLineHistory : null}>
          <span>{awaySpread}</span>&nbsp;
          <span>{awayOdds}</span>
    </div>
    <div className={`${isOdds ? style.odds : style.opener} ${isOdds && homeBestBet?.odds == homeOdds && homeBestBet?.spreadOrTotal == homeSpread ? styles.bestOdd : ''}`}
         onClick={checkOdds(awayOdds, homeOdds) ? openLineHistory : null}>
          <span>{homeSpread}</span>&nbsp;
          <span>{homeOdds}</span>
    </div>
    {
      isThreeWay ?
        <div className={`${isOdds ? style.odds : style.opener} ${isOdds && homeBestBet?.odds == homeOdds && homeBestBet?.spreadOrTotal == homeSpread ? styles.bestOdd : ''}`}
         onClick={checkOdds(awayOdds, homeOdds) ? openLineHistory : null}>
          <span>{drawOdds}</span>
        </div> : <></>
    }
  </section>
  )
}

export default Odds;

// Return '-' if data is not available
function HomeSpread(item, isOdds) {
  if(item === null ){
    return '';
  }
  else if(item.viewType === 'PointspreadDataOpeningAndLatestOddsDataView') {
    return isOdds ? (numberToString(item.currentLine.homeSpread) ?? 'PK') : (numberToString(item.openingLine.homeSpread) ?? 'PK');
  }
  else if(item.viewType === 'TotalDataOpeningAndLatestOddsDataView') {
    return 'U ' + (isOdds) ? item.currentLine.total : item.openingLine.total;
  }
}

// Return '-' if data is not available
function AwaySpread(item, isOdds) {
  if(item === null){
    return '';
  }
  else if(item.viewType === 'PointspreadDataOpeningAndLatestOddsDataView') {
    return isOdds ? (numberToString(item.currentLine.awaySpread) ?? 'PK') : (numberToString(item.openingLine.awaySpread) ?? 'PK');
  }
  else if(item.viewType === 'TotalDataOpeningAndLatestOddsDataView') {
    return 'O '+ (isOdds) ? item.currentLine.total : item.openingLine.total;
  }
}

// Only apply onClick functionality to cells with odds
function checkOdds(away, home, isBigSix) {
  return away !== '-' && home !== '-' && isBigSix ? true : false;
}
