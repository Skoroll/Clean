import React from 'react';
import tipsText from "../../assets/TextContent/tips.json";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Tips.scss";

function Tips() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='tips'>
      <p>Découvrez vos conseils pour simplifier votre ménage :</p>
      
      <div className='tips-container'>
        {tipsText.map((tips) => (
          <article className='tips-container__article' key={tips.id}>
            <h2>{tips.title}</h2>
            <div className='tips-container__article--tips'>
              {tips.tips.map((tip, index) => (
                <p key={index}>{tip}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Tips;
