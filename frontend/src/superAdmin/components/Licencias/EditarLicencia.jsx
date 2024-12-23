import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { licenciaSchema } from "../validations/licenciaValidations";
import {
  obtenerEmpresas,
  obtenerLicenciaPorSerial,
  actualizarLicencias,
} from "../../../services/licenciaService";

const EditarLicencia = () => {
  const { serial } = useParams();
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(licenciaSchema),
    defaultValues: {
      serial: "",
      fecha_inicio: "",
      fecha_vencimiento: "",
      empresas_id: "",
    },
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const licencia = await obtenerLicenciaPorSerial(serial);
        setValue("serial", licencia.serial || "");

        // Ajustar la fecha y hora al horario de Colombia (UTC -5)
        const fechaInicio = new Date(licencia.fecha_inicio);
        fechaInicio.setHours(fechaInicio.getHours() - 5); // Ajuste de la zona horaria

        const fechaVencimiento = new Date(licencia.fecha_vencimiento);
        fechaVencimiento.setHours(fechaVencimiento.getHours() - 5); // Ajuste de la zona horaria

        // Establecer los valores ajustados
        setValue("fecha_inicio", fechaInicio.toISOString().slice(0, 16));
        setValue(
          "fecha_vencimiento",
          fechaVencimiento.toISOString().slice(0, 16)
        );

        setValue("empresas_id", licencia.empresas_id || "");

        const empresasData = await obtenerEmpresas();
        setEmpresas(empresasData);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los datos necesarios");
      }
    };

    cargarDatos();
  }, [serial, setValue]);

  const onSubmit = async (data) => {
    try {
      const fechaInicioColombia = new Date(data.fecha_inicio);
      fechaInicioColombia.setHours(fechaInicioColombia.getHours() - 5);

      const fechaVencimientoColombia = new Date(data.fecha_vencimiento);
      fechaVencimientoColombia.setHours(
        fechaVencimientoColombia.getHours() - 5
      );

      const licenciaActualizada = {
        serial: data.serial,
        fecha_inicio: fechaInicioColombia.toISOString(),
        fecha_vencimiento: fechaVencimientoColombia.toISOString(),
        empresas_id: data.empresas_id,
      };

      const respuesta = await actualizarLicencias(serial, licenciaActualizada);

      if (respuesta) {
        toast.success("Licencia actualizada con éxito");
        navigate("/superadmin/listar-licencias");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la licencia");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar Licencia</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Serial:
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Inicio:
          </label>
          <Controller
            name="fecha_inicio"
            control={control}
            render={({ field }) => (
              <input
                type="datetime-local"
                {...field}
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.fecha_inicio ? "border-red-500" : "border-gray-300"
                } focus:ring focus:ring-green-200`}
              />
            )}
          />
          {errors.fecha_inicio && (
            <p className="text-red-500 text-sm">
              {errors.fecha_inicio.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Vencimiento:
          </label>
          <Controller
            name="fecha_vencimiento"
            control={control}
            render={({ field }) => (
              <input
                type="datetime-local"
                {...field}
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.fecha_vencimiento
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-green-200`}
              />
            )}
          />
          {errors.fecha_vencimiento && (
            <p className="text-red-500 text-sm">
              {errors.fecha_vencimiento.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Empresa:
          </label>
          <Controller
            name="empresas_id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.empresas_id ? "border-red-500" : "border-gray-300"
                } focus:ring focus:ring-green-200`}
              >
                <option value="">Seleccionar Empresa</option>
                {empresas.map((empresa) => (
                  <option key={empresa.nit} value={empresa.nit}>
                    {empresa.nit}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.empresas_id && (
            <p className="text-red-500 text-sm">{errors.empresas_id.message}</p>
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Actualizar Licencia
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md"
            onClick={() => navigate("/superadmin/listar-licencias")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarLicencia;
