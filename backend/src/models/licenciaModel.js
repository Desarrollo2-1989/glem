const pool = require('../config/db');

const getAllLicencias = async () => {
    const result = await pool.query('SELECT * FROM licencias');
    return result.rows;
};

const createLicencia = async (licenciaData) => {
    const { serial, fecha_inicio, fecha_vencimiento, empresas_id } = licenciaData;
    const result = await pool.query(
        'INSERT INTO licencias (serial, fecha_inicio, fecha_vencimiento, empresas_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [serial, fecha_inicio, fecha_vencimiento, empresas_id]
    );
    return result.rows[0];
};

const deleteLicencia = async (serial) => {
    const result = await pool.query('DELETE FROM licencias WHERE serial = $1 RETURNING *', [serial]);
    return result.rows[0];
};

const updateLicencia = async (serial, licenciaData) => {
    const { fecha_inicio, fecha_vencimiento, empresas_id } = licenciaData;

    const result = await pool.query(
        `UPDATE licencias
         SET fecha_inicio = $1, fecha_vencimiento = $2, empresas_id = $3
         WHERE serial = $4
         RETURNING *`,
        [fecha_inicio, fecha_vencimiento, empresas_id, serial]
    );

    return result.rows[0]; // Retorna la licencia actualizada
};

const getLicenciaBySerial = async (serial) => {
    const result = await pool.query('SELECT * FROM licencias WHERE serial = $1', [serial]);
    return result.rows[0]; // Retorna el usuario o undefined si no se encuentra
};


module.exports = {
    getAllLicencias,
    createLicencia,
    updateLicencia,
    deleteLicencia,
    getLicenciaBySerial,
};