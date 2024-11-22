import React, { useState } from 'react';
import "./TaskBar.scss";

function TaskBar() {

  const [barOpen, setBarOpen] = useState(false);

  const toggleBar = () => {
    setBarOpen(prevState => !prevState);
    console.log("Clic");
  };

  return (
    <div className={`task-bar ${barOpen ? 'open' : ''}`}>
      <div className="task-bar__wrapper">
        <i className="fa-solid fa-plus"></i>
        <i className="fa-solid fa-pen"></i>
        <i className="fa-solid fa-trash"></i>
      </div>

      {/* Bouton pour afficher/masquer la barre */}
      <div className="task-bar--slider-btn" onClick={toggleBar}></div>
    </div>
  );
}

export default TaskBar;
