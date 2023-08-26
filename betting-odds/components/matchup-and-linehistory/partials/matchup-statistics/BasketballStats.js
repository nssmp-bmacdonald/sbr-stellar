import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';

function BasketballStats({matchupModel}){
  // Step into these objects so references are shorter
  let homeFor = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamForStats;
  let awayFor = matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamForStats;
  let homeAgainst = matchupModel.matchup.matchupView.viewdata.Stats.HomeTeamAgainstStats;
  let awayAgainst = matchupModel.matchup.matchupView.viewdata.Stats.AwayTeamAgainstStats;
  return(
    <section className={style.centerColumn}>
      <div className={cardStyle.Card}>
          <h3 className={`${cardStyle.CardTitle} h4`}>Offensive Team Records</h3>
          <div className={`${rowStyle.Rows}`}>
              <div className={rowStyle.Row}>
                <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                <div className={rowStyle.RowLabel}></div>
                <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.Points && !!awayFor.GamesPlayed ? (awayFor.AvgPoints).toFixed(2): '-'}</div>
                  <div className={rowStyle.RowLabel}>Points For per Game</div>
                  <div className={rowStyle.RowData}>{!!homeFor.Points && !!homeFor.GamesPlayed ? (homeFor.AvgPoints).toFixed(2): '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayAgainst.Points && !!awayFor.GamesPlayed ? (awayAgainst.Points / awayFor.GamesPlayed).toFixed(2): '-'}</div>
                  <div className={rowStyle.RowLabel}>Points Against per Game</div>
                  <div className={rowStyle.RowData}>{!!homeAgainst.Points && !!homeFor.GamesPlayed ? (homeAgainst.Points / homeFor.GamesPlayed).toFixed(2): '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.AvgPointsHalf1 ? awayFor.AvgPointsHalf1.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Avg</small><br/>1st Half Points</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.AvgPointsHalf1 ? homeFor.AvgPointsHalf1.toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.OverUnderOvers && !!awayFor.OverUnderUnders && !!awayFor.OverUnderPushes ? awayFor.OverUnderOvers + '/' + awayFor.OverUnderUnders + '/' + awayFor.OverUnderPushes : '-'}</div>
                  <div className={rowStyle.RowLabel}>Over/Under/Push</div>
                  <div className={rowStyle.RowData}>{!!homeFor.OverUnderOvers && !!homeFor.OverUnderUnders && !!homeFor.OverUnderPushes ? homeFor.OverUnderOvers + '/' + awayFor.OverUnderUnders + '/' + homeFor.OverUnderPushes : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.FieldGoalsMade && !!awayFor.FieldGoalsAttempted ? (awayFor.FieldGoalsMade / awayFor.FieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Offensive</small><br/>FG%</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.FieldGoalsMade && !!homeFor.FieldGoalsAttempted ? (homeFor.FieldGoalsMade / homeFor.FieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.FreeThrowsMade && !!awayFor.FreeThrowsAttempted ? (awayFor.FreeThrowsMade / awayFor.FreeThrowsAttempted * 100).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Offensive</small><br/>FT%</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.FreeThrowsMade && !!homeFor.FreeThrowsAttempted ? (homeFor.FreeThrowsMade / homeFor.FreeThrowsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.ThreePointFieldGoalsMade && !!awayFor.ThreePointFieldGoalsAttempted ? (awayFor.ThreePointFieldGoalsMade / awayFor.ThreePointFieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Offensive</small><br/>3PT%</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.ThreePointFieldGoalsMade && !!homeFor.ThreePointFieldGoalsAttempted ? (homeFor.ThreePointFieldGoalsMade / homeFor.ThreePointFieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.ReboundsOffensive && !!awayFor.GamesPlayed ? (awayFor.ReboundsOffensive / awayFor.GamesPlayed).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Offensive</small><br/>Reb.</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.ReboundsOffensive && !!homeFor.GamesPlayed ? (homeFor.ReboundsOffensive / homeFor.GamesPlayed).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.AvgFieldGoalsMade ? awayFor.AvgFieldGoalsMade.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Avg.</small><br/>FG Made</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.AvgFieldGoalsMade ? homeFor.AvgFieldGoalsMade.toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.AvgFreeThrowsMade ? awayFor.AvgFreeThrowsMade.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Avg.</small><br/>FT Made</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.AvgFreeThrowsMade ? homeFor.AvgFreeThrowsMade.toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.AvgThreePointFieldGoalsMade ? awayFor.AvgThreePointFieldGoalsMade.toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Avg.</small><br/>3PT Made</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.AvgThreePointFieldGoalsMade ? homeFor.AvgThreePointFieldGoalsMade.toFixed(2) : '-'}</div>
              </div>
          </div>
      </div>

      <div className={cardStyle.Card}>
          <h3 className={`${cardStyle.CardTitle} h4`}>Defensive Team Records</h3>
          <div className={`${rowStyle.Rows}`}>
              <div className={rowStyle.Row}>
                <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                <div className={rowStyle.RowLabel}></div>
                <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
              </div>
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayAgainst.Points && !!awayFor.GamesPlayed ? (awayAgainst.Points / awayFor.GamesPlayed).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>Points</span></div>
                  <div className={rowStyle.RowData}>{!!homeAgainst.Points && !!homeFor.GamesPlayed ? (homeAgainst.Points / homeFor.GamesPlayed).toFixed(2) : '-'}</div>
              </div>
              {/* <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayFor.PointsHalf1Against ? awayFor.PointsHalf1Against : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>Half</span></div>
                  <div className={rowStyle.RowData}>{!!homeFor.PointsHalf1Against ? homeFor.PointsHalf1Against : '-'}</div>
              </div> */}
              <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayAgainst.ReboundsOffensive && !!awayFor.GamesPlayed ? (awayAgainst.ReboundsOffensive / awayFor.GamesPlayed).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>Reb.</span></div>
                  <div className={rowStyle.RowData}>{!!homeAgainst.ReboundsOffensive && !!homeFor.GamesPlayed ? (homeAgainst.ReboundsOffensive / homeFor.GamesPlayed).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                <div className={rowStyle.RowData}>{!!awayAgainst.FieldGoalsMade && !!awayAgainst.FieldGoalsAttempted ? (awayAgainst.FieldGoalsMade / awayAgainst.FieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
                <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>FG%</span></div>
                <div className={rowStyle.RowData}>{!!homeAgainst.FieldGoalsMade && !!homeAgainst.FieldGoalsAttempted ? (homeAgainst.FieldGoalsMade / homeAgainst.FieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                <div className={rowStyle.RowData}>{!!awayAgainst.FreeThrowsMade && !!awayAgainst.FreeThrowsAttempted ? (awayAgainst.FreeThrowsMade / awayAgainst.FreeThrowsAttempted * 100).toFixed(2) : '-'}</div>
                <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>FT%</span></div>
                <div className={rowStyle.RowData}>{!!homeAgainst.FreeThrowsMade && !!homeAgainst.FreeThrowsAttempted ? (homeAgainst.FreeThrowsMade / homeAgainst.FreeThrowsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
              <div className={rowStyle.Row}>
                <div className={rowStyle.RowData}>{!!awayAgainst.ThreePointFieldGoalsMade && !!awayAgainst.ThreePointFieldGoalsAttempted ? (awayAgainst.ThreePointFieldGoalsMade / awayAgainst.ThreePointFieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
                <div className={rowStyle.RowLabel}><span><small>Opponent</small><br/>3PT%</span></div>
                <div className={rowStyle.RowData}>{!!homeAgainst.ThreePointFieldGoalsMade && !!homeAgainst.ThreePointFieldGoalsAttempted ? (homeAgainst.ThreePointFieldGoalsMade / homeAgainst.ThreePointFieldGoalsAttempted * 100).toFixed(2) : '-'}</div>
              </div>
          </div>
      </div>
  </section>
  )
}

export default BasketballStats;
