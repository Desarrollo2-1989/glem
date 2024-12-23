import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../../assets/imagenes/glem2.png'; // Ajustar la ruta de importación
import {
  FaChevronDown,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isEmpresasOpen, setIsEmpresasOpen] = useState(false);

  const toggleEmpresasSubmenu = () => {
    if (isOpen) {
      setIsEmpresasOpen(!isEmpresasOpen);
    }
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        isOpen ? "w-56" : "w-24"
      } h-screen bg-blue-900 text-white shadow-lg`}
    >
      <nav className="h-full flex flex-col">
        {/* Cuadro blanco para el logo que cubre todo el ancho */}
        <div
          style={{ height: "72px" }}
          className={`flex justify-center items-center bg-white`}
        >
          {" "}
          {/* Se ha cambiado la altura aquí */}
          <img
           src={Logo} // Asegúrate de que la imagen esté en la carpeta public
            alt="Logo"
            className={`transition-all duration-300 ${
              isOpen ? "w-30 h-30" : "w-25 h-25"
            }`}
          />
        </div>

        {/* Sección de navegación con fondo azul */}
        <div className="flex-1 bg-blue-800 p-4">
          {/* Crear con submenú */}
          <div>
            <div
              className="flex items-center mb-4 hover:bg-blue-500 p-2 rounded transition-colors duration-300 cursor-pointer"
              onClick={toggleEmpresasSubmenu}
            >
              <div className="flex-shrink-0 w-10">
                <FaClipboardList className="text-3xl" />
              </div>
              <span className={`ml-2 ${isOpen ? "block" : "hidden"}`}>
                Crear
              </span>
              {isOpen && (
                <FaChevronDown
                  className={`ml-auto transition-transform ${
                    isEmpresasOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </div>
            {isEmpresasOpen && isOpen && (
              <div className="ml-8">
                <Link
                  to="#"
                  className="block mb-2 hover:bg-blue-500 p-2 rounded transition-colors duration-300"
                >
                  Empresas
                </Link>
                <Link
                  to="#"
                  className="block mb-2 hover:bg-blue-500 p-2 rounded transition-colors duration-300"
                >
                  Usuarios
                </Link>
                <Link
                  to="#"
                  className="block mb-2 hover:bg-blue-500 p-2 rounded transition-colors duration-300"
                >
                  Licencias
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
