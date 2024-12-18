import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../Config/axiosConfig';
import { UserContext } from '../../UserContext';
import GoBack from '../GoBack/GoBack';
import './UserForm.scss';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
  
    try {
      const response = await axios.post('/users/login', formData);


      
      if (response.data.token && response.data.user) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        setUser(response.data.user);
  
        setSuccess(true);
        navigate('/votre-menage');
      } else {
        setError('Les données de connexion sont incorrectes.');
      }
    } catch (err) {
      // Logguer l'erreur complète pour plus de détails
      console.error('Erreur lors de la connexion:', err.response ? err.response : err.message);
  
      // Si err.response existe et contient un message d'erreur spécifique
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="form">
      <GoBack target="/" />
      <h1>Se connecter</h1>
      <div className="form-basic">
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

          <button type="submit" className="sign-btn">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
