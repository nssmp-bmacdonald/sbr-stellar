import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';

function HockeyStats({matchupModel}){
  // Step into these objects so references are shorter
  let homeStats = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats;
  let awayStats = matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats;
  let homeGoalieStats = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamGoalieStats;
  let awayGoalieStats = matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamGoalieStats;
  return(
    <section className={style.centerColumn}>
        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Team Records</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.TotalGoals ? awayStats.PeriodStats.TotalGoals.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Goals</div>
                    <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.TotalGoals ? homeStats.PeriodStats.TotalGoals.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.TotalGoalsAgainst ? awayStats.PeriodStats.TotalGoalsAgainst.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. Goals Against</div>
                  <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.TotalGoalsAgainst ? homeStats.PeriodStats.TotalGoalsAgainst.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.Shots ? awayStats.PeriodStats.Shots.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. Shots</div>
                  <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.Shots ? homeStats.PeriodStats.Shots.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.ShootingPercentage ? (awayStats.PeriodStats.ShootingPercentage * 100).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>% of Shots on Goal</div>
                    <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.ShootingPercentage ? (homeStats.PeriodStats.ShootingPercentage * 100).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.ShotsAgainst ? awayStats.PeriodStats.ShotsAgainst.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. Shots Against</div>
                  <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.ShotsAgainst ? homeStats.PeriodStats.ShotsAgainst.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.SpecialTeamStats.AttemptsPowerPlay && !!awayStats.TeamStatsFor.GamesPlayed ? (awayStats.SpecialTeamStats.AttemptsPowerPlay / awayStats.TeamStatsFor.GamesPlayed).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Power Plays per Game</div>
                  <div className={rowStyle.RowData}>{!!homeStats.SpecialTeamStats.AttemptsPowerPlay && !!homeStats.TeamStatsFor.GamesPlayed ? (homeStats.SpecialTeamStats.AttemptsPowerPlay / homeStats.TeamStatsFor.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.SpecialTeamStats.PowerPlayGoals ? awayStats.SpecialTeamStats.PowerPlayGoals : '-'}</div>
                    <div className={rowStyle.RowLabel}>Power Play Goals</div>
                    <div className={rowStyle.RowData}>{!!homeStats.SpecialTeamStats.PowerPlayGoals ? homeStats.SpecialTeamStats.PowerPlayGoals : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.SpecialTeamStats.PowerPlayPercentage ? awayStats.SpecialTeamStats.PowerPlayPercentage.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Power Play Goal %</div>
                  <div className={rowStyle.RowData}>{!!homeStats.SpecialTeamStats.PowerPlayPercentage ? homeStats.SpecialTeamStats.PowerPlayPercentage.toFixed(2) : '-'}</div>
                </div>
            </div>
        </div>

        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Game Breakdown</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.FirstPeriodGoals ? awayStats.PeriodStats.FirstPeriodGoals.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. 1st Period Goals</div>
                    <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.FirstPeriodGoals ? homeStats.PeriodStats.FirstPeriodGoals.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.SecondPeriodGoals ? awayStats.PeriodStats.SecondPeriodGoals.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. 2nd Period Goals</div>
                  <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.SecondPeriodGoals ? homeStats.PeriodStats.SecondPeriodGoals.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.PeriodStats.ThirdPeriodGoals ? awayStats.PeriodStats.ThirdPeriodGoals.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. 3rd Period Goals</div>
                  <div className={rowStyle.RowData}>{!!homeStats.PeriodStats.ThirdPeriodGoals ? homeStats.PeriodStats.ThirdPeriodGoals.toFixed(2) : '-'}</div>
                </div>
            </div>
        </div>
        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Goalie Statistics</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.FirstName && !!awayGoalieStats.LastName ? awayGoalieStats.FirstName + ' ' + awayGoalieStats.LastName : '-'}</div>
                    <div className={rowStyle.RowLabel}>Goalie</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.FirstName && !!homeGoalieStats.LastName ? homeGoalieStats.FirstName + ' ' + homeGoalieStats.LastName : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.Wins && !!awayGoalieStats.Losses ? awayGoalieStats.Wins + '/' + awayGoalieStats.Losses : '-'}</div>
                    <div className={rowStyle.RowLabel}>Wins / Losses</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.Wins && !!homeGoalieStats.Losses ? homeGoalieStats.Wins + '/' + homeGoalieStats.Losses : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.ShotsAgainst ? awayGoalieStats.ShotsAgainst : '-'}</div>
                    <div className={rowStyle.RowLabel}>Shots Against</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.ShotsAgainst ? homeGoalieStats.ShotsAgainst : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.GoalsAgainst ? awayGoalieStats.GoalsAgainst : '-'}</div>
                    <div className={rowStyle.RowLabel}>Goals Allowed</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.GoalsAgainst ? homeGoalieStats.GoalsAgainst : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.SavePercentage ? (awayGoalieStats.SavePercentage * 100).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Save Percentage</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.SavePercentage ? (homeGoalieStats.SavePercentage * 100).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayGoalieStats.MoneyLineHomeUnits ? awayGoalieStats.MoneyLineHomeUnits : '-'}</div>
                    <div className={rowStyle.RowLabel}>SU Units Home</div>
                    <div className={rowStyle.RowData}>{!!homeGoalieStats.MoneyLineHomeUnits ? homeGoalieStats.MoneyLineHomeUnits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayGoalieStats.MoneyLineAwayUnits ? awayGoalieStats.MoneyLineAwayUnits : '-'}</div>
                  <div className={rowStyle.RowLabel}>SU Units Away</div>
                  <div className={rowStyle.RowData}>{!!homeGoalieStats.MoneyLineAwayUnits ? homeGoalieStats.MoneyLineAwayUnits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayGoalieStats.SpreadHomeUnits ? awayGoalieStats.SpreadHomeUnits : '-'}</div>
                  <div className={rowStyle.RowLabel}>Spread Units Home</div>
                  <div className={rowStyle.RowData}>{!!homeGoalieStats.SpreadHomeUnits ? homeGoalieStats.SpreadHomeUnits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayGoalieStats.SpreadAwayUnits ? awayGoalieStats.SpreadAwayUnits : '-'}</div>
                  <div className={rowStyle.RowLabel}>Spread Units Away</div>
                  <div className={rowStyle.RowData}>{!!homeGoalieStats.SpreadAwayUnits ? homeGoalieStats.SpreadAwayUnits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayGoalieStats.AwayOvers && !!awayGoalieStats.HomeOvers && !!awayGoalieStats.HomeUnders && !!awayGoalieStats.AwayUnders ? (awayGoalieStats.HomeOvers + awayGoalieStats.AwayOvers) + '/' + (awayGoalieStats.HomeUnders + awayGoalieStats.AwayUnders) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Over / Under</div>
                  <div className={rowStyle.RowData}>{!!homeGoalieStats.AwayOvers && !!homeGoalieStats.HomeOvers && !!homeGoalieStats.HomeUnders && !!homeGoalieStats.AwayUnders ? (homeGoalieStats.HomeOvers + homeGoalieStats.AwayOvers) + '/' + (homeGoalieStats.HomeUnders + homeGoalieStats.AwayUnders) : '-'}</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HockeyStats;
