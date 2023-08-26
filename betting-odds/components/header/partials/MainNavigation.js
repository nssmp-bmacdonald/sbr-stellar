import Link from 'next/link';

import LeaguesDropdown from './LeaguesDropdown';

import leagueData, { allLeagueData } from '/data/parameter-data';
import { getFavoriteData } from '/data/favorite-data';
import { ODDS_URL, SCORES_URL } from '/constants/seo';
import { MENU_LEAGUE} from '/constants/menu';


const MainNavigation = ({ isMobile, expand, league, urlPath, favoriteCount }) => {
    const favCount = favoriteCount ?? getFavoriteData().length;
    return(
        <div className={ expand && isMobile ? "pages-menu hide" : "pages-menu" }>
            <nav aria-label="Sportsbook Review Main Navigation">
                <LeaguesDropdown league={league} asPath={urlPath} />
                <div className="space-between">
                        {
                            ( league === undefined || league === "Betting" ) ?
                                <ul className="row" role="menubar">
                                {
                                    leagueData.map((item, index) =>
                                        <li key={index} className="link" role="menuitem">
                                            <Link
                                                href={`${ODDS_URL+ item.parameter }`}>
                                                <a
                                                    data-aatracker={`Menu - ${item.leaguename}`}
                                                    className={( league === item.leaguename ) ? "item selected" : "item"}
                                                    data-cy={ `subheader-${item.leaguename.toLowerCase()}`}>
                                                        {item.leaguename}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                                </ul>
                            :
                                allLeagueData.map((item, index) =>
                                    (league === item.leaguename) ?
                                        <LeagueMenu key={index} league={league} urlPath={urlPath} leaguePath={item.parameter} />
                                    :
                                        null
                                )
                        }
                    {
                        !isMobile ?
                        <>
                            <ul className="sub-row" role="menu">
                                <li className="link" role="menuitem">
                                    <Link
                                        href="/betting-odds/user/favorites/"
                                        passHref>
                                        <a className="item"
                                        target="_self"
                                        data-aatracker="Page Controls - Favorites"
                                        data-cy="subheader-favorites"
                                        rel="">Favorites
                                            <span key={`${favCount}`} className={`${favCount > 0 ? "badge-style" : "badge-style empty-badge" }`}>{favCount}</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </>
                        : null
                    }
                </div>
            </nav>
        </div>
    );
}

const LeagueMenu = ({ league, urlPath, leaguePath }) => {
    return (
        <>
        {
            MENU_LEAGUE.map((item, index) =>
                (league === item.name ) ?
                    <ul key={index} className="row" role="menubar">
                        {
                            item.subnav.map((navitem, navindex) =>
                                <li key={navindex} className="link" role="menuitem">
                                    <Link
                                        href={`${(item.url[navindex] === 'matchups') ? SCORES_URL : ODDS_URL}${leaguePath}/${item.url[navindex]}`}>
                                        <a id={`navindex-${navindex}`} data-aatracker={`Menu - ${navitem}`} className={
                                            (urlPath.split('/').length <= 3 && navindex === 0) ?
                                                (urlPath.indexOf(`${(item.url[navindex] === 'matchups') ? SCORES_URL : ODDS_URL}${leaguePath}`) > -1  && urlPath.split('/').length <= 3 ) ? 'item selected' : 'item'
                                            :
                                                (urlPath.split('/').length > 3 && navindex === 0) ?
                                                    'item'
                                                :
                                                    (urlPath.indexOf(`${(item.url[navindex] === 'matchups') ? SCORES_URL : ODDS_URL}${leaguePath}/${item.url[navindex]}`) > -1 ) ?  'item selected' : 'item' }
                                            >
                                            {navitem}
                                        </a>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                :
                    null
            )
        }
        </>
    );
}
export default MainNavigation;
