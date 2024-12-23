// src/services/empresaService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/'; // Asegúrate de que esta URL sea correcta

// Función para crear una nueva empresa
export const crearEmpresa = async (empresaData) => {
    try {
        const response = await axios.post(`${API_URL}crear-empresa`, empresaData);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear la empresa'; // Maneja errores
    }
};

// Función para listar empresas
export const listarEmpresas = async () => {
    try {
        const response = await axios.get(`${API_URL}listar-empresas`);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        throw error.response?.data?.message || 'Error al listar empresas'; // Maneja errores
    }
};

// Función para eliminar una empresa
export const eliminarEmpresa = async (nit) => {
    try {
        await axios.delete(`${API_URL}eliminar-empresas/${nit}`);
    } catch (error) {
        throw error.response?.data?.message || 'Error al eliminar la empresa'; // Maneja errores
    }
};

export const obtenerEmpresaPorNit = async (nit) => {
    try {
        const response = await axios.get(`${API_URL}empresas/${nit}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener la empresa';
    }
};

// Función para actualizar una empresa
export const actualizarEmpresa = async (nit, empresaData) => {
    try {
        const response = await axios.put(`${API_URL}actualizar-empresas/${nit}`, empresaData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al actualizar la empresa';
    }
};
