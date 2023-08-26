import React from "react";
import "./Footer.css";

interface FooterProps {
  label: string;
}

const Footer: React.FC<FooterProps> = ({ label }) => {
  return <div className="sbr-footer">Header: {label}</div>;
};

export default Footer;
