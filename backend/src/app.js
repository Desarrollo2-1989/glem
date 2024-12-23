const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const licenciaRoutes = require('./routes/licenciaRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto a la URL de tu frontend
    credentials: true, // Permite el envío de cookies
}));
app.use(express.json());
app.use(cookieParser()); // Middleware para parsear cookies

// Rutas de otras funcionalidades
app.use('/api/auth', authRoutes);
app.use('/api', empresaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', licenciaRoutes);
app.use('/api', protectedRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;