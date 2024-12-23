import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listarUsuarios, eliminarUsuario } from "../../../services/usuarioService"; // Importar funciones del servicio

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(10);

  // Fetch usuarios desde el servicio
  const loadUsuarios = async () => {
    try {
      const usuariosData = await listarUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
      toast.error("Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  // Eliminar usuario
  const eliminar = async (cedula) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (!confirmar) return;
  
    try {
      await eliminarUsuario(cedula); // Llamar al servicio para eliminar
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.cedula !== cedula)
      );
      toast.success(`Usuario eliminado: ${cedula}`);
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      toast.error("Error al eliminar usuario");
    }
  };

  // Filtrar usuarios
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cedula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastUsuario = currentPage * usuariosPorPagina;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
  const currentUsuarios = filteredUsuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredUsuarios.length / usuariosPorPagina);

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 sm:mb-0">
          Lista de Usuarios
        </h2>
        <Link to="/superadmin/crear-usuario">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md">
            Crear Usuario
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar por cédula o nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 text-gray-700 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <svg
          className="absolute left-4 top-4 h-6 w-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 111.41-1.41l5.39 5.39a1 1 0 01-1.42 1.42l-5.39-5.39zM10 16a6 6 0 100-12 6 6 0 000 12z" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Cédula</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Correo</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Empresa</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentUsuarios.length > 0 ? (
              currentUsuarios.map((usuario) => (
                <tr
                  key={usuario.cedula}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-6">{usuario.cedula}</td>
                  <td className="py-3 px-6">{usuario.nombre}</td>
                  <td className="py-3 px-6">{usuario.correo}</td>
                  <td className="py-3 px-6">{usuario.rol}</td>
                  <td className="py-3 px-6">{usuario.empresa_id}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    <Link to={`/superadmin/editar-usuario/${usuario.cedula}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 text-sm rounded">
                        Editar
                      </button>
                    </Link>
                    <button
                      onClick={() => eliminar(usuario.cedula)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 text-sm rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Espacio adicional antes del paginador */}
      <div className="mt-10"></div>

      {/* Paginador */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Primera
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Siguiente
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Última
          </button>
        </div>
      )}
    </div>
  );
};

export default ListarUsuarios;
