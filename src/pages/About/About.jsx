
import React, { useRef } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./About.scss";

function About() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'A propos - ChoreOrganizer';
  }, []);

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);
  return (
    <div className='about'>
      <h1>ChoreOrganizer, qui sommes-nous ?</h1>

      <div className='our-mission'>
        <h2>Notre mission</h2>
        <p>Notre but est de proposer une plateforme pour simplifier le menage pour tous.</p>
      </div>
      <div className="about-us">
        <h2>Qui sommes-nous ?</h2>
        <p>Skorol, ou GICQUEL Yann, fraichement diplômé de sa formation de développeur web chez OpenClassRooms.
          <br />
          L'idée de cette application m'est venue après m'être rendu compte de la difficulté que représentent certaines tâches pour certaines personnes (TDAH notament mais pas exclusivement).
          <br />
          Le 2nd but de cette appli est de me permettre de remplir mon  <strong><a href='https://skoroll.github.io/portfolio/' target='_blank'>portfolio</a></strong> afin de m'aider à obtenir du travail dans une entreprise partageant mes valeurs.
        </p>
      </div>
    </div>
  );
}

export default About;
