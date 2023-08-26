import styles from '/styles/odds-table/GameRows.module.scss';

import { useRouter } from 'next/router'

function WagerCell({gameView, mobile, isThreeWay}){
  // Get the odds type selected so we know which consensus value to show
  const router = useRouter();
  var selectedOddsType = router.query.oddsType;
  var selectedLeague = gameView.leagueName;

  if(selectedOddsType === undefined) {
    if(selectedLeague === 'NHL' || selectedLeague === 'MLB') {
      selectedOddsType = 'money-line';
    }
    else {
      selectedOddsType = 'pointspread';
    }
  }

  return(
    <div key={gameView != null ? gameView.gameId : null} className={`${styles.consensusColumn} ${styles.consensus} ${styles.numbersContainer}`} data-vertical-sbid="-2">
      <div className={`${styles.compact}${mobile ? '' : ' border-right'} `}>
        <div className={`${styles.oddsNumber} ${styles.compact}`}>
          <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
            <span className="opener">{WagerAwayCell(gameView, selectedOddsType)}</span>
          </span>
        </div>
        <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
          <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
            <span className="opener">{WagerHomeCell(gameView, selectedOddsType)}</span>
          </span>
        </div>
        {
          isThreeWay ?
            <div className={`${styles.oddsNumber} ${styles.compact} ${styles.nonBorderBottom}`}>
              <span data-cy="odd-grid-opener-homepage" className={styles.margin}>
                <span className="opener">{WagerDrawCell(gameView, selectedOddsType)}</span>
              </span>
          </div> : <></>
        }
      </div>
    </div>
  )
}

export default WagerCell;

function WagerHomeCell(gameView, selectedOddsType){
  if(gameView.consensus != undefined){
    if(selectedOddsType === 'money-line' && gameView.consensus.homeMoneyLinePickPercent != 0 && gameView.consensus.homeMoneyLinePickPercent != undefined){
      return Math.round(gameView.consensus.homeMoneyLinePickPercent) + '%';
    }
    if(selectedOddsType === 'pointspread' && gameView.consensus.homeSpreadPickPercent != 0 && gameView.consensus.homeSpreadPickPercent != undefined){
      return Math.round(gameView.consensus.homeSpreadPickPercent) + '%';
    }
    if(selectedOddsType === 'totals' && gameView.consensus.underPickPercent != 0 && gameView.consensus.underPickPercent != undefined){
      return Math.round(gameView.consensus.underPickPercent) + '%';
    }
  }
  return '-'
}

function WagerAwayCell(gameView, selectedOddsType){
  if(gameView.consensus != undefined){
    if(selectedOddsType === 'money-line' && gameView.consensus.awayMoneyLinePickPercent != 0 && gameView.consensus.awayMoneyLinePickPercent != undefined){
      return Math.round(gameView.consensus.awayMoneyLinePickPercent) + '%';
    }
    if(selectedOddsType === 'pointspread' && gameView.consensus.awaySpreadPickPercent != 0 && gameView.consensus.awaySpreadPickPercent != undefined){
      return Math.round(gameView.consensus.awaySpreadPickPercent) + '%';
    }
    if(selectedOddsType === 'totals' && gameView.consensus.overPickPercent != 0 && gameView.consensus.overPickPercent != undefined){
      return Math.round(gameView.consensus.overPickPercent) + '%';
    }
  }
  return '-'
}

function WagerDrawCell(gameView, selectedOddsType){
  /*
    Currently no concensus data for soccer
    Wager cell is always blank
  */
  if(gameView.gameView != undefined){
    if(gameView.Consensus != undefined){
      if(selectedOddsType === 'money-line' && gameView.consensus.awayMoneyLinePickPercent != 0 && gameView.consensus.awayMoneyLinePickPercent != undefined){
        return Math.round(gameView.consensus.awayMoneyLinePickPercent) + '%';
      }
    }
  }
  return '-'
}
