import { useState } from 'react';

import styles from '/styles/page-controls/MarketSelector.module.scss';
import ddStyle from '/styles/components/Dropdown.module.scss';

import { useRouter } from 'next/router'
import Link from 'next/link'

import { isSoccerLeague } from '/data/parameter-data';
import { getMarketData, getMenuList } from '/data/market-data';
import { ODDS_URL, FAVORITES_URL, FUTURES_URL } from '/constants/seo';

const MarketSelector = ({isBreakpoint}) => {
  const router = useRouter();
  const isFavorites = router.pathname.includes('/favorites');
  const isFuture = router.pathname.includes('/futures');
  var selectedLeague = router.query.league;
  var selectedType = isFuture ? (router.query.futureType ? router.query.futureType[0] : 'to-win-outright') : router.query.oddsType;
  var selectedOddsScope = router.query.oddsScope;
  var date = router.query.date;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOdds, setIsOpenOdds] = useState(false);

  const toggleDropdownOdds = () => {
      setIsOpenOdds(!isOpenOdds);
      setIsOpen(false);
  }
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIsOpenOdds(false);
  }

  // Catch all optional route is returned as an array, so we need to step into it
  selectedOddsScope = selectedOddsScope !== undefined ? selectedOddsScope[0] : 'full-game';

  // The default oddstype is pointspread unless its hockey or baseball its moneyline
  var defaultOddsType = 'pointspread'

  if(selectedLeague === 'mlb-baseball' || selectedLeague === 'nhl-hockey' || isSoccerLeague(selectedLeague))
    defaultOddsType = 'money-line'
  selectedType = selectedType ?? defaultOddsType;

  // If league is not a param were on the compare odds pages
  if(selectedLeague === undefined){
    selectedLeague = 'compare';
  }

  const marketGroupsObj = getMarketData(selectedLeague);
  const marketListsObj = getMenuList(isFuture ? 'futures' : 'default');

  return (
    <div className={`${(isBreakpoint) ? 'controls-mobile' : ''}`}>
      {
        !isFuture ?
          <>
          <div className={`controls-item ${(isBreakpoint) ? ddStyle.DropDownContainer : styles.marketGroupsContainer}`}>
            { (isBreakpoint) ? <span className="label">Game Time</span> : null }
            <div className={`${(isBreakpoint) ? ddStyle.Dropdown : ''} ${(isOpenOdds) ? ddStyle.DropDownOpen : ''}`}>
              {
                (isBreakpoint) ?
                  <button className={`${ddStyle.DropdownButton} ${ddStyle.MarketSelector}`}
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded={isOpenOdds}
                      aria-label='Select the Game Time'
                      onClick={toggleDropdownOdds}>
                          {marketGroupsObj.find(item => item.name === selectedOddsScope).title}
                  </button>
              :
                null
              }
              <ul className={`${(isBreakpoint) ? ddStyle.DropdownList : styles.marketGroups} `}>
                {
                  marketGroupsObj.map((item, index) =>
                    <li key={index} className={`${styles.fitList} ${ddStyle.Item} ${isBreakpoint && selectedOddsScope === item.name ? ddStyle.Selected : ''} `}>
                      {/* <span className={selectedOddsScope === item.name ? styles.selected : ""}> */}
                        <Link href={OddsLink(selectedType, item.name, selectedLeague, date, isFavorites)}>
                          <a className={selectedOddsScope === item.name ? styles.selected : ""} data-aatracker={`Page Controls - Market Selector - ${item.title}`}>{item.title}</a>
                        </Link>
                      {/* </span> */}
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          </>
        : null
      }
      <div className={`controls-item ${ddStyle.DropDownContainer}`}>
        { (isBreakpoint) ? <span className="label">Betting Lines</span> : null }
        <div className={`${(isBreakpoint) ? ddStyle.Dropdown : ''} ${(isOpen) ? ddStyle.DropDownOpen : ''}`}>
            {
                (isBreakpoint) ?
                  <button className={`${ddStyle.DropdownButton} ${ddStyle.MarketSelector}`}
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-label='Select Betting Lines'
                      onClick={toggleDropdown}>
                          {marketListsObj.find(item => item.url === selectedType).title}
                  </button>
                :
                  null
            }
            <ul className={`${(isBreakpoint) ? ddStyle.DropdownList : styles.marketList} `}>
              {
                  marketListsObj.map((item, index) =>
                    <li key={index} className={`${styles.fitList} ${ddStyle.Item} ${isBreakpoint && selectedType === item.url ? ddStyle.Selected : ''} `}>
                        <Link href={OddsLink(item.url, selectedOddsScope, selectedLeague, date, isFavorites, isFuture)}>
                          <a className={selectedType === item.url ? styles.selected : ""} data-aatracker={`Page Controls - Market Selector - ${item.title}`}>{item.title}</a>
                        </Link>
                    </li>
                  )
              }
            </ul>
        </div>
      </div>

    </div>
  )
}

export default MarketSelector;

function OddsLink(selectedOddsType, selectedOddsScope, selectedLeague, date, isFavorites, isFuture){
  var oddsScopeLink = '';
  var defaultOddsType = 'pointspread'
  if (selectedLeague === 'mlb-baseball' || selectedLeague === 'nhl-hockey'|| isSoccerLeague(selectedLeague))
    defaultOddsType = 'money-line'
  if(selectedOddsScope === 'full-game' && selectedOddsType === defaultOddsType){
    oddsScopeLink = isFavorites ? FAVORITES_URL : ODDS_URL;
    if(selectedLeague != 'compare')
      oddsScopeLink = oddsScopeLink+selectedLeague
  }
  else{
    oddsScopeLink = isFavorites ? FAVORITES_URL : `${ODDS_URL}${selectedLeague}/`;
    if (isFuture)
      oddsScopeLink += `${FUTURES_URL}${selectedOddsType}`;
    else
      oddsScopeLink += `${selectedOddsType}/${selectedOddsScope}`;
  }
  if(date != undefined ){
    oddsScopeLink = oddsScopeLink + '?date=' + date;
  }
  return oddsScopeLink;
}
