const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    contraseña: {
      type: String,
      required: true
    },
    numeroDePuntos: {
      type: Number,
      default: 0
    },
    tareas: [
      {
        tarea: {
          type: String,
          required: true
        },
        descripcion: {
          type: String,
          required: true
        },
        puntos: {
          type: Number,
          required: true
        }
      }
    ],
    Rol: {
      type: String,
      required: true,
      enum: ['admin', 'user']
    },
    activo: {
      type: Boolean,
      default: false
    }
  },
  { collection: 'Users' } // Especifica el nombre de la colección como 'Users'
);

// Crea el modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
