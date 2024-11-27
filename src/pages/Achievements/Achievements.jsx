import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Achievements.scss";

function Achievements() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className='achievements'>
      <h1>Vos succès </h1>
      <p className='achievements--explanation'>
        Mais qu'est-ce qu'un succès ?
      </p>
      <p>Des petites tâches à complêter pour gagner des petits pins !
        <br />
        A quoi servent ces pins ?
        <br />
        ...
        <br />
        A pas grand chose si ce n'est se challenger et retirer un peu de fierté dans les tâches du quotidien.
      </p>



      <ul>
        <li>
          <i className="fa-solid fa-broom" />
          <div>
            <p className='achievement--heading'>
              Bon début
            </p>
            <p className='achievement--detail'>
              Finir une tâche
            </p>
          </div>
        </li>
        <li>
          <i className="fa-solid fa-broom" />
          <div>
            <p className='achievement--heading'>
              Et d'une
            </p>
            <p className='achievement--detail'>
              Première pièce complétée totalement
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Achievements;
