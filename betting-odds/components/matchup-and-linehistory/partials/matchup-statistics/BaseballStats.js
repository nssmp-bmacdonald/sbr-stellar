import style from '/styles/pages/matchup-and-linehistory/GameMatchup.module.scss';
import cardStyle from '/styles/components/Card.module.scss';
import rowStyle from '/styles/layout/Rows.module.scss';

function BaseballStats({matchupModel}){
  // Step into these objects so references are shorter
  let homeStats = matchupModel.matchup.matchupView.viewdata.Stats.Stats.HomeStats;
  let homePitcher = matchupModel.matchup.matchupView.viewdata.Stats.SplitStats.HomeStartingPitcher;
  let awayStats = matchupModel.matchup.matchupView.viewdata.Stats.Stats.AwayStats;
  let awayPitcher = matchupModel.matchup.matchupView.viewdata.Stats.SplitStats.AwayStartingPitcher;

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
                    <div className={rowStyle.RowData}>{!!awayStats.Wins && !!awayStats.Losses ? awayStats.Wins + '/' + awayStats.Losses : '-'}</div>
                    <div className={rowStyle.RowLabel}>Win / Loss</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Wins && !!homeStats.Losses ? homeStats.Wins + '/' + homeStats.Losses : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.OverUnderOvers &&  !!awayStats.OverUnderUnders ? awayStats.OverUnderOvers + '/' + awayStats.OverUnderUnders: '-'}</div>
                    <div className={rowStyle.RowLabel}>Over / Under</div>
                    <div className={rowStyle.RowData}>{!!homeStats.OverUnderOvers &&  !!homeStats.OverUnderUnders ? homeStats.OverUnderOvers + '/' + homeStats.OverUnderUnders: '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Runs ? awayStats.Runs : '-'}</div>
                    <div className={rowStyle.RowLabel}>Runs</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Runs ? homeStats.Runs : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Runs && !!awayStats.GamesPlayed ? (awayStats.Runs / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Runs per Game</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Runs && !!homeStats.GamesPlayed ? (homeStats.Runs / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                {/* <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.MoneyLineUnits ? awayStats.MoneyLineUnits : '-'}</div>
                    <div className={rowStyle.RowLabel}>Straight Up Units</div>
                    <div className={rowStyle.RowData}>{!!homeStats.MoneyLineUnits ? homeStats.MoneyLineUnits : '-'}</div>
                </div> */}
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.BattingAverage ? '.' + (awayStats.BattingAverage).toFixed(3).split('.')[1] : '-'}</div>
                    <div className={rowStyle.RowLabel}>Team Batting Average</div>
                    <div className={rowStyle.RowData}>{!!homeStats.BattingAverage ? '.' + (homeStats.BattingAverage).toFixed(3).split('.')[1] : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.OnBasePercentage ? '.' + (awayStats.OnBasePercentage).toFixed(3).split('.')[1] : '-'}</div>
                    <div className={rowStyle.RowLabel}>On Base Percentage</div>
                    <div className={rowStyle.RowData}>{!!homeStats.OnBasePercentage ? '.' + (homeStats.OnBasePercentage).toFixed(3).split('.')[1] : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.SluggingPercentage ? '.' + (awayStats.SluggingPercentage).toFixed(3).split('.')[1] : '-'}</div>
                    <div className={rowStyle.RowLabel}>Slugging Percentage</div>
                    <div className={rowStyle.RowData}>{!!homeStats.SluggingPercentage ? '.' + (homeStats.SluggingPercentage).toFixed(3).split('.')[1] : '-'}</div>
                </div>
            </div>
        </div>

        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Starting Pitching Overall</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.EarnedRunAverage ? awayPitcher.EarnedRunAverage.toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Earned Run Average</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.EarnedRunAverage ? homePitcher.EarnedRunAverage.toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.AvgInningsPitched ? awayPitcher.AvgInningsPitched : '-'}</div>
                    <div className={rowStyle.RowLabel}>Innings per Game</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.AvgInningsPitched ? homePitcher.AvgInningsPitched : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Hits ? awayPitcher.Hits : '-'}</div>
                    <div className={rowStyle.RowLabel}>Hits</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Hits ? homePitcher.Hits: '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Hits && !!awayStats.GamesPlayed ? (awayPitcher.Hits / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Hits per Game</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Hits && !!homeStats.GamesPlayed ? (homePitcher.Hits / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Runs ? awayPitcher.Runs : '-'}</div>
                    <div className={rowStyle.RowLabel}>Runs</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Runs ? homePitcher.Runs : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Runs && !!awayStats.GamesPlayed ? (awayPitcher.Runs / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Runs per Game</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Runs && !!homeStats.GamesPlayed ? (homePitcher.Runs / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Walks ? awayPitcher.Walks : '-'}</div>
                    <div className={rowStyle.RowLabel}>Walks</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Walks ? homePitcher.Walks : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Walks && !!awayStats.GamesPlayed ? (awayPitcher.Walks / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Walks per Game</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Walks && !!homeStats.GamesPlayed ? (homePitcher.Walks / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Strikeouts ? awayPitcher.Strikeouts : '-'}</div>
                    <div className={rowStyle.RowLabel}>Strikeouts</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Strikeouts ? homePitcher.Strikeouts : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayPitcher.Strikeouts && !!awayStats.GamesPlayed ? (awayPitcher.Strikeouts / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Strikeouts per Game</div>
                    <div className={rowStyle.RowData}>{!!homePitcher.Strikeouts && !!homeStats.GamesPlayed ? (homePitcher.Strikeouts / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
            </div>
        </div>
        <div className={cardStyle.Card}>
            <h3 className={`${cardStyle.CardTitle} h4`}>Team Hitting and Fielding Stats</h3>
            <div className={`${rowStyle.Rows}`}>
                <div className={rowStyle.Row}>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.awayTeam.displayName}</div>
                    <div className={rowStyle.RowLabel}></div>
                    <div className={`${rowStyle.RowData} ${rowStyle.RowTitle}`}>{matchupModel.matchup.gameView.homeTeam.displayName}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Runs ? awayStats.Runs : '-'}</div>
                    <div className={rowStyle.RowLabel}>Runs</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Runs ? awayStats.Runs : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.Runs && !!awayStats.GamesPlayed ? (awayStats.Runs / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                  <div className={rowStyle.RowLabel}>Runs per Game</div>
                  <div className={rowStyle.RowData}>{!!homeStats.Runs && !!homeStats.GamesPlayed ? (homeStats.Runs / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Hits  ? awayStats.Hits : '-'}</div>
                    <div className={rowStyle.RowLabel}>Hits</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Hits  ? homeStats.Hits : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Hits && !!awayStats.GamesPlayed ? (awayStats.Hits / awayStats.GamesPlayed).toFixed(2) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Hits per Game</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Hits && !!homeStats.GamesPlayed ? (homeStats.Hits / homeStats.GamesPlayed).toFixed(2) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Doubles && !!awayStats.Triples && !!awayStats.HomeRuns && !!awayStats.HomeRuns ? (awayStats.Doubles + awayStats.Triples + awayStats.HomeRuns) : '-'}</div>
                    <div className={rowStyle.RowLabel}>Extra Bases</div>
                    <div className={rowStyle.RowData}>{!!awayStats.Doubles && !!homeStats.Triples && !!homeStats.HomeRuns && !!homeStats.HomeRuns ? (homeStats.Doubles + homeStats.Triples + homeStats.HomeRuns) : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.HomeRuns ? awayStats.HomeRuns : '-'}</div>
                    <div className={rowStyle.RowLabel}>Home Runs</div>
                    <div className={rowStyle.RowData}>{!!homeStats.HomeRuns ? homeStats.HomeRuns : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                    <div className={rowStyle.RowData}>{!!awayStats.Strikeouts ? awayStats.Strikeouts  : '-'}</div>
                    <div className={rowStyle.RowLabel}>Strikeouts</div>
                    <div className={rowStyle.RowData}>{!!homeStats.Strikeouts ? homeStats.Strikeouts  : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                <div className={rowStyle.RowData}>{!!awayStats.Walks ? awayStats.Walks : '-'}</div>
                  <div className={rowStyle.RowLabel}>Walks</div>
                <div className={rowStyle.RowData}>{!!homeStats.Walks ? homeStats.Walks : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.OnBasePercentage ? '.' + (awayStats.OnBasePercentage).toFixed(3).split('.')[1] : '-'}</div>
                    <div className={rowStyle.RowLabel}>On Base Percentage</div>
                  <div className={rowStyle.RowData}>{!!homeStats.OnBasePercentage ? '.' + (homeStats.OnBasePercentage).toFixed(3).split('.')[1] : '-'}</div>
                </div>
                {/* <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>-</div>
                    <div className={rowStyle.RowLabel}>Runs Batted In</div>
                  <div className={rowStyle.RowData}>-</div>
                </div> */}
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.TeamLeftOnBase ? awayStats.TeamLeftOnBase : '-'}</div>
                    <div className={rowStyle.RowLabel}>Left on Base</div>
                  <div className={rowStyle.RowData}>{!!homeStats.TeamLeftOnBase ? homeStats.TeamLeftOnBase : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.StolenBases ? awayStats.StolenBases : '-'}</div>
                    <div className={rowStyle.RowLabel}>Stolen Bases</div>
                  <div className={rowStyle.RowData}>{!!homeStats.StolenBases ? homeStats.StolenBases : '-'}</div>
                </div>
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.Doubles ? awayStats.Doubles : '-'}</div>
                    <div className={rowStyle.RowLabel}>Double Plays</div>
                  <div className={rowStyle.RowData}>{!!homeStats.Doubles ? homeStats.Doubles : '-'}</div>
                </div>
                {/* <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.Triples ? awayStats.Triples : '-'}</div>
                    <div className={rowStyle.RowLabel}>Triple Plays</div>
                  <div className={rowStyle.RowData}>{!!homeStats.Triples ? homeStats.Triples : '-'}</div>
                </div> */}
                <div className={rowStyle.Row}>
                  <div className={rowStyle.RowData}>{!!awayStats.Errors ? awayStats.Errors : '-'}</div>
                    <div className={rowStyle.RowLabel}>Errors</div>
                  <div className={rowStyle.RowData}>{!!homeStats.Errors ? homeStats.Errors : '-'}</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BaseballStats;
