import React from 'react';
import { INav } from '../../../types/layout/menu';
import NavItem from '../../💎Atoms/NavItem/NavItem';

const Nav: React.FC<INav> = ({ className, menu }) => {
  return (
    <ul className={`${className}`} role="menu">
      {menu?.map((menu, id) => (
        <li key={id} className="nav-item" role="menuitem">
          <NavItem active={false} {...menu} />
        </li>
      ))}
    </ul>
  );
};

export default Nav;
