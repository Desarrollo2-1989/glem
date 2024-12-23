// src/components/Dashboard.jsx
import React from 'react';
import Card from './Card';

const Dashboard = () => {
    return (
        <div className="flex-1 p-6 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Resumen de Actividades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card title="Total Ventas" value="$1,200" />
                <Card title="Clientes Activos" value="350" />
                <Card title="Tareas Completadas" value="150" />
                <Card title="Proyectos Activos" value="8" />
            </div>
        </div>
    );
};

export default Dashboard;
