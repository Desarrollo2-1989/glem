const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

exports.login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await usuarioModel.getUserByEmail(correo);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const accessToken = jwt.sign(
            { id: usuario.cedula, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: usuario.cedula, rol: usuario.rol },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
        );

        // Configurar cookie con el refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('refreshToken'); // Elimina la cookie del refresh token
    res.status(200).json({ message: 'Logout exitoso' });
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token no proporcionado' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token inválido o expirado' });
        }

        const newAccessToken = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ accessToken: newAccessToken });
    });
};
