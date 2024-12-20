import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.scss";

function Footer() {
  return (
    <footer className='footer'>

      <div className="footer__section">
        <p className="footer__section--heading">Contact</p>
        <ul>
          <li> 
            <a href='mailto:contact.skorol@gmail.com'>
              <i className="fa-solid fa-envelope"></i>
              <span className="hide-mobile">contact.skorol@gmail.com</span>
              <span className="show-mobile">E-mail</span>
            </a>
          </li>
          <li>
            <a href="tel:0000000000">
            <i className="fa-solid fa-phone"/>
            <span className="hide-mobile">00 00 00 00 00</span>
            <span className="show-mobile">Téléphone</span>
            </a>
          </li>
          <li>
            <Link to="/contact">
              <i className="fa-solid fa-paper-plane"/> 
              Formulaire de contact
              </Link>
              </li>
          <li>
            <Link to="/FAQ"><i className="fa-solid fa-circle-question" /> 
              FAQ
              </Link>
              </li>
        </ul>
      </div>

      <div className="footer__section">
        <p className="footer__section--heading">Naviguer</p>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/conseils">Nos conseils</Link></li>
          <li><Link to="/contact">Nous contacter</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
          <li><Link to="a-propos">A propos</Link></li>
        </ul>
      </div>

      <div className="footer__section">
        <p className="footer__section--heading">Nos réseaux</p>
        <ul>
          <li><a href="https://www.instagram.com/skoroll_/"><i className="fa-brands fa-instagram"></i> Instagram </a> </li>
          <li><a href="https://www.facebook.com"><i className="fa-brands fa-square-facebook"></i> Facebook </a></li>
          <li> <a href="https://www.youtube.com"> <i className="fa-brands fa-youtube"></i> Youtube </a> </li>
          <li><a href="https://www.discord.com"> <i className="fa-brands fa-discord"></i> Discord</a></li>
        </ul>
      </div>

      <div className="footer__section">
        <p className="footer__section--heading"> Mentions légales</p>
        <ul>
          <li>© 2024 Nom du site. Tous droits réservés.</li>
          <li><Link to="/legal">Mentions légales</Link> </li>
          <li><Link to="/conditions">Conditions d'utilisation</Link></li>
          <li> <Link to="confidentialite">Politique de confidentialité</Link> </li>
        </ul>
      </div>

      <div className="footer__section">
        <p className="footer__section--heading"> Aller plus loin</p>
        <ul>
          <li>Télécharger l'appli</li>
          <li>Rejoignez la communauté</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
