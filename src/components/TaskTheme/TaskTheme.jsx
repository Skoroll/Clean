import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axiosInstance from "../../Config/axiosConfig";
import Spinner from '../Spinner/Spinner';
import "./TaskTheme.scss";

function TaskTheme() {
  const [rooms, setRooms] = useState([]);  // Liste des pièces récupérées
  const [error, setError] = useState(null); // Message d'erreur en cas de problème
  const [tasksData, setTasksData] = useState({}); // Tâches filtrées par pièce

  // Hook pour récupérer les pièces de l'utilisateur depuis son profil
  useEffect(() => {
    const token = localStorage.getItem('userToken');  // Récupérer le token de l'utilisateur
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
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

    fetchRooms();  // Lancer la récupération des pièces au démarrage
  }, []); // Ne dépend de rien sauf de l'initialisation

  // Fonction pour récupérer le nombre de tâches terminées pour chaque pièce
  const getCompletedTasksCount = (tasks) => {
    return tasks.filter(task => task.isDone).length;
  };

  // Hook pour récupérer les tâches pour chaque pièce
  useEffect(() => {
    const fetchTasksForRooms = async () => {
      try {
        const response = await axiosInstance.get('/tasks'); // Utilise axiosInstance avec le token ajouté automatiquement
        const tasks = response.data || [];
        let tasksPerRoom = {};
    
        rooms.forEach((room) => {
          const tasksForRoom = tasks.filter(task => task.room === room);
          tasksPerRoom[room] = tasksForRoom;
        });
    
        setTasksData(tasksPerRoom); // Met à jour les tâches pour chaque pièce
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
        setError('Erreur lors de la récupération des tâches.');
      }
    };

    if (rooms.length > 0) {
      fetchTasksForRooms();  // Lancer la récupération des tâches dès que les pièces sont disponibles
    }
  }, [rooms]);  // Ce useEffect dépend de `rooms`

  return (
    <div className="task-theme">
      {error && <div className="error-message">{error} <Spinner /></div>}
      {rooms.length > 0 ? (
        rooms.map((room, index) => {
          const tasksForRoom = tasksData[room] || [];
          const completedTasksCount = getCompletedTasksCount(tasksForRoom); // Nombre de tâches terminées pour la pièce
          
          return (
            <Link to={`/votre-menage/${room}`} key={index}>
              <div className='task-theme__card'>
                <h3>{room}</h3>
                <p>
                  Tâches <span className="task-theme__card--done">{completedTasksCount}</span> / 
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
