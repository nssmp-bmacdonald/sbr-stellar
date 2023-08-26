export function mapBasketballMatchupView(matchupView) {
  let view = {
    viewdata: {
      Stats: {
        HomeTeamForStats: {},
        HomeTeamAgainstStats: {},
        AwayTeamForStats: {},
        AwayTeamAgainstStats: {},
      },
    }
  }
  var viewStatsData = matchupView.viewdata.Stats;
  var awayTeamId = viewStatsData.Game.AwayTeam.TeamId;
  var homeTeamId = viewStatsData.Game.HomeTeam.TeamId;
  
  viewStatsData.Stats.forEach(element => {
    if(element != null || element != undefined) {
      if (element.TeamId === awayTeamId && element.SplitType == "Overall") {
        view.viewdata.Stats.AwayTeamForStats = mapForStats(view.viewdata.Stats.AwayTeamForStats, element);
  
      }
      else if (element.TeamId === homeTeamId && element.SplitType === "Overall") {
        view.viewdata.Stats.HomeTeamForStats = mapForStats(view.viewdata.Stats.HomeTeamForStats, element);
      }
      else if (element.TeamId === awayTeamId && element.SplitType === "OverallAgainst") {
        view.viewdata.Stats.AwayTeamAgainstStats = mapAgainstStats(view.viewdata.Stats.AwayTeamAgainstStats, element);
  
      }
      else if (element.TeamId === homeTeamId && element.SplitType === "OverallAgainst") {
        view.viewdata.Stats.HomeTeamAgainstStats = mapAgainstStats(view.viewdata.Stats.HomeTeamAgainstStats, element);
      }
    }
    
  });

  return view;
}

/**
 * Returns the team FOR stats model with the view stats mapped to it.
 *
 * @param {any} teamStats The model to map the stats to.
 * @param {any} viewElement The stats from the database view.
 */
function mapForStats(teamStats, viewElement) {
  teamStats.Points = viewElement.Points;
  teamStats.OverUnderOvers = viewElement.OverUnderOvers;
  teamStats.OverUnderUnders = viewElement.OverUnderUnders;
  teamStats.OverUnderPushes = viewElement.OverUnderPushes;
  teamStats.AvgFieldGoalsMade = viewElement.AvgFieldGoalsMade;
  teamStats.AvgFreeThrowsMade = viewElement.AvgFreeThrowsMade;
  teamStats.AvgThreePointFieldGoalsMade = viewElement.AvgThreePointFieldGoalsMade;
  teamStats.AvgPoints = viewElement.AvgPoints;
  teamStats.AvgPointsHalf1 = viewElement.AvgPointsHalf2;
  teamStats.ReboundsOffensive = viewElement.ReboundsOffensive;
  teamStats.PointsHalf1Against = viewElement.PointsHalf1Against;
  teamStats.ThreePointFieldGoalsMade = viewElement.ThreePointFieldGoalsMade;
  teamStats.ThreePointFieldGoalsAttempted = viewElement.ThreePointFieldGoalsAttempted;
  teamStats.FieldGoalsMade = viewElement.FieldGoalsMade;
  teamStats.FieldGoalsAttempted = viewElement.FieldGoalsAttempted;
  teamStats.FreeThrowsMade = viewElement.FreeThrowsMade;
  teamStats.FreeThrowsAttempted = viewElement.FreeThrowsAttempted;
  teamStats.GamesPlayed = viewElement.GamesPlayed;

  return teamStats;
}

/**
 * Returns the team AGAINST stats model with the view stats mapped to it.
 *
 * @param {any} teamStats The model to map the stats to.
 * @param {any} viewElement The stats from the database view.
 */
function mapAgainstStats(teamStats, viewElement) {
  teamStats.FieldGoalsMade = viewElement.FieldGoalsMade;
  teamStats.FieldGoalsAttempted = viewElement.FieldGoalsAttempted;
  teamStats.FreeThrowsMade = viewElement.FreeThrowsMade;
  teamStats.FreeThrowsAttempted = viewElement.FreeThrowsAttempted;
  teamStats.ThreePointFieldGoalsMade = viewElement.ThreePointFieldGoalsMade;
  teamStats.ThreePointFieldGoalsAttempted = viewElement.ThreePointFieldGoalsAttempted;
  teamStats.Points = viewElement.Points;
  teamStats.ReboundsOffensive = viewElement.ReboundsOffensive;

  return teamStats;
}