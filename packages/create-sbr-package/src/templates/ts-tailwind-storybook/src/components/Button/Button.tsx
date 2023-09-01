import React from "react";
import "./Button.css";
import "tailwindcss/tailwind.css";

export interface ButtonProps {
  label: string;
  className: string;
}

const Button = ({ label, className }: ButtonProps) => {
  return <button className={`text-3xl font-bold ${className}`}>{label}</button>;
};

export default Button;
