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
      <h1 className="contact--heading">Pour nous contacter</h1>
      <ul>
        <li><i className='fa-solid fa-envelope' /> contact.skorol@gmail.com</li>
        <li><i className='fa-solid fa-phone' /> 00 00 00 00 00</li>
      </ul>

      <form className='form' action="">
        <div className='form-basic'>
        <label htmlFor="name">Nom
        <input type="text" id='name' /></label>

        <label htmlFor="email">E-mail
          <input type="email" id='email'/>
        </label>

        <label htmlFor="message">Message
          <input type="textarea" id='message' />
        </label>

        <input className='sign-btn' type="submit" />
        </div>
      </form>
      
    </div>
  );
}

export default Contact;
