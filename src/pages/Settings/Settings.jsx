import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import axiosInstance from '../../Config/axiosConfig';
import './Settings.scss';

function Settings() {
  const { pathname } = useLocation();
  const { setUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '', // URL ou fichier
  });
  const [previewImage, setPreviewImage] = useState(''); // Prévisualisation de l'image
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    document.title = 'ChoreHelper - Paramètres';
  }, []);

  // Supprimer le compte utilisateur
  const handleDeleteAccount = async () => {
    const userConfirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
    );
    if (!userConfirmation) return;
  
    try {
      await axiosInstance.delete("/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      setUser(null);
      alert("Votre compte a été supprimé avec succès.");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      alert("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  };
  

  // Récupérer les données utilisateur et les pièces
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data.user;
      setUserData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Laisser vide pour des raisons de sécurité
        confirmPassword: '',
        profileImage: user.profileImage || '',
      });

      // Si l'image de profil est une URL relative, créez l'URL complète
      const profileImageURL = user.profileImage ? `http://localhost:5000/${user.profileImage}` : '';
      setPreviewImage(profileImageURL); // Précharger l'URL si disponible
      setRooms(user.rooms || []);
    } catch (error) {
      setError(error.response ? error.response.data.message : "Une erreur est survenue.");
    }
  };

  // Défilement en haut de page et chargement des données utilisateur
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    fetchUserData();
  }, [pathname]);

  // Gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la sélection d'une nouvelle photo de profil
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        profileImage: file, // Conserve le fichier dans l'état
      }));
      setPreviewImage(URL.createObjectURL(file)); // Génère une prévisualisation
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rafraîchissement de la page

    try {
      const formData = new FormData();
      if (userData.password.trim() !== "" && userData.confirmPassword.trim() !== "") {
        if (userData.password === userData.confirmPassword) {
          formData.append("password", userData.password);
        } else {
          alert("Les mots de passe ne correspondent pas.");
          return; // Stopper la soumission si les mots de passe ne correspondent pas
        }
      }
      // Ajout des champs texte
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('rooms', JSON.stringify(rooms)); // Convertir les pièces en JSON
      formData.append('equipments', JSON.stringify([])); // Équipement par défaut
  
      // Ajout de l'image si elle est modifiée
      if (typeof userData.profileImage === 'object') {
        formData.append('profileImage', userData.profileImage);
      }
  
      const response = await axiosInstance.put('/users/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Nécessaire pour les fichiers
        },
      });
  
      alert('Profil mis à jour avec succès !');
      setUser(response.data.user); // Met à jour le contexte utilisateur
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert(error.response?.data.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className='settings'>
      <h1 className="form-heading">Paramètres</h1>

      <div className='form settings__options'>
      <form className="form-basic" onSubmit={handleSubmit}>

          {/* Photo de profil */}
          <div className="settings__options--param">
            <label>
              <div className="profile-image-container">
                <img src={previewImage} alt="Photo de profil" className="profile-image" />
               <p className='edit-icon'>Modifier <i className="fa-solid fa-pen-to-square"></i></p>
              </div>
              <input className='profile-image-container--input'
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Nom */}
          <div className="settings__options--param">
            <label>
              Nom
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* E-mail */}
          <div className="settings__options--param">
            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Mot de passe */}
          <div className="settings__options--param">
            <label>
              Mot de passe
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Confirmation du mot de passe */}
          <div className="settings__options--param">
            <label>
              Confirmation du mot de passe
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Liste des pièces */}
          <div className="settings__options--param">
            <label>
              Vos pièces
              {rooms.length > 0 ? (
                <div className='settings--rooms'>
                  {rooms.map((room, index) => (
                    <span key={index} className='room'>
                      {room}
                      <i className="fa-solid fa-x"></i>
                    </span>
                  ))}
                </div>
              ) : (
                <p>{error || 'Aucune pièce trouvée.'}</p>
              )}
            </label>

          </div>
            <input type='submit' className='sign-btn' value="Valider les changements"/>
        </form>

        {/* Actions dangereuses */}
        <div className="form-basic">
          <p className='dangerous' onClick={handleDeleteAccount}>Supprimer le compte</p>
          <p className="dangerous">Réinitialiser les tâches (pas utilisable dans cette version)</p>
          <p className="dangerous">Redéfinir les pièces(pas utilisable dans cette version)</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
