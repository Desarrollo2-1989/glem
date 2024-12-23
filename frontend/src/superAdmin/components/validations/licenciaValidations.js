// src/validations/licenciaValidations.js
import * as Yup from 'yup';

export const licenciaSchema = Yup.object().shape({
    fecha_inicio: Yup.date()
        .required('La fecha de inicio es obligatoria'),
    fecha_vencimiento: Yup.date()
        .required('La fecha de vencimiento es obligatoria')
        .min(Yup.ref('fecha_inicio'), 'La fecha de vencimiento no puede ser menor que la fecha de inicio'),
    empresas_id: Yup.string()
        .required('La empresa es obligatoria'),
});
