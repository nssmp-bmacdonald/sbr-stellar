import styles from '/styles/odds-table/GameRows.module.scss';

import { oddsValue } from '/helpers/odds-helpers';

function FutureOpenerCells({openingLineViews, oddsFormat}){
  return(
    openingLineViews.map((oddsView, index) =>
      <div key={index} className={`${styles.consensusColumn} ${styles.opener} ${styles.numbersContainer}`} data-vertical-sbid="-1">
        <div className={styles.compact}>
          <div className={`${styles.oddsNumber}  ${styles.oddsNumberFuture} ${styles.compact} ${styles.offline}`}>
            <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
              <span className={`${styles.opener}`}>{oddsValue(oddsView?.viewdata.OpeningLine.Odds, oddsFormat)}</span>
            </span>
          </div>
        </div>
      </div>
    )
  )
}

export default FutureOpenerCells;
