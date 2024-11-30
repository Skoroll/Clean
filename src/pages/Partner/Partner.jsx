import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import partnerList from "../../assets/partnerList/partnerList.json";
import "./Partner.scss";
import Spinner from "../../components/Spinner/Spinner";

function Partner() {
  const { pathname } = useLocation();
  const [partners, setPartners] = useState([]); // Liste des partenaires
  const [error, setError] = useState(null);

  // Charger les données et gérer les erreurs
  useEffect(() => {
    try {
      if (Array.isArray(partnerList) && partnerList.length > 0) {
        setPartners(partnerList);
      } else {
        setError("Aucune donnée disponible dans la liste des partenaires.");
      }
    } catch (err) {
      setError("Erreur lors du chargement des données.");
    }
  }, []);

  // Remettre en haut de page lors du changement d'URL
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Fonction pour supprimer un partenaire
  const removePartner = (index) => {
    setPartners((prevPartners) => prevPartners.filter((_, i) => i !== index));
  };

  return (
    <div className="partner">
      <h1>Nos partenaires</h1>
      <div className="partner-display">
        {partners.map((partner, index) => (
          <div key={index} className="partner-display__card">
            <div className="partner-display__card--img">
              <img src={partner.logo} alt={partner.name} />
            </div>
            <div className="partner-display__card--description">
              <p className="partner--heading">{partner.name}</p>
              <p className="partner-display__card--title">{partner.description}</p>
            </div>
            <div className="partner-display__card--usefull">
              <p> <a href={partner.website}>{partner.website}</a> </p>
              <p>Préstation : {partner.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partner;