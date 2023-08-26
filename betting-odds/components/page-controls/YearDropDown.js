import { useState } from 'react';

import ddStyle from '/styles/components/Dropdown.module.scss';
import getTimeHelpers from '/helpers/get-time-helpers';

const currentTime = new Date();

const YearDropDown = ({ range, iterate, handleYear }) => {
    const [isOpen, setIsOpen] = useState(false);

    var listSeasons = [];
    for ( let i = 0; i < iterate; i++ ) {
        listSeasons.push(getTimeHelpers.getYearRange(currentTime, i));
    }

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }

    const setYearRange = (e) => {
        let season = e.target.getAttribute("data-format");
        handleYear(season);
        setIsOpen(false);
    }

    return (
        <>
          <label className='label-matchup'>Select the Season</label>
          <div className={`${ddStyle.Dropdown} ${(isOpen) ? ddStyle.DropDownOpen : ''}`}>
              <button className={`${ddStyle.DropdownButton} ${ddStyle.MarketSelector}`}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}>{range}</button>
              <ul className={ddStyle.DropdownList}>
                  { listSeasons.map((item, index) =>
                    <li
                      key={index}
                      onClick={setYearRange}
                      data-format={item}
                      className={`${(item === range) ? ddStyle.Item +' '+ ddStyle.Selected : ddStyle.Item}`}>{item}</li>
                    )
                  }
              </ul>
          </div>
        </>
    )
}

export default YearDropDown;
