export function mapBaseballMatchupView(matchupView) {
  let view = {
    viewdata: {
      Stats: {
        Stats: {
          HomeStats: {},
          AwayStats: {},
        },
        SplitStats: {
          HomeStartingPitcher: {},
          AwayStartingPitcher: {},
        }
      },
    }
  }

  var viewStatsData = matchupView.viewdata.Stats;
  var awayTeamId = viewStatsData.Game.AwayTeam.TeamId;
  var homeTeamId = viewStatsData.Game.HomeTeam.TeamId;

  viewStatsData.Stats.forEach(viewElement => {
    if (viewElement != null || viewElement != undefined) {
      if (viewElement.TeamId === awayTeamId) {
        view.viewdata.Stats.Stats.AwayStats = mapStats(view.viewdata.Stats.Stats.AwayStats, viewElement);

      }
      else if (viewElement.TeamId === homeTeamId) {
        view.viewdata.Stats.Stats.HomeStats = mapStats(view.viewdata.Stats.Stats.HomeStats, viewElement);
      }
    }
  });

  matchupView.viewdata.Stats.SplitStats.forEach(viewElement => {
    if (viewElement != null || viewElement != undefined) {
      if (viewElement.TeamId === awayTeamId && viewElement.SplitType === "StarterOverall") {
        view.viewdata.Stats.SplitStats.AwayStartingPitcher = mapSplitStats(view.viewdata.Stats.SplitStats.AwayStartingPitcher, viewElement);
      }
      else if (viewElement.TeamId === homeTeamId && viewElement.SplitType === "StarterOverall") {
        view.viewdata.Stats.SplitStats.HomeStartingPitcher = mapSplitStats(view.viewdata.Stats.SplitStats.HomeStartingPitcher, viewElement);
      }
    }
  });

  return view;
}

/**
 * Returns the team overall batter and pitcher stats model with the view stats mapped to it.
 *
 * @param {any} teamStats The model to map the stats to.
 * @param {any} viewElement The stats from the database view.
 */
function mapStats(teamStats, viewElement) {
  if (viewElement.SplitType === "Overall") {
    teamStats.Wins = viewElement.Wins;
    teamStats.Losses = viewElement.Losses;
    teamStats.OverUnderOvers = viewElement.OverUnderOvers;
    teamStats.OverUnderUnders = viewElement.OverUnderUnders;
    teamStats.Runs = viewElement.Runs;
    teamStats.GamesPlayed = viewElement.GamesPlayed;
    teamStats.Hits = viewElement.Hits;
    teamStats.Runs = viewElement.Runs;
    teamStats.MoneyLineUnits = viewElement.MoneyLineUnits;
    teamStats.BattingAverage = viewElement.BattingAverage;
    teamStats.SluggingPercentage = viewElement.SluggingPercentage;
    teamStats.HomeRuns = viewElement.HomeRuns;
    teamStats.TeamLeftOnBase = viewElement.TeamLeftOnBase;
    teamStats.StolenBases = viewElement.StolenBases;
    teamStats.Doubles = viewElement.Doubles;
    teamStats.Triples = viewElement.Triples;
    teamStats.Errors = viewElement.Errors;
  }
  else if (viewElement.SplitType === "AllPitchersOverall") {
    teamStats.OnBasePercentage = viewElement.OnBasePercentage;
    teamStats.Strikeouts = viewElement.Strikeouts;
    teamStats.Walks = viewElement.Walks;
  }

  return teamStats;
}

/**
 * Returns the team starter pitcher stats model with the view stats mapped to it.
 *
 * @param {any} teamStats The model to map the stats to.
 * @param {any} viewElement The stats from the database view.
 */
function mapSplitStats(teamStats, viewElement) {
  teamStats.EarnedRunAverage = viewElement.EarnedRunAverage;
        teamStats.Hits = viewElement.Hits;
        teamStats.Runs = viewElement.Runs;
        teamStats.Walks = viewElement.Walks;
        teamStats.Strikeouts = viewElement.Strikeouts;
        teamStats.AvgInningsPitched = viewElement.AvgInningsPitched;

  return teamStats;
}