import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.css";

interface HeaderProps {
  label: string;
  link: string;
}

const Header: React.FC<HeaderProps> = ({ label, link }) => {
  return (
    <div className="sbr-header text-center pt-3">
      SBR Header:
      <button className="btn btn-primary">
        <a className="text-danger" href={link}>
          {label}
        </a>
      </button>
    </div>
  );
};

export default Header;
