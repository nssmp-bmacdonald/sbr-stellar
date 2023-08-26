import { useState } from 'react';

import ddStyle from '/styles/components/Dropdown.module.scss';

const GameDropdown = ({ list, selected, setDropdown }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const setDropdownSelection = (e) => {
        let format = e.target.getAttribute("data-format");
        setDropdown(format);
        setIsOpen(false);
    }
    return (
        <div className={`${ddStyle.Dropdown} ${(isOpen) ? ddStyle.DropDownOpen : ''}`}>
            <button className={`${ddStyle.DropdownButton} text-white`}
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}>{selected}</button>
            <ul className={ddStyle.DropdownList}>
                { list.map((item, index) =>
                  <li
                    key={index}
                    onClick={setDropdownSelection}
                    data-format={item}
                    className={`${(item === selected) ? ddStyle.Item +' '+ ddStyle.Selected : ddStyle.Item}`}>
                        {item}
                    </li>
                  )
                }
            </ul>
        </div>
    )
}

export default GameDropdown;