import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navigateMenuOpen, setNavigateMenuOpen] = useState(false);
  const [navFullOpen, setNavFullOpen] = useState(false);

  useEffect(() => {
    // Récupérer les données utilisateur depuis localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]); // On vérifie à chaque rendu
  
  useEffect(() => {
    // Synchroniser `user` du contexte avec localStorage à chaque mise à jour
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]); // Mettre à jour `localStorage` lorsque `user` change
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      const userMenu = document.querySelector('.nav__user--menu');
      const navFull = document.querySelector('.nav__full');

      if (userMenu && !userMenu.contains(event.target)) {
        setUserMenuOpen(false);
      }

      if (navFull && !navFull.contains(event.target)) {
        setNavFullOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = (event) => {
    event.stopPropagation();
    setUserMenuOpen((prev) => !prev); // Toggle le menu utilisateur
  };

  const toggleNavFull = (event) => {
    event.stopPropagation();
    setNavFullOpen((prev) => !prev);
    setUserMenuOpen(false); // Fermer le menu utilisateur
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Gestion de l'URL de l'image de profil
  /* const profileImageURL = user?.profileImage
    ? `http://localhost:8080/${user.profileImage}?t=${new Date().getTime()}`
    : '/default-profile.jpg'; // Si pas d'image, image par défaut*/

   const profileImageURL = user?.profileImage
    ? `https://cleanback.fly.dev/${user.profileImage}?t=${new Date().getTime()}`
    : '/default-profile.jpg'; 

  return (
    <nav className="nav" onClick={toggleNavFull}>
      <div className="nav__user">
        {user && user.profileImage ? (
          <img
            src={profileImageURL}
            alt="Profil utilisateur"
            className="profile-picture"
          />
        ) : (
          <i className="fa-solid fa-user"></i>
        )}
      </div>

      <div className="nav__navigate">
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="nav__full" style={{ display: navFullOpen ? 'block' : 'none' }}>
        <ul>
          {user ? (
            <>
              <li onClick={toggleUserMenu}>
                <i className="fa-solid fa-chevron-left"></i> {user.name}
              </li>
            </>
          ) : (
            <>
              <li><Link to="/sign-up">Créer un compte</Link></li>
              <li><Link to="/sign-in">S'identifier</Link></li>
            </>
          )}
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/votre-menage">Votre ménage</Link></li>
          <li><Link to="/conseils">Nos conseils</Link></li>
          <li><Link to="/partenaires">Nos partenaires</Link></li>
          <li><Link to="/contact">Nous contacter</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
          <li><Link to="/a-propos">À propos</Link></li>
        </ul>

        {userMenuOpen && (
          <ul className="nav__user--menu">
            {user ? (
              <>
                {/*<li><Link to="profile">Votre profil</Link></li>*/}
                <li><Link to="succes">Vos succès</Link></li>
                <li><Link to="/parametres">Paramètres</Link></li>
                <li onClick={handleLogout}><Link to="/">Déconnexion</Link></li>
              </>
            ) : null}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
