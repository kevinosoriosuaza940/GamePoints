import React, { useState, useEffect } from "react";

const TasksList = ({ tasks, onClose, userId }) => {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);
        const data = await response.json();
        setUserTasks(data.tareas);
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchUserTasks();
  }, [userId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Tareas</h2>
        <p>Número de Tareas: {userTasks.length}</p>
        <ul>
          {userTasks.map((task, index) => (
            <li key={index}>
              <p>Tarea: {task.tarea}</p>
              <p>Descripción: {task.descripcion}</p>
              <p>Puntos: {task.puntos}</p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default TasksList;

