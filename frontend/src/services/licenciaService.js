import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const obtenerEmpresas = async () => {
    try {
        const response = await axios.get(`${API_URL}/listar-empresas`);
        return response.data;
    } catch (error) {
        throw new Error('Error al cargar las empresas');
    }
};

export const crearLicencia = async (licenciaData) => {
    try {
        const response = await axios.post(`${API_URL}/crear-licencia`, licenciaData);
        return response.data;
    } catch (error) {
        throw new Error('Error creando licencia');
    }
};

export const listarLicencias = async () => {
    try {
        const response = await axios.get(`${API_URL}/listar-licencias`);
        return response.data;
    } catch (error) {
        throw new Error('Error al cargar las licencias');
    }
};

export const eliminarLicencia = async (serial) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar-licencia/${encodeURIComponent(serial)}`);
        return response.status;
    } catch (error) {
        throw new Error(`Error al eliminar la licencia: ${error.response?.data?.message || "Error desconocido"}`);
    }
};

export const obtenerLicenciaPorSerial = async (serial) => {
    try {
        const response = await axios.get(`${API_URL}/licencias/${encodeURIComponent(serial)}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al obtener la licencia');
    }
};

export const actualizarLicencias = async (serial, licenciaData) => {
    try {
        const response = await axios.put(`${API_URL}/actualizar-licencia/${encodeURIComponent(serial)}`, licenciaData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al actualizar la licencia');
    }
};
