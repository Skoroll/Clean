import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Settings.scss";

function Settings() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  
  return (
    <div className='settings'>
      <div className="form-basic">
        <h1 className="form-heading">Paramètres</h1>

        <div className='form settings__options'>
          <div className='form-basic'>
        <div className="settings__options--param">
          <label>Nom<input type="text" /></label>
          </div>

        <div className="settings__options--param">
          <label>E-mail<input type="email" /></label>
          </div>

        <div className="settings__options--param">
          <label>Mot de passe<input type="text" /></label>
          </div>

        <div className="settings__options--param">
          <label>Confirmation du mot de passe<input type="text" /></label>
          </div>

        <div className="settings__options--param">
          <label>Photo de profil<input type="file" /></label>
          </div>

        <p className='dangerous'>Supprimer le compte</p>
        <p className="dangerous">Réinitialiser les tâches</p>
        <p className="dangerous">Redéfinir les pièces</p>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
