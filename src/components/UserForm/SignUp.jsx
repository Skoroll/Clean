import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Config/axiosConfig";
import UserRooms from "./UserRooms";
import DefineEquipment from "../../pages/DefineEquipments/DefineEquipments";
import GoBack from "../GoBack/GoBack";
import "./UserForm.scss";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rooms: [],  // Liste des pièces sélectionnées
    equipments: [],  // Liste des équipements sélectionnés
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState()
  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  // Gérer les pièces sélectionnées
  const handleRoomsChange = (selectedRooms) => {
    setFormData({ ...formData, rooms: selectedRooms });
  };

  // Gérer l'image de profil
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('rooms', JSON.stringify(formData.rooms)); // Convertir rooms en JSON pour l'envoyer
      data.append('equipments', JSON.stringify(formData.equipments)); // Envoyer les équipements sélectionnés
      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      const response = await axios.post('/users/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('User created:', response.data);
      console.log(formData); // Pour vérifier les données envoyées

      setSuccess(true);
      alert('Compte créé avec succès !');
      navigate('/sign-in');
    } catch (err) {
      console.error('Error creating user:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  // Gérer les équipements sélectionnés (passé par DefineEquipment)
  const handleEquipmentsChange = (selectedEquipments) => {
    setFormData({ ...formData, equipments: selectedEquipments });
  };

  return (
    <div className="form">
            <GoBack target="/"/>
      <h1 className="">Créer un compte</h1>
    <div className="form-basic">
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Compte créé avec succès !</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <p className="form-heading">Pour commencer, qui êtes-vous ?</p>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Votre e-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer votre mot de passe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileImage">Image de profil</label>
          <input
            type="file"
            id="profileImage"
            onChange={handleImageChange}
            accept="image/*"
          />
           <img src={file} className="form-group--profile-pic" alt="" />
        </div>

        <UserRooms onRoomsChange={handleRoomsChange} />
        {/*<DefineEquipment onEquipmentsChange={handleEquipmentsChange} />*/}

        <button type="submit" className="sign-btn">S'inscrire</button>
      </form>
    </div>
  </div> 
  );
}

export default SignUp;
