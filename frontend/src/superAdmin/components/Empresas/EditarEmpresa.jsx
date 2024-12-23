import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { empresaSchema } from "../validations/empresaValidations"; // Validaciones
import {
  obtenerEmpresaPorNit,
  actualizarEmpresa,
} from "../../../services/empresaService"; // Servicios

const EditarEmpresa = () => {
  const { nit } = useParams();
  const navigate = useNavigate();

  // Inicialización del formulario con validaciones
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(empresaSchema),
  });

  // Cargar datos de la empresa al montar el componente
  useEffect(() => {
    const cargarEmpresa = async () => {
      try {
        const data = await obtenerEmpresaPorNit(nit);
        const [nitBase, verificacion] = data.nit.split("-");
        setValue("nit", nitBase);
        setValue("verificacion", verificacion || "");
        setValue("nombre", data.nombre);
        setValue("telefono", data.telefono);
        setValue("direccion", data.direccion);
        setValue("estado", data.estado);
      } catch (error) {
        toast.error(error);
      }
    };
    cargarEmpresa();
  }, [nit, setValue]);

  // Manejar envío del formulario
  const onSubmit = async (formData) => {
    try {
      const nitCompleto = formData.verificacion
        ? `${formData.nit}-${formData.verificacion}`
        : formData.nit;

      await actualizarEmpresa(nit, {
        nit: nitCompleto,
        nombre: formData.nombre,
        telefono: formData.telefono,
        direccion: formData.direccion,
        estado: formData.estado,
      });

      toast.success("Empresa actualizada exitosamente");
      navigate("/superadmin/listar-empresas");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        Editar Empresa
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Formulario */}
        <div className="flex space-x-2 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">NIT:</label>
            <input
              type="text"
              {...register("nit")}
              className={`mt-1 block w-full border ${
                errors.nit ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              readOnly
            />
            {errors.nit && (
              <p className="text-red-500 text-xs">{errors.nit.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Verificación:</label>
            <input
              type="text"
              {...register("verificacion")}
              className={`mt-1 block w-full border ${
                errors.verificacion ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
            />
            {errors.verificacion && (
              <p className="text-red-500 text-xs">
                {errors.verificacion.message}
              </p>
            )}
          </div>
        </div>
        {["nombre", "telefono", "direccion", "estado"].map((campo) => (
          <div key={campo} className="mb-4">
            <label className="block text-sm font-medium">
              {campo.charAt(0).toUpperCase() + campo.slice(1)}:
            </label>
            {campo === "estado" ? (
              <select
                {...register(campo)}
                className={`mt-1 block w-full border ${
                  errors[campo] ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
              </select>
            ) : (
              <input
                type="text"
                {...register(campo)}
                className={`mt-1 block w-full border ${
                  errors[campo] ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
              />
            )}
            {errors[campo] && (
              <p className="text-red-500 text-xs">{errors[campo].message}</p>
            )}
          </div>
        ))}
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
              Actualizar Empresa
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md"
            onClick={() => navigate("/superadmin/listar-empresas")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarEmpresa;
