import React, { useState } from 'react';

function ChangeCategory({ onAdd }) {
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
        <h2>Que changer ?</h2>

    </form>
  );
}

export default ChangeCategory;
