import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import { useLocation } from "react-router-dom";
import Collapses from "../../components/Collapses/Collapses";
import TaskBar from "../../components/TaskBar/TaskBar";
import "./TaskDetails.scss";

function TaskDetails() {
  const { roomName } = useParams(); // Récupérer le nom de la pièce via useParams
  const [tasks, setTasks] = useState([]); // Liste des tâches en cours pour la pièce
  const [completedTasks, setCompletedTasks] = useState([]); // Liste des tâches terminées
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Message d'erreur en cas de problème
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${roomName} - ChoreOrganizer`;
  }, [roomName]);
  

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Fonction de récupération des tâches terminées
  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/tasks/completed?rooms=${roomName}`
      );
      setCompletedTasks(response.data); // Mise à jour de l'état avec les tâches terminées récupérées
    } catch (err) {
      setError("Erreur lors de la récupération des tâches terminées.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction de récupération des tâches non terminées
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/tasks/by-room?rooms=${roomName}`
      );
      const filteredTasks = response.data.filter(
        (task) => task.room === roomName
      );

      // Séparer les tâches en fonction de leur état (non terminées ou terminées)
      const globalTasks = filteredTasks.filter((task) => task.isGlobal);
      const userTasks = filteredTasks.filter((task) => !task.isGlobal); // Tâches spécifiques à l'utilisateur

      const pendingTasks = [
        ...userTasks.filter((task) => !task.isDone),
        ...globalTasks.filter((task) => !task.isDone),
      ];
      setTasks(pendingTasks); // Tâches à faire

      fetchCompletedTasks(); // Récupérer les tâches terminées en parallèle
    } catch (err) {
      setError("Erreur lors de la récupération des tâches.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour marquer une tâche comme terminée
  const markAsDone = async (taskId) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}/done`); // Mise à jour de la tâche en base de données
      fetchTasks(); // Rafraîchir la liste des tâches après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  // Nouvelle fonction : supprimer une tâche
  const deleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`); // Assurez-vous que cette route existe
      fetchTasks(); // Rafraîchir la liste après suppression
    } catch (error) {
      if (error.response) {
        console.error("Erreur serveur :", error.response.data);
        setError(`Erreur : ${error.response.data.message}`);
      } else {
        console.error("Erreur réseau :", error.message);
        setError("Erreur réseau. Veuillez vérifier votre connexion.");
      }
    }
  };
  
  // Récupérer les tâches à chaque changement de roomName
  useEffect(() => {
    fetchTasks();
  }, [roomName]);

  return (
    <div className="tasks">
      <GoBack target="/votre-menage" />
      <TaskBar />
      <h1>{roomName}</h1>

      {/* Section des tâches à faire */}
      <h2 className="tasks__subtitle">Il reste à faire ...</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : tasks.length > 0 ? (
        <div className="task-details">
          {tasks.map((task) => (
            <Collapses
              key={task._id}
              title={task.name}
              icon={
                <>
                  {/* Bouton pour marquer comme terminé */}
                  <i
                    className="fa-solid fa-check"
                    onClick={() => markAsDone(task._id)}
                  ></i>
                  {/* Bouton pour supprimer une tâche */}
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteTask(task._id)} // Appel de la nouvelle fonction
                  ></i>
                </>
              }
            >
              <div className="task-details__task">
                <div className="task-details--block">
                  <div className="task-details__task--div-time">
                    <p className="tasks-details__task--time">
                      <i className="fa-regular fa-clock"></i>
                      <span> {task.time}</span>
                    </p>
                    <p className="task-details__task--frequency">
                      <i className="fa-solid fa-calendar"></i>
                      <span className="tasks-details__task--frequency">
                        {task.frequency}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="task-details__task--description">
                  <span> {task.description}</span>
                </p>
                <div className="task-details__task--tools">
                  {task.what && task.what.length > 0 && (
                    <ul>
                      {task.what.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Collapses>
          ))}
        </div>
      ) : (
        <p className="tasks-done--none">...plus aucune tâche, bravo !</p>
      )}

      {/* Section des tâches terminées */}
      <div className="tasks-done">
        <h2 className="tasks__subtitle">Ce qui a été fait ...</h2>
        <div className="tasks-done__display">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task._id} className="task-done-item">
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
    </div>
  );
}

export default TaskDetails;
