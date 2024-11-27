import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import "./TaskDetails.scss";

function TaskDetails() {
  const { roomName } = useParams(); // Récupérer le nom de la pièce via useParams
  const [tasks, setTasks] = useState([]); // Liste des tâches en cours pour la pièce
  const [completedTasks, setCompletedTasks] = useState([]); // Liste des tâches terminées
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Message d'erreur en cas de problème

  // Fonction de récupération des tâches terminées
  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/tasks/completed?rooms=${roomName}`);
      // Mise à jour de l'état avec les tâches terminées récupérées
      setCompletedTasks(response.data);
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
      const response = await axiosInstance.get(`/tasks/by-room?rooms=${roomName}`);
      const filteredTasks = response.data.filter(task => task.room === roomName);

      // Séparer les tâches en fonction de leur état (non terminées ou terminées)
      const globalTasks = filteredTasks.filter(task => task.isGlobal);
      const userTasks = filteredTasks.filter(task => !task.isGlobal);

      const pendingTasks = globalTasks.filter(task => !task.isDone);
      setTasks(pendingTasks); // Tâches à faire

      // Récupérer aussi les tâches terminées
      fetchCompletedTasks(); // Récupérer les tâches terminées en parallèle
    } catch (err) {
      setError("Erreur lors de la récupération des tâches.");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les tâches à chaque changement de roomName
  useEffect(() => {
    fetchTasks();
  }, [roomName]);

  // Fonction pour marquer une tâche comme terminée
  const markAsDone = async (taskId) => {
    try {
      // Effectuer la mise à jour de la tâche en base de données
      const response = await axiosInstance.put(`/tasks/${taskId}/done`);

      // Afficher la réponse du backend après la mise à jour
      console.log("Réponse après validation de la tâche : ", response.data);

      // Récupérer à nouveau toutes les tâches et les filtrer
      fetchTasks(); // Rafraîchir la liste des tâches après mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  return (
    <div className="tasks">
      <GoBack target="/votre-menage" />
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
            <div
              key={task._id}
              onClick={() => markAsDone(task._id)}
              className="task-details__task"
            >
              <i className="fa-solid fa-trash"></i>
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
