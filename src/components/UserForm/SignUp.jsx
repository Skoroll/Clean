import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Config/axiosConfig";
import UserRooms from "./UserRooms";
import GoBack from "../GoBack/GoBack";
import "./UserForm.scss";
import { useEffect } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rooms: []
  });
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null); // Pour l'aperçu de l'image
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = `S'inscrire - ChoreOrganizer`;
  }, []);

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer les pièces sélectionnées depuis UserRooms
  const handleRoomsChange = (selectedRooms) => {
    setFormData({ ...formData, rooms: selectedRooms });
  };

  // Gérer l'image de profil
  const handleImageChange = (e) => {
    const image = e.target.files[0];
  
  
    if (!image) {
      console.error('Aucune image sélectionnée');
      return;
    }

    const fileExtension = image.type.split('/')[1];
    const renamedImage = new File([image], `${Date.now()}.${fileExtension}`, { type: image.type });
  
    setProfileImage(renamedImage);
    setFile(URL.createObjectURL(renamedImage));
  };
  
  

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Assurez-vous que les données du formulaire sont récupérées correctement
    const { name, email, password, confirmPassword, rooms } = formData;
  
    // Log des données avant envoi pour validation
  
    const formDataToSend = new FormData();  // Renomme cette variable pour ne pas masquer l'état formData
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('confirmPassword', confirmPassword);
    formDataToSend.append('rooms', JSON.stringify(rooms));  // Assurez-vous que rooms est bien un tableau ou une chaîne JSON
  
    // Si une image est sélectionnée, l'ajouter au FormData
    if (profileImage) {
  
      formDataToSend.append('profileImage', profileImage);
    }
  

formDataToSend.forEach((value, key) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
;
  
    try {
    //const response = await axios.post('http://localhost:8080/api/users/register', formDataToSend, {
       const response = await axios.post('https://cleanback.fly.dev/api/users/register', formDataToSend, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      navigate('/sign-in');  // Rediriger après succès
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);

      if (error.response) {
        console.error("Réponse serveur:", error.response.data);
        setError(error.response.data.error || "Erreur lors de l'inscription.");
      } else {
        setError("Erreur réseau ou serveur.");
      }
    }
    
  };
  
  return (
    <div className="form">
      <GoBack />
      <h1>Créer un compte</h1>
      <div className="form-basic">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Compte créé avec succès !</p>}

        <form onSubmit={handleSubmit} className="user-form">
          <p className="user-form--heading">Qui êtes-vous ?</p>
          <p className="user-form--rules">* champ obligatoires</p>
          <div className="form-group">
            <label htmlFor="name"> <span className="asterisk">*</span> Nom</label>
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
            <label htmlFor="email"><span className="asterisk">*</span> E-mail</label>
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
            <label htmlFor="password"><span className="asterisk">*</span> Mot de passe</label>
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
            <label htmlFor="confirmPassword"><span className="asterisk">*</span> Confirmer le mot de passe</label>
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
            {file && <img src={file} alt="Preview" className="form-group--profile-pic" />}
          </div>

          <UserRooms onRoomsChange={handleRoomsChange} />

          <button type="submit" className="sign-btn">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
