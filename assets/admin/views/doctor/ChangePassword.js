import { h, render, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "../common/list";
import { Formik, Form } from 'formik';

import {
    TextField,
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

import * as Yup from 'yup';
import useApi from "../../lib/api/useApi";
import message from '../../components/Toast/message';
import { ButtonPrimary } from '../../../frontend/components/ButtonPrimary/ButtonPrimary';
import { FormError } from '../../../frontend/components/form/FormError/FormError';



const ChangePassword = ({ doctorID }) => {
    const [serverError, setServerError] = useState(null);
    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({

                password: Yup.string()
                    // .min(3, 'Hasło powinno zawierać minimum 5 znaków.')
                    // .max(255, 'Wybrane hasło jest za długie.')
                    .required('To pole jest wymagane.'),
                confirmPassword: Yup.string()
                    .required('To pole jest wymagane.')
                    // @ts-ignore
                    .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same.'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting,resetForm }) => {
                const { password } = values;
                setServerError(null);
                const [fetch] = useApi();

                fetch(`/admin/change-password/${doctorID}`, { password }, 'post')
                    .then((response) => {
                        console.log("response", response);
                        message.success("Zapisano.");
                        resetForm();
                        setServerError(null);
                    })
                    .catch((error) => {

                        setServerError("Coś poszło nie tak. Spróbuj ponownie.");
                        message.error("Coś poszło nie tak. Spróbuj ponownie.");

                    }).finally(() => {
                        // setIsSending(false);
                    });

            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
            }) => (
                <Form>
                    {serverError &&<FormError style={{ marginBottom: 0 }}>{serverError}</FormError>}

                    <div style={{ marginTop: 30 }}>


                        <FormControl
                            fullWidth

                            error={Boolean(touched.password && errors.password)}
                        >
                            <InputLabel htmlFor='password'>Hasło</InputLabel>
                            <OutlinedInput
                                id='password'
                                type={'text'}
                                value={values.password}
                                name='password'
                                label='Hasło'

                                onBlur={handleBlur}
                                onChange={handleChange}

                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id='helper-text-password'>
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </div>
                    <div style={{ marginTop: 30, marginBottom: 20 }}>
                        <FormControl

                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        >
                            <InputLabel htmlFor='password-confirm'>Powtórz hasło</InputLabel>
                            <OutlinedInput
                                id='password-confirm'
                                type={'text'}
                                value={values.confirmPassword}
                                name='confirmPassword'
                                label='Powtórz hasło'

                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id='helper-text-confirm-password'>
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>

                    </div>
                    <ButtonPrimary style={{ marginRight: 10 }} text="Zmień" />

                </Form>
            )}
        </Formik>
    )
}

export { ChangePassword }