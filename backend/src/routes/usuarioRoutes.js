const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/listar-usuarios', usuarioController.getUsuarios);
router.post('/crear-usuario', usuarioController.createUsuario);
router.get('/usuarios/:cedula', usuarioController.getUsuarioByCedula);
router.put('/actualizar-usuario/:cedula', usuarioController.updateUsuario);
router.delete('/eliminar-usuario/:cedula', usuarioController.deleteUsuario);

module.exports = router;
