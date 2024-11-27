import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./TaskDetails.scss";
import GoBack from "../../components/GoBack/GoBack";

// Importer les fichiers JSON
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

// Créer un objet de correspondance entre les noms de pièces et les fichiers JSON
const taskFiles = {
  "Cuisine": Cuisine,
  "Bain": Bain,
  "Chambre": Chambre,
  "Cellier": Cellier,
  "Débarras": Debaras,
  "Salle à manger": Manger,
  "Entrée": Entree,
  "Salon": Salon,
  "Bureau": Bureau,
  "Toilettes": Toilettes
};

function TaskDetails() {
  const { pathname } = useLocation();
  const { roomName } = useParams(); // Récupérer le nom de la pièce via useParams
  const [tasks, setTasks] = useState([]); // Tâches à faire
  const [completedTasks, setCompletedTasks] = useState([]); // Tâches terminées
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  // Remettre la page en haut au chargement
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Charger les tâches pour la pièce correspondante
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        // Essayer de charger depuis l'API
        const response = await fetch(`/api/tasks/${roomName}`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          // Si l'API échoue, utiliser les données locales
          console.log("API indisponible, chargement depuis les fichiers JSON...");
          if (taskFiles[roomName]) {
            setTasks(taskFiles[roomName]);
          } else {
            throw new Error("Pièce non trouvée dans les fichiers JSON");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [roomName]);

  // Fonction pour marquer une tâche comme terminée
  const markAsDone = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: true }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la tâche");
      }

      // Mettre à jour localement les tâches
      const updatedTask = tasks.find((task) => task.id === taskId || task._id === taskId);
      setCompletedTasks([...completedTasks, updatedTask]);
      setTasks(tasks.filter((task) => task.id !== taskId && task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tasks">
      <GoBack target="/votre-menage" />
      <h1>{roomName}</h1>

      {/* Affichage des erreurs ou du chargement */}
      {loading ? (
        <p>Chargement des tâches...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {/* Section des tâches à faire */}
          <h2 className="tasks__subtitle">Il reste à faire ...</h2>
          {tasks.length > 0 ? (
            <div className="task-details">
              {tasks.map((task) => (
                <div
                  onClick={() => markAsDone(task.id || task._id)}
                  key={task.id || task._id}
                  className="task-details__task"
                >
                  <div className="task-details--block">
                    <p className="task-details__task--heading">
                      <i className="fa-solid fa-arrow-right"></i>
                      <span className="task-details__task--name"> {task.name}</span>
                    </p>

                    <div className="task-details__task--div-time">
                      <p className="tasks-details__task--time">
                        <i className="fa-regular fa-clock"></i>
                        <span> {task.time}</span>
                      </p>
                      <p className="task-details__task--frequency">
                        <i className="fa-solid fa-calendar"></i>
                        <span className="tasks-details__task--frequency">
                          {" "}
                          {task.frequency}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="task-details__task--description">
                    <span> {task.description}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="tasks-done--none"> ...plus aucune tâche, bravo !</p>
          )}

          {/* Section des tâches terminées */}
          <div className="tasks-done">
            <h2 className="tasks__subtitle">Ce qui a été fait ...</h2>
            <div className="tasks-done__display">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <div key={task.id || task._id} className="task-done-item">
                    <p>
                      {task.name} - {task.time}
                    </p>
                  </div>
                ))
              ) : (
                <p className="tasks-done--none">
                  Aucune tâche terminée pour le moment.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskDetails;
