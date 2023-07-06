import React, { useState, useEffect } from "react";
import CreateTasks from "./CreateTasks";
import EditTask from "./EditTask";

const Tasks = ({ userId, onEdit, onDelete, onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [editTask, setEditTask] = useState(false);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const assignTaskToUser = async (userId, task) => {
    const taskToAdd = {
      tarea: task.nombreTarea,
      descripcion: task.descripcion,
      puntos: task.puntos,
    };

    try {
      await fetch(`http://localhost:3001/api/users/${userId}/assign-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToAdd),
      });

      // Actualizar el estado del usuario llamando a la función onEdit desde el componente padre
      onEdit();
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const handleOpenCreateTasks = () => {
    setShowCreateTasks(true);
  };

  const handleCloseCreateTasks = () => {
    setShowCreateTasks(false);
  };

  const handleOpenEditTask = (taskId) => {
    setEditTask(taskId);
  };

  const handleCloseEditTask = () => {
    setEditTask(null);
  };

  return (
    <div>
      <div className="modal-style">
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
              <tr key={task._id}>
                <td>{task.nombreTarea}</td>
                <td>{task.descripcion}</td>
                <td>{task.puntos}</td>
                <td>
                  <button onClick={() => handleOpenEditTask(task._id)}>
                    Editar
                  </button>
                  <button onClick={() => onDelete(task.id)}>Borrar</button>
                  <button onClick={() => assignTaskToUser(userId, task)}>
                    Asignar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleOpenCreateTasks}>Crear tarea</button>
      {showCreateTasks && (
        <CreateTasks
          onAssign={assignTaskToUser}
          onClose={handleCloseCreateTasks}
        />
      )}
      {editTask && (
        <EditTask
          taskId={editTask}
          onEdit={onEdit}
          onClose={handleCloseEditTask}
        />
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default Tasks;
