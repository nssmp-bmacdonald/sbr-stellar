import { isSoccerLeague } from "./parameter-data";

const marketData = {
    "mlb-baseball" : [
        { "name" : "1st-half", "title": "1st 5", "pagename": "1st Half" },
    ],
    "nhl-hockey": [
        { "name" : "1st-quarter", "title": "1st Period", "pagename": "1st Period" },
        { "name" : "2nd-quarter", "title": "2nd Period", "pagename": "2nd Period" },
        { "name" : "3rd-quarter", "title": "3rd Period", "pagename": "3rd Period" },
    ],
    "soccer": [
        { "name" : "1st-half", "title": "1st Half", "pagename": "1st Half" },
        { "name" : "2nd-half", "title": "2nd Half", "pagename": "2nd Half" },
    ],
    "default": [
        { "name" : "1st-half", "title": "1st Half", "pagename": "1st Half" },
        { "name" : "2nd-half", "title": "2nd Half", "pagename": "2nd Half" },
        { "name" : "1st-quarter", "title": "1Q", "pagename": "1st Quarter" },
        { "name" : "2nd-quarter", "title": "2Q", "pagename": "2nd Quarter" },
        { "name" : "3rd-quarter", "title": "3Q", "pagename": "3rd Quarter" },
        { "name" : "4th-quarter", "title": "4Q", "pagename": "4th Quarter" },
    ],
}

export default marketData;

const urlName = {
  "default": [
    { 'url': 'pointspread', 'title': 'Point Spread'},
    { 'url': 'money-line', 'title': 'Money Line'},
    { 'url': 'totals', 'title': 'Totals'}
  ]
}

export function getMarketData(leagueName) {
  let data;
  if(isSoccerLeague(leagueName)){
    data = marketData['soccer'] ?? marketData['default'];
  } else {
    data = marketData[leagueName] ?? marketData['default'];
  }
  if (leagueName.length === 3 ) {
      if (leagueName === "NHL") {
        data = marketData['nhl-hockey'];
      }else if (leagueName === "MLB") {
        data = marketData['mlb-baseball'];
      }
  }

  return [
    { "name" : "full-game",  "title": "Full Game", "pagename": ""},
    ...data
  ]
};

export function getMenuList(scope) {
  return urlName[scope] ?? urlName['default'];
};
