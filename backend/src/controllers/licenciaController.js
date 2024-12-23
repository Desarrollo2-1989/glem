const licenciaModel = require('../models/licenciaModel');

exports.getLicencias = async (req, res) => {
    try {
        const licencias = await licenciaModel.getAllLicencias();
        res.json(licencias);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching licenses');
    }
};

exports.createLicencia = async (req, res) => {
    const { serial, fecha_inicio, fecha_vencimiento, empresas_id } = req.body;
    try {
        const newLicencia = await licenciaModel.createLicencia({ serial, fecha_inicio, fecha_vencimiento, empresas_id });
        res.json(newLicencia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando licencia');
    }
};

exports.deleteLicencia = async (req, res) => {
    const { serial } = req.params;
    try {
        const deletedLicencia = await licenciaModel.deleteLicencia(serial);
        if (!deletedLicencia) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }
        res.json(deletedLicencia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando la licencia');
    }
};

exports.updateLicencia = async (req, res) => {
    const { serial } = req.params;
    const { fecha_inicio, fecha_vencimiento, empresas_id } = req.body;
    try {
        const updatedLicencia = await licenciaModel.updateLicencia(serial, { fecha_inicio, fecha_vencimiento, empresas_id });
        if (!updatedLicencia) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }
        res.json(updatedLicencia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error actual actualizando licencia');
    }
};

exports.getLicenciaBySerial = async (req, res) => {
    const { serial } = req.params;
    try {
        const licencia = await licenciaModel.getLicenciaBySerial(serial);
        if (!licencia) {
            return res.status(404).json({ message: 'Licencia no encontrada' });
        }
        res.json(licencia);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching licencia');
    }
};