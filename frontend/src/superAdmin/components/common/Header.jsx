import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
    const [userInfo, setUserInfo] = useState({ rol: '', empresa: '', usuario: '' });

    useEffect(() => {
        // Obtener información del usuario desde el token
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserInfo({
                rol: decodedToken.rol,
                empresa: decodedToken.empresa || 'Mi Empresa',
                usuario: decodedToken.usuario || 'admin'
            });
        }

        // Recuperar la imagen de perfil del localStorage
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/logout', {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('profileImage'); // Limpiar la imagen al cerrar sesión
                navigate('/login');
            } else {
                console.error('Error al hacer logout');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result); // Guardar la imagen en localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <header className="bg-white shadow-lg p-4 flex items-center justify-between relative">
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-white hover:bg-blue-500 transition-colors duration-300 shadow-lg focus:outline-none mr-4"
            >
                <FaBars className="text-2xl" />
            </button>
            <h1 className="text-2xl font-bold">Bienvenidos</h1>

            <div className="relative">
                <div
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-400"
                >
                    <img
                        src={profileImage}
                        alt="Perfil"
                        className="w-full h-full object-cover"
                    />
                </div>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                        <div className="p-4">
                            <p className="text-sm text-gray-600">Rol: {userInfo.rol}</p>
                            <p className="text-sm text-gray-600">Empresa: {userInfo.empresa}</p>
                            <p className="text-sm text-gray-600">Usuario: {userInfo.usuario}</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                            />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red- 600 hover:bg-red-100"
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