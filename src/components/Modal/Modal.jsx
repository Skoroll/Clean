import React from 'react';
import "./Modal.scss";

function Modal({ children, onClose }) {
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-bg')) {
      onClose();
    }
  };

  return (
    <div className="modal-bg" onClick={handleBackgroundClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <i className="fa-solid fa-x" onClick={onClose}></i>
        {children}
      </div>
    </div>
  );
}

export default Modal;
