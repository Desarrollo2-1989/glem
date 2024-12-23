import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usuarioEditSchema } from "../validations/usuarioEditValidations";
import {
  obtenerEmpresas,
  obtenerUsuarioPorCedula,
  actualizarUsuario,
} from "../../../services/usuarioService";

const EditarUsuario = () => {
  const { cedula } = useParams();
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usuarioEditSchema),
    defaultValues: {
      cedula: "",
      nombre: "",
      correo: "",
      contrasena: "",
      rol: "",
      empresaId: "",
    },
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos del usuario
        const usuario = await obtenerUsuarioPorCedula(cedula);
        setValue("cedula", usuario.cedula || "");
        setValue("nombre", usuario.nombre || "");
        setValue("correo", usuario.correo || "");
        setValue("contrasena", "");
        setValue("rol", usuario.rol || "");
        setValue("empresaId", usuario.empresa_id || "");

        // Cargar lista de empresas
        const empresasList = await obtenerEmpresas();
        setEmpresas(empresasList);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los datos necesarios");
      }
    };

    cargarDatos();
  }, [cedula, setValue]);

  const onSubmit = async (data) => {
    if (!data.empresaId) {
      toast.error("La empresa es obligatoria.");
      return;
    }

    try {
      await actualizarUsuario(cedula, {
        ...data,
        empresa_id: data.empresaId,
      });
      toast.success("Usuario actualizado exitosamente");
      navigate("/superadmin/listar-usuarios");
    } catch (error) {
      console.error(error);
      toast.error(`Error al actualizar el usuario: ${error}`);
    }
  };

  const onError = (formErrors) => {
    console.log("Errores de validación:", formErrors);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        Editar Usuario
      </h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {/* Campo: Cédula */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Cédula:
          </label>
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`mt-1 block w-full border ${
                  errors.cedula ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
                readOnly
              />
            )}
          />
        </div>
        {/* Campo: Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`mt-1 block w-full border ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
            )}
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
          )}
        </div>
        {/* Campo: Correo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correo:
          </label>
          <Controller
            name="correo"
            control={control}
            render={({ field }) => (
              <input
                type="email"
                {...field}
                className={`mt-1 block w-full border ${
                  errors.correo ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
            )}
          />
          {errors.correo && (
            <p className="text-red-500 text-xs mt-1">{errors.correo.message}</p>
          )}
        </div>
        {/* Campo: Contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <Controller
            name="contrasena"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                placeholder="Deja vacío para mantener la contraseña actual"
                className={`mt-1 block w-full border ${
                  errors.contrasena ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
            )}
          />
          {errors.contrasena && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contrasena.message}
            </p>
          )}
        </div>
        {/* Campo: Rol */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Rol:
          </label>
          <Controller
            name="rol"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-1 block w-full border ${
                  errors.rol ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              >
                <option value="">Seleccionar Rol</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="técnico">Técnico</option>
                <option value="administrativo">Administrativo</option>
              </select>
            )}
          />
          {errors.rol && (
            <p className="text-red-500 text-xs mt-1">{errors.rol.message}</p>
          )}
        </div>
        {/* Campo: Empresa */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Empresa:
          </label>
          <Controller
            name="empresaId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-1 block w-full border ${
                  errors.empresaId ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              >
                <option value="">Seleccionar Empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.nit} value={empresa.nit}>
                    {empresa.nombre}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.empresaId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.empresaId.message}
            </p>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Actualizar Usuario
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md"
            onClick={() => navigate("/superadmin/listar-usuarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario;
