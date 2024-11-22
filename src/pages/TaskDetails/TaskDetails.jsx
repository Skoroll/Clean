import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "./TaskDetails.scss";
import Spinner from "../../components/Spinner/Spinner";
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

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);
    const { roomName } = useParams(); // Récupérer le nom de la pièce via useParams
    const [tasks, setTasks] = useState([]);  // Tâches à faire
    const [completedTasks, setCompletedTasks] = useState([]);  // Tâches terminées

    useEffect(() => {
        // Charger les tâches pour la pièce correspondante
        if (taskFiles[roomName]) {
            setTasks(taskFiles[roomName]);
        } else {
            console.log("Pièce non trouvée !");
            setTasks([]); // Aucune tâche si la pièce n'est pas trouvée
        }
    }, [roomName]);

    // Fonction pour marquer une tâche comme terminée
    const markAsDone = (taskId) => {
        const taskToMark = tasks.find(task => task.id === taskId);
        setCompletedTasks([...completedTasks, taskToMark]);

        // Retirer la tâche de la liste des tâches à faire
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="tasks">
            <Link to="/votre-menage" className="return-back"><i className="fa-solid fa-arrow-left"></i> Retour à la liste</Link>
            <h1>{roomName}</h1>
            <h2>Il reste à faire ...</h2>
            {tasks.length > 0 ? (
                <div className="task-details">
                    {/* Afficher les tâches ici */}
                    {tasks.map(task => (
                        <div onClick={() => markAsDone(task.id)} key={task.id} className="task-details__task">
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
                                        <span className="tasks-details__task--frequency"> {task.frequency}</span>
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
                <p className="tasks-done--none"> ...plus aucune tâches, bravo !</p>
            )}

            {/* Afficher les tâches terminées */}
            <div className="tasks-done">
                <h2>Ce qui a été fait ...</h2>
                <div className="tasks-done__display">
                    {completedTasks.length > 0 ? (
                        completedTasks.map(task => (
                            <div key={task.id} className="task-done-item">
                                <p>{task.name} - {task.time}</p>
                            </div>
                        ))
                    ) : (
                        <p className="tasks-done--none">Aucune tâche terminée pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
