import React from "react";
import "./Button.css";

export interface ButtonProps {
  label: string;
  classNames: string;
}

const Button = ({ label, classNames }: ButtonProps) => {
  return <button className={`btn ${classNames}`}>{label}</button>;
};

export default Button;
