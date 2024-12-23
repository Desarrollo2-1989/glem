// src/components/ListarEmpresas.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  listarEmpresas,
  eliminarEmpresa,
} from "../../../services/empresaService"; // Importa las funciones del servicio

const ListarEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [empresasPorPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchEmpresas = async () => {
    try {
      const data = await listarEmpresas(); // Llama a la función del servicio
      setEmpresas(data);
    } catch (error) {
      console.error("Error fetching empresas:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleEliminarEmpresa = async (nit, nombre) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que deseas eliminar la empresa "${nombre}" con NIT: ${nit}?`
    );
    if (confirmDelete) {
      try {
        await eliminarEmpresa(nit); // Llama a la función del servicio
        setEmpresas(empresas.filter((empresa) => empresa.nit !== nit));
        toast.success(`Empresa eliminada: ${nit}`);
      } catch (error) {
        console.error("Error al eliminar empresa:", error);
        toast.error("Error al eliminar la empresa");
      }
    }
  };

  const editarEmpresa = (empresa) => {
    navigate(`/superadmin/editar-empresa/${empresa.nit}`, { state: { empresa } });
  };

  const indexOfLastEmpresa = currentPage * empresasPorPagina;
  const indexOfFirstEmpresa = indexOfLastEmpresa - empresasPorPagina;
  const currentEmpresas = empresas
    .filter((empresa) =>
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstEmpresa, indexOfLastEmpresa);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(empresas.length / empresasPorPagina);

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 sm:mb-0">
          Lista de Empresas
        </h2>
        <Link to="/superadmin/crear-empresa">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md">
            Agregar Empresa
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar empresa por nombre..."
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
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">NIT</th>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Teléfono</th>
              <th className="py-3 px-4 text-left">Dirección</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentEmpresas.length > 0 ? (
              currentEmpresas.map((empresa) => (
                <tr
                  key={empresa.nit}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{empresa.nit}</td>
                  <td className="py-3 px-4">{empresa.nombre}</td>
                  <td className="py-3 px-4">{empresa.telefono}</td>
                  <td className="py-3 px-4">{empresa.direccion}</td>
                  <td
                    className={`py-3 px-4 font-bold ${
                      empresa.estado === "Activa"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {empresa.estado}
                  </td>
                  <td className="py-3 px-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => editarEmpresa(empresa)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 text-sm rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() =>
                        handleEliminarEmpresa(empresa.nit, empresa.nombre)
                      }
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
                  No hay empressas disponibles.
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

export default ListarEmpresas;
