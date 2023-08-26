import { getLeaguePath } from '/data/parameter-data';

import { mapBaseballMatchupView } from './baseball/matchup-builder';
import { mapBasketballMatchupView } from './basketball/matchup-builder';
import { mapFootballMatchupView } from './football/matchup-builder';
import { mapHockeyMatchupView } from './hockey/matchup-builder';
import { formatDateParameter } from '../date-helpers';

export function buildOddsTable(oddsViews, gameViews, sportsbooks, liveScoreViews){
  if (!gameViews)
    return;
    
  return {gameRows:getGameRows(oddsViews, gameViews, sportsbooks, liveScoreViews), sportsbooks:sportsbooks};
}

export function buildLineHistory(oddsViews, gameView, sportsbooks){
  return {lineHistory:getLineHistory(oddsViews, gameView, sportsbooks), sportsbooks:sportsbooks}
}

export function buildMatchup(spreadOddsViews, totalOddsViews, moneylineOddsViews, gameView, matchupView, weather, sportsbooks){
  return {matchup: getMatchup(spreadOddsViews, totalOddsViews, moneylineOddsViews, gameView, matchupView, weather, sportsbooks)}
}

function getMatchup(spreadOddsViews, totalOddsViews, moneylineOddsViews, gameView, matchupView, weather, sportsbooks){
  return{
    gameView: gameView,
    oddsViews: {
      moneylineOddsViews: getOddsRow(gameView.gameId, moneylineOddsViews, sportsbooks),
      spreadOddsViews: getOddsRow(gameView.gameId, spreadOddsViews, sportsbooks),
      totalOddsViews: getOddsRow(gameView.gameId, totalOddsViews, sportsbooks)
    },
    matchupView: mapMatchupView(matchupView, gameView.homeStarter, gameView.awayStarter), // pass in starting goalies for hockey
    weather: weather,
    sportsbooks: sportsbooks
  }
}

export function buildFutureRows(oddsEvents, oddsViews, sportsbooks){
  return oddsEvents.map(
    event => {
      return {
        eventid: parseInt(event.oddseventid),
        eventname: event.oddseventname,
        teams: getTeams(oddsViews, event.oddseventid).map(
          team => {
            return {
              team: team,
              openingLineViews: getFutureOpeningLine(team.TeamId, event.oddseventid, oddsViews, sportsbooks),
              oddsViews: getFutureOddsRow(team.TeamId, event.oddseventid, oddsViews, sportsbooks),
            }
          }
        )
      }
    }
  )
  .filter(event => event.teams.length > 0);
}

// Unpack the gameViews... call mapRow to find the proper gameView for the game and sportsbook
function getLineHistory(oddsViews, gameView, sportsbooks){
    return {
      gameView: gameView,
      oddsViews: getOddsRow(gameView.gameId, oddsViews, sportsbooks),
    }
}

// Unpack the gameViews... call mapRow to find the proper gameView for the game and sportsbook
function getGameRows(oddsViews, gameViews, sportsbooks, liveScoreViews){
  gameViews = gameViews.map(
    gameView => {
      return {
        gameView: gameView,
        oddsViews: getOddsRow(gameView.gameId, oddsViews, sportsbooks),
        openingLineViews: getOpeningLine(gameView.gameId, oddsViews, sportsbooks),
        liveScoreViews: mapLiveScoreRow(gameView.gameId, liveScoreViews)
      }
    }
  );

  return gameViews.sort((a,b) => new Date(a.gameView.startDate).getTime() - new Date(b.gameView.startDate).getTime());
}

// Find the row where the gameid matches for the particular sportsbook
function getOddsRow(gameId, oddsViews, sportsbooks){
  return sportsbooks.map(sportsbook => {
    return oddsViews.find(oddsView => oddsView.gameId === gameId && (oddsView.sportsbook?.toLowerCase() === sportsbook.machineName || oddsView.sportsbookId === +sportsbook.sportsbookId)) || null;
  })
}

function mapOddsRow(oddView, addCurrentLine){
  let view = {
    sportsbook: oddView.sportsbook,
    viewdata: {
      OpeningLine: {},
      CurrentLine: {},
    },
    viewtype: oddView.viewtype ?? null
  }

  // check the nullable values, map if they only exist
  if (!!oddView.viewdata.OpeningLine) {
    if (!!oddView.viewdata.OpeningLine.Odds)
      view.viewdata.OpeningLine.Odds = oddView.viewdata.OpeningLine.Odds;
    if (!!oddView.viewdata.OpeningLine.HomeOdds)
      view.viewdata.OpeningLine.HomeOdds = oddView.viewdata.OpeningLine.HomeOdds;
    if (!!oddView.viewdata.OpeningLine.AwayOdds)
      view.viewdata.OpeningLine.AwayOdds = oddView.viewdata.OpeningLine.AwayOdds;
    if (!!oddView.viewdata.OpeningLine.OverOdds)
      view.viewdata.OpeningLine.OverOdds = oddView.viewdata.OpeningLine.OverOdds;
    if (!!oddView.viewdata.OpeningLine.UnderOdds)
      view.viewdata.OpeningLine.UnderOdds = oddView.viewdata.OpeningLine.UnderOdds;
    if (!!oddView.viewdata.OpeningLine.Spread) {
      view.viewdata.OpeningLine.HomeSpread = oddView.viewdata.OpeningLine.Spread;
      view.viewdata.OpeningLine.AwaySpread = -oddView.viewdata.OpeningLine.Spread;
    }
    if (!!oddView.viewdata.OpeningLine.Total)
      view.viewdata.OpeningLine.Total = oddView.viewdata.OpeningLine.Total;
    if (!!oddView.viewdata.OpeningLine.DrawOdds)
      view.viewdata.OpeningLine.DrawOdds = oddView.viewdata.OpeningLine.DrawOdds;

  }
  if (addCurrentLine && !!oddView.viewdata.CurrentLine) {
    if (!!oddView.viewdata.CurrentLine.Odds)
      view.viewdata.CurrentLine.Odds = oddView.viewdata.CurrentLine.Odds;
    if (!!oddView.viewdata.CurrentLine.HomeOdds)
      view.viewdata.CurrentLine.HomeOdds = oddView.viewdata.CurrentLine.HomeOdds;
    if (!!oddView.viewdata.CurrentLine.AwayOdds)
      view.viewdata.CurrentLine.AwayOdds = oddView.viewdata.CurrentLine.AwayOdds;
    if (!!oddView.viewdata.CurrentLine.OverOdds)
      view.viewdata.CurrentLine.OverOdds = oddView.viewdata.CurrentLine.OverOdds;
    if (!!oddView.viewdata.CurrentLine.UnderOdds)
      view.viewdata.CurrentLine.UnderOdds = oddView.viewdata.CurrentLine.UnderOdds;
    if (!!oddView.viewdata.CurrentLine.Spread) {
      view.viewdata.CurrentLine.HomeSpread = oddView.viewdata.CurrentLine.Spread;
      view.viewdata.CurrentLine.AwaySpread = -oddView.viewdata.CurrentLine.Spread;
    }
    if (!!oddView.viewdata.CurrentLine.Total)
      view.viewdata.CurrentLine.Total = oddView.viewdata.CurrentLine.Total;
    if (!!oddView.viewdata.CurrentLine.DrawOdds)
      view.viewdata.CurrentLine.DrawOdds = oddView.viewdata.CurrentLine.DrawOdds;
  }

  if (!!oddView.viewdata.MoneylineHistory)
    view.viewdata.MoneylineHistory = oddView.viewdata.MoneylineHistory;
  if (!!oddView.viewdata.SpreadHistory)
    view.viewdata.SpreadHistory = oddView.viewdata.SpreadHistory.map(spread => {
      spread.HomeSpread = spread.Spread;
      spread.AwaySpread = -spread.Spread;
      return spread;
    });
  if (!!oddView.viewdata.TotalHistory)
    view.viewdata.TotalHistory = oddView.viewdata.TotalHistory;
  return view;
}

// Find the row where the gameid matches for the particular sportsbook
function mapLiveScoreRow(gameId, liveScoreViews){
  let liveScoreView = liveScoreViews?.find(liveScoreView => liveScoreView.viewdata.GameId === gameId) ?? {};

  if (!!liveScoreView) {
    const periods = liveScoreView.viewdata?.GameTeamScoreDataList?.filter(list => list.PeriodType.toLowerCase() !== 'overtime')
                                                                  .map(list => list.PeriodNumber)
                                                                  .flat();
    const maxPeriod = !!periods ? Math.max(...periods) : 0;
    return {
      viewdata: {
        GameTeamScoreDataList: liveScoreView.viewdata?.GameTeamScoreDataList?.map(scoreList => {
          return {
            isHomeTeam: scoreList.TeamId == liveScoreView.viewdata.GameBriefData.HomeTeam.TeamId,
            Period: scoreList.PeriodType.toLowerCase() === 'overtime' && scoreList.PeriodNumber <= maxPeriod ? scoreList.PeriodNumber + maxPeriod : scoreList.PeriodNumber,
            PeriodNumber: scoreList.PeriodNumber,
            PeriodType: scoreList.PeriodType,
            Points: scoreList.Points,
            TeamId: scoreList.TeamId
          }
        })
        .sort((a,b) => (a.Period - b.Period || a.isHomeTeam - b.isHomeTeam)) // sorting by Period, and then Team
        || null
      }
    }
  }

  return liveScoreView;
}

function mapMatchupView(matchupView, homeGoalie, awayGoalie){
  switch (matchupView.viewtype)
    {
        case 'FootballMatchupStatsAnalysisTeamSpecificDataView': return mapFootballMatchupView(matchupView);
        case 'BasketballMatchupStatsAnalysisTeamSpecificDataView': return mapBasketballMatchupView(matchupView);
        case 'HockeyMatchupStatsAnalysisOverallDataView': return mapHockeyMatchupView(matchupView, homeGoalie, awayGoalie);
        case 'BaseballMatchupStatsAnalysisOverallDataView': return mapBaseballMatchupView(matchupView);

        default: return null;
    }
}

// Find the opening line from first sportsbook that has data
function getOpeningLine(gameId, oddsViews, sportsbooks){
  var openingLine = getOddsRow(gameId, oddsViews, sportsbooks)
                      .filter(item => !!item);

  if(openingLine.length === 0)
    return [null];

  return [openingLine[0]];
}

// OddsStatus values:
// Undefined = 0,
// Off = 1,
// Active = 2,
// Closed = 3
function getTeams(oddsViews, eventId){
  return oddsViews.filter(oddView => oddView.viewdata.OddsEvent.OddsEventId === parseInt(eventId) && oddView.viewdata.CurrentLine.OddsStatus == 2)
                        .map(oddView => oddView.viewdata.CurrentLine.Team)
                        .filter((value, index, self) => index === self.findIndex(t => t.TeamId === value.TeamId))
                        //.sort((a,b) => a.Name > b.Name ? 1 : -1);
}

function getFutureOddsRow(teamId, eventId, oddsViews, sportsbooks){
  return sportsbooks.map(sportsbook => {
    const oddView = oddsViews.find(oddsView => oddsView.viewdata.CurrentLine.Team.TeamId === teamId
                                                && oddsView.viewdata.OddsEvent.OddsEventId === parseInt(eventId)
                                                && oddsView.viewdata.CurrentLine.OddsStatus == 2
                                                && oddsView.sportsbook === sportsbook.machineName) || null;
    if(!!oddView && !!oddView.sportsbook)
      return mapOddsRow(oddView, true);
    return oddView;
  });
}

// Find the opening line from the first sportsbook that has data
function getFutureOpeningLine(teamId, eventId, oddsViews, sportsbooks) {
  var openingLine = getFutureOddsRow(teamId, eventId, oddsViews, sportsbooks)
                      .filter(item => !!item);

  if(openingLine.length === 0)
    return [null];

  return [openingLine[0]];
}

// Ranks are only displayed for the college leagues
export function getRank(rank,league){
  if(['NCAAF','NCAAB'].indexOf(league) > -1 && rank>=1 && rank<=25)
    return `(${rank}) `;
  else
    return undefined;
}

// Returns an array of game IDs in the next week for the supplied league
export function getWeeklyLeagueArray(league, startDate) {
  // Weeks worth of games (will result in 7)
  var endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 6));
  var leagueArr = []
  let loop = new Date(startDate)

  while (loop <= endDate) {
    leagueArr.push({['league']: league, ['date']: formatDateParameter(loop)})
    let newDate = loop.setDate(loop.getDate() + 1)
    loop = new Date(newDate);
  }
  return leagueArr;
}