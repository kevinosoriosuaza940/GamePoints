const express = require("express");
const router = express.Router();
const usersController = require("../controllers/Controller");

// Importa el modelo de Usuario y Tarea según corresponda
const User = require("../models/UsersModel");

// Ruta para obtener todos los usuarios o tarea
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

// Ruta para crear un nuevo usuario o tarea
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

// Ruta para obtener un usuario o tarea por su ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// Ruta para actualizar un usuario o tarea
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Ruta para eliminar un usuario o tarea
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});
// Ruta para verificar si un nombre de usuario ya existe
router.post("/checkUsername", async (req, res) => {
  const { nombre } = req.body;

  try {
    const existingUser = await User.findOne({ nombre });
    console.log(existingUser,'11111111111111111')
    res.json(existingUser ); // Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el nombre de usuario" });
  }
});

// Ruta para verificar si un nombre de usuario ya existe
router.post("/checkPassword", async (req, res) => {
  const { nombre } = req.body;

  try {
    const existingUser = await User.findOne({ nombre });
    console.log(existingUser,'22222222222222')
    res.json(existingUser ); // Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el nombre de usuario" });
  }
});
// // Ruta para verificar si una contraseña ya existe
// router.post("/checkPassword", usersController.checkPassword);
router.put("/:id/assign-task", async (req, res) => {
  try {
    const { id } = req.params;
    const { tarea, descripcion, puntos } = req.body;

    // Buscar al usuario por su ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Agregar la nueva tarea al objeto "tareas"
    const newTask = {
      tarea,
      descripcion,
      puntos,
    };
    user.tareas.push(newTask);

    // Guardar los cambios en la base de datos
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar la tarea al usuario" });
  }
});
cls



module.exports = router;
