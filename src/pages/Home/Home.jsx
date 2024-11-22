
import React, { useRef } from 'react';
import logoCleanHelper from "../../assets/logo.png";
import Articles from '../../components/Articles/Articles';
import articlesText from "../../assets/TextContent/articles.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
      <div className='home__starter'>
        <img src={logoCleanHelper} alt='Cliquer pour continuer' />
        <i className="fa-solid fa-arrow-down" onClick={scrollDown}></i>
      </div>

      <div className='home__content' ref={sectionRef}>
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
