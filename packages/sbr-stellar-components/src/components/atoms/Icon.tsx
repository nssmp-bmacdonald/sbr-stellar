import React from "react";

export interface IconInterface {
  text?: string;
  icon: string;
}
[];

const Icon: React.FC<IconInterface> = ({ text, icon }) => {
  return (
    <>
      {icon === "" ? (
        <>{text}</>
      ) : (
        <>
          <span className={`${icon === "" ? "" : icon} `}></span>
          <span className="visually-hidden">{text}</span>
        </>
      )}
    </>
  );
};

export default Icon;
