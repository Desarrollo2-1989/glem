import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyTokens = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                // Verifica el token de acceso con la API protegida
                await axios.get('http://localhost:3001/api/protected-route', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setIsAuthenticated(true);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Si el token es inválido o expirado, intenta refrescarlo
                    try {
                        const refreshResponse = await axios.post(
                            'http://localhost:3001/api/auth/refresh-token',
                            {},
                            { withCredentials: true }
                        );
                        const newAccessToken = refreshResponse.data.accessToken;

                        // Almacena el nuevo token en localStorage
                        localStorage.setItem('accessToken', newAccessToken);
                        setIsAuthenticated(true);
                    } catch (refreshError) {
                        // Si no se puede refrescar el token, redirige al login
                        console.error(
                            'Error al refrescar el token:',
                            refreshError.response ? refreshError.response.data : refreshError.message
                        );
                        setIsAuthenticated(false);
                        navigate('/login');
                    }
                } else {
                    // Otro tipo de error al verificar el token
                    console.error(
                        'Error al verificar el token:',
                        error.response ? error.response.data : error.message
                    );
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        verifyTokens();
    }, [navigate]);

    return { isAuthenticated, loading };
};

export default useAuth;
