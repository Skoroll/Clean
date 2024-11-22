import React, { useState } from 'react';

function AddCategory({ onAdd }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une catégorie</h2>
      <input
        type="text"
        placeholder="Créer une catégorie"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddCategory;
