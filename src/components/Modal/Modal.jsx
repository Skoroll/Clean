import React from 'react';
import "./Modal.scss";

function Modal({ children, onClose, isActive }) {
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-bg')) {
      onClose(); // Ferme la modale si le clic est sur le fond
    }
  };

  return (
    <div
      className={`modal-bg ${isActive ? 'is-active' : ''}`}
      onClick={handleBackgroundClick}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
       
          <i className="fa-solid fa-x" onClick={onClose}></i>
     
        {children} {/* Contenu injecté, comme AddTaskForm */}
      </div>
    </div>
  );
}

export default Modal;
