import React from 'react';
import tipsText from "../../assets/TextContent/tips.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Collapses from '../../components/Collapses/Collapses';
import "./Tips.scss";

function Tips() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'ChoreHelper - Conseils';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='tips'>
      <h1>Découvrez vos conseils pour simplifier votre ménage :</h1>
      
      <div className='tips-container'>
        {tipsText.map((tips) => (
          <article className='tips-container__article' key={tips.id}>
            <Collapses title={tips.title}>
            <div className='tips-container__article--tips'>
              <ul>
              {tips.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
              </ul>
            </div>
            </Collapses >
          </article>
        ))}
      </div>
    </div>
  );
}

export default Tips;
