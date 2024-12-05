import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";
import axiosInstance from "../../Config/axiosConfig";
import "./Profile.scss";

function Profile() {
  const { pathname } = useLocation();
  const [rooms, setRooms] = useState([]); // Liste des pièces récupérées
  const [user, setUser] = useState({}); // Utilisateur récupéré
  const [error, setError] = useState(null); // Message d'erreur
  const token = localStorage.getItem("userToken"); // Token utilisateur

  // Défilement en haut de page au changement de route
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

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
  }, []);
  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user); // Met à jour les données utilisateur
      } catch (error) {
        // Gestion des erreurs
        if (error.response) {
          setError(
            error.response.status === 404
              ? "Aucune donnée trouvée."
              : `Erreur ${error.response.status}: ${error.response.data.message}`
          );
        } else {
          setError("Une erreur est survenue lors de la récupération des données.");
        }
      }
    };

    if (token) {
      fetchUser(); // Appelle la fonction uniquement si le token est présent
    } else {
      setError("Utilisateur non authentifié.");
    }
  }, [token]); // L'effet dépend du token

  return (
    <div className="profile">
      <GoBack />
      <div className="profile-user">
        {error && <p className="error-message">{error}</p>}

        {user && (
          <>
<img
  src={user.profileImage ? `http://localhost:5000/${user.profileImage}` : "/default-profile.png"}
  alt="Photo de profil"
  className="profile-user--image"
/>
            <div className="profile-user__informations">
              <div className="profile-user__informations--name">
                <p className="profile--name">
                  {user.name}
                </p>
              </div>

              <div className="profile-user__informations--rooms">

                {rooms.length > 0 ? (
                  <p className='profile--rooms'>
                    {rooms.map((room, index) => (
                      <span key={index} className='room'>
                        {room}
                        
                      </span>
                    ))}
                  </p>
                ) : (
                  <p>{error || 'Aucune pièce trouvée.'}</p>
                )}
                z
              </div>

              <div className="profile-user__informations--level">
                <p>
                 Niveau
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
