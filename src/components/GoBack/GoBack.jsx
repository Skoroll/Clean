import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoBack.scss"

function GoBack() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="go-back-link">
      <i className="fa-solid fa-arrow-left"></i> 
      <p>Retour en arrière</p>
    </div>
  );
}

export default GoBack;