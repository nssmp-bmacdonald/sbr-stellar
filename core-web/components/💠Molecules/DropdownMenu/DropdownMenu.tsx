import React from 'react';
import NavItem from '../../💎Atoms/NavItem/NavItem';

import { IDropdownMenu } from '../../../types/layout/menu';
import Avatar from '../../💎Atoms/Avatar/Avatar';
import Icon from '../../💎Atoms/Icon/Icon';

interface IDropdownMenuProps extends IDropdownMenu {
  header: string | null;
}

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  className,
  aClassName,
  ddClasses,
  text,
  icon,
  itemId,
  menu,
  header,
}) => {
  return (
    <>
      {text ? <div className="visually-hidden">{text}</div> : ''}
      <ul className={`${className}`}>
        <li className="nav-item dropdown">
          <a
            className={`nav-link d-flex ${aClassName}`}
            href="#"
            id={itemId}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar
              text="Avatar text content"
              className="rounded-circle"
              src={icon ?? ''}
              alt="User avatar image"
              size="sm"
              icon=""
            />
            <Icon icon={"mat-icon-expand-more icon-white ms-1 mt-3 d-lg-none d-xl-none"} text="expand menu"/>         
          </a>
          <ul className={ddClasses} aria-labelledby={itemId}>
            <li className="header divider-small text-uppercase">{header}</li>
            {menu?.map((menu, id) => (
              <li key={id}>
                <NavItem active={false} {...menu} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default DropdownMenu;
