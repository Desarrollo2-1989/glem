const express = require('express');
const router = express.Router();
const licenciaController = require('../controllers/licenciaController');

router.get('/listar-licencias', licenciaController.getLicencias);
router.post('/crear-licencia', licenciaController.createLicencia);
router.delete('/eliminar-licencia/:serial', licenciaController.deleteLicencia);
router.get('/licencias/:serial', licenciaController.getLicenciaBySerial);
router.put('/actualizar-licencia/:serial', licenciaController.updateLicencia);

module.exports = router;
