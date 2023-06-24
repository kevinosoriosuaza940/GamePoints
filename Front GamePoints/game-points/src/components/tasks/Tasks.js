import React from 'react';

const Task = ({ task }) => {
  return (
    <div>
      <h3>{task.nombreTarea}</h3>
      <p>Descripción: {task.descripcion}</p>
      <p>Puntos: {task.puntos}</p>
    </div>
  );
};

export default Task;
