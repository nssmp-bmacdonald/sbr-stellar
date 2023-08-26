import { numberToString } from '/helpers/string-helpers';

export function getBestBet(data, isHome, oddsFormat) {
  const isTotal = data.some(item => !!item && item.viewType === 'TotalDataOpeningAndLatestOddsDataView');
  const spreads = data
                  .filter(item => !!item && (item.viewType === 'PointspreadDataOpeningAndLatestOddsDataView' || item.viewType === 'TotalDataOpeningAndLatestOddsDataView'))
                  .map((item, index) => {
                    if (item.viewType === 'TotalDataOpeningAndLatestOddsDataView')
                      return item.currentLine.total;

                    return isHome ? item.currentLine.homeSpread : item.currentLine.awaySpread;
                  });
  const maxSpread = spreads.length > 0 ? (!isHome && isTotal ? Math.min(...spreads) : Math.max(...spreads) ) : null;

  const odds = data.filter(item => !!item)
      .map((item, index) => {
        const value = getOddsValue(item, isHome, true);
        return {
          odds: Number(oddsValue(value, oddsFormat)),
          sportsbook: item.sportsbook
        }
      })
      .filter(item => !!item);

  var maxOdds = odds.length > 0 ? odds.reduce((a, b) => a.odds > b.odds ? a : b) : null;

  if (!maxOdds)
    return null;

  if(oddsFormat === 'American')
    maxOdds.odds = numberToString(maxOdds.odds)

  if (maxSpread) {
    let strSpread = String(maxSpread);
    if(!isTotal)
      strSpread = numberToString(strSpread);

    maxOdds.spreadOrTotal = strSpread
  }

  return maxOdds;
}

export function getOddsValue(item, isHome, isOdds){
  return getOdds(item, isHome, isOdds);
}

export function getDrawOddsValue(item, isOdds){
  if(!item){
    return null;
  }

  if(item.viewType === 'ThreeWayDataOpeningAndLatestOddsDataView'){
    return (isOdds) ? item.currentLine.drawOdds : item.openingLine.drawOdds;
  } else {
    return null;
  }
}

export function oddsValue(value, oddsFormat) {
  if (!!value)
    if(value < 0) {
      // Convert negative American odds to decimal
      if(oddsFormat === 'Decimal'){
        value = 1 - (100 / value)
        value = value.toFixed(2);
        return !!value ? value : '';
      }
    }
    else if (value >= 0) {
      // Convert positive American odds to decimal
      if(oddsFormat === 'Decimal'){
        value = (value / 100) + 1;
        value = value.toFixed(2);
        return !!value ? value : '';
      }
    }
  return !!value ? numberToString(value) : '-';
}

function getOdds(item, isHome, isOdds) {
  if(!item){
    return null;
  }
  if(isHome === true){
    if(item.viewType === 'PointspreadDataOpeningAndLatestOddsDataView' || item.viewType === 'MoneyLineDataOpeningAndLatestOddsDataView' || item.viewType === 'ThreeWayDataOpeningAndLatestOddsDataView'){
      return (isOdds) ? item.currentLine.homeOdds :  item.openingLine.homeOdds;
    }
    if(item.viewType === 'TotalDataOpeningAndLatestOddsDataView'){
      return (isOdds) ? item.currentLine.underOdds : item.openingLine.underOdds;
    }
  }
  else{
    if(item.viewType === 'PointspreadDataOpeningAndLatestOddsDataView' || item.viewType === 'MoneyLineDataOpeningAndLatestOddsDataView' || item.viewType === 'ThreeWayDataOpeningAndLatestOddsDataView'){
      return (isOdds) ? item.currentLine.awayOdds : item.openingLine.awayOdds;
    }
    if(item.viewType === 'TotalDataOpeningAndLatestOddsDataView'){
      return (isOdds) ? item.currentLine.overOdds : item.openingLine.overOdds;
    }
  }
}
