import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Task from "../tasks/Tasks";

const User = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [showModal, setShowModal] = useState(false);
  const [showModalAddTasks, setShowModalAddTasks] = useState(false);
  const [userUpdate, setUserUpdate] = useState(user);
  console.log(user);

  useEffect(() => {
    // Realiza la llamada a la API para obtener las tareas actualizadas del usuario

    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${user._id}/tasks`);
        const data = await response.json();
        setUserUpdate((prevUser) => ({
          ...prevUser,
          tareas: data,
        }));
      } catch (error) {
        console.error("Error fetching user tasks:", error);
      }
    };

    fetchUserTasks();
  }, [user._id]);

  const assignTaskToUser = async (userId, task) => {
  try {
    await fetch(`http://localhost:3001/api/users/${userId}/assign-task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.error("Error assigning task:", error);
  }
};


  const handleEditTask = (taskId) => {
    // Implementa la lógica para editar una tarea
    console.log("Edit task with ID:", taskId);
  };

  const handleDeleteTask = (taskId) => {
    // Implementa la lógica para eliminar una tarea
    console.log("Delete task with ID:", taskId);
  };

  const handleAssignTask = async (task) => {
    const userId = user._id;
  
    try {
      await assignTaskToUser(userId, task);
  
      // Actualiza el estado del usuario con la nueva tarea asignada
      const updatedUser = { ...userUpdate };
      updatedUser.tareas.push(task);
  
      // Recalcula el número de puntos
      const totalPoints = updatedUser.tareas.reduce((sum, task) => sum + task.puntos, 0);
      updatedUser.numeroDePuntos = totalPoints;
  
      setUserUpdate(updatedUser);
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalAddTasks = () => {
    setShowModalAddTasks(false);
  };
  const calculateTotalPoints = () => {
    let totalPoints = 0;
    userUpdate.tareas.forEach((task) => {
      totalPoints += task.puntos;
    });
    return totalPoints;
  };

  return (
    <div>
      <h1>Bienvenido: {user.nombre}</h1>
      <p>Número de puntos: {calculateTotalPoints()}</p>
      {/* Botón "Ver tareas" */}
      <button onClick={() => setShowModal(true)}>Ver tareas</button>
      <button onClick={() => setShowModalAddTasks(true)}>Agregar tareas</button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tareas</h2>
            <ul>
              {userUpdate.tareas.map((task, index) => (
                <li key={index}>
                  <p>Tarea: {task.tarea}</p>
                  <p>Descripción: {task.descripcion}</p>
                  <p>Puntos: {task.puntos}</p>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleCloseModal}>Cerrar</button>
        </div>
      )}
      {showModalAddTasks && (
        <Task
          userId={user._id}
          task={user.tareas[0]} // Aquí debes proporcionar los datos de la tarea que se mostrará en el modal
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onAssign={handleAssignTask}
          onClose={handleCloseModalAddTasks}
        />
      )}
    </div>
  );
};

export default User;
