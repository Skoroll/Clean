import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Config/axiosConfig';
import './Settings.scss';

function Settings() {
  const { pathname } = useLocation();
  const [rooms, setRooms] = useState([]); // Liste des pièces récupérées
  const [error, setError] = useState(null); // Message d'erreur en cas de problème
  const [tasksData, setTasksData] = useState({}); // Tâches filtrées par pièce
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        const token = localStorage.getItem('userToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        await axiosInstance.delete('/api/users/delete', config);
  
        localStorage.removeItem('token');
        alert("Votre compte a été supprimé avec succès.");
        navigate('/');
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        alert("Une erreur est survenue, veuillez réessayer plus tard.");
      }
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  const token = localStorage.getItem('userToken'); // Récupérer le token de l'utilisateur

  const fetchRooms = async () => {
    try {
      const response = await axiosInstance.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data.user.rooms); // Récupérer les pièces de l'utilisateur depuis son profil
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError('Aucune donnée trouvée pour les pièces.');
        } else {
          setError(`Erreur ${error.response.status}: ${error.response.data.message}`);
        }
      } else {
        setError('Une erreur est survenue.');
      }
    }
  };

  // Charge les pièces quand le composant est monté
  useEffect(() => {
    fetchRooms();
  }, []); // Exécution une seule fois au montage du composant

  return (
    <div className='settings'>
      <div className="form-basic">
        <h1 className="form-heading">Paramètres</h1>

        <div className='form settings__options'>
          <div className='form-basic'>
            <div className="settings__options--param">
              <label>Nom<input type="text" /></label>
            </div>

            <div className="settings__options--param">
              <label>E-mail<input type="email" /></label>
            </div>

            <div className="settings__options--param">
              <label>Mot de passe<input type="text" /></label>
            </div>

            <div className="settings__options--param">
              <label>Confirmation du mot de passe<input type="text" /></label>
            </div>

            <div className='settings__options--param'>
              <label>Vos pièces
              {rooms.length > 0 ? (
                <p className='settings--rooms'>
                  {rooms.map((room, index) => (
                    <span key={index} className='room'>
                      {room}
                      <i className="fa-solid fa-x"></i>
                    </span>
                  ))}
                </p>
              ) : (
                <p>{error || 'Aucune pièce trouvée.'}</p>
              )}
              </label>
            </div>

            <div className="settings__options--param">
              <label>Photo de profil<input type="file" /></label>
            </div>

            <p className='dangerous' onClick={handleDeleteAccount}>Supprimer le compte</p>
            <p className="dangerous">Réinitialiser les tâches</p>
            <p className="dangerous">Redéfinir les pièces</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
