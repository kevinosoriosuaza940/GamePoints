import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const User = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [showModal, setShowModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  console.log(user)

  if (!user) {
    // Handle the case when the user object is undefined
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h1>Bienvenido: {user.nombre}</h1>
      <p>Número de puntos: {user.numeroDePuntos}</p>
         {/* Botón "Ver tareas" */}
         <button onClick={() => setShowModal(true)}>Ver tareas</button>

{/* Modal */}
{showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Tareas</h2>
      <ul>
        {user.tareas.map((task, index) => (
          <li key={index}>
            <p>Tarea: {task.tarea}</p>
            <p>Descripción: {task.descripcion}</p>
            <p>Puntos: {task.puntos}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
    </div>
  );
};

export default User;
