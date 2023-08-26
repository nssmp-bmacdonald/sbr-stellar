import { useState } from 'react';


import ddStyle from '/styles/components/Dropdown.module.scss';
import styles from '/styles/page-controls/MarketSelector.module.scss';

import { getMenuList } from '/data/market-data';

const GameMarketSelector = ({ list, market, setMarketSelector, isBreakpoint }) =>{
    const [gameMarket, setGameMarket] = useState(market);
    const [isOpen, setIsOpen] = useState(false);

    const marketListsObj = list ?? getMenuList('default');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const setMarketChange = (e) => {
        let format = e.target.getAttribute("data-format");
        setGameMarket(format);
        setMarketSelector(format);
        setIsOpen(false);
    }

    return (
        <div className={`${(isBreakpoint) ? ddStyle.Dropdown : styles.marketListContainer} ${(isOpen) ? ddStyle.DropDownOpen : ''}`}>
            {
                (isBreakpoint) ?
                    <button className={`${ddStyle.DropdownButton} ${ddStyle.MarketSelector}`}
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-label='Select the Division'
                        onClick={toggleDropdown}>
                            {marketListsObj.find(item => gameMarket == item.url).title}
                    </button>
                :
                    null
            }
            <ul className={`${(isBreakpoint) ? ddStyle.DropdownList : styles.marketList} ${ddStyle.large}`}>
                {
                    marketListsObj.map((item, index) =>
                        <li key={index} className={`${ddStyle.Item} ${ddStyle.FitList} ${gameMarket == item.url ? isBreakpoint ? ddStyle.Selected : styles.selected : ""}`}
                            onClick={setMarketChange}
                            data-format={item.url}>
                                {item.title}
                        </li>
                    )
                }
            </ul>

        </div>
    )
}

export default GameMarketSelector;