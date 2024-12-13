import React from 'react';
import logoChoreOrganizer from "../../../assets/logo.png"
import Nav from "./Nav";
import "./Header.scss"

function Header() {
  return (
    <header className='header'>
      <img className='brand-logo' src={logoChoreOrganizer} alt="logoChoreOrganizer" />
      
      <Nav />
    </header>
  );
}

export default Header;
