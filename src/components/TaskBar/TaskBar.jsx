import React, { useState } from 'react';
import "./TaskBar.scss";
import Modal from '../Modal/Modal';
import AddTaskForm from './Form/AddTaskForm';
import EditTaskForm from './Form/EditTaskForm';

function TaskBar() {
  const [barOpen, setBarOpen] = useState(false); // État pour le slider
  const [modalOpen, setModalOpen] = useState(false); // État pour la modale
  const [modalContent, setModalContent] = useState(null); // Contenu de la modale

  const rooms = ['Salon', 'Cuisine', 'Chambre', 'Salle de bain']; // Exemple de pièces

  const toggleBar = () => {
    setBarOpen(prevState => !prevState);
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className={`task-bar ${barOpen ? 'open' : ''}`}>
        <div className="task-bar__wrapper">
          <i
            className="fa-solid fa-plus"
            onClick={() => openModal(<AddTaskForm rooms={rooms} />)}
          ></i>
          <i
            className="fa-solid fa-pen"
            onClick={() => openModal(<EditTaskForm rooms={rooms}/>)}
          ></i>
          <i
            className="fa-solid fa-trash"
            onClick={() => openModal(<p>Supprimer une tâche</p>)}
          ></i>
        </div>

        {/* Bouton pour afficher/masquer la barre */}
        <div className="task-bar--slider-btn" onClick={toggleBar}></div>
      </div>

      {/* Composant Modal */}
      {modalOpen && (
  <Modal onClose={closeModal} isActive={modalOpen}>
    {modalContent}
  </Modal>
)}

    </>
  );
}

export default TaskBar;
