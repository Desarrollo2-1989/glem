import * as Yup from 'yup';

export const empresaSchema = Yup.object().shape({
    nit: Yup.string()
        .required('El NIT es obligatorio') // Verifica si está vacío
        .matches(/^\d+$/, 'El NIT debe contener solo números') // Verifica que contenga solo números
        .test('length', 'El NIT debe tener entre 6 y 12 dígitos', value => {
            return value && value.length >= 6 && value.length <= 12; 
        }),
    nombre: Yup.string()
        .required('El nombre de la empresa es obligatorio'),
    telefono: Yup.string()
        .required('El teléfono es obligatorio') // Verifica si está vacío
        .matches(/^\d+$/, 'El teléfono solo debe contener números') // Verifica que contenga solo números
        .matches(/^\d{9,10}$/, 'El teléfono debe tener entre 9 y 10 dígitos'), // Verifica que tenga entre 9 y 10 dígitos
    verificacion: Yup.string() // Este campo es opcional y no tiene validaciones
        .nullable(), // Permite que sea null
    direccion: Yup.string()
        .required('La dirección es obligatoria'), // Añade validación para dirección
    estado: Yup.string()
        .required('El estado es obligatorio'), // Añade validación para estado
});