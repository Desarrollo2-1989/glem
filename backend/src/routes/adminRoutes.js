const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Rutas de Admin
router.use(roleMiddleware(['admin'])); // Solo permite acceso a admin

router.get('/', (req, res) => {
    res.send('Bienvenido a la vista de Admin');
});

// Otras rutas de Admin...

module.exports = router;