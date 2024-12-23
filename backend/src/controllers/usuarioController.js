const usuarioModel = require('../models/usuarioModel');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getAllUsuarios();
        res.json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
};

exports.createUsuario = async (req, res) => {
    const { cedula, nombre, correo, contrasena, rol, empresa_id } = req.body;
    try {
        const newUser  = await usuarioModel.createUsuario({ cedula, nombre, correo, contrasena, rol, empresa_id });
        res.status(201).json(newUser );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando usuario');
    }
};

exports.getUsuarioByCedula = async (req, res) => {
    const { cedula } = req.params;
    try {
        const usuario = await usuarioModel.getUsuarioByCedula(cedula);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching usuario');
    }
};

exports.updateUsuario = async (req, res) => {
    const { cedula } = req.params;
    const { nombre, correo, contrasena, rol, empresa_id } = req.body;

    try {
        const updatedUser = await usuarioModel.updateUsuario(cedula, { nombre, correo, contrasena, rol, empresa_id });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error actualizando usuario' });
    }
};

exports.deleteUsuario = async (req, res) => {
    const { cedula } = req.params;
    try {
        const deletedUser  = await usuarioModel.deleteUsuario(cedula);
        if (!deletedUser ) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(deletedUser );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
};