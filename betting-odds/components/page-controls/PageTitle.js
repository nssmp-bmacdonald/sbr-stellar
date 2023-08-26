import { getMarketData, getMenuList } from '/data/market-data';
import { isSoccerLeague } from '/data/parameter-data' 
import getTimeHelpers from '/helpers/get-time-helpers';
import { LEAGUE_HEADER } from '/constants/menu'

function PageTitle({league, pageName, scopes}) {
  return(
    <div className='padding-container'>
      <div className="title-container">
        {(pageName === undefined) ?
          <h1>{LEAGUE_HEADER[league] ?? league} Odds, Lines and Spreads
            <DateTitle league={league} scopes={scopes} />
          </h1>
        :
          <h1 className="title-large">{pageName}
            <DateTitle league={league} scopes={scopes} />
          </h1>
        }
      </div>
    </div>
  );
}

const DateTitle = ({ league, scopes }) => {
  if (!scopes)
    return null;

  const oddsScope = scopes.oddsScope ?
                      getMarketData(league).map( itemLeague =>
                                            (itemLeague.name === scopes.oddsScope[0]) ? itemLeague.pagename : null
                                        ).filter(itemLeague => !!itemLeague)
                      : null;

  var oddsTitle = scopes.oddsType !== undefined ? getMenuList().find(({ url }) => url === scopes.oddsType).title : null;

  if (oddsTitle === null){
    //Default for MLB, NHL and Soccer is money line, must be supplied since it won't be present in the URL
    if (league.toLowerCase() === 'mlb' || league.toLowerCase() === 'nhl' || isSoccerLeague(league)) {
      oddsTitle = 'Money Line';
    }
    else {
      oddsTitle = 'Point Spread';
    }
  }
  //Append the scope to the title if available (1st Half, 1Q, etc)
  oddsScope !== null ? oddsTitle = oddsScope + ' ' + oddsTitle : null;
                    
  return (
    <>
      {(scopes.date !== undefined) ? ` for ${getTimeHelpers.getDate(scopes.date, 'titleOption')}` : null }      
      {(oddsTitle !== null ? <span>{oddsTitle}</span> : null)}
    </>
  )
}

export default PageTitle;


