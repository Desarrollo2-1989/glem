const pool = require('../config/db');

const getAllEmpresas = async () => {
    const result = await pool.query('SELECT * FROM empresas');
    return result.rows;
};

const getEmpresaByNit = async (nit) => {
    const result = await pool.query('SELECT * FROM empresas WHERE nit = $1', [nit]);
    return result.rows[0];
};

const createEmpresa = async (empresaData) => {
    const { nit, nombre, telefono, direccion, estado } = empresaData;
    const result = await pool.query(
        'INSERT INTO empresas (nit, nombre, telefono, direccion, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nit, nombre, telefono, direccion, estado]
    );
    return result.rows[0];
};

const deleteEmpresa = async (nit) => {
    const result = await pool.query('DELETE FROM empresas WHERE nit = $1 RETURNING *', [nit]);
    return result.rows[0];
};

const updateEmpresa = async (nit, empresaData) => {
    const { nombre, telefono, direccion, estado } = empresaData;
    const result = await pool.query(
        'UPDATE empresas SET nombre = $1, telefono = $2, direccion = $3, estado = $4 WHERE nit = $5 RETURNING *',
        [nombre, telefono, direccion, estado, nit]
    );
    return result.rows[0];
};

module.exports = {
    getAllEmpresas,
    getEmpresaByNit,
    createEmpresa,
    deleteEmpresa,
    updateEmpresa,
};