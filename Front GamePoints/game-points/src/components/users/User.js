import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Task from "../tasks/Tasks";
import TasksList from "./TasksList";

const User = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [showModalAddTasks, setShowModalAddTasks] = useState(false);
  const [userUpdate, setUserUpdate] = useState(user);
  const [showTaskList, setShowTaskList] = useState(false);

  useEffect(() => {
    // Realiza la llamada a la API para obtener las tareas actualizadas del usuario
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${user._id}`);
        const data = await response.json();
        setUserUpdate((prevUser) => ({
          ...prevUser,
          tareas: data.tareas,
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
      throw new Error("Error al asignar la tarea al usuario");
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
      throw new Error("Error al asignar la tarea al usuario");
    }
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

  const handleOpenTaskList = () => {
    setShowTaskList(true);
  };

  const handleCloseTaskList = () => {
    setShowTaskList(false);
  };

  return (
    <div>
      <h1>Bienvenido: {user.nombre}</h1>
      <p>Número de puntos: {calculateTotalPoints()}</p>
      <button onClick={handleOpenTaskList}>Ver tareas</button>
      <button onClick={() => setShowModalAddTasks(true)}>Agregar tareas</button>

      {showTaskList && (
        <TasksList
          userId={user._id}
          tasks={userUpdate.tareas}
          onClose={handleCloseTaskList}
        />
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
