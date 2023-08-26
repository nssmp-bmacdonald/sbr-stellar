import { useState } from 'react';

import ddStyle from '/styles/components/Dropdown.module.scss';

const OddsFormatDropDown = ({ oddsFormat, handler }) => {
  const list = ['American', 'Decimal'];
  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    }

    const setOddsFormat = (e) => {
        let format = e.target.getAttribute("data-format");
        handler(format);
        setIsOpen(false);
    }

    return (
        <div className={`controls-item ${ddStyle.DropDownContainer}`}>
          <span className="label">Odds Format</span>
          <div className={`${ddStyle.Dropdown} ${(isOpen) ? ddStyle.DropDownOpen : ''}`}>
              <button className={`${ddStyle.DropdownButton} ${ddStyle.MarketSelector}`}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-label='Select the format for the odds'
                  onClick={toggleDropdown}>{oddsFormat}</button>
              <ul className={ddStyle.DropdownList}>
                  { list.map((item, index) =>
                    <li
                      key={index}
                      onClick={setOddsFormat} data-format={item}
                      className={`${(item === oddsFormat) ? ddStyle.Item +' '+ ddStyle.Selected : ddStyle.Item}`}>{item}</li>
                    )
                  }
              </ul>
          </div>
        </div>
    )
}

export default OddsFormatDropDown;
