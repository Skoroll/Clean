
import React, { useRef } from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./FAQ.scss";

function FAQ() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'FAQ - ChoreOrganizer';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='faq'>
     <h1> FAQ - ChoreOrganizer</h1>
<h2 className='faq--question'> Qu'est-ce que ChoreOrganizer ?</h2>
<p>ChoreOrganizer est une application conçue pour vous aider à organiser votre ménage de manière simple et efficace. 
  Elle vous permet de créer des tâches à faire pour chaque pièce de votre maison,
   d'accéder à des conseils utiles, et même de définir des tâches personnalisées pour mieux gérer votre quotidien.</p>

   <h3 className='faq--question'>2. Comment créer un compte sur ChoreOrganizer ?</h3>
<p>Pour créer un compte, cliquez sur "Créer un compte" dans l'écran d'accueil, 
  puis remplissez les champs requis (nom, email, mot de passe). 
  Vous pouvez également télécharger une image de profil pour personnaliser votre compte.</p>

<h3 className='faq--question'>3. Comment fonctionne la gestion des tâches ?</h3>
<p>ChoreOrganizer génère automatiquement une liste de tâches pour chaque pièce de votre maison. 
  Vous pouvez ajouter des tâches spécifiques à chaque pièce et les marquer comme "Terminées" une fois que vous avez terminé. 
  Les tâches sont divisées en plusieurs catégories, telles que le nettoyage, l'organisation et l'entretien.</p>

<h3 className='faq--question'>4. Puis-je ajouter mes propres tâches ?</h3>
<p>Oui ! Vous pouvez ajouter des tâches personnelles en cliquant sur le bouton "Ajouter une tâche" dans la section appropriée. 
  Vous pouvez également personnaliser les tâches en fonction de vos besoins spécifiques.</p>

<h3 className='faq--question'>5. Comment puis-je gérer mes pièces ?</h3>
<p>Dans votre profil, vous pouvez ajouter ou modifier les pièces de votre maison. 
  Allez dans les paramètres pour ajuster la liste des pièces et ajouter de nouvelles pièces si nécessaire.</p>

<h3 className='faq--question'>6. Quelles sortes de conseils sont disponibles dans l'app ?</h3>
<p>ChoreOrganizer vous propose des conseils pratiques sur l'entretien de la maison, 
  des astuces de nettoyage et de gestion du ménage. Vous pouvez accéder à ces conseils à partir du menu "Nos conseils".</p>

<h3 className='faq--question'>7. Comment supprimer un compte ?</h3>
<p>Si vous souhaitez supprimer votre compte, vous pouvez le faire directement 
  depuis la section des paramètres. Notez que cela supprimera toutes les données liées à votre profil et à vos tâches.</p>

<h3 className='faq--question'>8. Comment réinitialiser mes tâches ?</h3>
<p>Si vous voulez réinitialiser vos tâches, allez dans les paramètres et sélectionnez 
  "Réinitialiser les tâches". Cela restaurera la liste de tâches par défaut pour chaque pièce de votre maison.</p>

<h3 className='faq--question'>9. Puis-je supprimer des pièces ou modifier leurs tâches ?</h3>
<p>Oui, vous pouvez supprimer des pièces ou modifier les tâches associées 
  à chaque pièce via la section "Paramètres" de votre profil. Cela vous permet de personnaliser encore plus votre expérience.</p>

<h3 className='faq--question'>10. Que faire si je rencontre un problème avec l'application ?</h3>
<p>Si vous rencontrez un problème, vous pouvez nous contacter via la section 
  "Nous contacter" dans le menu principal de l'application. Nous ferons de notre mieux pour résoudre votre problème dans les plus brefs délais.</p>

<h3 className='faq--question'>11. L'application est-elle disponible sur mobile ?</h3>
<p>Oui, ChoreOrganizer est disponible sur les appareils mobiles. Vous pouvez l'utiliser pour gérer vos tâches ménagères en déplacement.</p>
    </div>
  );
}

export default FAQ;
