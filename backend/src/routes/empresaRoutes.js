const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.get('/listar-empresas', empresaController.getEmpresas);
router.post('/crear-empresa', empresaController.createEmpresa);
router.delete('/eliminar-empresas/:nit', empresaController.deleteEmpresa);
router.get('/empresas/:nit', empresaController.getEmpresaByNit);
router.put('/actualizar-empresas/:nit', empresaController.updateEmpresa);

module.exports = router;
