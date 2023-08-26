import OpenerCells from '/components/odds-table/partials/OpenerCells';
import WagerCell from '/components/odds-table/partials/WagerCell';

function WagersAndOpeners({openingLineViews, gameView, mobile, oddsFormat, isThreeWay}){
  return(
    <>
      <WagerCell gameView={gameView} mobile={mobile} isThreeWay={isThreeWay}/>
      { !mobile ?
        <OpenerCells openingLineViews={openingLineViews} oddsFormat={oddsFormat} isThreeWay={isThreeWay}/>
        : null }
    </>
  )
}

export default WagersAndOpeners;
