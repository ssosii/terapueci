import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { TextField } from '@mui/material';
import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { ButtonLink } from '../../ButtonLink/ButtonLink';
import { FormHelperText } from '../../form/FormHelperText/FormHelperText';
import useApi from '../../../lib/api/useApi';
import { FormError } from '../../form/FormError/FormError';
import { FormSuccess } from '../../form/FormSuccess/FormSuccess'
import {LoaderAbsolute} from "./../../Loader/LoaderAbsolute/LoaderAbsolute";

const ForgottenPasswordForm = ({ onClick }) => {
    const [serverError, setServerError] = useState(null);
    const [temponaryLink, setTemponaryLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    console.log("onClick",onClick);
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Niepoprawny adres email.')
                        .max(255, 'Email jest za długi.')
                        .required('Email jest wymagany.'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    const { email } = values;

                    const [fetch] = useApi();
                    fetch(`/api-recover-password`, { email }, 'post')
                        .then((response) => {
                            console.log("response", response);
                            setTemponaryLink(response.url);
                            setServerError("success")
                        })
                        .catch((error) => {
                            console.log("error", error);
                            setServerError("error");
                            setTemponaryLink(null);
                        }).finally(() => {
                            // setIsSending(false);
                            setIsLoading(false);
                        });



                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} style={{ width: '100%', position: "relative" }}>
                        {serverError && serverError === "error" && <FormError style={{aligItems:"start"}}>Wybrany email nie istnieje w naszej bazie.</FormError>}
                        {serverError && serverError === "success" && <FormSuccess style={{aligItems:"start"}}>Na Twój email wysłaliśmy wiadomość z linkiem umożliwiającym zmianę hasła.</FormSuccess>}
                        {isLoading && <LoaderAbsolute />}
                        {/* <div>{temponaryLink}</div> */}
                        <TextField
                            id='email'
                            label='Wpisz swój email'
                            rows={2}
                            fullWidth
                            sx={{ mt: 3 }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText sx={{ mb: 1.5 }} error id='email'>
                                {errors.email}
                            </FormHelperText>
                        )}

                        <ButtonPrimary style={{ marginTop: 20, marginBottom: 10 }} text="Zresetuj hasło" fullWidth />
                    </form>
                )}
            </Formik>
            <ButtonLink text="Wróć do panelu logowania" onClick={onClick} />
        </div>
    )
}

export { ForgottenPasswordForm }