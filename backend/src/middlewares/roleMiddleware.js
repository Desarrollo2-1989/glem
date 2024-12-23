const jwt = require('jsonwebtoken');

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token inválido o expirado' });

            // Verificar si el rol del usuario está en la lista de roles permitidos
            if (!roles.includes(user.rol)) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            req.user = user; // Adjuntar la información del usuario a la solicitud
            next();
        });
    };
};

module.exports = roleMiddleware;