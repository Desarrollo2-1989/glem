import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading } = useAuth(); // Obtener autenticación y estado de carga
    const userRole = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).rol;

    if (loading) {
        return <div>Cargando...</div>; // Mensaje de carga
    }

    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;