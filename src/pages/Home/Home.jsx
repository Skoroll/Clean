
import React, { useRef } from 'react';
import logoCleanHelper from "../../assets/logo.png";
import Articles from '../../components/Articles/Articles';
import articlesText from "../../assets/TextContent/articles.json";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  const sectionRef = useRef(null);

  const scrollDown = () =>{
    sectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='home'>
      <div className='home__starter'  onClick={scrollDown}>
        <img src={logoCleanHelper} alt='Cliquer pour continuer' />
        <div className='home__starter--call'>
          <h1>Découvrir CleanHelper ?</h1>
          <i className="fa-solid fa-arrow-down"  />
        </div>
        
      </div>
      <div className='ref' ref={sectionRef}/>
      <div className='home__content' >
      <div className="home__content__sign" >
        <div className="home__content__sign--up">
          <h2>Créez votre compte</h2>
          <p>Pour utiliser CleanHelper vous devez créer un compte
            <br /> Pas d'inquiètudes, c'est gratuit !
          </p>
            <Link to="sign-up" className="sign-btn">Je crée mon compte</Link>
        </div>
        <div className="home__content__sign--in">
        <h2>Se connecter</h2>
          <p>Une fois connecté, organiser votre ménage comme bon vous semble.
            <br /> Vous allez y arriver, on croit en vous !
          </p>
            <Link to="sign-in" className="sign-btn">Je me connecte</Link>
        </div>
      </div>
      <div className='articles__wrapper'>
        {articlesText.map((articles) =>(
          <Articles key={articles.id} articles={articles} />
        ))}
      </div>

      </div>
    </div>
  );
}

export default Home;
