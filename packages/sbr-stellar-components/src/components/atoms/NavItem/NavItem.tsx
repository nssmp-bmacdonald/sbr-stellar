import React from "react";
import Icon from "../Icon";

const NavItem: React.FC<any> = ({
  text,
  href,
  className,
  aaTracker,
  target,
  rel,
  icon,
  active,
  action,
}) => {
  return href !== "" ? (
    <a
      href={href}
      className={`${className}`}
      data-aa-tracker={aaTracker}
      target={target}
      rel={rel}
      onClick={action}
    >
      {icon !== "" ? <Icon icon={icon} text={text} /> : <>{text}</>}
    </a>
  ) : (
    <>{icon !== "" ? <Icon icon={icon} text={text} /> : <>{text}</>}</>
  );
};

export default NavItem;
