import React, { useState, useEffect } from 'react';

const Tasks = ({ userId, onEdit, onDelete, onAssign, onClose }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  const assignTaskToUser = async (userId, task) => {
    console.log(task)
    const taskToAdd = {
      tarea: task.nombreTarea,
      descripcion: task.descripcion,
      puntos: task.puntos,
    };
  
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/assign-task`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToAdd),
      });
  
      if (!response.ok) {
        throw new Error('Error assigning task');
      }
  
      console.log('Task assigned successfully');
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Tareas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Puntos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
        
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.nombre}</td>
                <td>{task.descripcion}</td>
                <td>{task.numeroDePuntos}</td>
                <td>
                  <button onClick={() => onEdit(task.id)}>Editar</button>
                  <button onClick={() => onDelete(task.id)}>Borrar</button>
                  <button onClick={() => assignTaskToUser(userId, task)}>Asignar</button>
                  {

console.log(task)
}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Tasks;
