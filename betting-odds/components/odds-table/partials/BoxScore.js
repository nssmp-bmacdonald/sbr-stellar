import style from '/styles/vendors/BoxScore.module.scss';
import { isSoccerLeague } from '/data/parameter-data';

const BoxScore = ({ boxScore, scoreDataList, gameView, isMobile }) => {
  let dataList = []
  if(isSoccerLeague(gameView.leagueName)){
    //Soccer is always given an empty third period which must be removed
    dataList = scoreDataList?.filter(score => score.Period !== 3 && score.PeriodType !== 'Overtime')
  } else {
    dataList = scoreDataList
  }

    return (
        <>
        {
            dataList && dataList.length > 0 ?
            <>
              <div className={`${style.scoreboardContainer} ${!boxScore ? 'hide' : ''}`}>
                <div className={style.scoreboard}>
                  {
                    groupBy( dataList, i => i.Period)?.map((period, index) =>
                      <div key={`score-${index}`} className={style.scoreboardColumn}>
                        {
                            isMobile ?
                                <header className="bckg-gray">{period[0].PeriodType === 'Overtime' ? 'OT': index}</header>
                                :
                                null
                        }
                        {
                            period.length > 1 ?
                              period.map((score, scoreIndex) =>
                                <div key={scoreIndex}>{score.Points}</div>
                              )
                            :
                            // for some reason only seeing 1 datapoint instead of 2 per period, assuming the missing data is 0
                              !period[0].isHomeTeam ?
                                <><div>{period[0].Points}</div><div>0</div></>
                                :
                                <><div>0</div><div>{period[0].Points}</div></>
                        }
                      </div>
                    )
                  }
                  <div className={`${style.scoreboardColumn} ${style.finalScore}`}>
                    {
                        isMobile ?
                        <header className="bckg-gray">T</header>
                            :
                            null
                    }
                    <div>{gameView.awayTeamScore}</div>
                    <div>{gameView.homeTeamScore}</div>
                  </div>
                </div>
              </div>
            </>
            :
            null
        }
        </>
    )
}

export default BoxScore;

var groupBy = function (list, getKey) {
  return list?.reduce(function (previous, currentItem) {
      var group = getKey(currentItem);
      if (!previous[group])
          previous[group] = [];
      previous[group].push(currentItem);
      return previous;
  }, []);
};