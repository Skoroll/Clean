import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./Contact.scss";
import emailjs from "emailjs-com";

function Contact() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Contact - ChoreOrganizer ';
  }, []);

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: "",    
    email: "",   
    message: "", 
  });
  const [status, setStatus] = useState(""); // État pour suivre l'état de l'envoi (succès ou échec)

  // Gestion du changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour envoyer le formulaire par EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

    emailjs
      .sendForm(
        "service_p2rof4k",         // ID du service EmailJS
        "template_a9mf34d",        // ID du template EmailJS
        e.target,                  // Formulaire soumis
        "q_08ua-YqLlEfROJB"        // Clé publique utilisateur EmailJS
      )
      .then(
        (result) => {
          setStatus("Votre message a été envoyé avec succès !");
          setFormData({ name: "", email: "", message: "" }); // Réinitialisation des champs du formulaire
        },
        (error) => {
          setStatus("Une erreur s'est produite lors de l'envoi de votre message.");
        }
      );
  };

  // Remettre en haut de page lors du changement d'URL
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="contact">
      <h1 className="contact--heading">Pour nous contacter</h1>
      <ul>
        <li><i className='fa-solid fa-envelope' /> contact.skorol@gmail.com</li>
        <li><i className='fa-solid fa-phone' /> 00 00 00 00 00</li>
      </ul>

      {/* Affichage du message de statut (succès ou erreur) */}
      {status && <p className="status-message">{status}</p>}

      <form onSubmit={sendEmail} className='contact__form'>
        <div className="contact__form--input">
          {/* Champ pour le nom */}
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* Champ pour l'email */}
          <input
          className='contact__form--input'
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Champ pour le message */}
        <textarea
        className='contact__form--input contact__form--textarea'
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        {/* Bouton pour envoyer le formulaire */}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Contact;
