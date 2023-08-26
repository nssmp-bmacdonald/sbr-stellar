export function mapHockeyMatchupView(matchupView, homeGoalie, awayGoalie){
    let view = {
      viewdata: {
        Stats: {
          AwayTeamStats: {
            TeamSituationalStats: {
              TeamStatsFor: {},
              PeriodStats: {},
              SpecialTeamStats: {},
            }
          },
          HomeTeamStats: {
            TeamSituationalStats: {
              TeamStatsFor: {},
              PeriodStats: {},
              SpecialTeamStats: {},
            }
          },
          AwayTeamGoalieStats: {},
          HomeTeamGoalieStats: {},
        }
      }
    }

    //Away Team
    if(!!matchupView.viewdata.Stats.AwayTeamStats && !!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats){
      if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor) {
        view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed;
      }
      // Away Team Period Stats (including OT)
      if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats){
        // JS cannot parse keys with numbers.. so use object key
        if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['1st']){
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.FirstPeriodGoals = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['1st'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['2nd']){
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.SecondPeriodGoals = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['2nd'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['3rd']){
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.ThirdPeriodGoals = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['3rd'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['OT']){
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Overtime = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats['OT'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total){
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.TotalGoals = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total.GoalsFor;
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.TotalGoalsAgainst = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total.GoalsAgainst;
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Shots = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total.ShotsFor;
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.ShotsAgainst = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total.ShotsAgainst;
          view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.ShootingPercentage = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.PeriodStats.Total.ShootingPercentage;
        }
      }
      // Away Team Special teams Stats (powerplay & penalty kill)
      if(!!matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats){
        view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.AttemptsPowerPlay = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.AttemptsPowerPlay;
        view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayGoals = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.GoalsPowerPlay;
        view.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayPercentage = matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayPercentage;
      }
    }
    //Home Team
    if(!!matchupView.viewdata.Stats.HomeTeamStats && !!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats){
      if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor) {
        view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor.GamesPlayed;
      }
      // Home Team Period Stats (including OT)
      if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats){
        // JS cannot parse keys with numbers.. so use object key
        if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['1st']){
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.FirstPeriodGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['1st'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['2nd']){
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.SecondPeriodGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['2nd'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['3rd']){
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.ThirdPeriodGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['3rd'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['OT']){
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.OvertimeGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats['OT'].GoalsFor;
        }
        if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total){
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.TotalGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total.GoalsFor;
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.TotalGoalsAgainst = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total.GoalsAgainst;
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Shots = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total.ShotsFor;
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.ShotsAgainst = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total.ShotsAgainst;
          view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.ShootingPercentage = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.PeriodStats.Total.ShootingPercentage;

        }
      }
      // Home Team Special teams Stats (powerplay & penalty kill)
      if(!!matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats){
        view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.AttemptsPowerPlay = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.AttemptsPowerPlay;
        view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayGoals = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.GoalsPowerPlay;
        view.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayPercentage = matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.SpecialTeamStats.PowerPlayPercentage;
      }
    }
    // The goalies are provided in an array, map the starting goalie from the gameView to the matchupView
    // Home Goalie
    if(!!matchupView.viewdata.Stats.HomeTeamGoalieStats){
      const homeTeamGoalieStats = matchupView.viewdata.Stats.HomeTeamGoalieStats.find(homeTeamGoalie => homeTeamGoalie.LastName === homeGoalie?.lastName && homeTeamGoalie.FirstName === homeGoalie?.firstName);
      if(!!homeTeamGoalieStats){
        view.viewdata.Stats.HomeTeamGoalieStats.FirstName = homeTeamGoalieStats.FirstName;
        view.viewdata.Stats.HomeTeamGoalieStats.LastName = homeTeamGoalieStats.LastName;
        view.viewdata.Stats.HomeTeamGoalieStats.Wins = homeTeamGoalieStats.Wins;
        view.viewdata.Stats.HomeTeamGoalieStats.Losses = homeTeamGoalieStats.Losses;
        view.viewdata.Stats.HomeTeamGoalieStats.SavePercentage = homeTeamGoalieStats.SavePercentage;
        view.viewdata.Stats.HomeTeamGoalieStats.ShotsAgainst = homeTeamGoalieStats.ShotsAgainst;
        view.viewdata.Stats.HomeTeamGoalieStats.GoalsAgainst = homeTeamGoalieStats.GoalsAgainst;
        view.viewdata.Stats.HomeTeamGoalieStats.MoneyLineHomeUnits = homeTeamGoalieStats.MoneyLineHomeUnits;
        view.viewdata.Stats.HomeTeamGoalieStats.MoneyLineAwayUnits = homeTeamGoalieStats.MoneyLineAwayUnits;
        view.viewdata.Stats.HomeTeamGoalieStats.SpreadAwayUnits = homeTeamGoalieStats.SpreadAwayUnits;
        view.viewdata.Stats.HomeTeamGoalieStats.SpreadHomeUnits = homeTeamGoalieStats.SpreadHomeUnits;
        view.viewdata.Stats.HomeTeamGoalieStats.HomeOvers = homeTeamGoalieStats.HomeOvers;
        view.viewdata.Stats.HomeTeamGoalieStats.AwayOvers = homeTeamGoalieStats.AwayOvers;
        view.viewdata.Stats.HomeTeamGoalieStats.HomeUnders = homeTeamGoalieStats.HomeUnders;
        view.viewdata.Stats.HomeTeamGoalieStats.AwayUnders = homeTeamGoalieStats.AwayUnders;
      }
    }
    // Away Goalie
    if(!!matchupView.viewdata.Stats.AwayTeamGoalieStats){
    const awayTeamGoalieStats = matchupView.viewdata.Stats.AwayTeamGoalieStats.find(awayTeamGoalie => awayTeamGoalie.LastName === awayGoalie?.lastName && awayTeamGoalie.FirstName === awayGoalie?.firstName);
      if(!!awayTeamGoalieStats){
        view.viewdata.Stats.AwayTeamGoalieStats.FirstName = awayTeamGoalieStats.FirstName;
        view.viewdata.Stats.AwayTeamGoalieStats.LastName = awayTeamGoalieStats.LastName;
        view.viewdata.Stats.AwayTeamGoalieStats.Wins = awayTeamGoalieStats.Wins;
        view.viewdata.Stats.AwayTeamGoalieStats.Losses = awayTeamGoalieStats.Losses;
        view.viewdata.Stats.AwayTeamGoalieStats.SavePercentage = awayTeamGoalieStats.SavePercentage;
        view.viewdata.Stats.AwayTeamGoalieStats.ShotsAgainst = awayTeamGoalieStats.ShotsAgainst;
        view.viewdata.Stats.AwayTeamGoalieStats.GoalsAgainst = awayTeamGoalieStats.GoalsAgainst;
        view.viewdata.Stats.AwayTeamGoalieStats.MoneyLineHomeUnits = awayTeamGoalieStats.MoneyLineHomeUnits;
        view.viewdata.Stats.AwayTeamGoalieStats.MoneyLineAwayUnits = awayTeamGoalieStats.MoneyLineAwayUnits;
        view.viewdata.Stats.AwayTeamGoalieStats.SpreadAwayUnits = awayTeamGoalieStats.SpreadAwayUnits;
        view.viewdata.Stats.AwayTeamGoalieStats.SpreadHomeUnits = awayTeamGoalieStats.SpreadHomeUnits;
        view.viewdata.Stats.AwayTeamGoalieStats.HomeOvers = awayTeamGoalieStats.HomeOvers;
        view.viewdata.Stats.AwayTeamGoalieStats.AwayOvers = awayTeamGoalieStats.AwayOvers;
        view.viewdata.Stats.AwayTeamGoalieStats.HomeUnders = awayTeamGoalieStats.HomeUnders;
        view.viewdata.Stats.AwayTeamGoalieStats.AwayUnders = awayTeamGoalieStats.AwayUnders;
      }
    }

    return view
  }