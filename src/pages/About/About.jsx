
import React, { useRef } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./About.scss";

function About() {

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);
  return (
    <div className='about'>
      <h1>CleanHelper, qui sommes-nous ?</h1>

      <div className='our-mission'>
        <h2>Notre mission</h2>
        <p>Notre but est de proposer une plateforme pour simplifier le menage pour tous.</p>
      </div>
      <div className="about-us">
        <h2>Qui sommes-nous ?</h2>
        <p>Skorol, jeune entreprise de développement web </p>
      </div>
    </div>
  );
}

export default About;
