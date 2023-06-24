const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Importa las rutas de usuarios y tareas
const usersRoutes = require('./routes/UsersRoutes');
const tasksRoutes = require('./routes/TasksRoutes');
const loginRoutes = require('./routes/LoginRoutes');


// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/login', loginRoutes);

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/GamePoints', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor en ejecución en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos', error);
  });
