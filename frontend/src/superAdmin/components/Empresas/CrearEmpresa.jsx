// src/components/CrearEmpresa.jsx
import React from 'react';  
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom'; 
import { crearEmpresa } from '../../../services/empresaService'; // Importa el servicio
import { empresaSchema } from '../validations/empresaValidations'; // Ajusta la ruta según sea necesario

const CrearEmpresa = () => {
    const navigate = useNavigate();

    // Inicializa el formulario con validaciones
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(empresaSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Formar el NIT con o sin el número de verificación
            const nitCompleto = data.verificacion 
                ? `${data.nit}-${data.verificacion}` 
                : data.nit;

            // Llama a la función del servicio para crear la empresa
            const empresaCreada = await crearEmpresa({
                nit: nitCompleto,
                nombre: data.nombre,
                telefono: data.telefono,
                direccion: data.direccion,
                estado: data.estado
            });

            toast.success(`Empresa creada: ${empresaCreada.nit}`);
            navigate('/superadmin/listar-empresas');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Crear Empresa</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">NIT:</label>
                        <input
                            type="text"
                            {...register('nit')}
                            className={`mt-1 block w-full border ${errors.nit ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                        />
                        {errors.nit && <p className="text-red-500 text-xs mt-1">{errors.nit.message}</p>}
                    </div>
                    <div className="flex items-center">
                        <span className="text-lg">-</span>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Verificación:</label>
                        <input
                            type="text"
                            {...register('verificacion')}
                            className={`mt-1 block w-full border ${errors.verificacion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                        />
                        {errors.verificacion && <p className="text-red-500 text-xs mt-1">{errors.verificacion.message}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        {...register('nombre')}
                        className={`mt-1 block w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
                    <input
                        type="text"
                        {...register('telefono')}
                        className={`mt-1 block w-full border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección:</label>
                    <input
                        type="text"
                        {...register('direccion')}
                        className={`mt-1 block w-full border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    />
                    {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado:</label>
                    <select
                        {...register('estado')}
                        className={`mt-1 block w-full border ${errors.estado ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                    >
                        <option value="">Selecciona un estado</option>
                        <option value="Activa">Activa</option>
                        <option value="Inactiva">Inactiva</option>
                    </select>
                    {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado.message}</p>}
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300">Crear</button>
            </form>
        </div>
    );
};

export default CrearEmpresa;