import {allLeagueData} from '/data/parameter-data';
import { ODDS_URL, SCORES_URL, MATCHUP_URL, LINE_HISTORY_URL } from '/constants/seo';


const getUrlHelpers = {
  getOddsUrl: function(id, name, isBigSix) {
        let url = '';

        allLeagueData.map(x => {
          if (x.leaguename === name) {
            if(!isBigSix){
              url = ''
            } else {
              // url = `${ODDS_URL + x.parameter}/odds/${id}/`;
              url = `${SCORES_URL + x.parameter}${MATCHUP_URL}${id}/`;
            }
          }
        });
        return url;
    },
    getMatchupUrl: function(id, name) {
        let url = '';
        allLeagueData.map(x => {
          if (x.leaguename === name) {
            url = `${SCORES_URL + x.parameter}${MATCHUP_URL}${id}`;
          }
        });
        return url;
    },
    getLineHistoryUrl: function(id, name) {
      let url = '';
      allLeagueData.map(x => {
        if (x.leaguename === name) {
          url = `${ODDS_URL + x.parameter}${LINE_HISTORY_URL}${id}`;
        }
      });
      return url;
  }
}

export default getUrlHelpers;
