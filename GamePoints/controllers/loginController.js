const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Buscar al usuario en la base de datos por nombre de usuario
      const user = await User.findOne({ username });
  
      if (user) {
        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        const match = await bcrypt.compare(password, user.password);
  
        if (match) {
          // Contraseña válida, modificar el usuario y agregar la propiedad "activo: true"
          user.activo = true;
          await user.save();
  
          res.json({ success: true });
        } else {
          // Contraseña incorrecta
          res.json({ success: false, error: 'Credenciales inválidas' });
        }
      } else {
        // Usuario no encontrado
        res.json({ success: false, error: 'Credenciales inválidas' });
      }
    } catch (error) {
      // Error al realizar la búsqueda en la base de datos
      console.error('Error en el controlador de inicio de sesión:', error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  };
  

module.exports = loginController;
