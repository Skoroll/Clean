
import React, { useRef } from 'react';
import logoChoreOrganizer from "../../assets/logo.png";
import Articles from '../../components/Articles/Articles';
import articlesText from "../../assets/TextContent/articles.json";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'ChoreOrganizer';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  const sectionRef = useRef(null);

  const scrollDown = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='home'>
      <div className='home__starter' onClick={scrollDown}>
        <img src={logoChoreOrganizer} alt='Cliquer pour continuer' />
        <div className='home__starter--call'>
          <h1>Découvrir ChoreOrganizer ?</h1>
          <i className="fa-solid fa-arrow-down" />
        </div>

      </div>
      <div className='ref' ref={sectionRef} />
      <div className='home__content' >
        <div className="home__content--beta">
          <div className="beta__box">
            <div className="beta__box--annoncement">
              <h2>Site actuellement en version beta</h2>
              <p>Le site est actuellement dans une version de test.</p>
              <p>Les fonctionnalités arriverons petit à petit.</p>
            </div>
          </div>
          <div className="beta__box--features">
            <div className="beta__box--inside">
              <h3>Ce qui est faisable actuellement :</h3>
              <ul>
                <li>Créer un compte,</li>
                <li>S'identifier,</li>
                <li>Changer les informations du compte,</li>
                <li>Voir les tâches par pièces,</li>
                <li>Ajouter/supprimer des tâches,</li>
                <li>Consulter les différentes pages du site,</li>
                <li>Utiliser le système de contact pour contacter le support.</li>
              </ul>
            </div>
            <div className="beta__box--inside">
              <h3>Ce qui viendra plus tard :</h3>
              <ul>
                <li>Ajouter des pièces personnalisée</li>
                <li>Modifier les pièces d'un utilisateur</li>
                <li>Modifier une tâche</li>
                <li>Système de succès</li>
                <li>Système de classement</li>
                <li>Système de profil utilisateur consultable</li>
                <li>Déployement des "équipements ménagers"</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="home__content__sign" >
          <div className="home__content__sign--up">
            <h2>Créez votre compte</h2>
            <p>Pour utiliser ChoreOrganizer vous devez créer un compte
              <br /> Pas d'inquiètudes, c'est gratuit !
            </p>
            <Link to="sign-up" className="sign-btn">Je crée mon compte</Link>
          </div>
          <div className="home__content__sign--in">
            <h2>Se connecter</h2>
            <p>Une fois connecté, organisez votre ménage comme bon vous semble.
              <br /> Vous allez y arriver, on croit en vous !
            </p>
            <Link to="sign-in" className="sign-btn">Je me connecte</Link>
          </div>
        </div>
        <div className='articles__wrapper'>
          {articlesText.map((articles) => (
            <Articles key={articles.id} articles={articles} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;
