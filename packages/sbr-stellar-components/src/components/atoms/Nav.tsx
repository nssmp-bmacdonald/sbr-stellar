import React from "react";
import NavItem from "./NavItem";
import { IMenu } from "../../../constants";

interface NavProp {
  className: string;
  menu: IMenu[];
}

const Nav: React.FC<NavProp> = ({ className, menu }) => {
  return (
    <ul className={`${className}`} role="menu">
      {menu?.map((menu: any, id: any) => (
        <li key={id} className="nav-item" role="menuitem">
          <NavItem active={false} {...menu} />
        </li>
      ))}
    </ul>
  );
};

export default Nav;
