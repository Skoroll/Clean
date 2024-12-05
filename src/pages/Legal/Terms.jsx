
import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Legal.scss";

function Terms() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "ChoreHelper - Condition d'utilisation";
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className='legal'>
      <h1>Conditions d'utilisation</h1>
      <div className="legal-div">
      <article className='legal-div__article'>
          <h2>Objet des présentes conditions</h2>
          <p>Ces conditions d'utilisation (ci-après "Conditions") régissent l'accès et l'utilisation de l'application web 
            (ci-après "Application") permettant de structurer et de synthétiser les tâches liées au ménage quotidien. 
            En créant un compte et en utilisant notre service, vous acceptez les présentes Conditions.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Création de compte</h2>
          <p>L'accès à l'Application nécessite la création d'un compte. 
            Lors de l'inscription, vous devez fournir des informations exactes et à jour, 
            notamment votre nom, votre adresse email et une image de profil.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Utilisation du service</h2>
          <p>L'Application est destinée à un usage personnel. Les utilisateurs peuvent :</p>
          <ul>
            <li>Ajouter et organiser des tâches liées au ménage.</li>
            <li>Gérer les pièces de leur maison.</li>
          </ul>
          <p>Le contenu créé par les utilisateurs reste privé et n'est accessible qu'à eux-mêmes.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Propriété intellectuelle</h2>
          <p>Tous les droits relatifs au contenu, au design et aux fonctionnalités de l'Application appartiennent 
            à [Nom de l'Entreprise/du Projet]. 
            Vous ne pouvez pas reproduire, distribuer ou modifier ces éléments sans autorisation préalable.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Responsabilité</h2>
          <p>L'Application est fournie "en l'état". Bien que nous 
            fassions de notre mieux pour garantir son bon fonctionnement, 
            nous ne garantissons pas l'absence d'erreurs ou d'interruptions.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Résiliation de compte</h2>
          <p>Vous pouvez demander la suppression de votre compte à tout moment. 
            En cas de non-respect des présentes Conditions, nous nous réservons le droit de suspendre ou de résilier votre compte.</p>
        </article>
      </div>
    </div>
  );
}

export default Terms;
