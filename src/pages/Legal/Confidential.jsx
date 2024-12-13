
import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Legal.scss";

function Confidential() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    document.title = 'Confidentialité - ChoreOrganizer';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  
  return (
    <div className='legal'>
      <h1>Politique de confidentialité</h1>
      <div className="legal-div">
        <article className='legal-div__article'>
          <h2>Données collectées</h2>
          <p>Nous collectons uniquement les données nécessaires pour assurer le bon fonctionnement de l'Application :</p>
          <ul>
            <li>Nom</li>
            <li>Adresse email</li>
            <li>Image de profil</li>
            <li>Informations relatives aux pièces de votre maison</li>
          </ul>
        </article>

        <article className='legal-div__article'>
          <h2>Finalité de la collecte</h2>
          <p>Ces données sont utilisées exclusivement pour :</p>
          <ul>
            <li>Permettre l'accès à l'Application.</li>
            <li>Gérer et personnaliser les fonctionnalités liées à votre compte.</li>

          </ul>
        </article>

        <article className='legal-div__article'>
          <h2>Confidentialité des données</h2>
          <p>Les données collectées ne sont ni partagées, ni vendues à des tiers. Elles sont strictement 
            utilisées dans le cadre du fonctionnement de l'Application.</p>
        </article>

        <article className='legal-div__article'>
          <h2>Stockage des données</h2>
          <p>Les données sont stockées dans une base de données MongoDB sécurisée. 
            Elles sont conservées aussi longtemps que votre compte est actif. En cas de suppression de votre compte, 
            toutes vos données seront supprimées de manière définitive.</p>
        </article>

        <article className='legal-div__article'>
          <h2> Sécurité des données</h2>
          <p>Nous mettons en place des mesures techniques pour protéger vos données contre tout accès non autorisé ou 
            perte accidentelle. 
            Cependant, aucune méthode de transmission ou de stockage de données n'est totalement sécurisée.</p>
        </article>

        <article className='legal-div__article'>
          <h2> Vos droits</h2>
          <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
          <ul>
            <li>Accéder à vos données.</li>
            <li>Modifier vos données.</li>
            <li>Supprimer votre compte, ce qui entraînera la suppression de vos données.</li>
          </ul>
          <p>Pour toute demande, vous pouvez nous contacter à [adresse email de contact].</p>
        </article>

        <article className='legal-div__article'>
          <h2> Modification de la politique de confidentialité</h2>
          <p>Nous nous réservons le droit de modifier cette politique à tout moment. 
            Toute mise à jour sera communiquée sur l'Application.</p>
        </article>
      </div>
    </div>
  );
}

export default Confidential;
