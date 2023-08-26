import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';

function FootballStats({matchupModel}){
  // Step into these objects so references are shorter
  let homeFor = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsFor;
  let homeAgainst = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamStats.TeamSituationalStats.TeamStatsAgainst;
  let awayFor= matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsFor;
  let awayAgainst = matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamStats.TeamSituationalStats.TeamStatsAgainst;

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
                {/* Removing until we sort out Straight Up #s (Total Wins - Total Losses)
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!awayFor.MoneyLineNetWins ? awayFor.MoneyLineNetWins : '-'}</div>
                    <div className={rowStyle.RowLabel}>Straight Up</div>
                    <div className={rowStyle.RowData}>{!homeFor.MoneyLineNetWins ? homeFor.MoneyLineNetWins : '-'}</div>
                </div> */}
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AtsCovers && !!awayFor.AtsNonCovers ? awayFor.AtsCovers + ' - ' + awayFor.AtsNonCovers : '-'}</div>
                    <div className={rowStyle.RowLabel}>Against the Spread</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AtsCovers && !!homeFor.AtsNonCovers ? homeFor.AtsCovers + ' - ' + homeFor.AtsNonCovers : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.OverUnderOvers && !!awayFor.OverUnderUnders ? awayFor.OverUnderOvers + ' / ' + awayFor.OverUnderUnders: '-'}</div>
                    <div className={rowStyle.RowLabel}>Over / Under</div>
                    <div className={rowStyle.RowData}>{!!homeFor.OverUnderOvers && !!homeFor.OverUnderUnders ? homeFor.OverUnderOvers + ' / ' + homeFor.OverUnderUnders: '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.MoneyLineTotalUnits ? awayFor.MoneyLineTotalUnits : '-'}</div>
                    <div className={rowStyle.RowLabel}>Straight Up Units</div>
                    <div className={rowStyle.RowData}>{!!homeFor.MoneyLineTotalUnits ? homeFor.MoneyLineTotalUnits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AtsTotalUnits ? awayFor.AtsTotalUnits : '-'}</div>
                    <div className={rowStyle.RowLabel}>ATS Units</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AtsTotalUnits ? homeFor.AtsTotalUnits : '-'}</div>
                </div>
            </div>
        </div>

        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Current Season Performance</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgPoints ? awayFor.AvgPoints.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Points</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgPoints ? homeFor.AvgPoints.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayAgainst.AvgPoints ? awayAgainst.AvgPoints.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Points Against</div>
                    <div className={rowStyle.RowData}>{!!homeAgainst.AvgPoints ? homeAgainst.AvgPoints.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.YardsPerPlay ? awayFor.YardsPerPlay.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Yards per Play</div>
                    <div className={rowStyle.RowData}>{!!homeFor.YardsPerPlay ? homeFor.YardsPerPlay.toFixed(2): '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayAgainst.YardsPerPlay ? awayAgainst.YardsPerPlay.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Opponent Yards per Play</div>
                    <div className={rowStyle.RowData}>{!!homeAgainst.YardsPerPlay ? homeAgainst.YardsPerPlay.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgYardsPerPoint && !(typeof awayFor.AvgYardsPerPoint === 'string') ? awayFor.AvgYardsPerPoint.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Yards per Point</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgYardsPerPoint && !(typeof homeFor.AvgYardsPerPoint === 'string') ? homeFor.AvgYardsPerPoint.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgTurnOvers ? awayFor.AvgTurnOvers.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Turn Overs</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgTurnOvers ? homeFor.AvgTurnOvers.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgOpponentTurnOvers ? awayFor.AvgOpponentTurnOvers.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Opponent Turnovers</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgOpponentTurnOvers ? homeFor.AvgOpponentTurnOvers.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.TimeOfPossessionSecs && !!awayFor.GamesPlayed ? Math.round((awayFor.TimeOfPossessionSecs / 60) / awayFor.GamesPlayed) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Possession Minutes per Game</div>
                    <div className={rowStyle.RowData}>{!!homeFor.TimeOfPossessionSecs && !!homeFor.GamesPlayed ? Math.round((homeFor.TimeOfPossessionSecs / 60) / homeFor.GamesPlayed) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgPointsQuarter1 && !!awayFor.AvgPointsQuarter2 ? (awayFor.AvgPointsQuarter1 + awayFor.AvgPointsQuarter2).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Team Score at Half</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgPointsQuarter1 && !!homeFor.AvgPointsQuarter2 ? (homeFor.AvgPointsQuarter1 + homeFor.AvgPointsQuarter2).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayAgainst.AvgPointsQuarter1 && !!awayAgainst.AvgPointsQuarter2 ? (awayAgainst.AvgPointsQuarter1 + awayAgainst.AvgPointsQuarter2).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Opponent Score at Half</div>
                    <div className={rowStyle.RowData}>{!!homeAgainst.AvgPointsQuarter1 && !!homeAgainst.AvgPointsQuarter2 ? (homeAgainst.AvgPointsQuarter1 + homeAgainst.AvgPointsQuarter2).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.PassingPercentage ? awayFor.PassingPercentage.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Passing (%)</div>
                    <div className={rowStyle.RowData}>{!!homeFor.PassingPercentage ? homeFor.PassingPercentage.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.RushingNetYards && !!awayFor.RushingPlays ? (awayFor.RushingNetYards / awayFor.RushingPlays).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Yards per Run</div>
                    <div className={rowStyle.RowData}>{!!homeFor.RushingNetYards && !!homeFor.RushingPlays ? (homeFor.RushingNetYards / homeFor.RushingPlays).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.ThirdDownPercentage ? awayFor.ThirdDownPercentage.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>3rd Down Conversion (%)</div>
                    <div className={rowStyle.RowData}>{!!homeFor.ThirdDownPercentage ? homeFor.ThirdDownPercentage.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.FourthDownPercentage ? awayFor.FourthDownPercentage.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>4th Down Conversion (%)</div>
                    <div className={rowStyle.RowData}>{!!homeFor.FourthDownPercentage ? homeFor.FourthDownPercentage.toFixed(2) : '-'}</div>
                </div>
            </div>
        </div>
        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Turnovers, Penalties & Special Teams</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgPenaltyYards && !!awayFor.AvgPenalties ? awayFor.AvgPenalties.toFixed(2) + ' - ' + awayFor.AvgPenaltyYards.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg Penalties - Yards</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgPenaltyYards && !!homeFor.AvgPenalties ? homeFor.AvgPenalties.toFixed(2) + ' - ' + homeFor.AvgPenaltyYards.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.KickoffReturns && awayFor.KickoffReturnYards && !!awayFor.GamesPlayed ? (awayFor.KickoffReturns / awayFor.GamesPlayed).toFixed(2) + ' - ' + (awayFor.KickoffReturnYards / awayFor.GamesPlayed ).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Kickoff Returns per Game - Return Yards</div>
                    <div className={rowStyle.RowData}>{!!homeFor.KickoffReturns && homeFor.KickoffReturnYards && !!homeFor.GamesPlayed ? (homeFor.KickoffReturns / homeFor.GamesPlayed).toFixed(2) + ' - ' + (homeFor.KickoffReturnYards / homeFor.GamesPlayed ).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.KickoffReturns && awayFor.KickoffReturnYards ? (awayFor.KickoffReturnYards / awayFor.KickoffReturns).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg Yards per Kick Return</div>
                    <div className={rowStyle.RowData}>{!!homeFor.KickoffReturns && awayFor.KickoffReturnYards ? (homeFor.KickoffReturnYards / homeFor.KickoffReturns).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.PuntReturns && awayFor.PuntReturnYards && !!awayFor.GamesPlayed ? (awayFor.PuntReturns / awayFor.GamesPlayed).toFixed(2) + ' - ' + (awayFor.PuntReturnYards / awayFor.GamesPlayed ).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Punt Returns per Game - Return Yards</div>
                    <div className={rowStyle.RowData}>{!!homeFor.PuntReturns && homeFor.PuntReturnYards && !!homeFor.GamesPlayed ? (homeFor.PuntReturns / homeFor.GamesPlayed).toFixed(2) + ' - ' + (homeFor.PuntReturnYards / homeFor.GamesPlayed ).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.YardsPerPuntReturn ? awayFor.YardsPerPuntReturn.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg Yards per Punt Return</div>
                    <div className={rowStyle.RowData}>{!!homeFor.YardsPerPuntReturn ? homeFor.YardsPerPuntReturn.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgInterceptions ? awayFor.AvgInterceptions.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Avg. Interceptions per Game</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgInterceptions ? homeFor.AvgInterceptions.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgFumblesLost ? awayFor.AvgFumblesLost.toFixed(2)  : '-'}</div>
                    <div className={rowStyle.RowLabel}>Fumbles Lost per Game</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgFumblesLost ? homeFor.AvgFumblesLost.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                <div className={rowStyle.RowData}>{!!awayFor.AvgTurnOvers ? awayFor.AvgTurnOvers.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Avg. Turn Overs</div>
                <div className={rowStyle.RowData}>{!!homeFor.AvgTurnOvers ? homeFor.AvgTurnOvers.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayFor.AvgTurnoverDifferential ? Math.round(awayFor.AvgTurnoverDifferential * awayFor.GamesPlayed) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Turnover Differential</div>
                    <div className={rowStyle.RowData}>{!!homeFor.AvgTurnoverDifferential ? Math.round(homeFor.AvgTurnoverDifferential * homeFor.GamesPlayed) : '-'}</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FootballStats;
