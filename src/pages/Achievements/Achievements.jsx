import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";
import Spinner from "../../components/Spinner/Spinner";
import "./Achievements.scss";

function Achievements() {
  const { pathname } = useLocation();
  const [achievements, setAchievements] = useState([]);  // Liste des pièces récupérées
  const [error, setError] = useState(null); // Message d'erreur en cas de problème
  
  useEffect(() => {
    document.title = 'ChoreHelper - Succès';
  }, []);

  useEffect(() => {

    const token = localStorage.getItem('userToken');  // Récupérer le token de l'utilisateur
    const fetchAchievement = async () => {
      try {
        const response = await axiosInstance.get('/achievements', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log(response.data); // Vérifiez la structure de la réponse ici
        if (response.data) {
          setAchievements(response.data);
        } else {
          setError('Aucun succès trouvé pour cet utilisateur.');
          setAchievements([]);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Aucune donnée trouvée pour les succès.');
          } else {
            setError(`Erreur ${error.response.status}: ${error.response.data.message}`);
          }
        } else {
          setError('Une erreur est survenue.');
        }
        setAchievements([]); // Réinitialiser les succès en cas d'erreur
      }
    };
    
    

    fetchAchievement();  // Lancer la récupération des pièces au démarrage

      // Faire défiler la page vers le haut à chaque changement de chemin
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, [pathname]);






return (
  <div className="achievements">
    <h1>Vos succès</h1>
    <p className="achievements--explanation">
      Mais qu'est-ce qu'un succès ?
    </p>
    <p>
      Des petites tâches à compléter pour gagner des petits pins !
      <br />
      À quoi servent ces pins ?
      <br />
      ...
      <br />
      À pas grand-chose, si ce n'est se challenger et retirer un peu de fierté dans les tâches du quotidien.
    </p>

  {error && 
  <div>
  <p className="error">Problème avec l'authentification de l'utilisateur</p>
  <Spinner />
  </div>
  }
  {!achievements.length && !error && <Spinner />}
    <ul>
      {achievements.map((achievement) => (
        <li key={achievement.id}>
          {/* Affichage de l'icône, nom et détails */}
          <i className={achievement.icon} />
          <div>
            <p className="achievement--heading">{achievement.name}</p>
            <p className="achievement--detail">{achievement.content}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Achievements;
