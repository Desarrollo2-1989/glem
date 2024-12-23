// src/services/usuarioService.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/"; // Asegúrate de que esta URL sea correcta

// Función para obtener las empresas
export const obtenerEmpresas = async () => {
  try {
    const { data } = await axios.get(`${API_URL}listar-empresas`);
    return data; // Devuelve las empresas
  } catch (error) {
    throw error.response?.data?.message || "Error al cargar empresas"; // Maneja errores
  }
};

// Función para crear un nuevo usuario
export const crearUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}crear-usuario`, usuarioData);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    throw error.response?.data?.message || "Error al crear el usuario"; // Maneja errores
  }
};

export const listarUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}listar-usuarios/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    throw error;
  }
};

export const eliminarUsuario = async (cedula) => {
  try {
    const response = await axios.delete(`${API_URL}eliminar-usuario/${cedula}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting usuario:", error);
    throw error;
  }
};

export const obtenerUsuarioPorCedula = async (cedula) => {
  try {
    const { data } = await axios.get(`${API_URL}usuarios/${cedula}`);
    return data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Error al obtener los datos del usuario"
    );
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (cedula, usuarioData) => {
  try {
    const { data } = await axios.put(
      `${API_URL}actualizar-usuario/${cedula}`,
      usuarioData
    );
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Error al actualizar el usuario";
  }
};
