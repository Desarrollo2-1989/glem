// src/components/CrearUsuario.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioSchema } from '../validations/usuarioValidations'; // Ajusta la ruta según sea necesario
import { obtenerEmpresas, crearUsuario } from '../../../services/usuarioService'; // Importar el servicio

const CrearUsuario = () => {
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();

    // Inicializa el formulario con validaciones
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(usuarioSchema),
    });

    // useEffect para cargar las empresas
    useEffect(() => {
        const cargarEmpresas = async () => {
            try {
                const data = await obtenerEmpresas(); // Usando el servicio
                setEmpresas(data); // Guardar las empresas en el estado
            } catch (error) {
                console.error('Error al cargar empresas:', error);
                toast.error('Error al cargar empresas'); // Notificar error
            }
        };

        cargarEmpresas();
    }, []); // Se ejecuta una vez cuando el componente se monta

    const onSubmit = async (data) => {
        try {
            const usuarioData = {
                cedula: data.cedula,
                nombre: data.nombre,
                correo: data.correo,
                contrasena: data.contrasena,
                rol: data.rol,
                empresa_id: data.empresaId,
            };

            const response = await crearUsuario(usuarioData); // Usando el servicio

            toast.success(`Usuario creado: ${response.nombre}`); // Notificar éxito
            navigate('/superadmin/listar-usuarios'); // Redirigir a la lista de usuarios
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error en la solicitud'); // Notificar error
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Crear Usuario</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cédula:</label>
                    <input
                        type="text"
                        {...register('cedula')}
                        className={`mt-1 block w-full border ${errors.cedula ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    />
                    {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        {...register('nombre')}
                        className={`mt-1 block w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo:</label>
                    <input
                        type="email"
                        {...register('correo')}
                        className={`mt-1 block w-full border ${errors.correo ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    />
                    {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
                    <input
                        type="password"
                        {...register('contrasena')}
                        className={`mt-1 block w-full border ${errors.contrasena ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    />
                    {errors.contrasena && <p className="text-red-500 text-xs mt-1">{errors.contrasena.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rol:</label>
                    <select
                        {...register('rol')}
                        className={`mt-1 block w-full border ${errors.rol ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    >
                        <option value="">Seleccionar Rol</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                        <option value="técnico">Técnico</option>
                        <option value="administrativo">Administrativo</option>
                    </select>
                    {errors.rol && <p className="text-red-500 text-xs mt-1">{errors.rol.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Empresa:</label>
                    <select
                        {...register('empresaId')}
                        className={`mt-1 block w-full border ${errors.empresaId ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:ring focus:ring-green-200`}
                    >
                        <option value="">Seleccionar Empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa.nit} value={empresa.nit}>
                                {empresa.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.empresaId && <p className="text-red-500 text-xs mt-1">{errors.empresaId.message}</p>}
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300">Crear</button>
            </form>
        </div>
    );
};

export default CrearUsuario;
