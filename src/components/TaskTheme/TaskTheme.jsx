import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axiosInstance from "../../Config/axiosConfig";
import Cuisine from "../../assets/TaskLists/Kitchen.json";
import Bain from "../../assets/TaskLists/BathRoom.json";
import Chambre from "../../assets/TaskLists/BedRoom.json";
import Cellier from "../../assets/TaskLists/Cellar.json";
import Debaras from "../../assets/TaskLists/Clearance.json";
import Manger from "../../assets/TaskLists/DiningRoom.json";
import Entree from "../../assets/TaskLists/Entrance.json";
import Salon from "../../assets/TaskLists/LivingRoom.json";
import Bureau from "../../assets/TaskLists/Office.json";
import Toilettes from "../../assets/TaskLists/Toilets.json";
import Spinner from '../Spinner/Spinner';
import "./TaskTheme.scss";

function TaskTheme() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [tasksData, setTasksData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setRooms(response.data.user.rooms); // Utilisez `user.rooms` pour les pièces
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

    fetchRooms();
  }, []);

  useEffect(() => {
    const taskFiles = {
      "Salle de bain": Bain,
      "Toilettes": Toilettes,
      "Cuisine": Cuisine,
      "Chambre": Chambre,
      "Cellier": Cellier,
      "Débarras": Debaras,
      "Salle à manger": Manger,
      "Entrée": Entree,
      "Salon": Salon,
      "Bureau": Bureau
    };

    const loadTasks = () => {
      let tasks = {};
      
      rooms.forEach((room) => {
        if (taskFiles[room]) {
          tasks[room] = taskFiles[room];
        }
      });

      setTasksData(tasks); // Mettre à jour l'état avec les tâches de chaque pièce
    };

    loadTasks();
  }, [rooms]);

  return (
    <div className="task-theme">
      {error && <div className="error-message">{error}</div>}
      {rooms.length > 0 ? (
        rooms.map((room, index) => (
          <Link to={`/votre-menage/${room}`} key={index}>
            <div className='task-theme__card'>
              <h3>{room}</h3>
              <p>Tâches <span className="task-theme__card--done">0</span> / <span className="task-theme__card--remaining">
                   {tasksData[room] ? tasksData[room].length : 0}
                 </span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TaskTheme;
