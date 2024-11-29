import React, { useState } from 'react';

function AddTaskForm({ rooms }) {
  // État pour les champs du formulaire
  const [taskName, setTaskName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [frequency, setFrequency] = useState('');
  const [description, setDescription] = useState('');
  const [equipments, setEquipments] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      time: estimatedTime,
      frequency,
      description,
      equipments: equipments.split(',').map((item) => item.trim()),
      room: selectedRoom,
    };
    console.log('Nouvelle tâche ajoutée:', newTask);
    // Réinitialiser les champs après soumission
    setTaskName('');
    setEstimatedTime('');
    setFrequency('');
    setDescription('');
    setEquipments('');
    setSelectedRoom('');
  };

  return (
    <div className="modal-form">
      <p className="modal-form--heading">Créer une tâche</p>
      <form className="form" onSubmit={handleSubmit}>
        {/* Nom de la tâche */}
        <div className="form-group">
          <label htmlFor="taskName">Nom de la tâche</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        {/* Temps estimé */}
        <div className="form-group">
          <label htmlFor="estimatedTime">Temps estimé (en minutes)</label>
          <input
            type="number"
            id="estimatedTime"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            required
          />
        </div>

        {/* Fréquence */}
        <div className="form-group">
          <label htmlFor="frequency">Fréquence</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="" disabled>
              Choisissez une fréquence
            </option>
            <option value="Quotidienne">Quotidienne</option>
            <option value="Hebdomadaire">Hebdomadaire</option>
            <option value="Mensuelle">Mensuelle</option>
            <option value="Annuelle">Annuelle</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="300"
            required
          ></textarea>
          <p>{description.length}/300 caractères</p>
        </div>

        {/* Équipements requis */}
        <div className="form-group">
          <label htmlFor="equipments">Équipements requis (séparés par des virgules)</label>
          <input
            type="text"
            id="equipments"
            value={equipments}
            onChange={(e) => setEquipments(e.target.value)}
          />
        </div>

        {/* Sélection de la pièce */}
        <div className="form-group">
          <label htmlFor="room">Pièce</label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
          >
            <option value="" disabled>
              Choisissez une pièce
            </option>
            {rooms.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="sign-btn">
          Ajouter la tâche
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
