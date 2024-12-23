// src/components/ListarLicencias.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { listarLicencias, eliminarLicencia } from "../../../services/licenciaService";

const ListarLicencias = () => {
  const [licencias, setLicencias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [licenciasPorPagina] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const mensaje = location.state?.mensaje;

  // Fetching licencias data from API
  const fetchLicencias = async () => {
    try {
      const data = await listarLicencias();
      setLicencias(data);
    } catch (error) {
      console.error("Error fetching licencias:", error);
      toast.error("Error al cargar las licencias");
    }
  };

  useEffect(() => {
    fetchLicencias();

    if (mensaje) {
      toast.success(mensaje);
    }
  }, [mensaje]);

  // Formatting date for display
  const formatearFecha = (fechaISO) => {
    const opciones = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Bogota",
    };
    return new Date(fechaISO).toLocaleString("es-CO", opciones);
  };

  // Handling deletion of a licencia
  const handleEliminarLicencia = async (serial) => {
    const confirmar = window.confirm(
      `¿Estás seguro que deseas eliminar la licencia con Serial ${serial}?`
    );
    if (!confirmar) return;

    try {
      const status = await eliminarLicencia(serial);
      if (status === 200) {
        setLicencias((prevLicencias) =>
          prevLicencias.filter((licencia) => licencia.serial !== serial)
        );
        toast.success(`Licencia eliminada: ${serial}`);
      }
    } catch (error) {
      console.error("Error al eliminar licencia:", error);
      toast.error(`Error al eliminar la licencia: ${error.message}`);
    }
  };

  // Pagination logic
  const indexOfLastLicencia = currentPage * licenciasPorPagina;
  const indexOfFirstLicencia = indexOfLastLicencia - licenciasPorPagina;
  const currentLicencias = licencias
    .filter((licencia) =>
      licencia.serial.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstLicencia, indexOfLastLicencia);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(licencias.length / licenciasPorPagina);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 rounded-full ${
            currentPage === i
              ? "bg-green-600 text-white"
              : "bg-blue-100 text-blue-600 hover:bg-blue-300"
          } transition duration-300`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 sm:mb-0">
          Lista de Licencias
        </h2>
        <Link to="/superadmin/crear-licencia">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md">
            Crear Licencia
          </button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar licencia por serial..."
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
              <th className="py-3 px-6 text-left">Serial</th>
              <th className="py-3 px-6 text-left">Empresa</th>
              <th className="py-3 px-6 text-left">Fecha de Inicio</th>
              <th className="py-3 px-6 text-left">Fecha de Vencimiento</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
          {currentLicencias.length > 0 ? (
            currentLicencias.map((licencia) => (
              <tr
                key={licencia.serial}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6">{licencia.serial}</td>
                <td className="py-3 px-6">{licencia.empresas_id}</td>
                <td className="py-3 px-6">
                  {formatearFecha(licencia.fecha_inicio)}
                </td>
                <td className="py-3 px-6">
                  {formatearFecha(licencia.fecha_vencimiento)}
                </td>
                <td className="py-3 px-4 flex items-center justify-center gap-2">
                <Link to={`/superadmin/editar-licencia/${licencia.serial}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 text-sm rounded">
                        Editar
                      </button>
                    </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 text-sm rounded"
                    onClick={() => handleEliminarLicencia(licencia.serial)}
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

export default ListarLicencias;
