import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './components/dashboard/Dashboard';
import ListarEmpresas from './components/Empresas/ListarEmpresas';
import CrearEmpresa from './components/Empresas/CrearEmpresa';
import EditarEmpresa from './components/Empresas/EditarEmpresa';
import ListarUsuarios from './components/Usuarios/ListarUsuarios';
import CrearUsuario from './components/Usuarios/CrearUsuario';
import EditarUsuario from './components/Usuarios/EditarUsuario';
import ListarLicencias from './components/Licencias/ListarLicencias';
import CrearLicencia from './components/Licencias/CrearLicencia';
import EditarLicencias from './components/Licencias/EditarLicencia';
import Login from './components/common/Header';

const SuperAdminRoutes = () => {
    // Estado para controlar si el sidebar está abierto o cerrado
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Función para alternar la apertura y cierre del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar controlado por el estado isSidebarOpen */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Contenedor principal que incluye el header y el contenido */}
            <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
                {/* El header no tiene posición fija y está contenido dentro del elemento scrollable */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Contenido principal */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<ListarEmpresas />} />   
                        <Route path="/listar-empresas" element={<ListarEmpresas />} />
                        <Route path="/crear-empresa" element={<CrearEmpresa />} />
                        <Route path="/editar-empresa/:nit" element={<EditarEmpresa />} /> {/* Ruta de edición */}
                        <Route path="/listar-usuarios" element={<ListarUsuarios />} />
                        <Route path="/crear-usuario" element={<CrearUsuario />} />
                        <Route path="/editar-usuario/:cedula" element={<EditarUsuario />} /> 
                        <Route path="/listar-licencias" element={<ListarLicencias />} />
                        <Route path="/crear-licencia" element={<CrearLicencia />} />
                        <Route path="/editar-licencia/:serial" element={<EditarLicencias />} /> 
                        <Route path="/settings" element={<div>Settings Page</div>} />
                        <Route path="/profile" element={<div>Profile Page</div>} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminRoutes;
