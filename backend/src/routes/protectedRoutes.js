const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta protegida
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso a la ruta protegida exitoso' });
});

module.exports = router;