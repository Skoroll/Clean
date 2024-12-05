import React, { useState } from 'react';
import axiosInstance from '../../../Config/axiosConfig';

const AddTaskForm = ({ rooms, error, onClose }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    time: '',
    frequency: '',
    room: rooms[0],
    what: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation des champs
    if (!task.frequency) {
      alert('Veuillez sélectionner une fréquence.');
      return;
    }
  
    const whatArray = task.what
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  
    if (whatArray.length === 0) {
      alert('Veuillez spécifier au moins un outil.');
      return;
    }
  
    try {
      const token = localStorage.getItem('userToken');
      const response = await axiosInstance.post(
        '/tasks',
        { ...task, what: whatArray },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Tâche ajoutée avec succès:', response.data);
  
      // Appel de onClose après succès
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };
  

  return (
    <form className='task-bar__form' onSubmit={handleSubmit}>
      <p className="task-bar--heading">Ajouter une tâche</p>
      <label>
        Nom de la tâche
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          placeholder="Nom de la tâche"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </label>

      <label>
        Quelle pièce
        <select name="room" value={task.room} onChange={handleChange}>
          {rooms.map((room, index) => (
            <option key={index} value={room}>{room}</option>
          ))}
        </select>
      </label>

      <label>
        Durée de la tâche (en minutes)
        <input
          type="number"
          name="time"
          value={task.time}
          onChange={handleChange}
          placeholder="Durée estimée"
        />
      </label>

      <label>
        A quelle fréquence
        <select name="frequency" value={task.frequency} onChange={handleChange}>
          <option value="">Choisissez une fréquence</option>
          <option value="Quotidienne">Quotidienne</option>
          <option value="Hebdomadaire">Hebdomadaire</option>
          <option value="Mensuelle">Mensuelle</option>
          <option value="Trimestrielle">Trimestrielle</option>
          <option value="Semestrielle">Semestrielle</option>
        </select>
      </label>

      <label>
        Outils nécessaires (séparez-les par des virgules)
        <input
          type="text"
          name="what"
          value={task.what}
          onChange={handleChange}
          placeholder="Ex: balai, serpillère, seau"
        />
      </label>

      <button type="submit">Ajouter la tâche</button>
    </form>
  );
};

export default AddTaskForm;
