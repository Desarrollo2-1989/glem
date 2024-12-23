const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
        req.user = user; // Adjuntar la información del usuario a la solicitud
        next();
    });
};

module.exports = authenticateToken;
