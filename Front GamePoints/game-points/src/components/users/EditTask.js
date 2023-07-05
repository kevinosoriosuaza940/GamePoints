import React, { useState, useEffect } from 'react';

const EditTask = ({ taskId, onEdit, onClose }) => {
    console.log('/////////////////',taskId,'//////////////////////')
  const [task, setTask] = useState({
    nombreTarea: '',
    descripcion: '',
    puntos: 0,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`);
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.log('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleInputChange = (event) => {
    setTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Error updating task');
      }

      alert('Tarea actualizada correctamente');

      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreTarea">Tarea:</label>
            <input
              type="text"
              id="nombreTarea"
              name="nombreTarea"
              value={task.nombreTarea}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={task.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="puntos">Puntos:</label>
            <input
              type="number"
              id="puntos"
              name="puntos"
              value={task.puntos}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditTask;
