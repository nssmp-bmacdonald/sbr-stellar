import styles from '/styles/odds-table/GameRows.module.scss';

import { numberToString } from '/helpers/string-helpers';
import { getOddsValue } from '/helpers/odds-helpers';
import { getDrawOddsValue } from '/helpers/odds-helpers';
import { oddsValue } from '/helpers/odds-helpers';

function OpenerCell({openingLineViews, oddsFormat ,isThreeWay}){
  return(
    openingLineViews.map((oddsView, index) =>
    <div key={index} className={`${styles.consensusColumn} ${styles.opener} ${styles.numbersContainer}`} data-vertical-sbid="-1">
      <div className={styles.compact}>
        <div className={`${styles.oddsNumber} ${styles.compact} ${styles.offline}`}>
          <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
            <span className={`${styles.adjust} ${styles.opener}`}>{AwaySpread(oddsView)}</span>
            <span className={`${styles.opener}`}>{oddsValue(getOddsValue(oddsView, false), oddsFormat)}</span>
          </span>
        </div>
        <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
          <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
            <span className={`${styles.adjust} ${styles.opener}`}>{HomeSpread(oddsView)}</span>
            <span className={`${styles.opener}`}>{oddsValue(getOddsValue(oddsView, true), oddsFormat)}</span>
          </span>
        </div>
        {
          isThreeWay ?
            <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
              <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
                <span className={`${styles.opener}`}>{oddsValue(getDrawOddsValue(oddsView, false), oddsFormat)}</span>
              </span>
            </div> : <></>
        }
      </div>
    </div>
    )
  )
}

export default OpenerCell;

// Return '-' if data is not available
function HomeSpread(oddsView){
  if(oddsView === null ){
    return '';
  }
  else if(oddsView.viewType === 'PointspreadDataOpeningAndLatestOddsDataView'){
    return numberToString(oddsView.openingLine.homeSpread) ?? 'PK';
  }
  else if(oddsView.viewType === 'TotalDataOpeningAndLatestOddsDataView'){
    return 'U ' + oddsView.openingLine.total;
  }
}

// Return '-' if data is not available
function AwaySpread(oddsView){
  if(oddsView === null){
    return '';
  }
  else if(oddsView.viewType === 'PointspreadDataOpeningAndLatestOddsDataView'){
    return numberToString(oddsView.openingLine.awaySpread) ?? 'PK';
  }
  else if(oddsView.viewType === 'TotalDataOpeningAndLatestOddsDataView'){
    return 'O '+ oddsView.openingLine.total;
  }
}
