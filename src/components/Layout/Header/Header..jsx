import React from 'react';
import logoCleanHelper from "../../../assets/logo.png"
import Nav from "./Nav";
import "./Header.scss"

function Header() {
  return (
    <header className='header'>
      <img className='brand-logo' src={logoCleanHelper} alt="logo CleanHelper" />
      <h1>CleanHelper</h1>
      <Nav />
    </header>
  );
}

export default Header;
