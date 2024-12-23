// src/superAdmin/components/validations/usuarioEditValidations.js
import * as Yup from 'yup';

export const usuarioEditSchema = Yup.object().shape({
    cedula: Yup.string()
        .required('La cédula es obligatoria')
        .matches(/^[0-9]+$/, 'La cédula solo puede contener números')
        .min(5, 'La cédula debe tener al menos 5 caracteres')
        .max(12, 'La cédula no puede exceder 12 caracteres'),
    nombre: Yup.string()
        .required('El nombre es obligatorio')
        .max(100, 'El nombre no puede exceder 100 caracteres'),
    correo: Yup.string()
        .email('Formato de correo inválido')
        .required('El correo es obligatorio'),
    contrasena: Yup.string()
        .max(100, 'La contraseña no puede exceder 100 caracteres'), // No es obligatoria en edición
    rol: Yup.string()
        .required('El rol es obligatorio'),
    empresaId: Yup.string()
        .required('La empresa es obligatoria'),
});
