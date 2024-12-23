const empresaModel = require('../models/empresaModel');

exports.getEmpresas = async (req, res) => {
    try {
        const empresas = await empresaModel.getAllEmpresas();
        res.json(empresas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching companies');
    }
};

exports.createEmpresa = async (req, res) => {
    const { nit, nombre, telefono, direccion, estado } = req.body;
    try {
        const newEmpresa = await empresaModel.createEmpresa({ nit, nombre, telefono, direccion, estado });
        res.json(newEmpresa);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando empresa');
    }
};

exports.deleteEmpresa = async (req, res) => {
    const { nit } = req.params;
    try {
        const deletedEmpresa = await empresaModel.deleteEmpresa(nit);
        if (!deletedEmpresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(deletedEmpresa);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error eliminando la empresa');
    }
};

exports.getEmpresaByNit = async (req, res) => {
    const { nit } = req.params;
    try {
        const empresa = await empresaModel.getEmpresaByNit(nit);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(empresa);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching empresa');
    }
};

exports.updateEmpresa = async (req, res) => {
    const { nit } = req.params;
    const { nombre, telefono, direccion, estado } = req.body;
    try {
        const updatedEmpresa = await empresaModel.updateEmpresa(nit, { nombre, telefono, direccion, estado });
        if (!updatedEmpresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(updatedEmpresa);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error actual actualizando empresa');
    }
};