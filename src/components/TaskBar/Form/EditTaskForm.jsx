import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Config/axiosConfig';

function EditTaskForm({ onSave }) {
  const [rooms, setRooms] = useState([]); // Liste des pièces
  const [selectedRoom, setSelectedRoom] = useState('');
  const [tasks, setTasks] = useState([]); // Liste des tâches de la pièce sélectionnée
  const [selectedTask, setSelectedTask] = useState('');
  const [taskData, setTaskData] = useState(null); // Données de la tâche sélectionnée
  const [error, setError] = useState(null);

  // Récupérer la liste des pièces au montage
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axiosInstance.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data.user.rooms || []); // Mise à jour des pièces
      } catch (err) {
        console.error('Erreur lors de la récupération des pièces :', err);
        setError('Impossible de charger les pièces.');
      }
    };
    fetchRooms();
  }, []);

  // Récupérer les tâches en fonction de la pièce sélectionnée
  useEffect(() => {
    if (selectedRoom) {
      const fetchTasks = async () => {
        try {
          const response = await axiosInstance.get(`/tasks?room=${selectedRoom}`);
          setTasks(response.data); // Filtrage des tâches par pièce
        } catch (error) {
          console.error('Erreur lors de la récupération des tâches :', error);
          setTasks([]);
        }
      };
      fetchTasks();
    } else {
      setTasks([]); // Réinitialise les tâches si aucune pièce n'est sélectionnée
    }
  }, [selectedRoom]);

  // Gestion du changement de pièce
  const handleRoomChange = (e) => {
    const room = e.target.value;
    setSelectedRoom(room);
    setSelectedTask(''); // Réinitialise la tâche sélectionnée
    setTaskData(null); // Réinitialise les données de la tâche
  };

  // Gestion du changement de tâche
  const handleTaskChange = (e) => {
    const taskId = e.target.value;
    setSelectedTask(taskId);

    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskData(task); // Préremplit le formulaire avec les données de la tâche
    }
  };

  // Gestion des modifications dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(selectedRoom, selectedTask, taskData);
    }
  };

  return (
    <div className="edit-task-form">
      <p className="form-heading">Modifier une tâche</p>

      {/* Sélection de la pièce */}
      <div className="form-group">
        <label htmlFor="room">Choisir une pièce</label>
        <select id="room" value={selectedRoom} onChange={handleRoomChange} required>
          <option value="" disabled>Choisissez une pièce</option>
          {rooms.map((room, index) => (
            <option key={index} value={room}>{room}</option>
          ))}
        </select>
      </div>

      {/* Sélection de la tâche */}
      {selectedRoom && (
        <div className="form-group">
          <label htmlFor="task">Choisir une tâche</label>
          <select id="task" value={selectedTask} onChange={handleTaskChange} required>
            <option value="" disabled>Choisissez une tâche</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Formulaire de modification */}
      {taskData && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Nom de la tâche</label>
            <input
              type="text"
              id="taskName"
              name="name"
              value={taskData.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estimatedTime">Temps estimé (en minutes)</label>
            <input
              type="number"
              id="estimatedTime"
              name="time"
              value={taskData.time || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Fréquence</label>
            <select
              id="frequency"
              name="frequency"
              value={taskData.frequency || ''}
              onChange={handleChange}
              required
            >
              <option value="Quotidienne">Quotidienne</option>
              <option value="Hebdomadaire">Hebdomadaire</option>
              <option value="Mensuelle">Mensuelle</option>
              <option value="Annuelle">Annuelle</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description || ''}
              onChange={handleChange}
              maxLength="300"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="equipments">Équipements requis</label>
            <input
              type="text"
              id="equipments"
              name="equipments"
              value={taskData.equipments || ''}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="form-submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

export default EditTaskForm;
