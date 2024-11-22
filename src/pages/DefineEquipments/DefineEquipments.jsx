import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./DefineEquipments.scss";

function DefineEquipment({ onEquipmentsChange }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  // Liste des équipements
  const equips = [
    "Lave-vaisselle", "Four", "Micro-ondes", "Blender", "Réfrigérateur",
    "Congélateur", "Grille-pain", "Cafetière", "Bouilloire", "Robot de cuisine",
    "Lave-linge", "Sèche-linge", "Douche", "Baignoire", "Lavabo",
    "Miroir de salle de bain", "Télévision", "Table basse", "Canapé", "Tapis", 
    "Bibliothèque", "Rideaux", "Vitrine", "Cheminée", "Lit", "Armoire", "Commode",
    "Bureau", "Table de chevet", "Miroir", "Tapis de chambre", "Table de jardin",
    "Chaises de jardin", "Barbecue", "Parasols", "Ventilateur", "Radiateur", 
    "Aspirateur", "Purificateur d'air", "Étagères", "Lampes", "Plantes",
    "Poubelles"
  ];

  // État local pour gérer les cases à cocher (formData)
  const [formData, setFormData] = useState(
    equips.reduce((acc, equip) => {
      acc[equip] = false;
      return acc;
    }, {})
  );

  // Garde une trace de la dernière liste des équipements sélectionnés
  const [previousSelectedEquipments, setPreviousSelectedEquipments] = useState([]);

  // Éviter l'appel à onEquipmentsChange trop souvent : l'appel est effectué seulement lorsque formData change réellement.
  useEffect(() => {
    const selectedEquipments = Object.keys(formData).filter((equip) => formData[equip]);

    // Si les équipements sélectionnés ont changé, appelle onEquipmentsChange
    if (JSON.stringify(selectedEquipments) !== JSON.stringify(previousSelectedEquipments)) {
      setPreviousSelectedEquipments(selectedEquipments);  // Mettre à jour l'état précédent
      if (onEquipmentsChange) {
        onEquipmentsChange(selectedEquipments);
      }
    }
  }, [formData, previousSelectedEquipments, onEquipmentsChange]); // `formData` et `previousSelectedEquipments` sont les dépendances.

  // Fonction pour gérer les changements des cases à cocher
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      // Ne pas mettre à jour si l'état reste le même
      if (prevData[name] === checked) {
        return prevData;
      }

      const updatedData = { ...prevData, [name]: checked };
      return updatedData;
    });
  };

  return (
    <div className="form-basic">
      <p className='form-heading'>Quels équipements avez-vous chez-vous ?</p>
  
      <div className="user-form flex-row">
        {equips.map((equip) => {
          const equipId = equip.replace(/\s+/g, '').toLowerCase();
          return (
            <div className="form-group" key={equipId}>
              <input 
                type="checkbox" 
                id={equipId} 
                name={equip} 
                checked={formData[equip]} 
                onChange={handleChange} 
              />
              <label className='label-choice' htmlFor={equipId}>{equip}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DefineEquipment;
