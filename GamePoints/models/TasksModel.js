const mongoose = require('mongoose');

// Define el esquema de la tarea
const taskSchema = new mongoose.Schema({
  nombreTarea: {
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
}, { collection: 'Tasks' }); // Especifica el nombre de la colección

// Crea el modelo de tarea a partir del esquema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
