import React, { useState } from 'react';

function EditTaskForm({ rooms, tasksByRoom, onSave }) {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [taskData, setTaskData] = useState(null);

  // Gestion de la sélection d'une pièce
  const handleRoomChange = (e) => {
    const room = e.target.value;
    setSelectedRoom(room);
    setSelectedTask(''); // Réinitialise la tâche sélectionnée
    setTaskData(null); // Réinitialise les données de la tâche
  };

  // Gestion de la sélection d'une tâche
  const handleTaskChange = (e) => {
    const taskId = e.target.value;
    setSelectedTask(taskId);

    // Charger les données de la tâche
    const task = tasksByRoom[selectedRoom].find((task) => task.id === taskId);
    setTaskData(task);
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
    console.log('Tâche mise à jour:', taskData);
  };

  return (
    <div className="edit-task-form">
      <p className="form-heading">Modifier une tâche</p>
      
      {/* Sélection de la pièce */}
      <div className="form-group">
        <label htmlFor="room">Choisir une pièce</label>
        <select
          id="room"
          value={selectedRoom}
          onChange={handleRoomChange}
          required
        >
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
          <select
            id="task"
            value={selectedTask}
            onChange={handleTaskChange}
            required
          >
            <option value="" disabled>Choisissez une tâche</option>
            {tasksByRoom[selectedRoom]?.map((task) => (
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
              value={taskData.name}
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
              value={taskData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Fréquence</label>
            <select
              id="frequency"
              name="frequency"
              value={taskData.frequency}
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
              value={taskData.description}
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
              value={taskData.equipments}
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
