// This file maps the naming of the parameter to the viewtype name or oddsscope
const oddsViewData = [
    { "parameter" : "money-line", "viewtype": "MoneyLineDataOpeningAndLatestOddsDataView" },
    { "parameter" : "pointspread", "viewtype": "PointspreadDataOpeningAndLatestOddsDataView" },
    { "parameter" : "totals", "viewtype": "TotalDataOpeningAndLatestOddsDataView" }
]

const oddsScopeData = [
    { "parameter" : "full-game", "oddsscope": "Competition" },
    { "parameter" : "1st-quarter", "oddsscope": "FirstPeriod" },
    { "parameter" : "2nd-quarter", "oddsscope": "SecondPeriod" },
    { "parameter" : "3rd-quarter", "oddsscope": "ThirdPeriod" },
    { "parameter" : "4th-quarter", "oddsscope": "FourthPeriod" },
    { "parameter" : "1st-half", "oddsscope": "FirstHalf" },
    { "parameter" : "2nd-half", "oddsscope": "SecondHalf" }
]

const leagueData = [
  { "parameter" : "nfl-football", "leaguename": "NFL", "matchupviewtype": "FootballMatchupStatsAnalysisTeamSpecificDataView" },
  { "parameter" : "college-football", "leaguename": "NCAAF", "matchupviewtype": "FootballMatchupStatsAnalysisTeamSpecificDataView" },
  { "parameter" : "nba-basketball", "leaguename": "NBA", "matchupviewtype": "BasketballMatchupStatsAnalysisTeamSpecificDataView" },
  { "parameter" : "nhl-hockey", "leaguename": "NHL", "matchupviewtype": "HockeyMatchupStatsAnalysisOverallDataView" },
  { "parameter" : "ncaa-basketball", "leaguename": "NCAAB", "matchupviewtype": "BasketballMatchupStatsAnalysisTeamSpecificDataView" },
  { "parameter" : "mlb-baseball", "leaguename": "MLB", "matchupviewtype": "BaseballMatchupStatsAnalysisOverallDataView"  },
]

export const soccerLeagueData = [
  { "parameter" : "major-league-soccer", "leaguename": "MLS", "matchupviewtype": "" },
  { "parameter" : "bundesliga", "leaguename": "BUNDESLIGA", "matchupviewtype": "" },
  { "parameter" : "champions-league", "leaguename": "CHAMPIONS-LEAGUE", "matchupviewtype": "" },
  { "parameter" : "europa-league", "leaguename": "EUROPA-LEAGUE", "matchupviewtype": "" },
  { "parameter" : "serie-a", "leaguename": "SERIE-A", "matchupviewtype": "" },
  { "parameter" : "la-liga", "leaguename": "LA-LIGA", "matchupviewtype": "" },
  { "parameter" : "ligue1", "leaguename": "LIGUE-1", "matchupviewtype": "" },
  { "parameter" : "english-premier-league", "leaguename": "PREMIER-LEAGUE", "matchupviewtype": "" },
]

export const allLeagueData = [
  ...leagueData,
  ...soccerLeagueData,
  { "parameter" : "wnba-basketball", "leaguename": "WNBA", "matchupviewtype": "" },
  { "parameter" : "cfl-football", "leaguename": "CFL", "matchupviewtype": "" },
]

export default leagueData;

export function getOddsViewData(parameterName){
  const oddsViewObject = oddsViewData.find(oddsView => oddsView.parameter === parameterName);
  if(oddsViewObject === undefined){
    return null;
  }
  return oddsViewObject;
}

export function getOddsScopeData(parameterName){
  // If something is supplied we need to make sure its a valid param
  if(parameterName != undefined){
    // As this param is an optional catch all in some scenarios it can be returned as an array
    if(typeof(parameterName) === 'object'){
      parameterName = parameterName[0];
    }
    const oddsScopeObject = oddsScopeData.find(oddsScope => oddsScope.parameter === parameterName);
    if(oddsScopeObject === undefined){
      return null
    }
    return oddsScopeObject;
  }
  // If simply a param is not supplied then we default to 'fullgame/competition'
  return { "parameter" : "full-game", "oddsscope": "Competition" };
}

export function getLeagueData(parameterName){
  const leagueObject = allLeagueData.find(league => league.parameter === parameterName);
  if(leagueObject === undefined){
    return null;
  }
  return leagueObject;
}

export function getLeaguePath(leagueName){
  const leagueObject = leagueData.find(league => league.leaguename === leagueName);
  if(leagueObject === undefined){
    return null;
  }
  return leagueObject.parameter;
}

export function isSoccerLeague(leagueName){
  const isSoccerParameter = soccerLeagueData.filter(league => league.parameter === leagueName).length !== 0
  const isSoccerName = soccerLeagueData.filter(league => league.leaguename === leagueName).length !== 0

  //Check if parameter is either soccer league OR parameter
  return isSoccerParameter || isSoccerName
}