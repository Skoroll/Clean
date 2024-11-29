import React, { useState } from 'react';
import './Collapses.scss'; 

const Collapses = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse">
      <div className="collapse__header" onClick={toggleCollapse}>
        <div className='collapse--first'>
        <p>{icon}</p>
        <h3 className="collapse__title">{title}</h3>
        </div>
        <span className="collapse__icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="collapse__content">{children}</div>}
    </div>
  );
};

export default Collapses;
