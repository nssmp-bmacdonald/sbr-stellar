import React from "react";

import "./Button.css";

const Button = ({ label, classNames }) => {
  return <button className={`btn ${classNames}`}>{label}</button>;
};

export default Button;
