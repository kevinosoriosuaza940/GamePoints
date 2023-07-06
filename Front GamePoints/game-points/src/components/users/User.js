import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Task from "../tasks/Tasks";
import TasksList from "../tasks/TasksList";
import WithdrawPointsModal from "./WithdrawPointsModal";

const User = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user);
  const [showModalWithdrawPoints, setShowModalWithdrawPoints] = useState(false);
  const [withdrawPoints, setWithdrawPoints] = useState(0);
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

  useEffect(() => {
    setUser(userUpdate);
  }, [userUpdate]);

  const assignTaskToUser = async (userId, task) => {
    try {
      await fetch(`http://localhost:3001/api/users/${userId}/assign-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const response = await fetch(`http://localhost:3001/api/users/${userId}`);
      const userData = await response.json();

      // Actualizar el estado del usuario con la información actualizada
      setUserUpdate(userData);

      // Recalcula el número de puntos
      const totalPoints = userData.tareas.reduce((sum, task) => sum + task.puntos, 0);
      
      // Guardar el total de puntos en la base de datos
      await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numeroDePuntos: totalPoints }),
      });
    } catch (error) {
      console.error("Error assigning task:", error);
      throw new Error("Error al asignar la tarea al usuario");
    }
  };

  const handleEditTask = (taskId) => {
    alert('Tarea asignada correctamente')
    window.location.reload();
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

  const handleWithdrawPoints = async (amount) => {
    const puntosDisponibles = calculateTotalPoints();
  
    if (amount <= puntosDisponibles) {
      // Realizar el retiro de puntos
      const nuevosPuntos = puntosDisponibles - amount;
  
      try {
        await fetch(`http://localhost:3001/api/users/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numeroDePuntos: nuevosPuntos }),
        });
  
        // Actualizar los puntos disponibles y cerrar el modal
        setUserUpdate((prevUser) => ({
          ...prevUser,
          numeroDePuntos: nuevosPuntos,
        }));
      } catch (error) {
        console.error("Error withdrawing points:", error);
        throw new Error("Error al retirar puntos");
      }
    } else {
      console.log("El retiro no puede ser mayor a los puntos disponibles");
    }
  };
  // const handleWithdrawPoints = async (amount) => {
  //   const puntosDisponibles = calculateTotalPoints();
  
  //   if (amount <= puntosDisponibles) {
  //     // Realizar el retiro de puntos
  //     const nuevosPuntos = puntosDisponibles - amount;
  
  //     try {
  //       await fetch(`http://localhost:3001/api/users/${user._id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({  numeroDePuntos: nuevosPuntos }),
  //       });
  
  //       // Actualizar el estado del usuario con los nuevos puntos disponibles
  //       setUserUpdate((prevUser) => ({
  //         ...prevUser,
  //         numeroDePuntos: nuevosPuntos,
  //       }));
  //     } catch (error) {
  //       console.error("Error withdrawing points:", error);
  //       throw new Error("Error al retirar puntos");
  //     }
  //   } else {
  //     console.log("El retiro no puede ser mayor a los puntos disponibles");
  //   }
  // };
  
  
  const handleCancelWithdraw = () => {
    setShowModalWithdrawPoints(false);
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
      <button onClick={handleOpenTaskList}>Ver Historial de Tareas</button>
      <button onClick={() => setShowModalAddTasks(true)}>Agregar tareas</button>
      <button onClick={() => setShowModalWithdrawPoints(true)}>Retirar Puntos</button>


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
          setUserUpdate={setUserUpdate}
        />
      )}
        {showModalWithdrawPoints && (
        <WithdrawPointsModal
          user= {user}
          totalPoints={user.numeroDePuntos}
          onWithdraw={handleWithdrawPoints}
          onCancel={handleCancelWithdraw}
        />
      )}
    </div>
  );
};

export default User;
