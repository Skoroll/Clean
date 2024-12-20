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
  const { roomName } = useParams();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${roomName} - ChoreOrganizer`;
  }, [roomName]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/tasks/completed?rooms=${roomName}`);
      setCompletedTasks(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des tâches terminées.");
    } finally {
      setLoading(false);
    }
  };

  const calculateNextDueDate = (frequency, lastCompleted) => {
    const now = new Date(lastCompleted);
    switch (frequency) {
      case 'Quotidienne':
        return new Date(now.setDate(now.getDate() + 1));
      case 'Hebdomadaire':
        return new Date(now.setDate(now.getDate() + 7));
      case 'Mensuelle':
        return new Date(now.setMonth(now.getMonth() + 1));
      case 'Après chaque utilisation':
        return now;
      case 'Trimestrielle':
        return new Date(now.setMonth(now.getMonth() + 3));
      case 'Semestrielle':
        return new Date(now.setMonth(now.getMonth() + 6));
      default:
        return now;
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/tasks/by-room?rooms=${roomName}`);
      const filteredTasks = response.data.filter((task) => task.room === roomName);
      const globalTasks = filteredTasks.filter((task) => task.isGlobal);
      const userTasks = filteredTasks.filter((task) => !task.isGlobal);
      const pendingTasks = [
        ...userTasks.filter((task) => !task.isDone),
        ...globalTasks.filter((task) => !task.isDone),
      ];
      setTasks(pendingTasks);
      fetchCompletedTasks();
    } catch (err) {
      setError("Erreur lors de la récupération des tâches.");
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (taskId) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}/done`);
      fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  const unMarkDone = async (taskId) => {
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}/undone`);
        fetchTasks();
    } catch (error) {
      console.error("Erreur dans la dévalidation de la tâche.")
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);
      fetchTasks();
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

  useEffect(() => {
    fetchTasks();
  }, [roomName]);

  return (
    <div className="tasks">
      <GoBack target="/votre-menage" />
      <TaskBar />
      <h1>{roomName}</h1>

      <h2 className="tasks__subtitle">Il reste à faire ...</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : tasks.length > 0 ? (
        <div className="task-details">
          {tasks.map((task) => {
            const nextDueDate = calculateNextDueDate(task.frequency, task.lastCompleted);
            const nextDueDateString = nextDueDate.toLocaleDateString();
            return (
              <Collapses
                key={task._id}
                title={task.name}
                icon={
                  <>
                    <i
                      className="fa-solid fa-check"
                      onClick={() => markAsDone(task._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteTask(task._id)}
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
                  <p className="task-details__task--next-due">
                    <span>Prochaine échéance : {nextDueDateString}</span>
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
            );
          })}
        </div>
      ) : (
        <p className="tasks-done--none">...plus aucune tâche, bravo !</p>
      )}

      {/* Section des tâches terminées */}
      <div className="tasks-done">
        <h2 className="tasks__subtitle">Ce qui a été fait ...</h2>
        <div className="tasks-done__display">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => {
              // Calcul de la prochaine date d'échéance
              const nextDueDate = calculateNextDueDate(task.frequency, task.lastCompleted);
              const nextDueDateString = nextDueDate ? nextDueDate.toLocaleDateString() : 'Non défini';

              return (
                <div key={task._id} className="tasks-done__display--item">
                  <i onClick={() => unMarkDone(task._id)} className="fa-regular fa-circle-xmark" />
                  <p>
                   <span className="tasks-done__display--name">{task.name}</span>
                   </p>
                   <p>
                    Fait le : <span className="tasks-done__display--date"> {task.lastCompleted ? new Date(task.lastCompleted).toLocaleDateString() : 'Non défini'} </span>
                    <br />
                    A refaire le :<span className="tasks-done__display--date"> {nextDueDateString}</span>
                    </p>
                </div>
              );
            })
          ) : (
            <p className="tasks-done--none">Aucune tâche terminée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
