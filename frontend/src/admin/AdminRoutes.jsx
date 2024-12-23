import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
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
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminRoutes;
