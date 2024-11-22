import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Config/axiosConfig';
import { UserContext } from '../../UserContext';
import './UserForm.scss';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null); // Pour afficher les erreurs
  const [success, setSuccess] = useState(false); // Pour afficher un message de succès
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

  // Gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser les erreurs
    setSuccess(false); // Réinitialiser le succès
  
    try {
      // Requête vers le backend pour la connexion
      const response = await axios.post('/users/login', formData);
      console.log('Réponse du serveur:', response.data);  // Vérifiez ce que vous recevez ici
  
      // Vérification si les données sont présentes
      if (response.data.token && response.data.user) {
        // Stocker le token et les données utilisateur dans le localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Token stocké dans localStorage:', localStorage.getItem('userToken'));
        console.log('Utilisateur stocké dans localStorage:', localStorage.getItem('user'));
        
        // Mettre à jour le contexte utilisateur
        setUser(response.data.user);
  
        // Afficher un message de succès
        setSuccess(true);
  
        // Redirection vers la page de ménage
        navigate('/votre-menage');
      } else {
        setError('Les données de connexion sont incorrectes.');
      }
    } catch (err) {
      console.error('Erreur lors de la connexion :', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };
  
  

  return (
    <div className="form-basic">
      <p className="form-heading">Se connecter</p>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Connexion réussie !</p>}
      {loading && <p className="loading-message">Chargement...</p>} {/* Affichage du message de chargement */}

      <form onSubmit={handleSubmit} className="user-form">
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

        <button type="submit" className="submit-button">Se connecter</button>
      </form>
    </div>
  );
}

export default SignIn;
