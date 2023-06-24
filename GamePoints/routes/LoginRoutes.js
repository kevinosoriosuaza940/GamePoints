const express = require('express');
const loginController = require('../controllers/loginController')

const router = express.Router();

// Ruta para la autenticación de inicio de sesión
router.post('/', loginController);

module.exports = router;
