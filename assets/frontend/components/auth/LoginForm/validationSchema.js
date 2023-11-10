import * as Yup from 'yup';

const validationSchema =
{
    email: Yup.string()
        .email('Niepoprawny adres email.')
        .max(255)
        .required('To pole jest wymagane.'),
    password: Yup.string()
        .required('To pole jest wymagane.'),
}

export { validationSchema }