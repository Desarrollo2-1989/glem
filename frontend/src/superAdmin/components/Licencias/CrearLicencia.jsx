import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { licenciaSchema } from '../validations/licenciaValidations';
import { obtenerEmpresas, crearLicencia } from '../../../services/licenciaService';

const CrearLicencia = () => {
    const [empresas, setEmpresas] = useState([]);
    const navigate = useNavigate();

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(licenciaSchema),
        defaultValues: {
            serial: '',
            fecha_inicio: '',
            fecha_vencimiento: '',
            empresas_id: '',
        },
    });

    // Función para generar un serial aleatorio
    const generarSerial = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        return Array.from({ length: 16 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
    };

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const empresasData = await obtenerEmpresas();
                setEmpresas(empresasData);
            } catch (error) {
                console.error('Error fetching empresas:', error);
                toast.error('Error al cargar las empresas');
            }
        };
    
        fetchEmpresas();
        setValue('serial', generarSerial());
    
        // Obtener la fecha y hora actual en UTC
        const fechaActualUTC = new Date();
        
        // Ajustar la fecha a la hora de Colombia (UTC -5)
        const fechaActualColombia = new Date(fechaActualUTC.getTime() - (5 * 60 * 60 * 1000));
    
        // Establecer la fecha de inicio y vencimiento
        setValue('fecha_inicio', fechaActualColombia.toISOString().slice(0, 16));
        setValue('fecha_vencimiento', fechaActualColombia.toISOString().slice(0, 16));
    }, [setValue]);

    const onSubmit = async (data) => {
        const fechaInicioColombia = new Date(data.fecha_inicio);
        fechaInicioColombia.setHours(fechaInicioColombia.getHours() - 5);

        const fechaVencimientoColombia = new Date(data.fecha_vencimiento);
        fechaVencimientoColombia.setHours(fechaVencimientoColombia.getHours() - 5);

        try {
            const nuevaLicencia = {
                serial: data.serial,
                fecha_inicio: fechaInicioColombia.toISOString(),
                fecha_vencimiento: fechaVencimientoColombia.toISOString(),
                empresas_id: data.empresas_id,
            };

            const response = await crearLicencia(nuevaLicencia);

            if (response) {
                toast.success(`Licencia creada: ${response.serial}`);
                setValue('serial', generarSerial());
                const nuevaFecha = new Date();
                setValue('fecha_inicio', nuevaFecha.toISOString().slice(0, 16));
                setValue('fecha_vencimiento', nuevaFecha.toISOString().slice(0, 16));
                setValue('empresas_id', '');
                navigate('/superadmin/listar-licencias');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error en la solicitud');
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Crear Licencia</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Serial:</label>
                    <Controller
                        name="serial"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                                readOnly
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
                    <Controller
                        name="fecha_inicio"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="datetime-local"
                                {...field}
                                className={`mt-1 block w-full border rounded-md p-2 ${errors.fecha_inicio ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-green-200`}
                            />
                        )}
                    />
                    {errors.fecha_inicio && (
                        <p className="text-red-500 text-sm">{errors.fecha_inicio.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Vencimiento:</label>
                    <Controller
                        name="fecha_vencimiento"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="datetime-local"
                                {...field}
                                className={`mt-1 block w-full border rounded-md p-2 ${errors.fecha_vencimiento ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-green-200`}
                            />
                        )}
                    />
                    {errors.fecha_vencimiento && (
                        <p className="text-red-500 text-sm">{errors.fecha_vencimiento.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Empresa:</label>
                    <Controller
                        name="empresas_id"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className={`mt-1 block w-full border rounded-md p-2 ${errors.empresas_id ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-green-200`}
                            >
                                <option value="">Seleccionar Empresa</option>
                                {empresas.map((empresa) => (
                                    <option key={empresa.nit} value={empresa.nit}>{empresa.nit}</option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.empresas_id && (
                        <p className="text-red-500 text-sm">{errors.empresas_id.message}</p>
                    )}
                </div>
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300">
                    Crear Licencia
                </button>
            </form>
        </div>
    );
};

export default CrearLicencia;
