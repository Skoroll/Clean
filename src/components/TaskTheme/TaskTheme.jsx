import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axiosInstance from "../../Config/axiosConfig";
import Spinner from '../Spinner/Spinner';
import "./TaskTheme.scss";

import kitchenIcon from "../../assets/icons/kitchen.png";
import bathroomIcon from "../../assets/icons/baignoire.png";
import livingIcon from "../../assets/icons/decoration.png";
import officeIcon from "../../assets/icons/de-face.png";
import clearanceIcon from "../../assets/icons/depot.png";
import CellarIcon from "../../assets/icons/etageres.png";
import entranceIcon from "../../assets/icons/porte.png";
import BedroomIcon from "../../assets/icons/lit-double.png";
import diningroomIcon from "../../assets/icons/restaurant.png";
import toiletIcon from "../../assets/icons/toilette.png";


function TaskTheme() {
  const [rooms, setRooms] = useState([]); // Liste des pièces récupérées
  const [error, setError] = useState(null); // Message d'erreur en cas de problème
  const [tasksData, setTasksData] = useState({}); // Tâches filtrées par pièce

  const normalizeRoomName = (name) => {
    return name
      .toLowerCase()            // Convertit tout en minuscule
      .normalize("NFD")         // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/ /g, '-')       // Remplace les espaces par des tirets
      .replace(/[^\w-]/g, '');  // Supprime les caractères non alphanumériques (sauf les tirets)
  };
  
  
  const roomIcons = {
    'cuisine': kitchenIcon,
    'salle-de-bain': bathroomIcon,
    'salon': livingIcon,
    'bureau': officeIcon,
    'debarras': clearanceIcon,
    'salle-a-manger': diningroomIcon, // Remplacer "à" par "a"
    'cellier': CellarIcon,
    'chambre': BedroomIcon,
    'toilettes': toiletIcon,
    'entree': entranceIcon, // Remplacer "é" par "e"
    'default': "",
  };
  
  
  const getRoomIcon = (room) => {
    const normalizedRoom = normalizeRoomName(room); // Normalise le nom de la pièce
    return roomIcons[normalizedRoom] || roomIcons['default']; // Récupère l'icône ou la valeur par défaut
  };
  


  // Hook pour récupérer les pièces de l'utilisateur depuis son profil
  useEffect(() => {
    const token = localStorage.getItem('userToken'); // Récupérer le token de l'utilisateur
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data.user.rooms); // Récupérer les pièces de l'utilisateur depuis son profil
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Aucune donnée trouvée pour les pièces.');
          } else {
            setError(`Erreur ${error.response.status}: ${error.response.data.message}`);
          }
        } else {
          setError('Une erreur est survenue.');
        }
      }
    };

    fetchRooms(); // Lancer la récupération des pièces au démarrage
  }, []); // Ne dépend de rien sauf de l'initialisation

  // Fonction pour récupérer le nombre de tâches terminées pour chaque pièce
  const getCompletedTasksCount = (tasks) => {
    return tasks.filter((task) => task.isDone).length;
  };

  // Hook pour récupérer les tâches pour chaque pièce
  useEffect(() => {
    const fetchTasksForRooms = async () => {
      try {
        const response = await axiosInstance.get('/tasks'); // Utilise axiosInstance avec le token ajouté automatiquement
        const tasks = response.data || [];
        let tasksPerRoom = {};

        rooms.forEach((room) => {
          const tasksForRoom = tasks.filter((task) => task.room === room);
          tasksPerRoom[room] = tasksForRoom;
        });

        setTasksData(tasksPerRoom); // Met à jour les tâches pour chaque pièce
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        setError('Erreur lors de la récupération des tâches.');
      }
    };

    if (rooms.length > 0) {
      fetchTasksForRooms(); // Lancer la récupération des tâches dès que les pièces sont disponibles
    }
  }, [rooms]); // Ce useEffect dépend de `rooms`

  return (
    <div className="task-theme">
      {error && <div className="error-message">{error} <Spinner /></div>}
      {rooms.length > 0 ? (
        rooms.map((room, index) => {
          const tasksForRoom = tasksData[room] || [];
          const completedTasksCount = getCompletedTasksCount(tasksForRoom); // Nombre de tâches terminées pour la pièce
          const roomIcon = getRoomIcon(room); // Obtenir l'icône correspondant à la pièce

          return (
            <Link to={`/votre-menage/${room}`} key={index}>
              <div className="task-theme__card">
                <h3 className='task-theme__card--title'>{room}</h3>
                <img src={roomIcon} alt={`Icône pour ${room}`} className="task-theme__card--icon" />
                <p className='task-theme__card--counter'>
                  Tâches 
                  <br />
                  <span className="task-theme__card--done">{completedTasksCount}</span> / 
                  <span className="task-theme__card--remaining">
                    {tasksForRoom.length}
                  </span>
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        !error && <Spinner />
      )}
    </div>
  );
}

export default TaskTheme;

