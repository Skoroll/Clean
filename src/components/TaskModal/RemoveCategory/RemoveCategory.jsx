import React, { useState } from 'react';

function RemoveCategory({ onAdd }) {
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
        <h2>Quelle catégorie supprimer ?</h2>

        <input type="submit" />
    </form>
  );
}

export default RemoveCategory;
