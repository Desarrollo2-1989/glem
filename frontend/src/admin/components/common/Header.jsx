import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Elimina el refresh token de las cookies en el servidor
            const response = await axios.post('http://localhost:3001/api/auth/logout', {}, {
                withCredentials: true, // Asegura que las cookies se incluyan en la solicitud
            });

            if (response.status === 200) {
                // Elimina el access token del almacenamiento local (si existe)
                localStorage.removeItem('accessToken'); // Aquí eliminas el accessToken

                // Redirige al login después de un logout exitoso
                navigate('/login');
            } else {
                console.error('Error al hacer logout');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <header className="bg-white shadow-lg p-4 flex items-center justify-between">
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 shadow-lg focus:outline-none mr-4"
            >
                <FaBars className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">Bienvenidos</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors duration-300"
            >
                Salir
            </button>
        </header>
    );
};

export default Header;
