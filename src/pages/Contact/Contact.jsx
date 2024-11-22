import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Contact.scss"

function Contact() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='contact'>
      <p className="contact--heading">Pour nous contacter</p>
      <ul>
        <li>Email : mail@mail.fr</li>
        <li>Téléphone : 00 00 00 00 00</li>
      </ul>

      <form action="">
        <label htmlFor="name">Nom
        <input type="text" id='name' /></label>

        <label htmlFor="email">E-mail
          <input type="email" id='email'/>
        </label>

        <label htmlFor="message">Message
          <input type="textarea" id='message' />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Contact;
