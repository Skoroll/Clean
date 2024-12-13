import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = '404 - ChoreOrganizer';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='not-found'>
      <p className='not-found--404'>404 !</p>
      <p className="not-found--text">Oh oh ! Comment êtes vous arrivé ici ?</p>
      <Link to="/" className="not-found--link">Retourner au site</Link>
    </div>
  );
}

export default NotFound;
