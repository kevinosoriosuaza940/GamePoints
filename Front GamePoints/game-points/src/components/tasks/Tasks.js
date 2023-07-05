import React, { useState, useEffect } from 'react';
import CreateTasks from '../users/CreateTasks';
import EditTask from '../users/EditTask';

const Tasks = ({ userId, onEdit, onDelete, onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [editTask, setEditTask] = useState(null);

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
    console.log(userId,'????????????????????????????????')
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
      
      alert('Tarea asignada correctamente');
      window.location.reload();
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleOpenCreateTasks = () => {
    setShowCreateTasks(true);
  };
  
  const handleCloseCreateTasks = () => {
    setShowCreateTasks(false);
  };

  const handleOpenEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditTask(taskToEdit);
  };
  
  const handleCloseEditTask = () => {
    setEditTask(null);
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
                <td>{task.puntos}</td>
                <td>
                  <button onClick={() => handleOpenEditTask(task.id)}>Editar</button>
                  <button onClick={() => onDelete(task.id)}>Borrar</button>
                  <button onClick={() => assignTaskToUser(userId, task)}>Asignar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleOpenCreateTasks}>Crear tarea</button>
        {showCreateTasks && (
          <CreateTasks
            onAssign={assignTaskToUser}
            onClose={handleCloseCreateTasks}
          />
        )}
        {editTask && (
          <EditTask
            taskId={editTask.id}
            onEdit={onEdit}
            onClose={handleCloseEditTask}
          />
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Tasks;
