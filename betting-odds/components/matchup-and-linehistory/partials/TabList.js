import { useRouter } from 'next/router'

import style from "/styles/components/Tabs.module.scss";

const tabList = [ "Matchup", "Line History"];

const TabList = ({ path }) => {
    const router = useRouter();
    return (
        <ul className={`${style.tabList}`} role="tablist">
            { tabList.map((item, index) =>
                <li key={index} className={`${style.tabItem} ${( path.indexOf(item.toLowerCase().replace(' ', '-')) > -1) ? style.tabLinkActive : ''}`}>
                    <a href={tabHref(item, router)} data-aatracker={`Page Controls - Matchup/Line History Tab - ${item}`} role="tab">{item}</a>
                </li>
            )}
        </ul>
    )
}

export default TabList;

function tabHref(item, router){
  const league = router.query.league;
  const gameId = router.query.gameId;
  if(item === 'Matchup'){
    return '/scores/' + league + '/matchup/' + gameId
  }
  if(item === 'Line History'){
    return '/betting-odds/' + league + '/line-history/' + gameId
  }
}
