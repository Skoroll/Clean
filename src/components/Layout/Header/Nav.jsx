import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navigateMenuOpen, setNavigateMenuOpen] = useState(false);

  useEffect(() => {
    // Récupérer les données utilisateur depuis localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const userMenu = document.querySelector('.nav__user');
      const navigateMenu = document.querySelector('.nav__navigate');

      if (userMenu && !userMenu.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (navigateMenu && !navigateMenu.contains(event.target)) {
        setNavigateMenuOpen(false);
      }
    };

    // Ajouter l'écouteur d'événements
    document.addEventListener('click', handleClickOutside);

    // Nettoyer l'écouteur d'événements lors du démontage
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = (event) => {
    event.stopPropagation(); // Empêche le clic de fermer immédiatement le menu
    setUserMenuOpen((prev) => !prev);
  };

  const toggleNavigateMenu = (event) => {
    event.stopPropagation(); // Empêche le clic de fermer immédiatement le menu
    setNavigateMenuOpen((prev) => !prev);
  };

  return (
    <nav className="nav">
      <div className="nav__user" onClick={toggleUserMenu}>
        {user && user.profileImage ? (
          <img
            src={`http://localhost:5000/${user.profileImage}`}
            alt="Profil utilisateur"
            className="profile-picture"
          />
        ) : (
          <i className="fa-solid fa-user"></i>
        )}
        {userMenuOpen && (
          <ul className="nav__user--menu">
            {user ? (
              <>
                <li><Link to="succes">Vos succès</Link></li>
                <li><Link to="/parametres">Paramètres</Link></li>
{/*                <li><Link to="/vos-equipements">Vos équipements</Link></li> */}
                <li 
                  
                    onClick={() => {
                      localStorage.clear();
                      setUser(null);
                    }}
                  >
                   <Link to="/"> Déconnexion</Link>
                  
                </li>
              </>
            ) : (
              <>
                <li><Link to="/sign-up">Créer un compte</Link></li>
                <li><Link to="/sign-in">S'identifier</Link></li>
              </>
            )}
          </ul>
        )}
      </div>

      <div className="nav__navigate" onClick={toggleNavigateMenu}>
        <i className="fa-solid fa-bars"></i>
        {navigateMenuOpen && (
          <ul className="nav__navigate--menu">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/votre-menage">Votre ménage</Link></li>
            <li><Link to="/conseils">Nos conseils</Link></li>
            <li><Link to="/partenaires">Nos partenaires</Link></li>
            <li><Link to="/contact">Nous contacter</Link></li>
            <li><Link to="/FAQ">FAQ</Link></li>
            <li><Link to="a-propos">A propos</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
