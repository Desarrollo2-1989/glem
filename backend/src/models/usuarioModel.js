const pool = require('../config/db');
const bcrypt = require('bcrypt');

const getAllUsuarios = async () => {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};

const createUsuario = async (usuarioData) => {
    const { cedula, nombre, correo, contrasena, rol, empresa_id } = usuarioData;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
        'INSERT INTO usuarios (cedula, nombre, correo, contrasena, rol, empresa_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [cedula, nombre, correo, hashedPassword, rol, empresa_id]
    );
    return result.rows[0];
};


const getUsuarioByCedula = async (cedula) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE cedula = $1', [cedula]);
    return result.rows[0]; // Retorna el usuario o undefined si no se encuentra
};

const updateUsuario = async (cedula, usuarioData) => {
    const { nombre, correo, contrasena, rol, empresa_id } = usuarioData;

    // Obtener la contraseña actual si no se proporciona una nueva
    let hashedPassword;
    if (contrasena) {
        hashedPassword = await bcrypt.hash(contrasena, 10);
    } else {
        const usuarioActual = await getUsuarioByCedula(cedula);
        if (!usuarioActual) {
            return null; // Si el usuario no existe
        }
        hashedPassword = usuarioActual.contrasena;
    }

    const result = await pool.query(
        `UPDATE usuarios
         SET nombre = $1, correo = $2, contrasena = $3, rol = $4, empresa_id = $5
         WHERE cedula = $6
         RETURNING *`,
        [nombre, correo, hashedPassword, rol, empresa_id, cedula]
    );

    return result.rows[0]; // Retorna el usuario actualizado
};


const deleteUsuario = async (cedula) => {
    const result = await pool.query('DELETE FROM usuarios WHERE cedula = $1 RETURNING *', [cedula]);
    return result.rows[0]; // Retorna el usuario eliminado o undefined si no se encuentra
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE correo = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

module.exports = {
    getAllUsuarios,
    createUsuario,
    getUsuarioByCedula,
    getUserByEmail,
    updateUsuario,
    deleteUsuario,
};