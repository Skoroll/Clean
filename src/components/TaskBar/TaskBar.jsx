import React, { useState, useEffect } from 'react';
import "./TaskBar.scss";
import Modal from '../Modal/Modal';
import AddTaskForm from './Form/AddTaskForm';
import EditTaskForm from './Form/EditTaskForm';
import axiosInstance from '../../Config/axiosConfig';

function TaskBar() {
  const [barOpen, setBarOpen] = useState(false); // État pour le slider
  const [modalOpen, setModalOpen] = useState(false); // État pour la modale
  const [modalContent, setModalContent] = useState(null); // Contenu de la modale
  const [rooms, setRooms] = useState([]); // Liste dynamique des pièces
  const [error, setError] = useState(null); // Gestion des erreurs

  // Récupération des pièces utilisateur
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axiosInstance.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRooms(response.data.user.rooms || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des pièces :", err);
        setError("Impossible de charger les pièces.");
      }
    };
    fetchRooms();
  }, []);

  const toggleBar = () => {
    setBarOpen((prevState) => !prevState);
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
            onClick={() => openModal(<AddTaskForm rooms={rooms} error={error} onClose={closeModal} />)}
          ></i>
          <i 
            className="fa-solid fa-pen-to-square"
            onClick={() => openModal(<EditTaskForm rooms={rooms} error={error} onClose={closeModal} />)}
          ></i>
          {/*<i
            className="fa-solid fa-trash"
            onClick={() => openModal(<p>Supprimer une tâche</p>)}
          ></i>*/}
        </div>

        {/* Bouton pour afficher/masquer la barre */}
        <div className="task-bar--slider-btn" ></div>
        {barOpen ?(
          <i onClick={toggleBar} className="fa-solid fa-arrow-up"/>
        ) : (
          <i onClick={toggleBar} className="fa-solid fa-arrow-down"/>

        )}
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
