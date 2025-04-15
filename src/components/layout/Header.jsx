import React from "react";
import logo from "../../assets/react.svg";
export const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>Blog</h1>
    </header>
  );
};
