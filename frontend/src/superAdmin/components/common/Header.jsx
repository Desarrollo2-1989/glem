import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/logout', {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            } else {
                console.error('Error al hacer logout');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <header className="bg-white shadow-lg p-4 flex items-center justify-between relative">
            {/* Botón para alternar el sidebar */}
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 shadow-lg focus:outline-none mr-4"
            >
                <FaBars className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">Bienvenidos</h1>

            {/* Imagen de perfil y menú desplegable */}
            <div className="relative">
                <div
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-400"
                >
                    {/* Aquí puedes cargar una imagen de perfil */}
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Perfil"
                        className="w-full h-full object-cover"
                    />
                </div>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                        <div className="p-4">
                            <p className="text-sm text-gray-600">Rol: Administrador</p>
                            <p className="text-sm text-gray-600">Empresa: Mi Empresa</p>
                            <p className="text-sm text-gray-600">Usuario: admin</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                            >
                                Subir imagen
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
