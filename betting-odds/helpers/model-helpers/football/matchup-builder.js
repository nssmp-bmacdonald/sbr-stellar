export function mapFootballMatchupView(matchupView){
    let view = {
      viewdata: {
        Stats: {
          AwayTeamStats:{
            TeamSituationalStats: {
              TeamStatsFor: {},
              TeamStatsAgainst: {}
            },
          },
          HomeTeamStats:{
            TeamSituationalStats: {
              TeamStatsFor: {},
              TeamStatsAgainst: {}
            },
          },
        }
      },
    }
  
    // Away For Team
    if (!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor) {
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineNetWins = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineNetWins;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsCovers = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsCovers;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsNonCovers = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsNonCovers;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderOvers = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderOvers;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderUnders = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderUnders;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineTotalUnits = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineTotalUnits;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsTotalUnits = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AtsTotalUnits;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnOvers = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnOvers;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgOpponentTurnOvers = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgOpponentTurnOvers;
      // I did this calculation wrong for Mike
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnoverDifferential = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnoverDifferential;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPoints = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPoints;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPlay = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPlay;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgYardsPerPoint = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgYardsPerPoint;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter1 = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter1;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter2 = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter2;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PassingPercentage = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PassingPercentage;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.RushingNetYards = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.RushingNetYards;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.RushingPlays = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.RushingPlays;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsSucceeded = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsSucceeded;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsAttempted = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsAttempted;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsSucceeded = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsSucceeded;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsAttempted = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsAttempted;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.TimeOfPossessionSecs = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.TimeOfPossessionSecs;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenaltyYards = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenaltyYards;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenalties = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenalties;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturns = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturns;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturnYards = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturnYards;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturnYards = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturnYards;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturns = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturns;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPuntReturn = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPuntReturn;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownPercentage = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownPercentage;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownPercentage = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownPercentage;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgInterceptions = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgInterceptions;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgFumblesLost = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.AvgFumblesLost;
    }
    // Home for Team
    if (!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor) {
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineNetWins = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineNetWins;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsCovers = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsCovers;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsNonCovers = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsNonCovers;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderOvers = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderOvers;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderUnders = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.OverUnderUnders;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineTotalUnits = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.MoneyLineTotalUnits;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsTotalUnits = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AtsTotalUnits;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnOvers = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnOvers;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgOpponentTurnOvers = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgOpponentTurnOvers;
      // I did the turnover differential calculation wrong for Mike
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnoverDifferential = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgTurnoverDifferential;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPoints = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPoints;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPlay = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPlay;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgYardsPerPoint = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgYardsPerPoint;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter1 = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter1;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter2 = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPointsQuarter2;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PassingPercentage = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PassingPercentage;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.RushingNetYards = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.RushingNetYards;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.RushingPlays = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.RushingPlays;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsSucceeded = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsSucceeded;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsAttempted = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownsAttempted;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsSucceeded = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsSucceeded;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsAttempted = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownsAttempted;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.TimeOfPossessionSecs = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.TimeOfPossessionSecs;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenaltyYards = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenaltyYards;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenalties = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgPenalties;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturns = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturns;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturnYards = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.KickoffReturnYards;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturnYards = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturnYards;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturns = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.PuntReturns;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPuntReturn = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.YardsPerPuntReturn;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownPercentage = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.ThirdDownPercentage;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownPercentage = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.FourthDownPercentage;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgInterceptions = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgInterceptions;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgFumblesLost = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.AvgFumblesLost;
    }
    // Away against team
    if (!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst) {
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPoints = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPoints;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.YardsPerPlay = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.YardsPerPlay;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter1 = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter1;
      view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter2 = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter2;
    }
    // Home against team
    if (!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst) {
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPoints = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPoints;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.YardsPerPlay = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.YardsPerPlay;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter1 = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter1;
      view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter2 = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst.AvgPointsQuarter2;
    }
    return view;
  }