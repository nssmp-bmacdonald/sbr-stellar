import Link from 'next/link';

import { useState, useEffect, useRef } from 'react';

import leagueData, { isSoccerLeague, allLeagueData } from '/data/parameter-data';

import { ODDS_URL } from '/constants/seo';
import { MENU_SPORTS} from '/constants/menu';

const returnNameLeague = (league) => {
   let gameName = "";
   if (league === "NFL" || league === "NCAAF" || league === "CFL") {
      gameName = 'football';
    }else if (league === "MLB") {
      gameName = 'baseball';
   }else if (league === "NHL") {
      gameName = 'hockey';
   }else if (league === "NCAAB" || league === "NBA" || league === "WNBA") {
      gameName = 'basketball';
   }else if (isSoccerLeague(league)) {
      gameName = 'soccer';
   }
   return gameName;
}

const menuLeagueName = (league) => {
   if (isSoccerLeague(league)) {
      return 'Soccer';
   } else {
      return league;
   }
}

const LeaguesDropdown = ( props ) => {
   const node = useRef();

   const [showMenu, setShowMenu ] = useState(false);
   const [showSportMenu, setShowSportMenu ] = useState(returnNameLeague(props.league));
   const [location, setLocation ] = useState("");

   useEffect(() => {
        (typeof window !== "undefined") ? setLocation(window.location.href) : setLocation("");
         document.addEventListener("mousedown", handleClick);
         return () => {
            document.removeEventListener("mousedown", handleClick);
         };
    }, []);

    const handleClick = e => {
         if (!node.current.contains(e.target)) {
            setShowMenu(false);
         }
    }

    const openMenu = () => {
      setShowMenu(!showMenu);
      const nameLeague = ( props.league === undefined ) ? "" : props.league;
      //props.asPath.indexOf(nameLeague.toLowerCase()) > -1
      ( allLeagueData.filter(league => league.leaguename === nameLeague).length > 0) ? setShowSportMenu(returnNameLeague(nameLeague)) : setShowSportMenu("");
   }
   const openSportMenu = e => {
      let dataCy = e.currentTarget.getAttribute("data-cy").replace("dropdown-leagues-sport-", "");
      (showSportMenu === dataCy) ? setShowSportMenu("") : setShowSportMenu(dataCy);
   }

   const openPropsLeague = e => {
      let dataCy = e.currentTarget.getAttribute("data-cy").replace("dropdown-leagues-toplink-", "");
      setShowSportMenu(dataCy);
   }

    return (
        <div ref={node} id="leaguesDropdown" className="dropdown-nav" data-cy="dropdown-leagues">
            <button className="button" onClick={openMenu}>
               <span className='text'>{( props.league === "Betting" || props.league === undefined ) ? "Leagues" : menuLeagueName(props.league) }</span>
               <span className={showMenu ? 'icon rotate' : 'icon'}></span>
            </button>
            <div className={showMenu ? 'options open' : 'options'}>
               <div className={ (showSportMenu !== "" && showMenu ) ? "main-nav close" : "main-nav" }>
                  <div className="top">
                     <span className="title">Top Links</span>
                     <ul className="content-menu" role="menu">
                        <li className="link" role="menuitem">
                           <Link
                              href={ODDS_URL}>
                              <a target="_self"
                                 data-aatracker="Menu - Today"
                                 rel=""
                                 data-cy="dropdown-leagues-toplink-today">
                                    <span className="text">Today</span>
                              </a>
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div className="divider"></div>
                  <div className="featured">
                     <span className="title">Featured</span>
                     <ul className="content-menu" role="menu">
                        {
                           leagueData.map((item, index) =>
                              <li key={index} className="link" role="menuitem">
                                 <Link
                                    href={`${ODDS_URL+ item.parameter }`}>
                                       <a
                                          className={(location.indexOf(item.parameter) > -1) ? "selected top-six" : "top-six"}
                                          data-aatracker={`Menu - ${item.leaguename}`}
                                          data-cy={ `dropdown-leagues-toplink-${item.parameter.split("-").pop()}`}
                                          onClick={openPropsLeague}>
                                             <span className="text">{item.leaguename}</span>
                                       </a>
                                 </Link>
                              </li>
                           )
                        }
                     </ul>
                  </div>
               </div>
               <div className={ (showSportMenu !== "" && showMenu ) ? "sports collapsed" : "sports" }>
                  <span className="title">Sports</span>
                  <ul className="content-menu" role="menu">
                     {
                        MENU_SPORTS.map((item, index) =>
                           <li
                           key={index}
                           onClick={openSportMenu}
                           data-cy={`dropdown-leagues-sport-${item.replace(" ", "").toLowerCase()}`}
                           className={ (showSportMenu === "" )
                              ?
                                 ( returnNameLeague(props.league) === item.replace(" ", "").toLowerCase() ) ?  "link selected" : "link"
                              : (showSportMenu === item.replace(" ", "").toLowerCase() && showMenu ) ? "link selected" : "link" }
                           role="menuitem">
                              <div className="icon">
                                 <i className={`sbr-icon-${item.toLowerCase().split(" ", 1)}`}></i>
                              </div>
                              <button className="text" aria-haspopup="true" aria-expanded={ (showSportMenu === item.replace(" ", "").toLowerCase() && showMenu ) ? "true" : "false" }>{item}</button>
                           </li>
                       )
                     }
                  </ul>
               </div>
               <div className={(showSportMenu === "baseball" && showMenu || ( showSportMenu === "" && returnNameLeague(props.league) === "baseball") ) ? "leagues  open" : "leagues hide" }>
                  <span className="title">Leagues</span>
                  <div id="league-desktop-#380" className="content-menu">
                     <Link
                        href={`${ODDS_URL}mlb-baseball/`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - MLB"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-mlb">
                              <span className="text">MLB</span><span className="subText">USA</span>
                        </a>
                     </Link>
                  </div>
               </div>
               <div className={(showSportMenu === "basketball" && showMenu || ( showSportMenu === "" && returnNameLeague(props.league) === "basketball") ) ? "leagues open" : "leagues hide" }>
                  <span className="title">Leagues</span>
                  <div id="league-desktop#379" className="content-menu">
                     <Link
                        href={`${ODDS_URL}nba-basketball/`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - NBA"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-nba">
                              <span className="text">NBA</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                     <Link
                        href={`${ODDS_URL}ncaa-basketball`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - NCAAB"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-ncaab">
                              <span className="text">NCAAB</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}wnba-basketball`} >
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - WNBA"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-wnba">
                              <span className="text">WNBA</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                  </div>
               </div>
               <div className={(showSportMenu === "football" && showMenu || ( showSportMenu === "" && returnNameLeague(props.league) === "football") ) ? "leagues open" : "leagues hide" }>
                  <span className="title">Leagues</span>
                  <div id="league-desktop-#378" className="content-menu">
                     <Link
                        href={`${ODDS_URL}nfl-football`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - NFL"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-nfl">
                              <span className="text">NFL</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                     <Link
                        href={`${ODDS_URL}college-football`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - NCAAF"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-ncaaf">
                              <span className="text">NCAAF</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                     <Link
                        href={`${ODDS_URL}cfl-football`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - CFL"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-cfl">
                              <span className="text">CFL</span>
                              <span className="subText">Canada</span>
                        </a>
                     </Link>
                  </div>
               </div>
               <div className={(showSportMenu === "soccer" && showMenu ) ? "leagues open" : "leagues hide" }>
                  <span className="title">Leagues</span>
                  <div id="league-desktop-#375" className="content-menu medium">
                     <Link href={`${ODDS_URL}english-premier-league`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - England Premier League"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-englandpremierleague">
                              <span className="text">England Premier League</span>
                              <span className="subText">England</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}major-league-soccer`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - MLS"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-mls">
                            <span className="text">MLS</span>
                            <span className="subText">USA</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}ligue1`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - Ligue 1"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-ligue1">
                            <span className="text">Ligue 1</span>
                            <span className="subText">France</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}serie-a`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - Serie A"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-seriea">
                            <span className="text">Serie A</span>
                            <span className="subText">Italy</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}bundesliga`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - Bundesliga"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-bundesliga">
                            <span className="text">Bundesliga</span>
                            <span className="subText">Germany</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}la-liga`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - La Liga"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-laliga">
                            <span className="text">La Liga</span>
                            <span className="subText">Spain</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}champions-league`} >
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - UEFA Champions League"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-uefachampionsleague">
                            <span className="text">UEFA Champions League</span>
                            <span className="subText">International</span>
                        </a>
                     </Link>
                     <Link href={`${ODDS_URL}europa-league`}>
                        <a className="link"
                         data-aatracker="Expandable Menu - Sub-Menu Item - UEFA Europa League"
                         target="_self"
                         rel=""
                         data-cy="dropdown-leagues-league-uefaeuropaleague">
                            <span className="text">UEFA Europa League</span>
                            <span className="subText">International</span>
                        </a>
                     </Link>
                  </div>
               </div>
               <div className={(showSportMenu === "hockey" && showMenu || ( showSportMenu === "" && returnNameLeague(props.league) === "hockey") ) ? "leagues open" : "leagues hide" }>
                  <span className="title">Leagues</span>
                  <div id="league-desktop-#373" className="content-menu">
                     <Link
                        href={`${ODDS_URL}nhl-hockey`}>
                        <a className="link"
                           data-aatracker="Expandable Menu - Sub-Menu Item - NHL"
                           target="_self"
                           rel=""
                           data-cy="dropdown-leagues-league-nhl">
                              <span className="text">NHL</span>
                              <span className="subText">USA</span>
                        </a>
                     </Link>
                  </div>
               </div>

            </div>
         </div>
    )
}
export default LeaguesDropdown;
