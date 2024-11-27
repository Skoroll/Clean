import React from 'react';
import { Link } from 'react-router-dom';
import "./GoBack.scss"

function GoBack({target}) {
  return (
    <div className='back-div' >
            <Link to={target} className="go-back"><i className="fa-solid fa-arrow-left"></i> Retour en arrière</Link>

    </div>
  );
}

export default GoBack;
