import React from "react";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.css";

interface FooterProps {
  label: string;
  link: string;
}

const Footer: React.FC<FooterProps> = ({ label, link }) => {
  return (
    <div className="sbr-footer">
      SBR Footer:
      <a href={link}>{label}</a>
    </div>
  );
};

export default Footer;
