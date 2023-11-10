import * as Yup from 'yup';

const validationSchema =
{
    username: Yup.string()
        .min(3, 'Nazwa musi posiadać minimum 3 znaki.')
        .max(50, 'Nazwa użytkownika może zawierać maksymalnie 50 znaków.')
        .required('Nazwa użytkownika jest wymagana.'),
    email: Yup.string()
        .email('Niepoprawny adres email.')
        .max(255, 'Email jest za długi.')
        .required('Email jest wymagany.'),
    password: Yup.string()
        .required('To pole jest wymagane.')
        .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
        .max(20, 'Hasło może zawierać maksymalnie 20 znaków.')
        .matches(/[\W_]/, 'Hasło musi zawierać co najmniej jeden znak specjalny'),
    confirmPolicy: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
    confirmStatute: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
}

export { validationSchema }