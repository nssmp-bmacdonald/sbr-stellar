import React from "react";
import "./Header.css";

interface HeaderProps {
  label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => {
  return <div className="sbr-header">Header: {label}</div>;
};

export default Header;
