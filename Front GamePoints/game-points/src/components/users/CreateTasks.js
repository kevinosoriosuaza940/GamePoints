import React, { useState } from "react";

const CreateTasks = ({ onAssign, onClose }) => {
  const [task, setTask] = useState({
    nombreTarea: "",
    descripcion: "",
    puntos: 0,
  });

  const handleInputChange = (event) => {
    setTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Error creating task");
      }

      alert("Tarea creada correctamente");

      setTask({
        nombreTarea: "",
        descripcion: "",
        puntos: 0,
      });

      window.location.reload()

      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Tarea</h2>
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
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default CreateTasks;
