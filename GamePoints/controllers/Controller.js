// Obtener todos los usuarios o tareas
const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario o tarea por su ID
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Crear un nuevo usuario o tarea
const create = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Actualizar un usuario o tarea
const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, contraseña, numeroDePuntos, tareas } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nombre, contraseña, numeroDePuntos, tareas },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario o tarea
const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Verificar si un nombre de usuario ya existe
const checkUsername = async (req, res) => {
  const { nombre } = req.body;

  try {
    const existingUser = await User.findOne({ nombre });
    res.json({ exists: !!existingUser }); // Devuelve true si el usuario existe, false si no existe
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el nombre de usuario" });
  }
};
// Verificar si una contraseña coincide
const checkPassword = async (req, res) => {
  const { contraseña } = req.body;

  try {
    const user = await User.findOne({ nombre });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordMatch = user.contraseña === contraseña;
    res.json({ match: passwordMatch }); // Devuelve true si la contraseña coincide, false si no coincide
  } catch (error) {
    res.status(500).json({ error: "Error al verificar la contraseña" });
  }
};
const assignTaskToUser = async (req, res) => {
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
};



module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
  checkUsername,
  checkPassword,
  assignTaskToUser,
};
