import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import * as Yup from 'yup';
import { Formik } from 'formik';


import { ButtonPrimary } from '../../ButtonPrimary/ButtonPrimary';
import { ButtonLink } from '../../ButtonLink/ButtonLink';
import { FormHelperText } from '../../form/FormHelperText/FormHelperText';
import useApi from '../../../lib/api/useApi';
import { FormError } from '../../form/FormError/FormError';
import { FormSuccess } from '../../form/FormSuccess/FormSuccess'
import { LoaderAbsolute } from "../../Loader/LoaderAbsolute/LoaderAbsolute";
import { ButtonPrimaryLink } from "./../../../components/ButtonPrimaryLink/ButtonPrimaryLink";
import { LoaderCenter } from '../../Loader/LoaderCenter/LoaderCenter';

import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect } from 'react';

const getToken = () => {
    let pathName = window.location.pathname;
    let segments = pathName.split('/');
    let token = segments[segments.length - 1];
    return token;
}

const token = getToken();


const NotValidInfo = () => {
    return (
        <FormError>
            Twój link wygasł lub został wykorzystany.
        </FormError>

    )
}


const ResetPasswordForm = ({ onClick }) => {
    const [serverError, setServerError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    // /api-is-valid-token/{token}


    useEffect(() => {
        const [fetch] = useApi();

        fetch(`/api-is-valid-token/${token}`, 'get')
            .then((response) => {
                console.log("response", response);
                setIsTokenValid("valid");
            })
            .catch((error) => {
                setIsTokenValid("notValid");

            }).finally(() => {
                // setIsSending(false);
                setIsLoading(false);
            });
    }, [])



    if (!isTokenValid) {
        return <LoaderCenter />
    }

    if (isTokenValid === "notValid") {
        return <NotValidInfo />
    }




    return (
        <div>

            {isSuccess ? (
                <div style="text-align:center;">

                    Hasło zostało zmienione.
                    <ButtonPrimaryLink href="/zaloguj-sie" text="Zaloguj się" />
                </div>
            ) : (
                <Fragment>
                    <h2 class="main--title --center">Wpisz nowe hasło</h2>

                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .required('To pole jest wymagane.')
                                .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
                                .max(20, 'Hasło może zawierać maksymalnie 20 znaków.')
                                .matches(/[\W_]/, 'Hasło musi zawierać co najmniej jeden znak specjalny'),
                            confirmPassword: Yup.string()
                                .required('To pole jest wymagane.')
                                .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
                                .max(20, 'Hasło może zawierać maksymalnie 20 znaków.')
                                .matches(/[\W_]/, 'Hasło musi zawierać co najmniej jeden znak specjalny'),

                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            const { password } = values;

                            const [fetch] = useApi();
                            setIsLoading(true);
                            fetch(`/api-change-password`, { password, token }, 'post')
                                .then((response) => {
                                    console.log("response", response);
                                    onClick();
                                })
                                .catch((error) => {
                                    setServerError("error");
                                }).finally(() => {
                                    // setIsSending(false);
                                    setIsLoading(false);
                                });



                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ width: '100%', position: "relative" }}>
                                {serverError && <FormError style={{ aligItems: "start" }}>Coś poszło nie tak. Spróbuj ponownie..</FormError>}

                                {isLoading && <LoaderAbsolute />}

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}

                                >
                                    <InputLabel htmlFor='password'>Hasło</InputLabel>
                                    <OutlinedInput
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name='password'
                                        label='Hasło'
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);

                                        }}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                    size='large'
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id='helper-text-password'>
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    sx={{ mt: 3 }}
                                >
                                    <InputLabel htmlFor='password-confirm'>Powtórz hasło</InputLabel>
                                    <OutlinedInput
                                        id='password-confirm'
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name='confirmPassword'
                                        label='Powtórz hasło'
                                        onBlur={handleBlur}
                                        // sx={{mt:3}}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                    size='large'
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id='helper-text-confirm-password'>
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <ButtonPrimary style={{ marginTop: 20, marginBottom: 10 }} text="Zapisz" fullWidth />
                            </form>
                        )}
                    </Formik></Fragment>
            )}


        </div>
    )
}

export { ResetPasswordForm }