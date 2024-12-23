const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Rutas de Superadmin
router.use(roleMiddleware(['superadmin'])); // Solo permite acceso a superadmin

router.get('/', (req, res) => {
    res.send('Bienvenido a la vista de Superadmin');
});

// Otras rutas de Superadmin...

module.exports = router;