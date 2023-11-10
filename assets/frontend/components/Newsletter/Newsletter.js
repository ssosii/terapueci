import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Formik, Form } from 'formik';
import { TextField, FormHelperText, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import * as Yup from 'yup';
import "./newsletter.scss";
import { ButtonPrimary } from "./../../components/ButtonPrimary/ButtonPrimary";
import { CheckboxField } from "./../../components/form/CheckboxField/CheckboxField";
import useApi from '../../lib/api/useApi';
import { LoaderAbsolute } from "./../../components/Loader/LoaderAbsolute/LoaderAbsolute";
import { FormError } from "./../../components/form/FormError/FormError";
import { FormSuccess } from "./../../components/form/FormSuccess/FormSuccess";

const Newsletter = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState(false);
    // console.log("serverStatus", serverStatus);
    return (
        <div className='container'>
            <div className='newsletter--component'>
                <div className='section label'>
                    <h3 className='title main--title --big'>Zapisz się do naszego newslettera</h3>
                    <p className='description'>Otrzymuj od nas bezpłatną wiedzę, która pomoże Ci lepiej dbać o siebie i Twoich bliskich.</p>
                </div>


                <div className='section form'>
                    <Formik
                        initialValues={{
                            username: "",
                            email: '',
                            confirmPolicy: false,
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Niepoprawny adres email.')
                                .max(255, 'Email jest za długi.')
                                .required('Email jest wymagany.'),
                            username: Yup.string()
                                .min(3, 'Nazwa musi posiadać minimum 3 znaki.')
                                .max(50, 'Nazwa użytkownika może zawierać maksymalnie 50 znaków.')
                                .required('Nazwa użytkownika jest wymagana.'),
                            confirmPolicy: Yup.boolean().oneOf([true], 'Musisz zatwierdzić regulamin.'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            const { email, username } = values;
                            setIsLoading(true);
                            const [fetch] = useApi();
                            fetch(`/api-save-newsletter`, { email, username }, 'post')
                                .then((response) => {
                                    console.log("response", response);
                                    setServerStatus("success");
                                    resetForm();
                                })
                                .catch((error) => {
                                    console.log("error", error);
                                    setServerStatus("error");
                                    setIsLoading(false);
                                    // setServerError("error");
                                    // setTemponaryLink(null);
                                }).finally(() => {
                                    // setIsSending(false);

                                    setIsLoading(false);
                                });



                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <Form style={{ position: "relative" }}>
                                {isLoading && <LoaderAbsolute />}
                                {serverStatus && serverStatus === "error" && <FormError>Coś poszło nie tak spróbuj ponownie.</FormError>}
                                {serverStatus && serverStatus === "success" && <FormSuccess>Dziękujemy za dołączenie do newslettera.</FormSuccess>}
                
                                <div className='username-field'>
                                    <TextField
                                        fullWidth
                                        name="username"
                                        label="Twoje imię"
                                        size="medium"
                                        sx={{ mt: 1 }}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.username && errors.username)}
                                        inputProps={{ maxLength: 255 }}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id='helper-text-username'>
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </div>
                                <FormControl
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    error={Boolean(touched.email && errors.email)}
                                >
                                    <InputLabel htmlFor='email-login'>Adres e-mail</InputLabel>
                                    <OutlinedInput
                                        id='email-login'
                                        type='email'
                                        value={values.email}
                                        size="medium"
                                        name='email'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label='Adres e-mail'
                                        autoComplete='off'
                                        inputProps={{ maxLength: 255 }}

                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id='email-login'>
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>




                                <CheckboxField field="confirmPolicy" value={values.confirmPolicy} error={Boolean(touched.confirmPolicy && errors.confirmPolicy)} handleChange={handleChange} style={{ marginBottom: 10, marginTop: 10 }}>
                                    Akceptuję <a className='linkBright' href="/polityka-prywatnosci" target="_blank">Politykę Prywatności.</a>*
                                </CheckboxField>


                                <ButtonPrimary text="Zapisz się" />
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    )
}

export { Newsletter }